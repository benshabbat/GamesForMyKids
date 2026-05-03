/**
 * אוסף פונקציות עזר גנריות למשחקים
 */
import { GAME_CONSTANTS, LETTER_HEBREW_PRONUNCIATIONS } from "../../constants";
import { useGameProgressStore } from '@/lib/stores';
import { shuffleArray } from './cardUtils';
import { speakPositiveFeedback, speakNegativeFeedback, speakStartMessage } from './feedbackUtils';

// ── Re-exports from domain files (backward compat) ──────────────────────────
export { playSuccessSound, playCustomSound, playAnimalSound, playMemorySuccessSound } from './audioUtils';
export { shuffleArray, shuffle, createShuffledMemoryCards } from './cardUtils';
export {
  getRandomFeedbackMessage,
  speakPositiveFeedback,
  speakNegativeFeedback,
  speakStartMessage,
  speakItemName,
} from './feedbackUtils';

/**
 * פונקציית עזר להשהייה
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * מספר שלם אקראי בטווח [min, max] (כולל קצוות)
 */
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * מחזיר את ההגייה העברית של שם האות
 */
export function getHebrewPronunciation(letterName: string): string {
  return LETTER_HEBREW_PRONUNCIATIONS[letterName] || letterName;
}

/**
 * בוחר פריט אקראי מתוך מערך
 */
export function getRandomItem<T>(items: T[]): T {
  if (!items || items.length === 0) {
    throw new Error("Cannot get random item from empty array");
  }
  const item = items[Math.floor(Math.random() * items.length)];
  if (item === undefined) {
    throw new Error("Failed to select random item");
  }
  return item;
}

/**
 * פונקציה גנרית ליצירת אפשרויות לבחירה במשחק עם תשובה נכונה אחת
 */
export function generateOptions<T>(
  correctItem: T,
  allItems: T[],
  count: number = 4,
  idField: keyof T = 'name' as keyof T
): T[] {
  const incorrectItems = allItems.filter(item => item[idField] !== correctItem[idField]);
  const selectedIncorrect = shuffleArray(incorrectItems).slice(0, count - 1);
  return shuffleArray([correctItem, ...selectedIncorrect]);
}

/**
 * פונקציה גנרית לטיפול בתשובה נכונה
 */
export async function handleCorrectGameAnswer(
  setShowCelebration: (v: boolean) => void,
  onLevelComplete: () => Promise<void>
): Promise<void> {
  useGameProgressStore.getState().incrementScore(GAME_CONSTANTS.SCORE_INCREMENT);
  setShowCelebration(true);

  await speakPositiveFeedback();

  await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
  await delay(GAME_CONSTANTS.DELAYS.CELEBRATION_DURATION);

  useGameProgressStore.getState().incrementLevel(Infinity);
  setShowCelebration(false);

  await onLevelComplete();
}

/**
 * פונקציה גנרית להתחלת משחק חדש
 */
export async function startNewGame<T>(
  initialState: T,
  setGameState: React.Dispatch<React.SetStateAction<T>>,
  onGameStart: () => Promise<void>
): Promise<void> {
  setGameState(initialState);
  await speakStartMessage();
  await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
  await onGameStart();
}

/**
 * פונקציה גנרית לטיפול בתשובה שגויה
 */
export async function handleWrongGameAnswer(
  onSpeakItem: () => Promise<void>
): Promise<void> {
  await speakNegativeFeedback();
  await delay(GAME_CONSTANTS.DELAYS.RETRY_DELAY);
  await onSpeakItem();
}

