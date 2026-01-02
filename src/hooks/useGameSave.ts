import { useCallback } from 'react';
import { GameState, Decision } from '@/types/game';

const SAVE_KEY = 'president_simulator_save';
const STATS_KEY = 'president_simulator_stats';

interface SaveData {
  gameState: GameState;
  usedDecisions: string[];
  currentDecisionId: string | null;
  savedAt: string;
}

interface GameStats {
  totalGames: number;
  victories: number;
  defeats: number;
  longestGame: number;
  highestEconomy: number;
  highestMilitary: number;
  highestPopularity: number;
  highestDiplomacy: number;
  lastPlayed: string;
}

const defaultStats: GameStats = {
  totalGames: 0,
  victories: 0,
  defeats: 0,
  longestGame: 0,
  highestEconomy: 0,
  highestMilitary: 0,
  highestPopularity: 0,
  highestDiplomacy: 0,
  lastPlayed: '',
};

export const useGameSave = () => {
  const saveGame = useCallback((
    gameState: GameState,
    usedDecisions: string[],
    currentDecision: Decision | null
  ): boolean => {
    try {
      const saveData: SaveData = {
        gameState,
        usedDecisions,
        currentDecisionId: currentDecision?.id || null,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      return true;
    } catch (e) {
      console.error('Failed to save game:', e);
      return false;
    }
  }, []);

  const loadGame = useCallback((): SaveData | null => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      return null;
    } catch (e) {
      console.error('Failed to load game:', e);
      return null;
    }
  }, []);

  const hasSavedGame = useCallback((): boolean => {
    return localStorage.getItem(SAVE_KEY) !== null;
  }, []);

  const deleteSave = useCallback((): void => {
    localStorage.removeItem(SAVE_KEY);
  }, []);

  const getSaveInfo = useCallback((): { savedAt: string; turnCount: number; presidentName: string } | null => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const data: SaveData = JSON.parse(saved);
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
  }, []);

  // Stats management
  const getStats = useCallback((): GameStats => {
    try {
      const stats = localStorage.getItem(STATS_KEY);
      if (stats) {
        return { ...defaultStats, ...JSON.parse(stats) };
      }
      return defaultStats;
    } catch {
      return defaultStats;
    }
  }, []);

  const updateStats = useCallback((gameState: GameState, isVictory: boolean): void => {
    try {
      const currentStats = getStats();
      const newStats: GameStats = {
        totalGames: currentStats.totalGames + 1,
        victories: currentStats.victories + (isVictory ? 1 : 0),
        defeats: currentStats.defeats + (isVictory ? 0 : 1),
        longestGame: Math.max(currentStats.longestGame, gameState.turnCount),
        highestEconomy: Math.max(currentStats.highestEconomy, gameState.economy),
        highestMilitary: Math.max(currentStats.highestMilitary, gameState.military),
        highestPopularity: Math.max(currentStats.highestPopularity, gameState.popularity),
        highestDiplomacy: Math.max(currentStats.highestDiplomacy, gameState.diplomacy),
        lastPlayed: new Date().toISOString(),
      };
      localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
    } catch (e) {
      console.error('Failed to update stats:', e);
    }
  }, [getStats]);

  const resetStats = useCallback((): void => {
    localStorage.removeItem(STATS_KEY);
  }, []);

  return {
    saveGame,
    loadGame,
    hasSavedGame,
    deleteSave,
    getSaveInfo,
    getStats,
    updateStats,
    resetStats,
  };
};
