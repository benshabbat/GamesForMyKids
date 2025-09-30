/**
 * קונפיגורציות משחקים מיוחדים - ספירה, מתמטיקה וזיכרון
 */

import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

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
  FLIP_DURATION: 600,  // הפחתה מ-1000 ל-600 לתגובה מהירה יותר
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

/**
 * ===============================================
 * נתוני אגדות קסם
 * ===============================================
 */
export const MAGIC_FAIRY_TALES_CONSTANTS: Record<string, BaseGameItem> = {
  PRINCESS: { name: "princess", hebrew: "נסיכה", english: "Princess", emoji: "👸", color: "bg-pink-500", sound: [523, 659, 784] },
  PRINCE: { name: "prince", hebrew: "נסיך", english: "Prince", emoji: "🤴", color: "bg-blue-500", sound: [440, 554, 659] },
  FAIRY: { name: "fairy", hebrew: "פיה", english: "Fairy", emoji: "🧚", color: "bg-purple-400", sound: [587, 740, 880] },
  WIZARD: { name: "wizard", hebrew: "קוסם", english: "Wizard", emoji: "🧙", color: "bg-purple-600", sound: [330, 415, 494] },
  DRAGON: { name: "dragon", hebrew: "דרקון", english: "Dragon", emoji: "🐉", color: "bg-red-600", sound: [220, 277, 330] },
  CASTLE: { name: "castle", hebrew: "טירה", english: "Castle", emoji: "🏰", color: "bg-gray-600", sound: [392, 494, 587] },
  CROWN: { name: "crown", hebrew: "כתר", english: "Crown", emoji: "👑", color: "bg-yellow-500", sound: [659, 831, 988] },
  MAGIC_WAND: { name: "magic_wand", hebrew: "שרביט קסם", english: "Magic Wand", emoji: "🪄", color: "bg-purple-500", sound: [784, 988, 1175] },
  UNICORN: { name: "unicorn", hebrew: "חד קרן", english: "Unicorn", emoji: "🦄", color: "bg-pink-400", sound: [523, 659, 784] },
  CRYSTAL: { name: "crystal", hebrew: "גביש", english: "Crystal", emoji: "💎", color: "bg-cyan-400", sound: [880, 1109, 1319] },
};

/**
 * ===============================================
 * נתוני קרקס
 * ===============================================
 */
export const CIRCUS_SHOW_CONSTANTS: Record<string, BaseGameItem> = {
  CLOWN: { name: "clown", hebrew: "ליצן", english: "Clown", emoji: "🤡", color: "bg-red-500", sound: [440, 554, 659] },
  ELEPHANT: { name: "elephant", hebrew: "פיל", english: "Elephant", emoji: "🐘", color: "bg-gray-500", sound: [196, 247, 294] },
  LION: { name: "lion", hebrew: "אריה", english: "Lion", emoji: "🦁", color: "bg-orange-600", sound: [262, 330, 392] },
  ACROBAT: { name: "acrobat", hebrew: "אקרובט", english: "Acrobat", emoji: "🤸", color: "bg-blue-500", sound: [523, 659, 784] },
  JUGGLER: { name: "juggler", hebrew: "להטוטן", english: "Juggler", emoji: "🤹", color: "bg-green-500", sound: [392, 494, 587] },
  TRAPEZE: { name: "trapeze", hebrew: "נדנדה", english: "Trapeze", emoji: "🎪", color: "bg-purple-500", sound: [349, 440, 523] },
  BALLOON: { name: "balloon", hebrew: "בלון", english: "Balloon", emoji: "🎈", color: "bg-red-400", sound: [587, 740, 880] },
  POPCORN: { name: "popcorn", hebrew: "פופקורן", english: "Popcorn", emoji: "🍿", color: "bg-yellow-400", sound: [330, 415, 494] },
  TICKET: { name: "ticket", hebrew: "כרטיס", english: "Ticket", emoji: "🎫", color: "bg-blue-400", sound: [277, 349, 415] },
  TENT: { name: "tent", hebrew: "אוהל", english: "Tent", emoji: "⛺", color: "bg-orange-500", sound: [220, 277, 330] },
};

/**
 * ===============================================
 * רשימות ויצוא אוטומטי
 * ===============================================
 */
export const MAGIC_FAIRY_TALES_ITEMS = createItemsList(MAGIC_FAIRY_TALES_CONSTANTS);
export const CIRCUS_SHOW_ITEMS = createItemsList(CIRCUS_SHOW_CONSTANTS);

export const MAGIC_FAIRY_TALES_PRONUNCIATIONS = createPronunciationDictionary(MAGIC_FAIRY_TALES_CONSTANTS);
export const CIRCUS_SHOW_PRONUNCIATIONS = createPronunciationDictionary(CIRCUS_SHOW_CONSTANTS);

export const MAGIC_FAIRY_TALES_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "אגדות קסם",
  description: "הכנס לעולם של נסיכות, קוסמים ודרקונים!"
};

export const CIRCUS_SHOW_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "מופע קרקס",
  description: "חווה את הקסם והריגוש של הקרקס!"
};
