/**
 * Game Progress Context
 * הרחבה לקונטקסט GameType שמנהלת התקדמות במשחק
 */

'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useGameType } from './GameTypeContext';

// Types
export interface GameProgress {
  score: number;
  level: number;
  attempts: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // בשניות
  startTime: number;
  streakCount: number;
  bestStreak: number;
}

export interface GameProgressContextValue {
  progress: GameProgress;
  
  // Progress Actions
  incrementScore: (points?: number) => void;
  incrementLevel: () => void;
  recordAttempt: (isCorrect: boolean) => void;
  resetProgress: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  
  // Statistics
  getAccuracy: () => number;
  getAverageTimePerQuestion: () => number;
  getProgressPercentage: () => number;
  
  // Game State
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
  pointsPerCorrect = 10 
}: GameProgressProviderProps) {
  const { currentGameType } = useGameType();
  
  const [progress, setProgress] = useState<GameProgress>({
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

  const [isGameActive, setIsGameActive] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);

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
    setIsGameActive(false);
    setTimerPaused(false);
  }, []);

  // Reset progress when game type changes
  useEffect(() => {
    if (currentGameType) {
      resetProgress();
    }
  }, [currentGameType, resetProgress]);

  // Timer effect
  useEffect(() => {
    if (!isGameActive || timerPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - prev.startTime) / 1000)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameActive, timerPaused]);

  const incrementScore = useCallback((points = pointsPerCorrect) => {
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
      const newStreakCount = isCorrect ? prev.streakCount + 1 : 0;
      const newBestStreak = Math.max(newStreakCount, prev.bestStreak);
      
      return {
        ...prev,
        attempts: prev.attempts + 1,
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        totalQuestions: prev.totalQuestions + 1,
        streakCount: newStreakCount,
        bestStreak: newBestStreak,
      };
    });

    if (isCorrect) {
      incrementScore();
    }
  }, [incrementScore]);

  const pauseTimer = useCallback(() => {
    setTimerPaused(true);
  }, []);

  const resumeTimer = useCallback(() => {
    setTimerPaused(false);
  }, []);

  const setGameActive = useCallback((active: boolean) => {
    setIsGameActive(active);
    if (active && progress.startTime === 0) {
      setProgress(prev => ({
        ...prev,
        startTime: Date.now()
      }));
    }
  }, [progress.startTime]);

  // Statistics
  const getAccuracy = useCallback(() => {
    if (progress.totalQuestions === 0) return 0;
    return (progress.correctAnswers / progress.totalQuestions) * 100;
  }, [progress.correctAnswers, progress.totalQuestions]);

  const getAverageTimePerQuestion = useCallback(() => {
    if (progress.totalQuestions === 0) return 0;
    return progress.timeSpent / progress.totalQuestions;
  }, [progress.timeSpent, progress.totalQuestions]);

  const getProgressPercentage = useCallback(() => {
    return (progress.level / maxLevel) * 100;
  }, [progress.level, maxLevel]);

  const contextValue: GameProgressContextValue = {
    progress,
    incrementScore,
    incrementLevel,
    recordAttempt,
    resetProgress,
    pauseTimer,
    resumeTimer,
    getAccuracy,
    getAverageTimePerQuestion,
    getProgressPercentage,
    isGameActive,
    setGameActive,
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

// Helper hooks
export function useGameScore() {
  const { progress, incrementScore } = useGameProgress();
  return { score: progress.score, incrementScore };
}

export function useGameStats() {
  const { progress, getAccuracy, getAverageTimePerQuestion } = useGameProgress();
  return {
    accuracy: getAccuracy(),
    averageTime: getAverageTimePerQuestion(),
    streak: progress.streakCount,
    bestStreak: progress.bestStreak,
  };
}
