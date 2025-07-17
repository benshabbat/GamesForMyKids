import { useState, useEffect, useRef, useCallback } from 'react';
import { initSpeechAndAudio } from '@/lib/utils/enhancedSpeechUtils';

interface BubbleData {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  frequency: number;
}

interface BubbleGameState {
  bubbles: BubbleData[];
  score: number;
  level: number;
  isPlaying: boolean;
  poppedCount: number;
}

export function useBubbleGame() {
  const [gameState, setGameState] = useState<BubbleGameState>({
    bubbles: [],
    score: 0,
    level: 1,
    isPlaying: false,
    poppedCount: 0,
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const nextBubbleId = useRef(0);
  const bubbleCreationInterval = useRef<NodeJS.Timeout | null>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // אתחול מערכת השמע
  useEffect(() => {
    initSpeechAndAudio(() => {}, setAudioContext);
  }, []);

  // צבעים ותדרים לבועות
  const bubbleTypes = [
    { color: '#FF6B6B', frequency: 261.63 }, // C4 - אדום
    { color: '#4ECDC4', frequency: 293.66 }, // D4 - תכלת
    { color: '#45B7D1', frequency: 329.63 }, // E4 - כחול
    { color: '#96CEB4', frequency: 349.23 }, // F4 - ירוק
    { color: '#FECA57', frequency: 392.00 }, // G4 - צהוב
    { color: '#FF9FF3', frequency: 440.00 }, // A4 - ורוד
    { color: '#54A0FF', frequency: 493.88 }, // B4 - כחול בהיר
    { color: '#5F27CD', frequency: 523.25 }, // C5 - סגול
  ];

  // יצירת בועה חדשה
  const createBubble = useCallback(() => {
    if (!gameContainerRef.current) return;

    const containerWidth = gameContainerRef.current.offsetWidth;
    const bubbleType = bubbleTypes[Math.floor(Math.random() * bubbleTypes.length)];
    const size = 40 + Math.random() * 60; // גודל בין 40-100px
    
    const newBubble: BubbleData = {
      id: nextBubbleId.current++,
      x: Math.random() * (containerWidth - size),
      y: window.innerHeight + size,
      size,
      color: bubbleType.color,
      speed: 1 + Math.random() * 2 + gameState.level * 0.3, // מהירות גדלה עם הרמה
      frequency: bubbleType.frequency,
    };

    setGameState(prev => ({
      ...prev,
      bubbles: [...prev.bubbles, newBubble],
    }));
  }, [gameState.level, bubbleTypes]);

  // השמעת צליל בועה
  const playBubbleSound = useCallback((frequency: number) => {
    if (!audioContext || frequency === 0) return;

    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';

      // עקומת עוצמה לצליל בועה
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.8);
    } catch (error) {
      console.error('שגיאה בהשמעת צליל בועה:', error);
    }
  }, [audioContext]);

  // טיפול בפיצוץ בועה
  const handleBubblePop = useCallback((bubbleId: number, frequency: number) => {
    setGameState(prev => {
      const updatedBubbles = prev.bubbles.filter(bubble => bubble.id !== bubbleId);
      const scoreIncrease = frequency > 0 ? 10 : 0; // נקודות רק אם הבועה נפוצצה ולא יצאה מהמסך
      
      return {
        ...prev,
        bubbles: updatedBubbles,
        score: prev.score + scoreIncrease,
        poppedCount: frequency > 0 ? prev.poppedCount + 1 : prev.poppedCount,
      };
    });

    if (frequency > 0) {
      playBubbleSound(frequency);
    }
  }, [playBubbleSound]);

  // עליה ברמה
  useEffect(() => {
    if (gameState.poppedCount > 0 && gameState.poppedCount % 15 === 0) {
      setGameState(prev => ({
        ...prev,
        level: prev.level + 1,
      }));
    }
  }, [gameState.poppedCount]);

  // התחלת המשחק
  const startGame = useCallback(() => {
    setGameState({
      bubbles: [],
      score: 0,
      level: 1,
      isPlaying: true,
      poppedCount: 0,
    });

    // יצירת בועות במרווחים קבועים
    bubbleCreationInterval.current = setInterval(() => {
      createBubble();
    }, 2000 - gameState.level * 100); // תדירות גדלה עם הרמה

    // יצירת בועה ראשונה מיד
    setTimeout(createBubble, 500);
  }, [createBubble, gameState.level]);

  // עצירת המשחק
  const stopGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
    }));

    if (bubbleCreationInterval.current) {
      clearInterval(bubbleCreationInterval.current);
      bubbleCreationInterval.current = null;
    }
  }, []);

  // איפוס המשחק
  const resetGame = useCallback(() => {
    stopGame();
    setGameState({
      bubbles: [],
      score: 0,
      level: 1,
      isPlaying: false,
      poppedCount: 0,
    });
  }, [stopGame]);

  // ניקוי בסיום הקומפוננטה
  useEffect(() => {
    return () => {
      if (bubbleCreationInterval.current) {
        clearInterval(bubbleCreationInterval.current);
      }
    };
  }, []);

  // עדכון מרווח יצירת בועות לפי הרמה
  useEffect(() => {
    if (gameState.isPlaying && bubbleCreationInterval.current) {
      clearInterval(bubbleCreationInterval.current);
      bubbleCreationInterval.current = setInterval(() => {
        createBubble();
      }, Math.max(800, 2000 - gameState.level * 100));
    }
  }, [gameState.level, gameState.isPlaying, createBubble]);

  return {
    gameState,
    gameContainerRef,
    startGame,
    stopGame,
    resetGame,
    handleBubblePop,
  };
}