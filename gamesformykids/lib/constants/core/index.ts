/**
 * קבועי הליבה של המערכת
 */

import { BaseGameItem } from "@/lib/types/base";

/**
 * הגדרות בסיסיות של משחק
 */
export const GAME_CORE_CONSTANTS = {
  BASE_ITEMS_COUNT: 4,
  LEVEL_INCREMENT: 1,
  LEVEL_THRESHOLD: 3,
  MAX_ITEMS_PER_LEVEL: 12,
  MIN_ITEMS_FOR_CHALLENGE: 3,
};

/**
 * הגדרות כלליות של המשחקים (לתאימות לאחור)
 */
export const GAME_CONSTANTS = {
  BASE_ITEMS_COUNT: 4,
  LEVEL_INCREMENT: 1,
  LEVEL_THRESHOLD: 3,
  MAX_ITEMS_PER_LEVEL: 12,
  MIN_ITEMS_FOR_CHALLENGE: 3,
  OPTIONS_COUNT: 4,
  SCORE_INCREMENT: 10,
  DELAYS: {
    SPEAK_DELAY: 150,
    SUCCESS_SPEAK_DELAY: 100,
    CELEBRATION_DURATION: 1200,
    START_GAME_DELAY: 100,
    NEXT_ITEM_DELAY: 800,
    WRONG_ANSWER_DELAY: 150,
    RETRY_DELAY: 400,
  },
};

/**
 * זמני המערכת והעיכובים
 */
export const TIMING_CONSTANTS = {
  DELAYS: {
    SPEAK_DELAY: 150,
    SUCCESS_SPEAK_DELAY: 100,
    CELEBRATION_DURATION: 1200,
    START_GAME_DELAY: 100,
    NEXT_ITEM_DELAY: 800,
    WRONG_ANSWER_DELAY: 150,
    RETRY_DELAY: 400,
  },
  DURATIONS: {
    CARD_FLIP: 1000,
    ANIMATION_TRANSITION: 300,
    SOUND_FADE: 150,
  },
};

/**
 * הודעות המשוב
 */
export const FEEDBACK_MESSAGES = {
  SUCCESS: ["כל הכבוד", "נהדר", "מצוין", "יופי", "נכון מאוד"],
  WRONG: ["נסו שוב", "לא נורא, נסו שוב", "כמעט"],
  START: ["בהצלחה", "מתחילים", "יאללה נתחיל"],
  ENCOURAGEMENT: ["אתם מעולים", "ממשיכים", "כמעט שם"],
};

/**
 * הגדרות אודיו
 */
export const AUDIO_CONSTANTS = {
  DEFAULT_CHORD: [440, 550, 660],
  SUCCESS_CHORD: [523, 659, 784],
  ERROR_CHORD: [200, 250, 300],
  VOLUME: {
    DEFAULT: 0.3,
    SUCCESS: 0.5,
    BACKGROUND: 0.1,
  },
};

/**
 * סטטוס משחק התחלתי
 */
export const INITIAL_GAME_STATE = {
  level: 1,
  score: 0,
  streakCount: 0,
  currentIndex: 0,
  isGameActive: false,
  showCelebration: false,
  isLoading: false,
};

/**
 * פונקציות עזר ליצירת רשימות
 */
export const createItemsList = <T extends BaseGameItem>(constants: Record<string, T>): T[] => {
  return Object.values(constants);
};

export const createPronunciationDictionary = <T extends BaseGameItem>(
  constants: Record<string, T>
): Record<string, string> => {
  return Object.fromEntries(
    Object.values(constants).map(item => [item.name, item.hebrew])
  );
};

/**
 * פונקציה ליצירת קונפיגורציית משחק
 */
export const createGameConfig = (
  baseCount: number = GAME_CORE_CONSTANTS.BASE_ITEMS_COUNT,
  increment: number = GAME_CORE_CONSTANTS.LEVEL_INCREMENT,
  levelThreshold: number = GAME_CORE_CONSTANTS.LEVEL_THRESHOLD
) => ({
  BASE_COUNT: baseCount,
  INCREMENT: increment,
  LEVEL_THRESHOLD: levelThreshold,
});
