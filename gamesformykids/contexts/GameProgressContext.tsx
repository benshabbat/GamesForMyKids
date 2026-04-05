/**
 * Game Progress Context
 *
 * State lives in useGameProgressStore (Zustand).
 * This provider is responsible for two side effects only:
 *  1. Timer tick  (setInterval when isGameActive && !timerPaused)
 *  2. Progress reset when the current game type changes
 */

'use client';

import { createContext, useContext, useEffect, useCallback, ReactNode } from 'react';
import { useGameType } from './GameTypeContext';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';

// Re-export the type so existing imports from this module still compile
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

const GameProgressContext = createContext<GameProgressContextValue | undefined>(undefined);

interface GameProgressProviderProps {
  children: ReactNode;
  maxLevel?: number;
  pointsPerCorrect?: number;
}

export function GameProgressProvider({
  children,
  maxLevel = 10,
  pointsPerCorrect = 10,
}: GameProgressProviderProps) {
  const { currentGameType } = useGameType();
  const store = useGameProgressStore();

  // Reset progress whenever the active game type changes
  useEffect(() => {
    if (currentGameType) {
      store.resetProgress();
    }
    // store is a stable object from Zustand  safe to omit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGameType]);

  // Timer tick
  useEffect(() => {
    if (!store.isGameActive || store.timerPaused) return;
    const interval = setInterval(() => {
      useGameProgressStore.getState().tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [store.isGameActive, store.timerPaused]);

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
    const { correctAnswers, totalQuestions } = useGameProgressStore.getState();
    return totalQuestions === 0 ? 0 : (correctAnswers / totalQuestions) * 100;
  }, []);

  const getAverageTimePerQuestion = useCallback(() => {
    const { timeSpent, totalQuestions } = useGameProgressStore.getState();
    return totalQuestions === 0 ? 0 : timeSpent / totalQuestions;
  }, []);

  const getProgressPercentage = useCallback(() => {
    const { level } = useGameProgressStore.getState();
    return (level / maxLevel) * 100;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxLevel]);

  const progress = {
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

  const contextValue: GameProgressContextValue = {
    progress,
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

  return (
    <GameProgressContext.Provider value={contextValue}>
      {children}
    </GameProgressContext.Provider>
  );
}

export function useGameProgress(): GameProgressContextValue {
  const context = useContext(GameProgressContext);
  if (context === undefined) {
    throw new Error('useGameProgress must be used within a GameProgressProvider');
  }
  return context;
}
