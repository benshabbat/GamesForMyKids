/**
 * קבועי הליבה של המערכת
 */

import { BaseGameItem } from "@/lib/types/core/base";

/**
 * הגדרות כלליות של המשחקים (לתאימות לאחור)
 * 
 * ⚡ עדכון משמעותי - הפחתת זמני השהייה לשיפור תגובת האודיו:
 * - SPEAK_DELAY: מ-150 ל-50 (67% פחות)
 * - SUCCESS_SPEAK_DELAY: מ-100 ל-50 (50% פחות)  
 * - START_GAME_DELAY: מ-100 ל-50 (50% פחות)
 * - NEXT_ITEM_DELAY: מ-800 ל-400 (50% פחות)
 * - WRONG_ANSWER_DELAY: מ-150 ל-100 (33% פחות)
 * - RETRY_DELAY: מ-400 ל-200 (50% פחות)
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
    SPEAK_DELAY: 50,        // הופחת מ-150 ל-50
    SUCCESS_SPEAK_DELAY: 50, // הופחת מ-100 ל-50
    CELEBRATION_DURATION: 1200,
    START_GAME_DELAY: 50,   // הופחת מ-100 ל-50
    NEXT_ITEM_DELAY: 400,   // הופחת מ-800 ל-400
    WRONG_ANSWER_DELAY: 100, // הופחת מ-150 ל-100
    RETRY_DELAY: 200,       // הופחת מ-400 ל-200
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
 * הגדרות אודיו ודיבור
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
  SPEECH: {
    HEBREW_RATE: 0.85,     // מהירות דיבור עברית (מותאמת)
    ENGLISH_RATE: 0.8,     // מהירות דיבור אנגלית
    DEFAULT_PITCH: 1.2,    // גובה הצליל
    DEFAULT_VOLUME: 1.0,   // עוצמת הקול
    CANCEL_DELAY: 50,      // השהייה לפני דיבור חדש
    VERIFICATION_DELAY: 100, // השהייה לוודא שהדיבור הקודם נעצר
  },
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
  baseCount: number = GAME_CONSTANTS.BASE_ITEMS_COUNT,
  increment: number = GAME_CONSTANTS.LEVEL_INCREMENT,
  levelThreshold: number = GAME_CONSTANTS.LEVEL_THRESHOLD
) => ({
  BASE_COUNT: baseCount,
  INCREMENT: increment,
  LEVEL_THRESHOLD: levelThreshold,
});

/**
 * קונפיגורציית המשחק הסטנדרטית (4, 1, 3)
 * נועדה לצמצם כפילויות בקבצי הקבועים
 */
export const DEFAULT_GAME_CONFIG = createGameConfig();
