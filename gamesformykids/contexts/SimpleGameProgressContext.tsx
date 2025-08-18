'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Types
export interface SimpleGameProgress {
  score: number;
  level: number;
  attempts: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  startTime: number;
  streakCount: number;
  bestStreak: number;
}

export interface SimpleGameProgressContextValue {
  progress: SimpleGameProgress;
  
  // Progress Actions
  incrementScore: (points?: number) => void;
  incrementLevel: () => void;
  recordAttempt: (isCorrect: boolean) => void;
  resetProgress: () => void;
  updateProgress: (updates: Partial<SimpleGameProgress>) => void;
  
  // Computed values
  getAccuracy: () => number;
  getAverageTimePerQuestion: () => number;
}

const SimpleGameProgressContext = createContext<SimpleGameProgressContextValue | undefined>(undefined);

interface SimpleGameProgressProviderProps {
  children: ReactNode;
  maxLevel?: number;
  pointsPerCorrect?: number;
}

export function SimpleGameProgressProvider({ 
  children, 
  maxLevel = 10,
  pointsPerCorrect = 10 
}: SimpleGameProgressProviderProps) {
  
  const [progress, setProgress] = useState<SimpleGameProgress>({
    score: 0,
    level: 1,
    attempts: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    timeSpent: 0,
    startTime: Date.now(),
    streakCount: 0,
    bestStreak: 0,
  });

  const incrementScore = useCallback((points: number = pointsPerCorrect) => {
    setProgress(prev => ({
      ...prev,
      score: prev.score + points
    }));
  }, [pointsPerCorrect]);

  const incrementLevel = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      level: Math.min(prev.level + 1, maxLevel)
    }));
  }, [maxLevel]);

  const recordAttempt = useCallback((isCorrect: boolean) => {
    setProgress(prev => {
      const newCorrectAnswers = isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers;
      const newAttempts = prev.attempts + 1;
      const newStreakCount = isCorrect ? prev.streakCount + 1 : 0;
      const newBestStreak = Math.max(prev.bestStreak, newStreakCount);

      return {
        ...prev,
        attempts: newAttempts,
        correctAnswers: newCorrectAnswers,
        totalQuestions: newAttempts,
        streakCount: newStreakCount,
        bestStreak: newBestStreak,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({
      score: 0,
      level: 1,
      attempts: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      timeSpent: 0,
      startTime: Date.now(),
      streakCount: 0,
      bestStreak: 0,
    });
  }, []);

  const updateProgress = useCallback((updates: Partial<SimpleGameProgress>) => {
    setProgress(prev => ({ ...prev, ...updates }));
  }, []);

  const getAccuracy = useCallback(() => {
    if (progress.totalQuestions === 0) return 0;
    return (progress.correctAnswers / progress.totalQuestions) * 100;
  }, [progress.correctAnswers, progress.totalQuestions]);

  const getAverageTimePerQuestion = useCallback(() => {
    if (progress.totalQuestions === 0) return 0;
    return progress.timeSpent / progress.totalQuestions;
  }, [progress.timeSpent, progress.totalQuestions]);

  const value: SimpleGameProgressContextValue = {
    progress,
    incrementScore,
    incrementLevel,
    recordAttempt,
    resetProgress,
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
