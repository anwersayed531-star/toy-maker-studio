import { useState, useCallback } from 'react';
import { GameState, Choice, Decision, initialGameState } from '@/types/game';
import { getRandomDecision } from '@/data/decisions';

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);
  const [usedDecisions, setUsedDecisions] = useState<string[]>([]);
  const [showEffects, setShowEffects] = useState(false);
  const [lastEffects, setLastEffects] = useState<{ stat: string; value: number }[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const checkGameOver = useCallback((state: GameState): GameState => {
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

    if (gameOverReason) {
      return { ...state, gameOver: true, gameOverReason };
    }

    return state;
  }, []);

  const advanceTime = useCallback((state: GameState): GameState => {
    let newMonth = state.month + 1;
    let newYear = state.year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    return {
      ...state,
      month: newMonth,
      year: newYear,
      turnCount: state.turnCount + 1,
    };
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

    // Get first decision
    const decision = getRandomDecision([]);
    setCurrentDecision(decision);
  }, []);

  const makeChoice = useCallback((choice: Choice) => {
    if (!currentDecision) return;

    // Calculate effects
    const effects: { stat: string; value: number }[] = [];
    const newState = { ...gameState };

    Object.entries(choice.effects).forEach(([stat, value]) => {
      if (value !== undefined && value !== 0) {
        effects.push({ stat, value });
        (newState as any)[stat] = Math.max(0, Math.min(100, (newState as any)[stat] + value));
      }
    });

    setLastEffects(effects);
    setShowEffects(true);

    // Update used decisions
    const newUsedDecisions = [...usedDecisions, currentDecision.id];
    setUsedDecisions(newUsedDecisions);

    // Advance time and check game over
    let updatedState = advanceTime(newState);
    updatedState = checkGameOver(updatedState);

    setGameState(updatedState);

    // Hide effects and show next decision after delay
    setTimeout(() => {
      setShowEffects(false);
      
      if (!updatedState.gameOver) {
        const nextDecision = getRandomDecision(newUsedDecisions);
        if (nextDecision) {
          setCurrentDecision(nextDecision);
        } else {
          // Reset used decisions if all have been used
          setUsedDecisions([]);
          const resetDecision = getRandomDecision([]);
          setCurrentDecision(resetDecision);
        }
      }
    }, 2000);
  }, [currentDecision, gameState, usedDecisions, advanceTime, checkGameOver]);

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
  };
};
