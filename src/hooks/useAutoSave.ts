import { useEffect, useCallback, useRef } from 'react';
import { GameState, Decision } from '@/types/game';

const AUTO_SAVE_KEY = 'president_simulator_autosave';
const AUTO_SAVE_INTERVAL = 30000; // Save every 30 seconds

interface AutoSaveData {
  gameState: GameState;
  usedDecisions: string[];
  currentDecisionId: string | null;
  savedAt: string;
  isAutoSave: true;
}

export const useAutoSave = (
  gameStarted: boolean,
  gameState: GameState,
  usedDecisions: string[],
  currentDecision: Decision | null
) => {
  const lastSaveRef = useRef<string>('');

  const autoSave = useCallback(() => {
    if (!gameStarted || gameState.gameOver || gameState.gameWon) return;
    
    try {
      const saveData: AutoSaveData = {
        gameState,
        usedDecisions,
        currentDecisionId: currentDecision?.id || null,
        savedAt: new Date().toISOString(),
        isAutoSave: true,
      };
      
      const saveString = JSON.stringify(saveData);
      
      // Only save if data has changed
      if (saveString !== lastSaveRef.current) {
        localStorage.setItem(AUTO_SAVE_KEY, saveString);
        lastSaveRef.current = saveString;
        console.log('Auto-saved game at:', new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, [gameStarted, gameState, usedDecisions, currentDecision]);

  // Auto-save on interval
  useEffect(() => {
    if (!gameStarted || gameState.gameOver || gameState.gameWon) return;

    const interval = setInterval(autoSave, AUTO_SAVE_INTERVAL);
    
    return () => clearInterval(interval);
  }, [gameStarted, gameState.gameOver, gameState.gameWon, autoSave]);

  // Auto-save on visibility change (when user leaves app)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        autoSave();
      }
    };

    const handleBeforeUnload = () => {
      autoSave();
    };

    const handlePause = () => {
      autoSave();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('pause', handlePause); // Capacitor pause event

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('pause', handlePause);
    };
  }, [autoSave]);

  // Save immediately when game state changes significantly
  useEffect(() => {
    if (gameStarted && !gameState.gameOver && !gameState.gameWon) {
      // Debounced immediate save on turn change
      const timeout = setTimeout(autoSave, 1000);
      return () => clearTimeout(timeout);
    }
  }, [gameState.turnCount, gameStarted, gameState.gameOver, gameState.gameWon, autoSave]);

  return { autoSave };
};

export const loadAutoSave = (): AutoSaveData | null => {
  try {
    const saved = localStorage.getItem(AUTO_SAVE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  } catch (error) {
    console.error('Failed to load auto-save:', error);
    return null;
  }
};

export const hasAutoSave = (): boolean => {
  return localStorage.getItem(AUTO_SAVE_KEY) !== null;
};

export const getAutoSaveInfo = (): { savedAt: string; turnCount: number; presidentName: string } | null => {
  try {
    const saved = localStorage.getItem(AUTO_SAVE_KEY);
    if (saved) {
      const data: AutoSaveData = JSON.parse(saved);
      return {
        savedAt: data.savedAt,
        turnCount: data.gameState.turnCount,
        presidentName: data.gameState.presidentName,
      };
    }
    return null;
  } catch {
    return null;
  }
};

export const clearAutoSave = (): void => {
  localStorage.removeItem(AUTO_SAVE_KEY);
};
