import { useState, useEffect } from "react";
import { Color, GameState } from "@/lib/types/game";
import { speakHebrew, isSpeechEnabled } from "@/lib/utils/speechUtils";

// Hebrew translations for color names
const COLOR_TRANSLATIONS: Record<string, string> = {
  red: "אדום",
  blue: "כחול",
  green: "ירוק",
  yellow: "צהוב",
  purple: "סגול",
  orange: "כתום",
  pink: "ורוד",
  brown: "חום",
  black: "שחור",
  white: "לבן",
};

// Initial game state
const INITIAL_GAME_STATE: GameState = {
  currentChallenge: null,
  score: 0,
  level: 1,
  isPlaying: false,
  showCelebration: false,
};

export function useColorGame(colors: Color[]) {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudioContext(
        new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)()
      );
    }
  }, []);

  // Speak color name in Hebrew
  const speakColorName = async (colorName: string): Promise<void> => {
    if (!isSpeechEnabled()) {
      console.log("Speech not available");
      return;
    }

    const textToSpeak = COLOR_TRANSLATIONS[colorName] || colorName;
    await speakHebrew(textToSpeak);
  };

  // Play success sound - C major chord
  const playSuccessSound = (): void => {
    if (!audioContext) return;

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    // Configure oscillator for C major chord
    osc.type = "sine";
    const notes = {
      C5: 523, // C5 note
      E5: 659, // E5 note
      G5: 784  // G5 note
    };
    
    osc.frequency.setValueAtTime(notes.C5, audioContext.currentTime);
    osc.frequency.setValueAtTime(notes.E5, audioContext.currentTime + 0.1);
    osc.frequency.setValueAtTime(notes.G5, audioContext.currentTime + 0.2);

    // Connect audio nodes
    osc.connect(gain);
    gain.connect(audioContext.destination);

    // Configure volume envelope
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

    // Play sound
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.4);
  };

  // Select a random color for the challenge
  const selectRandomColor = (): void => {
    const availableColors = getAvailableColors();
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const randomColor = availableColors[randomIndex];
    
    setGameState((prev) => ({ 
      ...prev, 
      currentChallenge: randomColor 
    }));

    // Speak the color name immediately
    speakColorName(randomColor.hebrew);
  };

  // Start the game
  const startGame = (): void => {
    setGameState({
      ...INITIAL_GAME_STATE,
      isPlaying: true
    });
    
    // רק בהצלחה בהתחלה, אח"כ מיד לצבע הראשון
    setTimeout(async () => {
      await speakHebrew("בהצלחה!");
      setTimeout(selectRandomColor, 1000);
    }, 300);
  };

  // Handle color selection
  const handleColorClick = (selectedColor: Color): void => {
    if (!gameState.currentChallenge) return;

    const isCorrect = selectedColor.name === gameState.currentChallenge.name;
    
    if (isCorrect) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };
  
  // Handle correct answer
  const handleCorrectAnswer = (): void => {
    // צליל הצלחה והצגת חגיגה
    playSuccessSound();
    
    // עדכון התוצאה והצגת חגיגה
    setGameState((prev) => ({
      ...prev,
      score: prev.score + 10,
      showCelebration: true,
    }));

    // אמירת כל הכבוד בלבד
    setTimeout(async () => {
      await speakHebrew("כל הכבוד בחרתם בצבע הנכון!");
      
      // מעבר לרמה הבאה ובחירת צבע חדש
      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          level: prev.level + 1,
          showCelebration: false,
        }));
        
        // בחירת צבע חדש אחרי עדכון הרמה
        selectRandomColor();
      }, 2000);
    }, 500);
  };
  
  // Handle wrong answer
  const handleWrongAnswer = (): void => {
    // רק "לא נורא תנסו שוב" ואז שם הצבע שוב
    setTimeout(async () => {
      await speakHebrew("לא נורא תנסו שוב");
      
      // חזרה על שם הצבע אחרי השהייה קצרה
      setTimeout(() => {
        if (gameState.currentChallenge) {
          speakColorName(gameState.currentChallenge.hebrew);
        }
      }, 1000);
    }, 500);
  };

  // Reset the game to initial state
  const resetGame = (): void => {
    setGameState(INITIAL_GAME_STATE);
  };

  // Get available colors based on current level
  const getAvailableColors = (): Color[] => {
    const baseColorCount = 3;
    const count = Math.min(baseColorCount + gameState.level, colors.length);
    return colors.slice(0, count);
  };

  // Return public API
  return {
    gameState,
    speakColorName,
    startGame,
    handleColorClick,
    resetGame,
    getAvailableColors,
  };
}
