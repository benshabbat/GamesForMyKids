/**
 * ===============================================
 * Game Difficulty Hook — wrapper around gameDifficultyStore
 * ===============================================
 * ממשק זהה לגרסה הישנה, state מגיע מ-Zustand persist.
 */

'use client';

import { useCallback } from 'react';
import {
  useGameDifficultyStore,
  type DifficultyLevel,
} from '@/lib/stores/gameDifficultyStore';

export type { DifficultyLevel };

export interface DifficultySettings {
  level: DifficultyLevel;
  timeLimit?: number;
  itemCount?: number;
  speedMultiplier?: number;
  hintsAvailable?: number;
  autoAdjust?: boolean;
}

export interface DifficultyActions {
  setDifficulty: (level: DifficultyLevel) => void;
  increaseDifficulty: () => void;
  decreaseDifficulty: () => void;
  adjustBasedOnPerformance: (successRate: number, averageTime: number) => void;
  resetToDefault: () => void;
}

const DEFAULT_SETTINGS: Record<DifficultyLevel, DifficultySettings> = {
  easy: {
    level: 'easy',
    timeLimit: 60,
    itemCount: 4,
    speedMultiplier: 0.8,
    hintsAvailable: 3,
    autoAdjust: true
  },
  medium: {
    level: 'medium',
    timeLimit: 45,
    itemCount: 6,
    speedMultiplier: 1.0,
    hintsAvailable: 2,
    autoAdjust: true
  },
  hard: {
    level: 'hard',
    timeLimit: 30,
    itemCount: 8,
    speedMultiplier: 1.2,
    hintsAvailable: 1,
    autoAdjust: true
  },
  expert: {
    level: 'expert',
    timeLimit: 20,
    itemCount: 10,
    speedMultiplier: 1.5,
    hintsAvailable: 0,
    autoAdjust: false
  }
};

export const useGameDifficulty = (
  gameId: string,
  initialDifficulty: DifficultyLevel = 'easy'
) => {
  const store = useGameDifficultyStore();
  const currentDifficulty = store.getDifficulty(gameId, initialDifficulty);
  const performanceHistory = store.getPerformanceHistory(gameId);
  const settings = DEFAULT_SETTINGS[currentDifficulty];

  const setDifficulty = useCallback(
    (level: DifficultyLevel) => store.setDifficulty(gameId, level),
    [store, gameId],
  );

  const increaseDifficulty = useCallback(() => {
    const levels: DifficultyLevel[] = ['easy', 'medium', 'hard', 'expert'];
    const idx = levels.indexOf(currentDifficulty);
    if (idx < levels.length - 1) store.setDifficulty(gameId, levels[idx + 1]);
  }, [store, gameId, currentDifficulty]);

  const decreaseDifficulty = useCallback(() => {
    const levels: DifficultyLevel[] = ['easy', 'medium', 'hard', 'expert'];
    const idx = levels.indexOf(currentDifficulty);
    if (idx > 0) store.setDifficulty(gameId, levels[idx - 1]);
  }, [store, gameId, currentDifficulty]);

  const adjustBasedOnPerformance = useCallback(
    (successRate: number, averageTime: number) => {
      store.addPerformanceSnapshot(gameId, successRate, averageTime);

      if (!settings.autoAdjust) return;

      const recentSuccess = performanceHistory.successRate.slice(-5);
      const recentTime = performanceHistory.averageTime.slice(-5);

      if (recentSuccess.length >= 3) {
        const avgSuccess = recentSuccess.reduce((a, b) => a + b, 0) / recentSuccess.length;
        const avgTime = recentTime.reduce((a, b) => a + b, 0) / recentTime.length;

        if (avgSuccess > 0.9 && avgTime < (settings.timeLimit || 60) * 0.5) {
          const levels: DifficultyLevel[] = ['easy', 'medium', 'hard', 'expert'];
          const idx = levels.indexOf(currentDifficulty);
          if (idx < levels.length - 1) store.setDifficulty(gameId, levels[idx + 1]);
        } else if (avgSuccess < 0.6) {
          const levels: DifficultyLevel[] = ['easy', 'medium', 'hard', 'expert'];
          const idx = levels.indexOf(currentDifficulty);
          if (idx > 0) store.setDifficulty(gameId, levels[idx - 1]);
        }
      }
    },
    [store, gameId, settings, performanceHistory, currentDifficulty],
  );

  const resetToDefault = useCallback(
    () => store.resetGame(gameId, initialDifficulty),
    [store, gameId, initialDifficulty],
  );

  const getDifficultyColor = useCallback((level: DifficultyLevel) => {
    const colors: Record<DifficultyLevel, string> = {
      easy: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      hard: 'text-orange-600 bg-orange-100',
      expert: 'text-red-600 bg-red-100',
    };
    return colors[level];
  }, []);

  const getDifficultyIcon = useCallback((level: DifficultyLevel) => {
    const icons: Record<DifficultyLevel, string> = {
      easy: '🟢',
      medium: '🟡',
      hard: '🟠',
      expert: '🔴',
    };
    return icons[level];
  }, []);

  return {
    currentDifficulty,
    settings,
    performanceHistory,
    setDifficulty,
    increaseDifficulty,
    decreaseDifficulty,
    adjustBasedOnPerformance,
    resetToDefault,
    getDifficultyColor,
    getDifficultyIcon,
    availableDifficulties: Object.keys(DEFAULT_SETTINGS) as DifficultyLevel[],
  };
};
