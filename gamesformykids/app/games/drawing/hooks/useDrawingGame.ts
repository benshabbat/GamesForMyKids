/**
 * ===============================================
 * Drawing Game Hook - Hook לניהול משחק הציור
 * ===============================================
 * 
 * מנהל את לוגיקת המשחק, רמות קושי ואינטראקציה
 */

import { useState, useEffect, useCallback } from 'react';

export interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  theme: string;
}

export const useDrawingGame = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    difficulty: 'easy',
    timeLimit: 300, // 5 minutes
    theme: 'free-draw'
  });
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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
  }, []);

  // טיימר המשחק
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            handleGameEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeRemaining, handleGameEnd]);

  // התחלת משחק
  const startGame = useCallback((settings?: Partial<GameSettings>) => {
    if (settings) {
      setGameSettings(prev => ({ ...prev, ...settings }));
      setTimeRemaining(settings.timeLimit || gameSettings.timeLimit);
    }
    
    setIsGameStarted(true);
    setIsTimerRunning(true);
  }, [gameSettings.timeLimit]);

  // עצירת משחק
  const stopGame = useCallback(() => {
    setIsGameStarted(false);
    setIsTimerRunning(false);
    setTimeRemaining(gameSettings.timeLimit);
  }, [gameSettings.timeLimit]);

  // השהיית משחק
  const pauseGame = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  // חזרה למשחק
  const resumeGame = useCallback(() => {
    if (isGameStarted && timeRemaining > 0) {
      setIsTimerRunning(true);
    }
  }, [isGameStarted, timeRemaining]);

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
