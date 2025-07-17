import { useState, useEffect } from "react";
import { NumberItem, NumberGameState } from "@/lib/types/game";
import { initSpeechAndAudio } from "@/lib/utils/enhancedSpeechUtils";
import { 
  delay, 
  playSuccessSound as playSound, 
  generateOptions as generateGameOptions,
  getRandomItem,
  speakItemName,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage
} from "@/lib/utils/gameUtils";
import { GAME_CONSTANTS, NUMBER_HEBREW_PRONUNCIATIONS } from "@/lib/constants/gameConstants";

export function useNumberGame(numbers: NumberItem[]) {
  const [gameState, setGameState] = useState<NumberGameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

  // --- Utility Functions ---

  const getAvailableNumbers = (): NumberItem[] => {
    const baseNumbers = GAME_CONSTANTS.NUMBER_GAME.BASE_NUMBERS_COUNT;
    const additionalNumbers = Math.floor((gameState.level - 1) / GAME_CONSTANTS.NUMBER_GAME.LEVEL_THRESHOLD) 
      * GAME_CONSTANTS.NUMBER_GAME.NUMBERS_INCREMENT;
    const totalNumbers = Math.min(baseNumbers + additionalNumbers, numbers.length);
    return numbers.slice(0, totalNumbers);
  };

  const generateOptions = (correctNumber: NumberItem): NumberItem[] => {
    const availableNumbers = getAvailableNumbers();
    
    // משתמש בפונקציה הגנרית מ-gameUtils עם מספר האפשרויות מהקבועים
    return generateGameOptions(correctNumber, availableNumbers, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---

  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakNumberName = async (numberName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      console.log("מנסה להשמיע מספר:", numberName);
      
      // בדיקה שיש מספר תקף
      if (!numberName) {
        console.error("שם מספר ריק");
        return;
      }
      
      // השמעת המספר עם הגייה נכונה
      await speakItemName(numberName, (name) => {
        // למצוא את ההגייה העברית המתאימה
        const pronunciation = NUMBER_HEBREW_PRONUNCIATIONS[name];
        console.log("הגייה של המספר:", name, pronunciation);
        return pronunciation || name;
      });
      
    } catch (error) {
      console.error("שגיאה בהשמעת שם המספר:", error);
    }
  };

  const startGame = async () => {
    // השתמש במצב התחלתי גנרי עם המאפיינים הדרושים למשחק המספרים
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false,
      options: [],
    });

    // השהייה לפני התחלת המשחק
    await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
    
    // השמעת הודעת התחלה
    await speakStartMessage();
    
    // בחירת מספר אקראי וקביעת האפשרויות
    const availableNumbers = getAvailableNumbers();
    const randomNumber = getRandomItem(availableNumbers);
    const options = generateOptions(randomNumber);

    // עדכון מצב המשחק עם האתגר והאפשרויות החדשות
    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomNumber,
      options,
    }));

    // השמעת שם המספר הראשון
    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakNumberName(randomNumber.name);
  };

  const handleNumberClick = async (selectedNumber: NumberItem) => {
    if (!gameState.currentChallenge) return;

    if (selectedNumber.name === gameState.currentChallenge.name) {
      // השמעת הצליל מיד עם הלחיצה
      playSuccessSound();
      
      // תשובה נכונה - מכינים את המספר הבא
      const availableNumbers = getAvailableNumbers();
      const randomNumber = getRandomItem(availableNumbers);
      const options = generateOptions(randomNumber);
      
      // הפונקציה הזו תקרא אחרי העדכון של ה-level ו-showCelebration
      const onComplete = async () => {
        // עדכון האתגר החדש והאפשרויות
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomNumber,
          options,
        }));
        
        // חשוב: נוסיף השהייה קצרה לפני השמעת המספר החדש
        // כדי לאפשר לממשק להתעדכן קודם
        await delay(300);
        
        // השמעת שם המספר החדש
        console.log("משמיע מספר חדש:", randomNumber.name);
        await speakNumberName(randomNumber.name);
      };
      
      // קריאה לפונקציה המטפלת בתשובה נכונה
      // (כעת היא async וממתינה לסיום כל הפעולות)
      await handleCorrectGameAnswer(
        gameState, 
        setGameState, 
        onComplete
      );
    } else {
      // טיפול בתשובה שגויה
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakNumberName(gameState.currentChallenge.name);
        }
      });
    }
  };

  const resetGame = () => {
    // אתחול מצב המשחק למצב התחלתי
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
      options: [],
    });
  };

  return {
    gameState,
    speakNumberName,
    startGame,
    handleNumberClick,
    resetGame,
    getAvailableNumbers,
  };
}