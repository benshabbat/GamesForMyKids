'use client';
/**
 * ===============================================
 * Drawing Game Hook - Hook לניהול משחק הציור
 * ===============================================
 * 
 * מנהל את לוגיקת המשחק, רמות קושי ואינטראקציה
 */

import { useState, useEffect, useCallback } from 'react';
import { useDrawingStore } from '../store/drawingStore';

export interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  theme: string;
}

export const useDrawingGame = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    difficulty: 'easy',
    timeLimit: 300,
    theme: 'free-draw'
  });

  const { isGameStarted, timeRemaining, isTimerRunning, setTimeRemaining, setIsTimerRunning, startGame: storeStartGame, stopGame: storeStopGame } = useDrawingStore();

  // זיהוי מכשיר נייד
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // סיום משחק
  const handleGameEnd = useCallback(() => {
    setIsTimerRunning(false);
    // כאן אפשר להוסיף לוגיקה נוספת לסיום המשחק
  }, [setIsTimerRunning]);

  // טיימר המשחק
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        const current = useDrawingStore.getState().timeRemaining;
        if (current <= 1) {
          setIsTimerRunning(false);
          setTimeRemaining(0);
          handleGameEnd();
        } else {
          setTimeRemaining(current - 1);
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeRemaining, handleGameEnd, setIsTimerRunning, setTimeRemaining]);

  // התחלת משחק
  const startGame = useCallback((settings?: Partial<GameSettings>) => {
    const mergedSettings = settings ? { ...gameSettings, ...settings } : gameSettings;
    if (settings) setGameSettings(mergedSettings);
    storeStartGame(mergedSettings.timeLimit);
  }, [gameSettings, storeStartGame]);

  // עצירת משחק
  const stopGame = useCallback(() => {
    storeStopGame(gameSettings.timeLimit);
  }, [gameSettings.timeLimit, storeStopGame]);

  // השהיית משחק
  const pauseGame = useCallback(() => {
    setIsTimerRunning(false);
  }, [setIsTimerRunning]);

  // חזרה למשחק
  const resumeGame = useCallback(() => {
    if (isGameStarted && timeRemaining > 0) {
      setIsTimerRunning(true);
    }
  }, [isGameStarted, timeRemaining, setIsTimerRunning]);

  // פורמט זמן למציג
  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  // נושאי ציור זמינים
  const availableThemes = [
    { id: 'free-draw', name: 'ציור חופשי', description: 'צייר מה שתרצה!' },
    { id: 'animals', name: 'חיות', description: 'צייר בעלי חיים' },
    { id: 'nature', name: 'טבע', description: 'צייר נוף ואלמנטים טבעיים' },
    { id: 'vehicles', name: 'כלי תחבורה', description: 'צייר מכוניות, מטוסים ועוד' },
    { id: 'family', name: 'משפחה', description: 'צייר את המשפחה שלך' }
  ];

  // הגדרות קושי
  const difficultySettings = {
    easy: { timeLimit: 600, name: 'קל', color: 'green' },
    medium: { timeLimit: 300, name: 'בינוני', color: 'orange' },
    hard: { timeLimit: 180, name: 'קשה', color: 'red' }
  };


  return {
    // Game state
    isGameStarted,
    isMobileDevice,
    gameSettings,
    timeRemaining,
    isTimerRunning,
    
    // Game controls
    startGame,
    stopGame,
    pauseGame,
    resumeGame,
    
    // Settings
    setGameSettings,
    availableThemes,
    difficultySettings,
    
    // Utilities
    formatTime,
    handleGameEnd
  };
};
