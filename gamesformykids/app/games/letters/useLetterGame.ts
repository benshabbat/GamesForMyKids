import { useState, useEffect } from "react";
import { BaseGameItem, BaseGameState } from "@/lib/types";
import { cancelSpeech } from "@/lib/utils/enhancedSpeechUtils";
import { initSpeechAndAudio } from "@/lib/utils/enhancedSpeechUtils";
import { 
  delay, 
  playSuccessSound as playSound, 
  generateOptions as generateGameOptions, 
  getRandomItem,
  getHebrewPronunciation,
  handleCorrectGameAnswer,
  speakStartMessage,
  speakItemName,
  handleWrongGameAnswer
} from "@/lib/utils/gameUtils";
import { GAME_CONSTANTS, LETTER_GAME_CONSTANTS } from "@/lib/constants";

export function useLetterGame(letters: BaseGameItem[]) {
  const [gameState, setGameState] = useState<BaseGameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
  });

  // אודיו וסטייט לשמע
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [, setSpeechEnabled] = useState(false);

  // אתחול מנגנון השמע והדיבור
  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

  /**
   * אומר את שם האות בעברית
   * @param letterName שם האות באנגלית
   */
  async function speakLetterName(letterName: string): Promise<void> {
    const letter = letters.find((l) => l.name === letterName);
    if (!letter) return;

    // משתמש בפונקציה הגנרית
    await speakItemName(letterName, getHebrewPronunciation);
  }

  /**
   * משמיע צליל הצלחה - אקורד דו מז'ור
   */
  function playSuccessSound(): void {
    playSound(audioContext);
  }

  /**
   * מחזיר את האותיות הזמינות לשלב הנוכחי במשחק
   * מספר האותיות גדל עם העלייה ברמות
   */
  function getAvailableLetters(): BaseGameItem[] {
    // קבועים לחישוב האותיות הזמינות
    const BASE_LETTERS_COUNT = LETTER_GAME_CONSTANTS.BASE_COUNT;
    const LETTERS_INCREMENT = LETTER_GAME_CONSTANTS.INCREMENT;
    const LEVEL_THRESHOLD = LETTER_GAME_CONSTANTS.LEVEL_THRESHOLD;
    
    // חישוב מספר האותיות הזמינות בהתאם לרמה
    const additionalLetters = Math.floor((gameState.level - 1) / LEVEL_THRESHOLD) * LETTERS_INCREMENT;
    const totalLetters = Math.min(BASE_LETTERS_COUNT + additionalLetters, letters.length);
    
    return letters.slice(0, totalLetters);
  }

  /**
   * מייצר אפשרויות בחירה למשחק - אות נכונה ו-3 אותיות שגויות
   * @param correctLetter האות הנכונה שצריכה להיות בין האפשרויות
   */
  function generateOptions(correctLetter: BaseGameItem): BaseGameItem[] {
    const availableLetters = getAvailableLetters();
    
    // משתמש בפונקציה הגנרית מ-gameUtils עם מספר האפשרויות מהקבועים
    return generateGameOptions(correctLetter, availableLetters, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  }
  
  // השתמשנו בפונקציית shuffleArray מ-gameUtils

  /**
   * בוחר אות אקראית מהאותיות הזמינות ומכין סיבוב משחק חדש
   */
  async function selectRandomLetter(): Promise<void> {
    // בחירת אות אקראית מהאותיות הזמינות
    const availableLetters = getAvailableLetters();
    const randomLetter = getRandomItem(availableLetters);
    
    // יצירת אפשרויות בחירה למשחק
    const options = generateOptions(randomLetter);

    // עדכון מצב המשחק
    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomLetter,
      options,
    }));

    // ביטול דיבורים קודמים והכרזה על האות החדשה
    cancelSpeech();
    await delay(600); // השהייה לפני הכרזה
    await speakLetterName(randomLetter.name);
  }

  /**
   * מתחיל משחק חדש
   */
  async function startGame(): Promise<void> {
    // ביטול דיבור קודם
    cancelSpeech();

    // איפוס מצב המשחק
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false,
      options: [],
    });

    // ברכת התחלה
    await speakStartMessage();

    // התחלת המשחק
    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    selectRandomLetter();
  }
  
  // השתמשנו בפונקציית delay מ-gameUtils
  /**
   * מטפל בלחיצה על אות - בודק אם התשובה נכונה ומפעיל את הפונקציה המתאימה
   */
  function handleLetterClick(selectedLetter: BaseGameItem) {
    if (!gameState.currentChallenge) return;

    const isCorrect = selectedLetter.name === gameState.currentChallenge.name;
    if (isCorrect) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  }
  
  /**
   * טיפול בתשובה נכונה - הצגת חגיגה, השמעת צליל ומעבר לשלב הבא
   */
  async function handleCorrectAnswer(): Promise<void> {
    // צליל הצלחה
    playSuccessSound();
    
    // משתמשים בפונקציה הגנרית
    await handleCorrectGameAnswer(
      gameState,
      setGameState,
      selectRandomLetter
    );
  }
  
  /**
   * טיפול בתשובה שגויה - השמעת משוב וחזרה על האות הנדרשת
   */
  async function handleWrongAnswer(): Promise<void> {
    if (gameState.currentChallenge) {
      // משתמשים בפונקציה הגנרית לתגובה לתשובה שגויה
      const speakCurrentLetter = () => speakLetterName(gameState.currentChallenge!.name);
      await handleWrongGameAnswer(speakCurrentLetter);
    }
  }

  /**
   * איפוס המשחק למצב התחלתי
   */
  function resetGame(): void {
    // עצירת כל הדיבור
    cancelSpeech();

    // החזרת המשחק למצב התחלתי על פי הקבועים
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
      options: [],
    });
  }

  // החזרת ממשק המשחק לשימוש בקומפוננטות
  return {
    gameState,
    speakLetterName,
    startGame,
    handleLetterClick,
    resetGame,
    getAvailableLetters,
  };
}
