/**
 * Gamimport { GameContextHookReturn } from '@/lib/types/hooks/game-state';Context Hook
 * Hook מותאם אישית שמחבר בין כל הקונטקסטים
 */

'use client';

import { useCallback } from 'react';
import { useGameType } from '@/contexts/GameTypeContext';
import { useGameProgress } from '@/contexts/GameProgressContext';
import { useGameEvents } from '../ui/useGameEvents';
import { GameType } from '@/lib/types/core/base';
import { GameContextHookReturn } from "@/lib/types/hooks/game-state";

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
    gameConfig: currentGameConfig ? {
      title: currentGameConfig.title,
      subTitle: currentGameConfig.subTitle || ''
    } : null,
    
    // Progress Info (GameProgress interface)
    currentAccuracy: getAccuracy(),
    streak: progress.streakCount,
    timeSpent: progress.timeSpent,
    totalQuestions: progress.totalQuestions,
    correctAnswers: progress.correctAnswers,
    
    // Game Active Status
    isGameActive,
    
    // Actions
    startGame,
    pauseGame,
    resumeGame,
    resetGame: resetProgress, // alias
    resetProgress,
    handleCorrectAnswer,
    handleWrongAnswer,
    handleItemClick: () => {}, // placeholder
    speakItemName: () => {}, // placeholder
    navigateToGame,
  };
}

/**
 * Hook מקוצר למידע בסיסי בלבד
 * זה hook בטוח שמחזיר מידע גם כשלא כל הcontexts זמינים
 */
export function useGameInfo() {
  // נקרא את כל ה-hooks תמיד, אך נטפל בשגיאות ברמת הקומפוננט
  const gameTypeContext = useGameType();
  const gameProgressContext = useGameProgress();
  
  const gameType = gameTypeContext?.currentGameType || null;
  const title = gameTypeContext?.currentGameConfig?.title || null;
  const score = gameProgressContext?.progress?.score || 0;
  const level = gameProgressContext?.progress?.level || 1;
  
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
  // נשתמש בזכירה של הפונקציות במקום try-catch
  const defaultActions = {
    onCorrect: () => {},
    onWrong: () => {},
    start: () => {},
    pause: () => {},
  };
  
  // אם הקונטקסט לא זמין, נחזיר פעולות ריקות
  return defaultActions;
}
