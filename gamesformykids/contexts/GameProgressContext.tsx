'use client';

/**
 * GameProgressContext  fully migrated to Zustand
 *
 * No React context. useGameProgress() reads directly from useGameProgressStore.
 *
 * GameProgressProvider is kept as an effects-only component:
 *  1. Timer tick (setInterval while isGameActive && !timerPaused)
 *  2. Reset on game-type change
 */

import { useEffect, useCallback, ReactNode } from 'react';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import { useGameTypeStore } from '@/lib/stores/gameTypeStore';

// Re-export type for backward compatibility
export type { GameProgressState as GameProgress } from '@/lib/stores/gameProgressStore';

export interface GameProgressContextValue {
  progress: {
    score: number;
    level: number;
    attempts: number;
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
    startTime: number;
    streakCount: number;
    bestStreak: number;
  };
  incrementScore: (points?: number) => void;
  incrementLevel: () => void;
  recordAttempt: (isCorrect: boolean) => void;
  resetProgress: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  getAccuracy: () => number;
  getAverageTimePerQuestion: () => number;
  getProgressPercentage: () => number;
  isGameActive: boolean;
  setGameActive: (active: boolean) => void;
}

// ---------------------------------------------------------------------------
// GameProgressProvider  effects-only, no React context
// ---------------------------------------------------------------------------
interface GameProgressProviderProps {
  children: ReactNode;
  maxLevel?: number;
  pointsPerCorrect?: number;
}

export function GameProgressProvider({
  children,
  maxLevel = 10,
}: GameProgressProviderProps) {
  const currentGameType = useGameTypeStore((s) => s.currentGameType);
  const isGameActive = useGameProgressStore((s) => s.isGameActive);
  const timerPaused = useGameProgressStore((s) => s.timerPaused);

  // Reset progress when game type changes
  useEffect(() => {
    if (currentGameType) {
      useGameProgressStore.getState().resetProgress();
    }
  }, [currentGameType]);

  // Timer tick
  useEffect(() => {
    if (!isGameActive || timerPaused) return;
    const interval = setInterval(() => {
      useGameProgressStore.getState().tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameActive, timerPaused]);

  return <>{children}</>;
}

// ---------------------------------------------------------------------------
// useGameProgress  reads Zustand store directly
// ---------------------------------------------------------------------------
export function useGameProgress(maxLevel = 10, pointsPerCorrect = 10): GameProgressContextValue {
  const store = useGameProgressStore();

  const incrementScore = useCallback(
    (points = pointsPerCorrect) => store.incrementScore(points),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pointsPerCorrect],
  );

  const incrementLevel = useCallback(
    () => store.incrementLevel(maxLevel),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxLevel],
  );

  const getAccuracy = useCallback(() => {
    const s = useGameProgressStore.getState();
    return s.totalQuestions === 0 ? 0 : (s.correctAnswers / s.totalQuestions) * 100;
  }, []);

  const getAverageTimePerQuestion = useCallback(() => {
    const s = useGameProgressStore.getState();
    return s.totalQuestions === 0 ? 0 : s.timeSpent / s.totalQuestions;
  }, []);

  const getProgressPercentage = useCallback(() => {
    return (useGameProgressStore.getState().level / maxLevel) * 100;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxLevel]);

  return {
    progress: {
      score: store.score,
      level: store.level,
      attempts: store.attempts,
      correctAnswers: store.correctAnswers,
      totalQuestions: store.totalQuestions,
      timeSpent: store.timeSpent,
      startTime: store.startTime,
      streakCount: store.streakCount,
      bestStreak: store.bestStreak,
    },
    incrementScore,
    incrementLevel,
    recordAttempt: store.recordAttempt,
    resetProgress: store.resetProgress,
    pauseTimer: store.pauseTimer,
    resumeTimer: store.resumeTimer,
    getAccuracy,
    getAverageTimePerQuestion,
    getProgressPercentage,
    isGameActive: store.isGameActive,
    setGameActive: store.setGameActive,
  };
}
