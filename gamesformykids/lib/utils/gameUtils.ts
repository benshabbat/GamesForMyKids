/**
 * אוסף פונקציות עזר גנריות למשחקים
 */
import React from 'react';
import { FEEDBACK_MESSAGES, GAME_CONSTANTS, AUDIO_CONSTANTS, MEMORY_GAME_CONSTANTS, LETTER_HEBREW_PRONUNCIATIONS } from "../constants";
import { speakHebrew, cancelSpeech, isSpeechEnabled } from "./enhancedSpeechUtils";

/**
 * פונקציית עזר להשהייה
 * @param ms זמן השהייה במילישניות
 * @returns Promise שמסתיים אחרי הזמן שהוגדר
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * פונקציית עזר - מערבבת מערך בצורה אקראית
 * @param array המערך לערבוב
 * @returns מערך חדש מעורבב
 */
export function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

/**
 * מחזיר את ההגייה העברית של שם האות
 * @param letterName שם האות באנגלית
 * @returns הגייה עברית של האות
 */
export function getHebrewPronunciation(letterName: string): string {
  return LETTER_HEBREW_PRONUNCIATIONS[letterName] || letterName;
}

/**
 * בוחר פריט אקראי מתוך מערך
 * @param items מערך של אפשרויות
 * @returns פריט אקראי מהמערך
 */
export function getRandomItem<T>(items: T[]): T {
  if (!items || items.length === 0) {
    throw new Error("Cannot get random item from empty array");
  }
  
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

/**
 * בוחר הודעת משוב אקראית מרשימת הודעות
 * @param type סוג המשוב - הצלחה, טעות או התחלה
 * @returns טקסט אקראי מסוג המשוב שנבחר
 */
export function getRandomFeedbackMessage(type: 'SUCCESS' | 'WRONG' | 'START'): string {
  return getRandomItem(FEEDBACK_MESSAGES[type]);
}

/**
 * משמיע משוב קולי חיובי
 * @returns Promise שמסתיים עם סיום הדיבור
 */
export async function speakPositiveFeedback(): Promise<void> {
  cancelSpeech();
  await delay(GAME_CONSTANTS.DELAYS.SUCCESS_SPEAK_DELAY);
  try {
    await speakHebrew(getRandomFeedbackMessage('SUCCESS'));
  } catch (error) {
    console.error("שגיאה בהשמעת משוב חיובי:", error);
  }
}

/**
 * משמיע משוב קולי שלילי
 * @returns Promise שמסתיים עם סיום הדיבור
 */
export async function speakNegativeFeedback(): Promise<void> {
  cancelSpeech();
  await delay(GAME_CONSTANTS.DELAYS.WRONG_ANSWER_DELAY);
  try {
    await speakHebrew(getRandomFeedbackMessage('WRONG'));
  } catch (error) {
    console.error("שגיאה בהשמעת משוב שלילי:", error);
  }
}

/**
 * משמיע ברכת התחלה אקראית
 * @returns Promise שמסתיים עם סיום הדיבור
 */
export async function speakStartMessage(): Promise<void> {
  cancelSpeech();
  await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
  try {
    await speakHebrew(getRandomFeedbackMessage('START'));
  } catch (error) {
    console.error("שגיאה בהשמעת ברכת התחלה:", error);
  }
}

/**
 * משמיע את השם של פריט במשחק (אות, צבע, צורה וכו')
 * פונקציה גנרית שיכולה לשמש לכל סוגי המשחקים
 * @param itemName שם הפריט באנגלית
 * @param translator פונקציה שמתרגמת את השם לעברית
 * @returns Promise שמסתיים עם סיום הדיבור
 */
export async function speakItemName(itemName: string, translator: (name: string) => string): Promise<void> {
  if (!isSpeechEnabled()) {
    console.log("Speech not enabled, skipping speak");
    return;
  }

  console.log("Speaking item:", itemName);

  // מבטל כל דיבור קודם
  cancelSpeech();

  // השהייה קצרה לפני הכרזה
  await delay(GAME_CONSTANTS.DELAYS.SPEAK_DELAY);

  try {
    const hebrewName = translator(itemName);
    console.log("Hebrew text to speak:", hebrewName);
    
    const success = await speakHebrew(hebrewName);
    if (!success) {
      console.warn("Failed to speak item:", itemName);
    } else {
      console.log("Successfully spoke item:", itemName);
    }
  } catch (error) {
    console.error("שגיאה בהשמעת הפריט:", error);
  }
}

/**
 * פונקציה ליצירת צליל הצלחה - אקורד דו מז'ור
 * @param audioContext AudioContext להשמעת הצליל
 */
export function playSuccessSound(audioContext: AudioContext | null): void {
  if (!audioContext) return;
  
  // תדרים של צלילי אקורד דו מז'ור (C5, E5, G5)
  const notes = AUDIO_CONSTANTS.SUCCESS_CHORD;
  
  notes.forEach((frequency, index) => {
    // יצירת מחולל צליל וווליום
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // הגדרות הצליל
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    
    // חיבור רכיבי השמע
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // תזמון הצלילים באקורד (בהפרשים קטנים)
    const startTime = audioContext.currentTime + index * 0.1;
    
    // עקומת עוצמת הצליל
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

    // הפעלה והפסקה של הצליל
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.3);
  });
}

/**
 * פונקציה גנרית ליצירת אפשרויות לבחירה במשחק עם תשובה נכונה אחת
 * @param correctItem האיבר הנכון שצריך להיות בין האפשרויות
 * @param allItems כל האיברים האפשריים
 * @param count מספר האפשרויות לבחירה
 * @param idField שם השדה שמשמש לזיהוי (ברירת מחדל 'name')
 * @returns מערך של אפשרויות מעורבבות, כולל התשובה הנכונה
 */
export function generateOptions<T>(
  correctItem: T, 
  allItems: T[], 
  count: number = 4,
  idField: keyof T = 'name' as keyof T
): T[] {
  // סינון האיברים השגויים (שאינם התשובה הנכונה)
  const incorrectItems = allItems.filter(item => item[idField] !== correctItem[idField]);
  
  // בחירת איברים שגויים אקראיים
  const selectedIncorrect = shuffleArray(incorrectItems).slice(0, count - 1);
  
  // ערבוב התשובות כולל התשובה הנכונה
  return shuffleArray([correctItem, ...selectedIncorrect]);
}

/**
 * פונקציה גנרית לטיפול במצב משחק
 * מעדכנת את הניקוד, מפעילה חגיגה ומעבירה לשלב הבא
 * @param gameState מצב המשחק הנוכחי
 * @param setGameState פונקציה לעדכון מצב המשחק
 * @param onLevelComplete פונקציה שתופעל לאחר השלמת הרמה
 */
export async function handleCorrectGameAnswer<T extends { score: number; level: number; showCelebration: boolean }>(
  gameState: T,
  setGameState: React.Dispatch<React.SetStateAction<T>>,
  onLevelComplete: () => Promise<void>
): Promise<void> {
  // עדכון הניקוד והפעלת חגיגה
  setGameState(prev => ({
    ...prev,
    score: prev.score + GAME_CONSTANTS.SCORE_INCREMENT,
    showCelebration: true,
  }));
  
  // משוב קולי חיובי
  await speakPositiveFeedback();
  
  // השהייה אחרי המשוב
  await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
  
  // מעבר לשלב הבא - משתמשים בחזרת קריאה במקום setTimeout
  // כדי לאפשר לפעולה האסינכרונית להסתיים כראוי
  await delay(GAME_CONSTANTS.DELAYS.CELEBRATION_DURATION);
  
  // מעדכנים את ה-state לפני הקריאה לפעולה הבאה
  setGameState(prev => ({
    ...prev,
    level: prev.level + 1,
    showCelebration: false,
  }));
  
  // בחירת פריט חדש - כעת אנחנו מחכים לסיום הפעולה
  await onLevelComplete();
}

/**
 * פונקציה גנרית להתחלת משחק חדש
 * @param initialState מצב התחלתי של המשחק
 * @param setGameState פונקציה לעדכון מצב המשחק
 * @param onGameStart פונקציה שתופעל לאחר התחלת המשחק
 */
export async function startNewGame<T>(
  initialState: T,
  setGameState: React.Dispatch<React.SetStateAction<T>>,
  onGameStart: () => Promise<void>
): Promise<void> {
  // עדכון מצב המשחק למצב התחלתי
  setGameState(initialState);
  
  // השמעת ברכת התחלה
  await speakStartMessage();
  
  // השהייה לפני תחילת המשחק
  await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
  
  // התחלת המשחק
  await onGameStart();
}

/**
 * פונקציה גנרית לטיפול בתשובה שגויה
 * משמיעה משוב שלילי ואז מאפשרת השמעת הפריט שוב
 * @param onSpeakItem פונקציה להשמעת שם הפריט הנוכחי
 */
export async function handleWrongGameAnswer(
  onSpeakItem: () => Promise<void>
): Promise<void> {
  // משמיע משוב שלילי
  await speakNegativeFeedback();
  
  // השהייה לפני חזרה על שם הפריט
  await delay(GAME_CONSTANTS.DELAYS.RETRY_DELAY);
  
  // חזרה על שם הפריט
  await onSpeakItem();
}

/**
 * פונקציה גנרית להשמעת צליל במשחק הזיכרון
 * @param audioContext אובייקט AudioContext להשמעת הצליל
 * @param frequencies מערך של תדרים להשמעה
 * @param type סוג הגל (sine, triangle וכו')
 * @param gainValue עוצמת הצליל
 * @param durationMs משך הצליל במילישניות
 */
export function playCustomSound(
  audioContext: AudioContext | null,
  frequencies: number[],
  type: OscillatorType = 'sine',
  gainValue: number = 0.3,
  durationMs: number = 150
): void {
  if (!audioContext) return;
  
  frequencies.forEach((freq, i) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    const t = audioContext.currentTime + i * 0.2;
    osc.frequency.setValueAtTime(freq, t);
    osc.type = type;
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(gainValue, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, t + (durationMs / 1000));
    
    osc.start(t);
    osc.stop(t + (durationMs / 1000));
  });
}

/**
 * פונקציה להשמעת צליל של חיה במשחק הזיכרון
 * @param audioContext אובייקט AudioContext להשמעת הצליל
 * @param emoji האימוג'י של החיה
 * @param frequencies אובייקט המיפוי של תדרי החיות
 */
export function playAnimalSound(
  audioContext: AudioContext | null,
  emoji: string,
  frequencies: Record<string, number[]>
): void {
  const animalFreqs = frequencies[emoji] || frequencies['default'];
  playCustomSound(audioContext, animalFreqs);
}

/**
 * פונקציה גנרית להשמעת צליל הצלחה במשחק הזיכרון
 * @param audioContext אובייקט AudioContext להשמעת הצליל
 * @param frequencies מערך של תדרים להשמעה
 */
export function playMemorySuccessSound(
  audioContext: AudioContext | null,
  frequencies: number[] = MEMORY_GAME_CONSTANTS.SUCCESS_SOUND_FREQUENCIES
): void {
  playCustomSound(audioContext, frequencies, 'triangle', 0.2, 80);
}

/**
 * פונקציה גנרית לערבוב וייצור קלפים למשחק זיכרון
 * @param items מערך פריטים ליצירת זוגות (אימוג'ים, תמונות וכו')
 * @returns מערך של קלפים מעורבבים עם זוגות
 */
export function createShuffledMemoryCards<T>(items: T[]): { id: number, item: T, isFlipped: boolean, isMatched: boolean }[] {
  // יוצרים זוגות ומערבבים
  const shuffledCards = [...items, ...items]
    .map((item) => ({
      id: Math.random(), // מזהה ייחודי אקראי
      item,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);
  
  // עדכון מזהים רציפים אחרי הערבוב
  return shuffledCards.map((card, index) => ({
    ...card,
    id: index
  }));
}

