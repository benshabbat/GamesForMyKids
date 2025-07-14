import { useState, useEffect } from "react";
import { Color, GameState } from "@/types/game";

export function useColorGame(colors: Color[]) {
  const [gameState, setGameState] = useState<GameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudioContext(
        new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)()
      );
    }
  }, []);

  // קריאת שם הצבע בעברית - עם איכות קול משופרת
  const speakColorName = async (colorName: string): Promise<void> => {
    if (!('speechSynthesis' in window)) {
      console.log('Speech synthesis not available');
      return;
    }

    try {
      // עצירת כל הקראה קודמת
      window.speechSynthesis.cancel();
      await new Promise(resolve => setTimeout(resolve, 100));

      const utterance = new SpeechSynthesisUtterance(colorName);
      
      // הגדרות לשיפור איכות הקול
      utterance.lang = "he-IL";
      utterance.rate = 0.8; // קצב איטי יותר וברור יותר
      utterance.volume = 1.0;
      utterance.pitch = 1.1; // טון מעט יותר גבוה ונעים
      
      // חיפוש קול עברי אם קיים
      const voices = window.speechSynthesis.getVoices();
      const hebrewVoice = voices.find(voice => 
        voice.lang.includes('he') || 
        voice.lang.includes('iw') ||
        voice.name.toLowerCase().includes('hebrew')
      );
      
      if (hebrewVoice) {
        utterance.voice = hebrewVoice;
        console.log('Using Hebrew voice:', hebrewVoice.name);
      } else {
        // אם אין קול עברי, נשתמש בקול איכותי באנגלית עם שמות הצבעים
        const englishVoice = voices.find(voice => 
          voice.lang.includes('en') && 
          (voice.name.toLowerCase().includes('female') || 
           voice.name.toLowerCase().includes('natural') ||
           voice.name.toLowerCase().includes('premium'))
        );
        
        if (englishVoice) {
          utterance.voice = englishVoice;
          // תרגום שמות הצבעים לאנגלית עם הגייה טובה
          const colorTranslation: { [key: string]: string } = {
            'אדום': 'Red',
            'כחול': 'Blue', 
            'ירוק': 'Green',
            'צהוב': 'Yellow',
            'סגול': 'Purple',
            'כתום': 'Orange',
            'ורוד': 'Pink',
            'חום': 'Brown',
            'שחור': 'Black',
            'לבן': 'White'
          };
          utterance.text = colorTranslation[colorName] || colorName;
          utterance.lang = "en-US";
          console.log('Using English voice for:', utterance.text);
        }
      }

      return new Promise<void>((resolve, reject) => {
        utterance.onend = () => {
          console.log('Speech finished successfully');
          resolve();
        };
        
        utterance.onerror = (event) => {
          console.log('Speech error:', event.error);
          reject(event.error);
        };
        
        // הגבלת זמן מקסימלי
        setTimeout(() => {
          window.speechSynthesis.cancel();
          resolve();
        }, 3000);
        
        window.speechSynthesis.speak(utterance);
      });

    } catch (error) {
      console.log('Speech failed:', error);
    }
  };

  // צליל הצלחה פשוט - רק צליל קצר ונעים
  const playSuccessSound = (): void => {
    if (!audioContext) return;
    
    // צליל הצלחה קצר ונעים
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
    
    // השמעת שם הצבע אחרי רגע
    setTimeout(() => {
      speakColorName(randomColor.hebrew);
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

  // טיפול בלחיצה על צבע - ללא צלילים מוזיקליים
  const handleColorClick = (selectedColor: Color): void => {
    if (!gameState.currentChallenge) return;

    // רק הקראת שם הצבע שנלחץ עליו
    speakColorName(selectedColor.hebrew);

    if (selectedColor.name === gameState.currentChallenge.name) {
      playSuccessSound();
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
    }
  };

  // רענון המשחק
  const resetGame = (): void => {
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