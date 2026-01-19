import { useState, useCallback, useEffect } from 'react';
import { GameState, Choice, Decision, FollowUpEvent, initialGameState } from '@/types/game';
import { getRandomDecision, decisions } from '@/data/decisions';
import { getRandomEvent, RandomEvent, ActiveEventCooldown } from '@/data/randomEvents';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useGameSave } from '@/hooks/useGameSave';
import { useAutoSave, loadAutoSave, hasAutoSave, clearAutoSave } from '@/hooks/useAutoSave';
import { useNotifications } from '@/hooks/useNotifications';

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

  // Auto-save hook
  useAutoSave(gameStarted, gameState, usedDecisions, currentDecision);

  const checkVictory = useCallback((state: GameState): GameState => {
    const updatedConditions = state.victoryConditions.map(condition => {
      let currentValue = 50;
      switch (condition.type) {
        case 'economic':
          currentValue = state.economy;
          break;
        case 'military':
          currentValue = state.military;
          break;
        case 'diplomatic':
          currentValue = state.diplomacy;
          break;
        case 'popular':
          currentValue = state.popularity;
          break;
      }
      return {
        ...condition,
        currentValue,
        completed: currentValue >= condition.targetValue,
      };
    });

    const completedCondition = updatedConditions.find(c => c.completed);
    if (completedCondition) {
      return {
        ...state,
        victoryConditions: updatedConditions,
        gameWon: true,
        victoryType: completedCondition.name,
      };
    }

    return { ...state, victoryConditions: updatedConditions };
  }, []);

  const checkGameOver = useCallback((state: GameState): GameState => {
    if (state.gameWon) return state;

    let gameOverReason: string | undefined;

    if (state.economy <= 0) {
      gameOverReason = 'انهار الاقتصاد! أصبحت البلاد مفلسة.';
    } else if (state.military <= 0) {
      gameOverReason = 'انهار الجيش! تم غزو البلاد.';
    } else if (state.popularity <= 0) {
      gameOverReason = 'ثورة شعبية! تم عزلك من منصبك.';
    } else if (state.diplomacy <= 0) {
      gameOverReason = 'عزلة دولية! فرضت عقوبات قاتلة على البلاد.';
    } else if (state.treasury <= -50) {
      gameOverReason = 'إفلاس تام! لم تستطع البلاد سداد ديونها.';
    }

    const militaryFaction = state.factions.find(f => f.id === 'military_faction');
    if (militaryFaction && militaryFaction.support <= 10) {
      gameOverReason = 'انقلاب عسكري! الجيش أطاح بك من السلطة.';
    }

    const rebelliousRegion = state.regions.find(r => r.unrest >= 90);
    if (rebelliousRegion) {
      gameOverReason = `تمرد في ${rebelliousRegion.name}! فقدت السيطرة على البلاد.`;
    }

    if (gameOverReason) {
      return { ...state, gameOver: true, gameOverReason };
    }

    return state;
  }, []);

  const processFollowUpEvents = useCallback((state: GameState): { state: GameState; triggeredEvent: Decision | null } => {
    const updatedEvents = state.pendingEvents.map(event => ({
      ...event,
      turnsUntilTrigger: event.turnsUntilTrigger - 1,
    }));

    const eventToTrigger = updatedEvents.find(e => e.turnsUntilTrigger <= 0 && !e.triggered);
    
    if (eventToTrigger) {
      return {
        state: {
          ...state,
          pendingEvents: updatedEvents.map(e => 
            e.id === eventToTrigger.id ? { ...e, triggered: true } : e
          ),
        },
        triggeredEvent: eventToTrigger.decision,
      };
    }

    return { state: { ...state, pendingEvents: updatedEvents }, triggeredEvent: null };
  }, []);

  const processRandomEvents = useCallback((state: GameState): { state: GameState; randomEvent: RandomEvent | null } => {
    // Update cooldowns
    const updatedCooldowns = state.eventCooldowns
      .map(c => ({ ...c, turnsRemaining: c.turnsRemaining - 1 }))
      .filter(c => c.turnsRemaining > 0);

    // Check for random event
    const randomEvent = getRandomEvent(state.turnCount, updatedCooldowns);
    
    if (randomEvent) {
      // Add cooldown for this event
      updatedCooldowns.push({
        eventId: randomEvent.id,
        turnsRemaining: randomEvent.cooldown,
      });

      return {
        state: {
          ...state,
          eventCooldowns: updatedCooldowns,
          lastRandomEvent: randomEvent.id,
        },
        randomEvent,
      };
    }

    return { state: { ...state, eventCooldowns: updatedCooldowns }, randomEvent: null };
  }, []);

  const advanceTime = useCallback((state: GameState): GameState => {
    let newMonth = state.month + 1;
    let newYear = state.year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    const updatedRegions = state.regions.map(region => ({
      ...region,
      unrest: Math.max(0, Math.min(100, region.unrest + (region.loyalty < 40 ? 5 : -2))),
      loyalty: Math.max(0, Math.min(100, region.loyalty + (region.unrest > 50 ? -3 : 1))),
    }));

    return {
      ...state,
      month: newMonth,
      year: newYear,
      turnCount: state.turnCount + 1,
      regions: updatedRegions,
    };
  }, []);

  const selectRegion = useCallback((regionId: string) => {
    setGameState(prev => ({
      ...prev,
      selectedRegion: prev.selectedRegion === regionId ? undefined : regionId,
    }));
    playSound('click');
  }, [playSound]);

  const handleSaveGame = useCallback(() => {
    const success = saveGame(gameState, usedDecisions, currentDecision);
    if (success) {
      playSound('success');
    }
    return success;
  }, [saveGame, gameState, usedDecisions, currentDecision, playSound]);

  const handleLoadGame = useCallback(() => {
    // Try manual save first, then auto-save
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
      cancelReminder(); // Cancel reminder when game is loaded
    }
  }, [loadGame, playSound, cancelReminder]);

  const startGame = useCallback((presidentName: string, countryName: string) => {
    const newState: GameState = {
      ...initialGameState,
      presidentName,
      countryName,
    };
    setGameState(newState);
    setUsedDecisions([]);
    setGameStarted(true);
    setCurrentRandomEvent(null);
    deleteSave();
    clearAutoSave();
    cancelReminder(); // Cancel any pending reminders

    const decision = getRandomDecision([]);
    setCurrentDecision(decision);
    playSound('success');
  }, [deleteSave, playSound, cancelReminder]);

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
      const updatedRegions = newState.regions.map(region => {
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
      newState.regions = updatedRegions;
    }

    if (choice.factionEffects) {
      const updatedFactions = newState.factions.map(faction => {
        const factionEffect = choice.factionEffects?.find(fe => fe.factionId === faction.id);
        if (factionEffect) {
          return {
            ...faction,
            support: Math.max(0, Math.min(100, faction.support + factionEffect.supportChange)),
          };
        }
        return faction;
      });
      newState.factions = updatedFactions;
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
      if (hasPositiveEffects && !hasNegativeEffects) {
        playSound('success');
      } else if (hasNegativeEffects && !hasPositiveEffects) {
        playSound('warning');
      }
    }, 300);

    const newUsedDecisions = [...usedDecisions, currentDecision.id];
    setUsedDecisions(newUsedDecisions);

    let updatedState = advanceTime(newState);
    const { state: stateAfterEvents, triggeredEvent } = processFollowUpEvents(updatedState);
    updatedState = stateAfterEvents;

    // Check for random events
    const { state: stateAfterRandom, randomEvent } = processRandomEvents(updatedState);
    updatedState = stateAfterRandom;

    updatedState = checkVictory(updatedState);
    updatedState = checkGameOver(updatedState);

    setGameState(updatedState);

    if (updatedState.gameWon) {
      setTimeout(() => playSound('victory'), 500);
      updateStats(updatedState, true);
      deleteSave();
      clearAutoSave();
      scheduleReminder(); // Schedule reminder after game ends
    } else if (updatedState.gameOver) {
      setTimeout(() => playSound('gameOver'), 500);
      updateStats(updatedState, false);
      deleteSave();
      clearAutoSave();
      scheduleReminder(); // Schedule reminder after game ends
    }

    setTimeout(() => {
      setShowEffects(false);
      
      if (!updatedState.gameOver && !updatedState.gameWon) {
        // Check if random event should be shown
        if (randomEvent) {
          setCurrentRandomEvent(randomEvent);
          setShowRandomEventNotification(true);
          playSound('warning');
          
          // Show notification for 3 seconds then show the event as a decision
          setTimeout(() => {
            setShowRandomEventNotification(false);
            setCurrentDecision(randomEvent);
          }, 3000);
        } else if (triggeredEvent) {
          setCurrentDecision(triggeredEvent);
        } else {
          const nextDecision = getRandomDecision(newUsedDecisions);
          if (nextDecision) {
            setCurrentDecision(nextDecision);
          } else {
            setUsedDecisions([]);
            const resetDecision = getRandomDecision([]);
            setCurrentDecision(resetDecision);
          }
        }
      }
    }, 2000);
  }, [currentDecision, gameState, usedDecisions, advanceTime, checkGameOver, checkVictory, processFollowUpEvents, processRandomEvents, playSound, updateStats, deleteSave]);

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
