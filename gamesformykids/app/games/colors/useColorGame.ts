import { useState, useEffect, useRef } from "react";
import { Color, GameState } from "@/lib/types/game";
import { speakHebrew, isSpeechEnabled } from "@/lib/utils/speechUtils";

export function useColorGame(colors: Color[]) {
  const [gameState, setGameState] = useState<GameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const repeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudioContext(
        new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)()
      );
    }
  }, []);

  // ניקוי הטיימר כשהמשחק נעצר
  useEffect(() => {
    return () => {
      if (repeatIntervalRef.current) {
        clearInterval(repeatIntervalRef.current);
      }
    };
  }, []);

  // קריאת שם הצבע בעברית
  const speakColorName = async (colorName: string): Promise<void> => {
    if (!isSpeechEnabled()) {
      console.log('Speech not available');
      return;
    }

    // אם זה שם צבע באנגלית, תרגם לעברית
    const colorTranslations: { [key: string]: string } = {
      'red': 'אדום',
      'blue': 'כחול', 
      'green': 'ירוק',
      'yellow': 'צהוב',
      'purple': 'סגול',
      'orange': 'כתום',
      'pink': 'ורוד',
      'brown': 'חום',
      'black': 'שחור',
      'white': 'לבן'
    };

    const textToSpeak = colorTranslations[colorName] || colorName;
    await speakHebrew(textToSpeak);
  };

  // התחלת טיימר חזרה על המילה
  const startRepeatTimer = (colorName: string): void => {
    // ניקוי טיימר קודם
    if (repeatIntervalRef.current) {
      clearInterval(repeatIntervalRef.current);
    }
    
    // הגדרת טיימר חדש שחוזר כל 4 שניות
    repeatIntervalRef.current = setInterval(() => {
      if (gameState.isPlaying && gameState.currentChallenge && !gameState.showCelebration) {
        speakColorName(colorName);
      }
    }, 4000);
  };

  // עצירת טיימר החזרה
  const stopRepeatTimer = (): void => {
    if (repeatIntervalRef.current) {
      clearInterval(repeatIntervalRef.current);
      repeatIntervalRef.current = null;
    }
  };

  // צליל הצלחה פשוט
  const playSuccessSound = (): void => {
    if (!audioContext) return;
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(523, audioContext.currentTime); // C5 note
    osc.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5 note
    osc.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5 note
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.4);
  };

  // בחירת צבע אקראי לאתגר
  const selectRandomColor = (): void => {
    const availableColors = getAvailableColors();
    const randomColor =
      availableColors[Math.floor(Math.random() * availableColors.length)];
    setGameState((prev) => ({ ...prev, currentChallenge: randomColor }));
    
    // השמעת שם הצבע אחרי רגע והתחלת טיימר חזרה
    setTimeout(() => {
      speakColorName(randomColor.hebrew);
      startRepeatTimer(randomColor.hebrew);
    }, 1000);
  };

  // התחלת המשחק
  const startGame = (): void => {
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false,
    });
    setTimeout(selectRandomColor, 300);
  };

  // טיפול בלחיצה על צבע
  const handleColorClick = (selectedColor: Color): void => {
    if (!gameState.currentChallenge) return;

    // עצירת טיימר החזרה
    stopRepeatTimer();

    if (selectedColor.name === gameState.currentChallenge.name) {
      // תשובה נכונה
      speakColorName(selectedColor.hebrew);
      playSuccessSound();
      
      // השמעת "כל הכבוד!" אחרי שם הצבע
      setTimeout(async () => {
        await speakHebrew("כל הכבוד!");
      }, 700);

      setGameState((prev) => ({
        ...prev,
        score: prev.score + 10,
        showCelebration: true,
      }));
      
      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          level: prev.level + 1,
          showCelebration: false,
        }));
        selectRandomColor();
      }, 1500);
    } else {
      // תשובה לא נכונה - חזרה על הצבע הנכון
      setTimeout(() => {
        if (gameState.currentChallenge) {
          speakColorName(gameState.currentChallenge.hebrew);
          startRepeatTimer(gameState.currentChallenge.hebrew);
        }
      }, 500);
    }
  };

  // רענון המשחק
  const resetGame = (): void => {
    stopRepeatTimer();
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
    });
  };

  // קביעת כמות הצבעים לפי רמה
  const getAvailableColors = (): Color[] => {
    const count = Math.min(3 + gameState.level, colors.length);
    return colors.slice(0, count);
  };

  return {
    gameState,
    speakColorName,
    startGame,
    handleColorClick,
    resetGame,
    getAvailableColors,
  };
}