import { useState, useCallback, useEffect } from 'react';
import { GameState, Choice, Decision, FollowUpEvent, DifficultyLevel, initialGameState } from '@/types/game';
import { getRandomDecision, decisions } from '@/data/decisions';
import { getRandomEvent, RandomEvent, ActiveEventCooldown } from '@/data/randomEvents';
import { getStoryDecision } from '@/data/story';
import { generateDecision } from '@/data/contentGenerator';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useGameSave } from '@/hooks/useGameSave';
import { useAutoSave, loadAutoSave, hasAutoSave, clearAutoSave } from '@/hooks/useAutoSave';
import { useNotifications } from '@/hooks/useNotifications';
import { useLanguage } from '@/hooks/useLanguage';
import { getGameOverTranslation } from '@/i18n/gameOverTranslations';
import { getRegionName } from '@/i18n/entityTranslations';

// Map random event types to crisis animation types
const eventTypeToCrisis = (event: RandomEvent): GameState['activeCrisis'] => {
  const typeMap: Record<string, 'earthquake' | 'war' | 'coup' | 'epidemic' | 'economic' | 'fire'> = {
    disaster: 'earthquake',
    war: 'war',
    epidemic: 'epidemic',
    political: 'coup',
    economic: 'economic',
    social: 'fire',
  };
  return {
    type: typeMap[event.type] || 'fire',
    severity: event.severity === 'low' ? 'medium' : event.severity as 'medium' | 'high' | 'critical',
  };
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);
  const [usedDecisions, setUsedDecisions] = useState<string[]>([]);
  const [showEffects, setShowEffects] = useState(false);
  const [lastEffects, setLastEffects] = useState<{ stat: string; value: number }[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentRandomEvent, setCurrentRandomEvent] = useState<RandomEvent | null>(null);
  const [showRandomEventNotification, setShowRandomEventNotification] = useState(false);

  const { playSound, toggleSound, isSoundEnabled } = useSoundEffects();
  const { saveGame, loadGame, hasSavedGame, deleteSave, getSaveInfo, getStats, updateStats } = useGameSave();
  const { scheduleReminder, cancelReminder } = useNotifications();
  const { currentLanguage } = useLanguage();

  // Auto-save hook
  useAutoSave(gameStarted, gameState, usedDecisions, currentDecision);

  const checkVictory = useCallback((state: GameState): GameState => {
    const updatedConditions = state.victoryConditions.map(condition => {
      let currentValue = 50;
      switch (condition.type) {
        case 'economic': currentValue = state.economy; break;
        case 'military': currentValue = state.military; break;
        case 'diplomatic': currentValue = state.diplomacy; break;
        case 'popular': currentValue = state.popularity; break;
      }
      return { ...condition, currentValue, completed: currentValue >= condition.targetValue };
    });

    const completedCondition = updatedConditions.find(c => c.completed);
    if (completedCondition) {
      return { ...state, victoryConditions: updatedConditions, gameWon: true, victoryType: completedCondition.name };
    }
    return { ...state, victoryConditions: updatedConditions };
  }, []);

  const checkGameOver = useCallback((state: GameState): GameState => {
    if (state.gameWon) return state;

    const t = getGameOverTranslation(currentLanguage);
    let gameOverReason: string | undefined;

    if (state.economy <= 0) gameOverReason = t.economyCollapse;
    else if (state.military <= 0) gameOverReason = t.militaryCollapse;
    else if (state.popularity <= 0) gameOverReason = t.revolution;
    else if (state.diplomacy <= 0) gameOverReason = t.internationalIsolation;
    else if (state.treasury <= (state.difficulty === 'easy' ? -50 : state.difficulty === 'hard' ? -15 : -30))
      gameOverReason = t.totalBankruptcy;

    const militaryFaction = state.factions.find(f => f.id === 'military_faction');
    if (militaryFaction && militaryFaction.support <= (state.difficulty === 'easy' ? 10 : state.difficulty === 'hard' ? 25 : 15))
      gameOverReason = t.militaryCoup;

    const rebelliousRegion = state.regions.find(r => r.unrest >= (state.difficulty === 'easy' ? 95 : state.difficulty === 'hard' ? 75 : 85));
    if (rebelliousRegion) {
      const regionName = getRegionName(rebelliousRegion.id, currentLanguage);
      gameOverReason = t.regionRebellion(regionName);
    }

    // New: cascading crisis - if multiple stats are very low
    const criticalStats = [state.economy, state.military, state.popularity, state.diplomacy].filter(s => s <= 15);
    if (criticalStats.length >= 3) {
      gameOverReason = t.economyCollapse; // total collapse
    }

    if (gameOverReason) return { ...state, gameOver: true, gameOverReason };
    return state;
  }, [currentLanguage]);

  const processFollowUpEvents = useCallback((state: GameState): { state: GameState; triggeredEvent: Decision | null } => {
    const updatedEvents = state.pendingEvents.map(event => ({
      ...event, turnsUntilTrigger: event.turnsUntilTrigger - 1,
    }));

    const eventToTrigger = updatedEvents.find(e => e.turnsUntilTrigger <= 0 && !e.triggered);
    if (eventToTrigger) {
      return {
        state: { ...state, pendingEvents: updatedEvents.map(e => e.id === eventToTrigger.id ? { ...e, triggered: true } : e) },
        triggeredEvent: eventToTrigger.decision,
      };
    }
    return { state: { ...state, pendingEvents: updatedEvents }, triggeredEvent: null };
  }, []);

  const processRandomEvents = useCallback((state: GameState): { state: GameState; randomEvent: RandomEvent | null } => {
    const updatedCooldowns = state.eventCooldowns
      .map(c => ({ ...c, turnsRemaining: c.turnsRemaining - 1 }))
      .filter(c => c.turnsRemaining > 0);

    // Increase probability when stats are low (cascading crises)
    const crisisBonus = [state.economy, state.military, state.popularity, state.diplomacy]
      .filter(s => s < 20).length * 3;

    const randomEvent = getRandomEvent(state.turnCount, updatedCooldowns, crisisBonus);
    
    if (randomEvent) {
      updatedCooldowns.push({ eventId: randomEvent.id, turnsRemaining: randomEvent.cooldown });
      return {
        state: {
          ...state,
          eventCooldowns: updatedCooldowns,
          lastRandomEvent: randomEvent.id,
          activeCrisis: randomEvent.severity === 'critical' || randomEvent.severity === 'high'
            ? eventTypeToCrisis(randomEvent) : undefined,
        },
        randomEvent,
      };
    }
    return { state: { ...state, eventCooldowns: updatedCooldowns }, randomEvent: null };
  }, []);

  // Update story chapters
  const updateStory = useCallback((state: GameState): GameState => {
    const chapters = [...state.storyChapters];
    let newChapter = state.currentChapter;

    for (let i = 0; i < chapters.length; i++) {
      if (chapters[i].completed) continue;
      const cond = chapters[i].unlockCondition;
      if (cond.type === 'turn' && state.turnCount >= cond.value) {
        if (i === newChapter) {
          // Mark previous as completed, advance
          if (i > 0) chapters[i - 1] = { ...chapters[i - 1], completed: true };
          newChapter = i;
        }
      }
    }

    return { ...state, storyChapters: chapters, currentChapter: newChapter };
  }, []);

  const getDifficultyModifiers = useCallback((diff: DifficultyLevel) => {
    switch (diff) {
      case 'easy':
        return {
          regionUnrestGain: 5, regionLoyaltyLoss: -3, loyaltyThreshold: 42, unrestThreshold: 48,
          decay: { economyHigh: -2, economyLow: -2, popularityHigh: -2, popularityLow: -1, militaryHigh: -1, militaryLow: -1, diplomacyHigh: -1, diplomacyLow: -1, treasury: -2 },
        };
      case 'hard':
        return {
          regionUnrestGain: 18, regionLoyaltyLoss: -12, loyaltyThreshold: 65, unrestThreshold: 25,
          decay: { economyHigh: -5, economyLow: -7, popularityHigh: -6, popularityLow: -4, militaryHigh: -4, militaryLow: -5, diplomacyHigh: -4, diplomacyLow: -5, treasury: -8 },
        };
      default:
        return {
          regionUnrestGain: 10, regionLoyaltyLoss: -6, loyaltyThreshold: 52, unrestThreshold: 38,
          decay: { economyHigh: -3, economyLow: -4, popularityHigh: -4, popularityLow: -2, militaryHigh: -2, militaryLow: -3, diplomacyHigh: -2, diplomacyLow: -3, treasury: -4 },
        };
    }
  }, []);

  const advanceTime = useCallback((state: GameState): GameState => {
    let newMonth = state.month + 1;
    let newYear = state.year;
    if (newMonth > 12) { newMonth = 1; newYear += 1; }

    const mod = getDifficultyModifiers(state.difficulty);

    const updatedRegions = state.regions.map(region => ({
      ...region,
      unrest: Math.max(0, Math.min(100, region.unrest + (region.loyalty < mod.loyaltyThreshold ? mod.regionUnrestGain : -1))),
      loyalty: Math.max(0, Math.min(100, region.loyalty + (region.unrest > mod.unrestThreshold ? mod.regionLoyaltyLoss : 1))),
    }));

    const decay = {
      economy: state.economy > 60 ? mod.decay.economyHigh : (state.economy < 30 ? mod.decay.economyLow : -1),
      popularity: state.popularity > 60 ? mod.decay.popularityHigh : mod.decay.popularityLow,
      military: state.military > 60 ? mod.decay.militaryHigh : mod.decay.militaryLow,
      diplomacy: state.diplomacy > 60 ? mod.decay.diplomacyHigh : mod.decay.diplomacyLow,
      treasury: mod.decay.treasury,
    };

    // Update character loyalty based on game state
    const updatedCharacters = state.characters.map(char => {
      if (char.status !== 'alive') return char;
      let loyaltyChange = 0;
      if (state.popularity > 70) loyaltyChange += 2;
      if (state.popularity < 30) loyaltyChange -= 3;
      if (state.military < 20 && char.role.includes('عسكر')) loyaltyChange -= 5;
      return { ...char, loyalty: Math.max(0, Math.min(100, char.loyalty + loyaltyChange)) };
    });

    return {
      ...state,
      month: newMonth, year: newYear, turnCount: state.turnCount + 1,
      regions: updatedRegions, characters: updatedCharacters,
      economy: Math.max(0, Math.min(100, state.economy + decay.economy)),
      popularity: Math.max(0, Math.min(100, state.popularity + decay.popularity)),
      military: Math.max(0, Math.min(100, state.military + decay.military)),
      diplomacy: Math.max(0, Math.min(100, state.diplomacy + decay.diplomacy)),
      treasury: state.treasury + decay.treasury,
    };
  }, [getDifficultyModifiers]);

  const selectRegion = useCallback((regionId: string) => {
    setGameState(prev => ({ ...prev, selectedRegion: prev.selectedRegion === regionId ? undefined : regionId }));
    playSound('click');
  }, [playSound]);

  const handleSaveGame = useCallback(() => {
    const success = saveGame(gameState, usedDecisions, currentDecision);
    if (success) playSound('success');
    return success;
  }, [saveGame, gameState, usedDecisions, currentDecision, playSound]);

  const handleLoadGame = useCallback(() => {
    const saved = loadGame() || loadAutoSave();
    if (saved) {
      setGameState(saved.gameState);
      setUsedDecisions(saved.usedDecisions);
      setGameStarted(true);
      if (saved.currentDecisionId) {
        const decision = decisions.find(d => d.id === saved.currentDecisionId);
        setCurrentDecision(decision || getRandomDecision(saved.usedDecisions));
      } else {
        setCurrentDecision(getRandomDecision(saved.usedDecisions));
      }
      playSound('success');
      cancelReminder();
    }
  }, [loadGame, playSound, cancelReminder]);

  const getNextDecision = useCallback((usedIds: string[], state: GameState): Decision | null => {
    // 1. Try story decision first
    const storyDec = getStoryDecision(state.currentChapter, usedIds);
    if (storyDec) return storyDec;
    
    // 2. Try regular decisions
    const regularDec = getRandomDecision(usedIds);
    if (regularDec) return regularDec;
    
    // 3. Generate procedural content
    return generateDecision(state);
  }, []);

  const startGame = useCallback((presidentName: string, countryName: string, difficulty: DifficultyLevel = 'medium') => {
    const diffStats: Record<DifficultyLevel, Partial<GameState>> = {
      easy: { economy: 55, military: 55, popularity: 55, diplomacy: 55, treasury: 100 },
      medium: { economy: 40, military: 40, popularity: 42, diplomacy: 40, treasury: 65 },
      hard: { economy: 22, military: 22, popularity: 25, diplomacy: 22, treasury: 30 },
    };
    const newState: GameState = {
      ...initialGameState,
      ...diffStats[difficulty],
      presidentName, countryName, difficulty,
    };
    setGameState(newState);
    setUsedDecisions([]);
    setGameStarted(true);
    setCurrentRandomEvent(null);
    deleteSave();
    clearAutoSave();
    cancelReminder();

    const decision = getNextDecision([], newState);
    setCurrentDecision(decision);
    playSound('success');
  }, [deleteSave, playSound, cancelReminder, getNextDecision]);

  const makeChoice = useCallback((choice: Choice) => {
    if (!currentDecision) return;

    playSound('decision');

    const effects: { stat: string; value: number }[] = [];
    let newState = { ...gameState };

    Object.entries(choice.effects).forEach(([stat, value]) => {
      if (value !== undefined && value !== 0) {
        effects.push({ stat, value });
        (newState as any)[stat] = Math.max(0, Math.min(100, (newState as any)[stat] + value));
      }
    });

    if (choice.regionEffects) {
      newState.regions = newState.regions.map(region => {
        const regionEffect = choice.regionEffects?.find(re => re.regionId === region.id);
        if (regionEffect) {
          return {
            ...region,
            economy: Math.max(0, Math.min(100, region.economy + (regionEffect.effects.economy || 0))),
            loyalty: Math.max(0, Math.min(100, region.loyalty + (regionEffect.effects.loyalty || 0))),
            development: Math.max(0, Math.min(100, region.development + (regionEffect.effects.development || 0))),
            unrest: Math.max(0, Math.min(100, region.unrest + (regionEffect.effects.unrest || 0))),
          };
        }
        return region;
      });
    }

    if (choice.factionEffects) {
      newState.factions = newState.factions.map(faction => {
        const factionEffect = choice.factionEffects?.find(fe => fe.factionId === faction.id);
        if (factionEffect) {
          return { ...faction, support: Math.max(0, Math.min(100, faction.support + factionEffect.supportChange)) };
        }
        return faction;
      });
    }

    if (currentDecision.followUpEvents) {
      const triggeredFollowUp = currentDecision.followUpEvents.find(fe => fe.choiceId === choice.id);
      if (triggeredFollowUp) {
        const newEvent: FollowUpEvent = {
          id: `followup_${Date.now()}`,
          triggeredBy: currentDecision.id,
          choiceId: choice.id,
          turnsUntilTrigger: triggeredFollowUp.delay,
          triggered: false,
          decision: triggeredFollowUp.event as Decision,
        };
        newState.pendingEvents = [...newState.pendingEvents, newEvent];
      }
    }

    setLastEffects(effects);
    setShowEffects(true);

    const hasPositiveEffects = effects.some(e => e.value > 0);
    const hasNegativeEffects = effects.some(e => e.value < 0);
    
    setTimeout(() => {
      if (hasPositiveEffects && !hasNegativeEffects) playSound('success');
      else if (hasNegativeEffects && !hasPositiveEffects) playSound('warning');
    }, 300);

    const newUsedDecisions = [...usedDecisions, currentDecision.id];
    setUsedDecisions(newUsedDecisions);

    let updatedState = advanceTime(newState);
    updatedState = updateStory(updatedState);
    const { state: stateAfterEvents, triggeredEvent } = processFollowUpEvents(updatedState);
    updatedState = stateAfterEvents;

    const { state: stateAfterRandom, randomEvent } = processRandomEvents(updatedState);
    updatedState = stateAfterRandom;

    updatedState = checkVictory(updatedState);
    updatedState = checkGameOver(updatedState);

    setGameState(updatedState);

    if (updatedState.gameWon) {
      setTimeout(() => playSound('victory'), 500);
      updateStats(updatedState, true);
      deleteSave(); clearAutoSave(); scheduleReminder();
    } else if (updatedState.gameOver) {
      setTimeout(() => playSound('gameOver'), 500);
      updateStats(updatedState, false);
      deleteSave(); clearAutoSave(); scheduleReminder();
    }

    setTimeout(() => {
      setShowEffects(false);
      
      if (!updatedState.gameOver && !updatedState.gameWon) {
        if (randomEvent) {
          setCurrentRandomEvent(randomEvent);
          setShowRandomEventNotification(true);
          playSound('warning');
          
          setTimeout(() => {
            setShowRandomEventNotification(false);
            setCurrentDecision(randomEvent);
          }, 3000);
        } else if (triggeredEvent) {
          setCurrentDecision(triggeredEvent);
        } else {
          const nextDecision = getNextDecision(newUsedDecisions, updatedState);
          setCurrentDecision(nextDecision);
        }
      }
    }, 2000);
  }, [currentDecision, gameState, usedDecisions, advanceTime, updateStory, checkGameOver, checkVictory, processFollowUpEvents, processRandomEvents, playSound, updateStats, deleteSave, getNextDecision]);

  const restartGame = useCallback(() => {
    setGameState(initialGameState);
    setUsedDecisions([]);
    setCurrentDecision(null);
    setGameStarted(false);
    setShowEffects(false);
    setLastEffects([]);
    setCurrentRandomEvent(null);
    setShowRandomEventNotification(false);
    clearAutoSave();
    playSound('click');
  }, [playSound]);

  const handleToggleSound = useCallback(() => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    toggleSound(newValue);
  }, [soundEnabled, toggleSound]);

  return {
    gameState,
    currentDecision,
    showEffects,
    lastEffects,
    gameStarted,
    soundEnabled,
    currentRandomEvent,
    showRandomEventNotification,
    startGame,
    makeChoice,
    restartGame,
    selectRegion,
    handleSaveGame,
    handleLoadGame,
    handleToggleSound,
    hasSavedGame: hasSavedGame() || hasAutoSave(),
    getSaveInfo,
    getStats,
  };
};
