/**
 * Game Context Hook
 * Hook מותאם אישית שמחבר בין כל הקונטקסטים
 */

'use client';

import { useCallback } from 'react';
import { useGameType } from '@/contexts/GameTypeContext';
import { useGameProgress } from '@/contexts/GameProgressContext';
import { useGameEvents } from './useGameEvents';
import { GameType } from '@/lib/types/base';

export interface GameContextHookReturn {
  // Game Type Info
  gameType: string | null;
  gameConfig: {
    title: string;
    subTitle: string;
  } | null;
  
  // Progress Info
  score: number;
  level: number;
  streak: number;
  accuracy: number;
  isGameActive: boolean;
  
  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetProgress: () => void;
  handleCorrectAnswer: (data?: Record<string, unknown>) => void;
  handleWrongAnswer: (data?: Record<string, unknown>) => void;
  navigateToGame: (gameType: GameType) => void;
  
  // Status
  timeSpent: number;
  totalQuestions: number;
  correctAnswers: number;
}

/**
 * Hook מרכזי שמחבר את כל הקונטקסטים
 * מונע props drilling ומספק API פשוט
 */
export function useGameContext(): GameContextHookReturn {
  const { 
    currentGameType, 
    currentGameConfig, 
    navigateToGame 
  } = useGameType();
  
  const { 
    progress, 
    isGameActive, 
    setGameActive, 
    resetProgress,
    getAccuracy 
  } = useGameProgress();
  
  const { 
    onCorrectAnswer, 
    onWrongAnswer, 
    onGameStart, 
    onGamePause,
    onGameResume 
  } = useGameEvents();

  // Actions
  const startGame = useCallback(() => {
    setGameActive(true);
    onGameStart();
  }, [setGameActive, onGameStart]);

  const pauseGame = useCallback(() => {
    setGameActive(false);
    onGamePause();
  }, [setGameActive, onGamePause]);

  const resumeGame = useCallback(() => {
    setGameActive(true);
    onGameResume();
  }, [setGameActive, onGameResume]);

  const handleCorrectAnswer = useCallback((data?: Record<string, unknown>) => {
    onCorrectAnswer(data);
  }, [onCorrectAnswer]);

  const handleWrongAnswer = useCallback((data?: Record<string, unknown>) => {
    onWrongAnswer(data);
  }, [onWrongAnswer]);

  return {
    // Game Type Info
    gameType: currentGameType,
    gameConfig: currentGameConfig,
    
    // Progress Info
    score: progress.score,
    level: progress.level,
    streak: progress.streakCount,
    accuracy: getAccuracy(),
    isGameActive,
    
    // Actions
    startGame,
    pauseGame,
    resumeGame,
    resetProgress,
    handleCorrectAnswer,
    handleWrongAnswer,
    navigateToGame,
    
    // Status
    timeSpent: progress.timeSpent,
    totalQuestions: progress.totalQuestions,
    correctAnswers: progress.correctAnswers,
  };
}

/**
 * Hook מקוצר למידע בסיסי בלבד
 */
export function useGameInfo() {
  const { currentGameType, currentGameConfig } = useGameType();
  const { progress } = useGameProgress();
  
  return {
    gameType: currentGameType,
    title: currentGameConfig?.title,
    score: progress.score,
    level: progress.level,
  };
}

/**
 * Hook מקוצר לפעולות בלבד
 */
export function useGameActions() {
  const { handleCorrectAnswer, handleWrongAnswer, startGame, pauseGame } = useGameContext();
  
  return {
    onCorrect: handleCorrectAnswer,
    onWrong: handleWrongAnswer,
    start: startGame,
    pause: pauseGame,
  };
}
