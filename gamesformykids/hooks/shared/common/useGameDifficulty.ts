/**
 * ===============================================
 * Game Difficulty Hook - Hook לניהול רמות קושי
 * ===============================================
 * 
 * מנהל רמות קושי אדפטיביות במשחקים
 */

import { useState, useCallback, useEffect } from 'react';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

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
  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`game_difficulty_${gameId}`);
      return (saved as DifficultyLevel) || initialDifficulty;
    }
    return initialDifficulty;
  });

  const [performanceHistory, setPerformanceHistory] = useState<{
    successRate: number[];
    averageTime: number[];
  }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`game_performance_${gameId}`);
      return saved ? JSON.parse(saved) : { successRate: [], averageTime: [] };
    }
    return { successRate: [], averageTime: [] };
  });

  const settings = DEFAULT_SETTINGS[currentDifficulty];

  // שמירת רמת הקושי בזיכרון המקומי
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`game_difficulty_${gameId}`, currentDifficulty);
    }
  }, [currentDifficulty, gameId]);

  // שמירת היסטוריית הביצועים
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`game_performance_${gameId}`, JSON.stringify(performanceHistory));
    }
  }, [performanceHistory, gameId]);

  const setDifficulty = useCallback((level: DifficultyLevel) => {
    setCurrentDifficulty(level);
  }, []);

  const increaseDifficulty = useCallback(() => {
    const levels: DifficultyLevel[] = ['easy', 'medium', 'hard', 'expert'];
    const currentIndex = levels.indexOf(currentDifficulty);
    if (currentIndex < levels.length - 1) {
      setCurrentDifficulty(levels[currentIndex + 1]);
    }
  }, [currentDifficulty]);

  const decreaseDifficulty = useCallback(() => {
    const levels: DifficultyLevel[] = ['easy', 'medium', 'hard', 'expert'];
    const currentIndex = levels.indexOf(currentDifficulty);
    if (currentIndex > 0) {
      setCurrentDifficulty(levels[currentIndex - 1]);
    }
  }, [currentDifficulty]);

  const adjustBasedOnPerformance = useCallback((successRate: number, averageTime: number) => {
    // עדכון היסטוריית הביצועים
    setPerformanceHistory(prev => ({
      successRate: [...prev.successRate.slice(-9), successRate], // שמירת 10 ביצועים אחרונים
      averageTime: [...prev.averageTime.slice(-9), averageTime]
    }));

    // הכנת המלצה על רמת קושי על בסיס ביצועים
    if (!settings.autoAdjust) return;

    const recentSuccessRate = performanceHistory.successRate.slice(-5);
    const recentAverageTime = performanceHistory.averageTime.slice(-5);

    if (recentSuccessRate.length >= 3) {
      const avgSuccessRate = recentSuccessRate.reduce((a, b) => a + b, 0) / recentSuccessRate.length;
      const avgTime = recentAverageTime.reduce((a, b) => a + b, 0) / recentAverageTime.length;

      // אם השחקן מצליח מעל 90% ומהר - העלה קושי
      if (avgSuccessRate > 0.9 && avgTime < (settings.timeLimit || 60) * 0.5) {
        increaseDifficulty();
      }
      // אם השחקן מתקשה מתחת ל-60% - הורד קושי  
      else if (avgSuccessRate < 0.6) {
        decreaseDifficulty();
      }
    }
  }, [settings.autoAdjust, settings.timeLimit, performanceHistory, increaseDifficulty, decreaseDifficulty]);

  const resetToDefault = useCallback(() => {
    setCurrentDifficulty(initialDifficulty);
    setPerformanceHistory({ successRate: [], averageTime: [] });
  }, [initialDifficulty]);

  const getDifficultyColor = useCallback((level: DifficultyLevel) => {
    const colors = {
      easy: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100', 
      hard: 'text-orange-600 bg-orange-100',
      expert: 'text-red-600 bg-red-100'
    };
    return colors[level];
  }, []);

  const getDifficultyIcon = useCallback((level: DifficultyLevel) => {
    const icons = {
      easy: '🟢',
      medium: '🟡',
      hard: '🟠', 
      expert: '🔴'
    };
    return icons[level];
  }, []);

  return {
    // Current state
    currentDifficulty,
    settings,
    performanceHistory,
    
    // Actions
    setDifficulty,
    increaseDifficulty,
    decreaseDifficulty,
    adjustBasedOnPerformance,
    resetToDefault,
    
    // Utilities
    getDifficultyColor,
    getDifficultyIcon,
    
    // Available difficulties
    availableDifficulties: Object.keys(DEFAULT_SETTINGS) as DifficultyLevel[]
  };
};
