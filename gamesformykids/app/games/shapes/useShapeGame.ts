import { useState, useEffect, useRef } from "react";
import { Shape, ShapeGameState } from "@/types/game";

export function useShapeGame(shapes: Shape[]) {
  const [gameState, setGameState] = useState<ShapeGameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isSpeeching, setIsSpeeching] = useState(false);
  const repeatTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ('speechSynthesis' in window) {
        setSpeechEnabled(true);
        
        const loadVoices = () => {
          const voices = window.speechSynthesis.getVoices();
          console.log('Voices loaded:', voices.length);
        };
        
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        } else {
          loadVoices();
        }
      }
      
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        setAudioContext(ctx);
      }
    }
  }, []);

  // הקראת שמות הצורות בעברית
  const speakShapeName = async (shapeName: string): Promise<void> => {
    if (!speechEnabled || !('speechSynthesis' in window) || isSpeeching) {
      console.log('Speech not available or already speaking');
      return;
    }

    try {
      setIsSpeeching(true);

      const shape = shapes.find(s => s.name === shapeName);
      if (!shape) {
        setIsSpeeching(false);
        return;
      }

      window.speechSynthesis.cancel();
      await new Promise(resolve => setTimeout(resolve, 200));

      const hebrewUtter = new SpeechSynthesisUtterance(shape.hebrew);
      hebrewUtter.lang = "he-IL";
      hebrewUtter.rate = 0.7;
      hebrewUtter.volume = 1.0;
      hebrewUtter.pitch = 1.2;

      const voices = window.speechSynthesis.getVoices();
      
      // חיפוש קול עברי נשי
      const hebrewFemaleVoice = voices.find(voice =>
        (voice.lang.includes('he') || voice.lang.includes('iw') || voice.name.toLowerCase().includes('hebrew')) &&
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('woman') ||
         voice.name.toLowerCase().includes('carmit') ||
         voice.name.toLowerCase().includes('dana') ||
         !voice.name.toLowerCase().includes('male'))
      );

      const hebrewVoice = hebrewFemaleVoice || voices.find(voice =>
        voice.lang.includes('he') ||
        voice.lang.includes('iw') ||
        voice.name.toLowerCase().includes('hebrew')
      );

      if (hebrewVoice) {
        hebrewUtter.voice = hebrewVoice;
        console.log('Using Hebrew voice:', hebrewVoice.name);
      } else {
        // גיבוי באנגלית אם אין עברית
        const englishVoice = voices.find(voice => 
          voice.lang.includes('en') && 
          (voice.name.toLowerCase().includes('female') || 
           voice.name.toLowerCase().includes('natural'))
        );
        
        if (englishVoice) {
          hebrewUtter.voice = englishVoice;
          hebrewUtter.text = shape.english;
          hebrewUtter.lang = "en-US";
        }
      }

      const hebrewPromise = new Promise<boolean>((resolve) => {
        let resolved = false;

        hebrewUtter.onend = () => {
          if (!resolved) {
            resolved = true;
            console.log('Hebrew speech succeeded:', shape.hebrew);
            resolve(true);
          }
        };

        hebrewUtter.onerror = (event) => {
          if (!resolved) {
            resolved = true;
            console.log('Hebrew speech failed:', event.error);
            resolve(false);
          }
        };

        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            window.speechSynthesis.cancel();
            resolve(false);
          }
        }, 3000);
      });

      window.speechSynthesis.speak(hebrewUtter);
      await hebrewPromise;

      setIsSpeeching(false);

    } catch (error) {
      console.log('Speech failed completely:', error);
      setIsSpeeching(false);
    }
  };

  // צליל הצלחה נעים
  const playSuccessSound = (): void => {
    if (!audioContext) return;
    
    const notes = [523, 659, 784]; // C-E-G chord
    notes.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      const startTime = audioContext.currentTime + i * 0.1;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  };

  const generateOptions = (correctShape: Shape): Shape[] => {
    const availableShapes = getAvailableShapes();
    const incorrectShapes = availableShapes.filter(
      shape => shape.name !== correctShape.name
    );
    
    const shuffledIncorrect = incorrectShapes.sort(() => Math.random() - 0.5);
    const selectedIncorrect = shuffledIncorrect.slice(0, 3);
    
    const options = [correctShape, ...selectedIncorrect];
    return options.sort(() => Math.random() - 0.5);
  };

  // פונקציה לניקוי הטיימר
  const clearRepeatTimer = () => {
    if (repeatTimerRef.current) {
      clearInterval(repeatTimerRef.current);
      repeatTimerRef.current = null;
    }
  };

  // פונקציה להתחלת הטיימר שחוזר על המילה
  const startRepeatTimer = (shapeName: string) => {
    clearRepeatTimer();
    repeatTimerRef.current = setInterval(() => {
      speakShapeName(shapeName);
    }, 4000); // חזרה כל 4 שניות
  };

  const selectRandomShape = (): void => {
    const availableShapes = getAvailableShapes();
    const randomShape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
    const options = generateOptions(randomShape);
    
    setGameState((prev) => ({ 
      ...prev, 
      currentChallenge: randomShape,
      options 
    }));
    
    setTimeout(() => {
      speakShapeName(randomShape.name);
      startRepeatTimer(randomShape.name); // התחלת הטיימר
    }, 1200);
  };

  const startGame = (): void => {
    clearRepeatTimer(); // ניקוי טיימר קודם
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false,
      options: [],
    });
    setTimeout(selectRandomShape, 300);
  };

  const handleShapeClick = (selectedShape: Shape): void => {
    if (!gameState.currentChallenge) return;
    
    clearRepeatTimer(); // עצירת הטיימר כשעונים
    
    if (selectedShape.name === gameState.currentChallenge.name) {
      // תשובה נכונה
      speakShapeName(selectedShape.name);
      playSuccessSound();

      // הקראת "כל הכבוד!" בשמחה
      if (speechEnabled && 'speechSynthesis' in window) {
        setTimeout(() => {
          const utter = new SpeechSynthesisUtterance("וואו! כל הכבוד!");
          utter.lang = "he-IL";
          utter.rate = 1.1; // מהיר יותר
          utter.volume = 1.0;
          utter.pitch = 1.5; // גבוה יותר
          window.speechSynthesis.speak(utter);
        }, 700);
      }

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
        selectRandomShape();
      }, 1500);
    } else {
      // תשובה לא נכונה - הקראה של הצורה הנכונה
      setTimeout(() => {
        if (gameState.currentChallenge) {
          speakShapeName(gameState.currentChallenge.name);
          startRepeatTimer(gameState.currentChallenge.name); // התחלת טיימר מחדש
        }
      }, 500);
    }
  };

  const resetGame = (): void => {
    clearRepeatTimer(); // ניקוי הטיימר
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
      options: [],
    });
  };

  // ניקוי הטיימר כשהקומפוננט נהרס
  useEffect(() => {
    return () => {
      clearRepeatTimer();
    };
  }, []);

  const getAvailableShapes = (): Shape[] => {
    const baseShapes = 4;
    const additionalShapes = Math.floor((gameState.level - 1) / 3) * 1;
    const totalShapes = Math.min(baseShapes + additionalShapes, shapes.length);
    return shapes.slice(0, totalShapes);
  };

  return {
    gameState,
    speakShapeName,
    startGame,
    handleShapeClick,
    resetGame,
    getAvailableShapes,
  };
}