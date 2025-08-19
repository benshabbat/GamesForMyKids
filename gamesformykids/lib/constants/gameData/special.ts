/**
 * קונפיגורציות משחקים מיוחדים - ספירה, מתמטיקה וזיכרון
 */

import { DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

/**
 * ===============================================
 * קונפיגורציית משחק הספירה
 * ===============================================
 */
export const COUNTING_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;

/**
 * ===============================================
 * קונפיגורציית משחק המתמטיקה
 * ===============================================
 */
export const MATH_GAME_CONSTANTS = {
  BASE_COUNT: 4,
  INCREMENT: 1,
  LEVEL_THRESHOLD: 3,
  BASE_MAX_NUMBER: 5,
  NUMBER_INCREMENT: 2,
  ABSOLUTE_MAX_NUMBER: 20
};

/**
 * ===============================================
 * קונפיגורציית משחק הזיכרון
 * ===============================================
 */
export const MEMORY_GAME_CONSTANTS = {
  FLIP_DURATION: 1000,
  SUCCESS_SOUND_FREQUENCIES: [523, 659, 784, 1047],
  BASE_COUNT: 4,
  INCREMENT: 1,
  LEVEL_THRESHOLD: 3,
  // רמות קושי - מספר זוגות (כל זוג הופך ל-2 קלפים)
  DIFFICULTY_LEVELS: {
    EASY: { pairs: 4, name: 'קל', emoji: '😊', timeLimit: 180 },      // 8 קלפים
    MEDIUM: { pairs: 6, name: 'בינוני', emoji: '🤔', timeLimit: 180 }, // 12 קלפים  
    HARD: { pairs: 8, name: 'קשה', emoji: '🧐', timeLimit: 180 }      // 16 קלפים
  },
  // מערכת ניקוד
  SCORING: {
    PERFECT_MATCH_BONUS: 150,
    TIME_BONUS_MULTIPLIER: 3,
    MIN_MOVES_BONUS: 300,
    STREAK_MULTIPLIER: 2,
    BASE_MATCH_SCORE: 50,
    DIFFICULTY_MULTIPLIER: {
      EASY: 1,
      MEDIUM: 1.5,
      HARD: 2
    }
  },
  // אנימציות
  ANIMATIONS: {
    CARD_FLIP_DURATION: 500,
    MATCH_CELEBRATION_DURATION: 1500,
    WIN_ANIMATION_DELAY: 200
  }
};
