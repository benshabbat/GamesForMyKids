import { useState, useEffect } from "react";
import { Color, GameState } from "@/lib/types/game";
import { cancelSpeech } from "@/lib/utils/enhancedSpeechUtils";
import { 
  playSuccessSound as playSound, 
  delay, 
  getRandomItem, 
  handleCorrectGameAnswer,
  generateOptions,
  speakItemName,
  handleWrongGameAnswer,
  speakStartMessage
} from "@/lib/utils/gameUtils";
import { 
  INITIAL_GAME_STATE,
  COLOR_TRANSLATIONS,
  GAME_CONSTANTS
} from "@/lib/constants/gameConstants";
import { initSpeechAndAudio } from "@/lib/utils/enhancedSpeechUtils";

export function useColorGame(colors: Color[]) {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [, setSpeechEnabled] = useState(false);

  // אתחול מנגנון השמע והדיבור
  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

  // Speak color name in Hebrew
  const speakColorName = async (colorName: string): Promise<void> => {
    // משתמש בפונקציה הגנרית
    const translateColor = (name: string) => COLOR_TRANSLATIONS[name] || name;
    await speakItemName(colorName, translateColor);
  };

  // Play success sound - C major chord (imported from gameUtils)
  const playSuccessSound = (): void => {
    playSound(audioContext);
  };

  // Select a random color for the challenge
  const selectRandomColor = async (): Promise<void> => {
    // בוחר צבע אקראי מכל המאגר
    const randomColor = getRandomItem(colors);
    
    // Generate options for this color - always use OPTIONS_COUNT (4) options
    const options = generateOptions(
      randomColor, 
      colors, 
      GAME_CONSTANTS.OPTIONS_COUNT
    );
    
    setGameState((prev) => ({ 
      ...prev, 
      currentChallenge: randomColor,
      options
    }));

    // מבטל כל דיבור קודם לפני הכרזה על צבע חדש
    cancelSpeech();
    
    // השהייה קצרה לפני הכרזה על הצבע החדש
    await delay(200);
    
    // Speak the color name
    await speakColorName(randomColor.hebrew);
  };

  // Start the game
  const startGame = async (): Promise<void> => {
    // עדכון הסטייט באופן ישיר
    setGameState({
      ...INITIAL_GAME_STATE,
      isPlaying: true,
      options: [] as Color[] // עדכון מפורש של הטיפוס
    });
    
    // ברכת התחלה
    await speakStartMessage();
    
    // התחלת המשחק
    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await selectRandomColor();
  };

  // Handle color selection
  const handleColorClick = (selectedColor: Color): void => {
    if (!gameState.currentChallenge) return;

    const isCorrect = selectedColor.name === gameState.currentChallenge.name;
    
    if (isCorrect) {
      // אין צורך ב-await כאן כי אנחנו לא מחכים לתוצאה בפונקציה הנוכחית
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };
  
  // Handle correct answer
  const handleCorrectAnswer = async (): Promise<void> => {
    // משתמשים בפונקציה הגנרית
    playSuccessSound();
    await handleCorrectGameAnswer(
      gameState, 
      setGameState,
      selectRandomColor
    );
  };
  
  // Handle wrong answer
  const handleWrongAnswer = async (): Promise<void> => {
    if (gameState.currentChallenge) {
      // משתמשים בפונקציה הגנרית לטיפול בתשובה שגויה
      const speakCurrentColor = () => speakColorName(gameState.currentChallenge!.hebrew);
      await handleWrongGameAnswer(speakCurrentColor);
    }
  };

  // Reset the game to initial state
  const resetGame = (): void => {
    setGameState({
      ...INITIAL_GAME_STATE,
      options: [] as Color[]
    });
  };

  // Return public API
  return {
    gameState,
    speakColorName,
    startGame,
    handleColorClick,
    resetGame,
  };
}
