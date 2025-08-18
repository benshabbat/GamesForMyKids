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
 * זה hook בטוח שמחזיר מידע גם כשלא כל הcontexts זמינים
 */
export function useGameInfo() {
  let gameType = null;
  let title = null;
  let score = 0;
  let level = 1;
  
  // נסיון לגשת לGameType context
  try {
    const { currentGameType, currentGameConfig } = useGameType();
    gameType = currentGameType;
    title = currentGameConfig?.title || null;
  } catch {
    // אם אין GameTypeProvider זמין, ההרשאה מ-ברירת המחדל תיישאר
  }
  
  // נסיון לגשת לGameProgress context
  try {
    const { progress } = useGameProgress();
    score = progress.score;
    level = progress.level;
  } catch {
    // אם אין GameProgressProvider זמין, ההרשאה מ-ברירת המחדל תיישאר
  }
  
  return {
    gameType,
    title,
    score,
    level,
  };
}

/**
 * Hook מקוצר לפעולות בלבד
 */
export function useGameActions() {
  let handleCorrectAnswer = () => {};
  let handleWrongAnswer = () => {};
  let startGame = () => {};
  let pauseGame = () => {};
  
  try {
    const gameContext = useGameContext();
    handleCorrectAnswer = gameContext.handleCorrectAnswer;
    handleWrongAnswer = gameContext.handleWrongAnswer;
    startGame = gameContext.startGame;
    pauseGame = gameContext.pauseGame;
  } catch {
    // אם אין GameContext זמין, השתמש בפונקציות ריקות
  }
  
  return {
    onCorrect: handleCorrectAnswer,
    onWrong: handleWrongAnswer,
    start: startGame,
    pause: pauseGame,
  };
}
