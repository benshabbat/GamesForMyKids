'use client';

/**
 * Simple Game Progress Context
 *
 * State lives in useGameProgressStore (Zustand)  the same store as GameProgressContext.
 * This is a simplified façade without timer management.
 */

import { createContext, useContext, useCallback, ReactNode } from 'react';
import {
  SimpleGameProgress,
  SimpleGameProgressContextValue,
  SimpleGameProgressProviderProps,
} from '@/lib/types/contexts/simple-game-progress';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';

const SimpleGameProgressContext = createContext<SimpleGameProgressContextValue | undefined>(
  undefined,
);

export function SimpleGameProgressProvider({
  children,
  maxLevel = 10,
  pointsPerCorrect = 10,
}: SimpleGameProgressProviderProps) {
  const store = useGameProgressStore();

  const incrementScore = useCallback(
    (points: number = pointsPerCorrect) => store.incrementScore(points),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pointsPerCorrect],
  );

  const incrementLevel = useCallback(
    () => store.incrementLevel(maxLevel),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxLevel],
  );

  const recordAttempt = useCallback(
    (isCorrect: boolean) => store.recordAttempt(isCorrect, pointsPerCorrect),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pointsPerCorrect],
  );

  const updateProgress = useCallback(
    (updates: Partial<SimpleGameProgress>) => store.updateProgress(updates),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const getAccuracy = useCallback(() => {
    const { correctAnswers, totalQuestions } = useGameProgressStore.getState();
    return totalQuestions === 0 ? 0 : (correctAnswers / totalQuestions) * 100;
  }, []);

  const getAverageTimePerQuestion = useCallback(() => {
    const { timeSpent, totalQuestions } = useGameProgressStore.getState();
    return totalQuestions === 0 ? 0 : timeSpent / totalQuestions;
  }, []);

  const progress: SimpleGameProgress = {
    score: store.score,
    level: store.level,
    attempts: store.attempts,
    correctAnswers: store.correctAnswers,
    totalQuestions: store.totalQuestions,
    timeSpent: store.timeSpent,
    startTime: store.startTime,
    streakCount: store.streakCount,
    bestStreak: store.bestStreak,
  };

  const value: SimpleGameProgressContextValue = {
    progress,
    incrementScore,
    incrementLevel,
    recordAttempt,
    resetProgress: store.resetProgress,
    updateProgress,
    getAccuracy,
    getAverageTimePerQuestion,
  };

  return (
    <SimpleGameProgressContext.Provider value={value}>
      {children}
    </SimpleGameProgressContext.Provider>
  );
}

export function useSimpleGameProgress(): SimpleGameProgressContextValue {
  const context = useContext(SimpleGameProgressContext);
  if (context === undefined) {
    throw new Error('useSimpleGameProgress must be used within a SimpleGameProgressProvider');
  }
  return context;
}
