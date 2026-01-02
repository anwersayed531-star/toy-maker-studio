import { useState, useCallback } from 'react';
import { GameState, Choice, Decision, FollowUpEvent, initialGameState } from '@/types/game';
import { getRandomDecision, decisions } from '@/data/decisions';

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);
  const [usedDecisions, setUsedDecisions] = useState<string[]>([]);
  const [showEffects, setShowEffects] = useState(false);
  const [lastEffects, setLastEffects] = useState<{ stat: string; value: number }[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

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

    // Check faction-based game over
    const militaryFaction = state.factions.find(f => f.id === 'military_faction');
    if (militaryFaction && militaryFaction.support <= 10) {
      gameOverReason = 'انقلاب عسكري! الجيش أطاح بك من السلطة.';
    }

    // Check region unrest
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

  const advanceTime = useCallback((state: GameState): GameState => {
    let newMonth = state.month + 1;
    let newYear = state.year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    // Natural region changes based on stats
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
  }, []);

  const startGame = useCallback((presidentName: string, countryName: string) => {
    const newState: GameState = {
      ...initialGameState,
      presidentName,
      countryName,
    };
    setGameState(newState);
    setUsedDecisions([]);
    setGameStarted(true);

    const decision = getRandomDecision([]);
    setCurrentDecision(decision);
  }, []);

  const makeChoice = useCallback((choice: Choice) => {
    if (!currentDecision) return;

    const effects: { stat: string; value: number }[] = [];
    let newState = { ...gameState };

    // Apply main effects
    Object.entries(choice.effects).forEach(([stat, value]) => {
      if (value !== undefined && value !== 0) {
        effects.push({ stat, value });
        (newState as any)[stat] = Math.max(0, Math.min(100, (newState as any)[stat] + value));
      }
    });

    // Apply region effects
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

    // Apply faction effects
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

    // Add follow-up events
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

    const newUsedDecisions = [...usedDecisions, currentDecision.id];
    setUsedDecisions(newUsedDecisions);

    // Advance time and process
    let updatedState = advanceTime(newState);
    
    // Process follow-up events
    const { state: stateAfterEvents, triggeredEvent } = processFollowUpEvents(updatedState);
    updatedState = stateAfterEvents;

    // Check victory and game over
    updatedState = checkVictory(updatedState);
    updatedState = checkGameOver(updatedState);

    setGameState(updatedState);

    setTimeout(() => {
      setShowEffects(false);
      
      if (!updatedState.gameOver && !updatedState.gameWon) {
        // If there's a triggered follow-up event, show it
        if (triggeredEvent) {
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
  }, [currentDecision, gameState, usedDecisions, advanceTime, checkGameOver, checkVictory, processFollowUpEvents]);

  const restartGame = useCallback(() => {
    setGameState(initialGameState);
    setUsedDecisions([]);
    setCurrentDecision(null);
    setGameStarted(false);
    setShowEffects(false);
    setLastEffects([]);
  }, []);

  return {
    gameState,
    currentDecision,
    showEffects,
    lastEffects,
    gameStarted,
    startGame,
    makeChoice,
    restartGame,
    selectRegion,
  };
};
