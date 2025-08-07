/**
 * ===============================================
 * פונקציות עזר למערכת המשחקים
 * ===============================================
 */

import { BaseGameItem, GameConfig, GameType } from '../types';

/**
 * קבועים למערכת המשחקים
 */
const GAME_CONSTANTS = {
  POINTS_PER_CORRECT_ANSWER: 10,
  DEFAULT_BASE_COUNT: 4,
  DEFAULT_INCREMENT: 1,
  DEFAULT_LEVEL_THRESHOLD: 3,
  ENCOURAGEMENT_THRESHOLDS: {
    EXPERT: 90,
    EXCELLENT: 80,
    VERY_GOOD: 70,
    GOOD: 60,
  }
} as const;

/**
 * הודעות עידוד
 */
const ENCOURAGEMENT_MESSAGES = {
  EXPERT: 'מצוין! אתה מומחה!',
  EXCELLENT: 'כל הכבוד! עבודה נהדרת!',
  VERY_GOOD: 'יפה מאוד! המשך כך!',
  GOOD: 'טוב! תמשיך להתאמן!',
  TRY_AGAIN: 'נסה שוב! אתה יכול!',
} as const;

/**
 * פונקציה כללית ליצירת מילון הגייה מקבועי משחק
 */
export const createPronunciationDictionary = <T extends Record<string, BaseGameItem>>(
  constants: T
): Record<string, string> => {
  return Object.values(constants).reduce((acc, item) => {
    acc[item.name] = item.hebrew;
    return acc;
  }, {} as Record<string, string>);
};

/**
 * פונקציה ליצירת רשימת פריטים מקבועים
 */
export const createItemsList = <T extends Record<string, BaseGameItem>>(constants: T): BaseGameItem[] => {
  return Object.values(constants);
};

/**
 * פונקציה ליצירת קונפיגורציית משחק בסיסית
 */
export const createGameConfig = (
  baseCount: number = GAME_CONSTANTS.DEFAULT_BASE_COUNT,
  increment: number = GAME_CONSTANTS.DEFAULT_INCREMENT,
  levelThreshold: number = GAME_CONSTANTS.DEFAULT_LEVEL_THRESHOLD,
  maxCount?: number
): GameConfig => ({
  baseCount,
  increment,
  levelThreshold,
  maxCount
});

/**
 * פונקציה לקבלת קונפיגורציית משחק לפי סוג
 */
export const getGameConfig = (gameType: GameType): GameConfig => {
  // קונפיגורציות ברירת מחדל
  const DEFAULT_CONFIG = createGameConfig(4, 1, 3);
  const LETTER_CONFIG = createGameConfig(6, 2, 3);
  const NUMBER_CONFIG = createGameConfig(5, 1, 3);
  const COUNTING_CONFIG = createGameConfig(5, 2, 3, 10);
  const MATH_CONFIG = createGameConfig(5, 2, 3, 15);

  const configs: Record<GameType, GameConfig> = {
    colors: DEFAULT_CONFIG,
    letters: LETTER_CONFIG,
    shapes: DEFAULT_CONFIG,
    'colored-shapes': DEFAULT_CONFIG,
    numbers: NUMBER_CONFIG,
    fruits: DEFAULT_CONFIG,
    animals: DEFAULT_CONFIG,
    weather: DEFAULT_CONFIG,
    transport: DEFAULT_CONFIG,
    vegetables: DEFAULT_CONFIG,
    instruments: DEFAULT_CONFIG,
    space: DEFAULT_CONFIG,
    clothing: DEFAULT_CONFIG,
    'smells-tastes': DEFAULT_CONFIG,
    house: DEFAULT_CONFIG,
    tools: DEFAULT_CONFIG,
    counting: COUNTING_CONFIG,
    math: MATH_CONFIG,
    memory: DEFAULT_CONFIG,
    professions: DEFAULT_CONFIG,
    vehicles: DEFAULT_CONFIG,
    emotions: DEFAULT_CONFIG,
    bubbles: DEFAULT_CONFIG,
    puzzles: DEFAULT_CONFIG,
    building: DEFAULT_CONFIG,
  };

  return configs[gameType] || DEFAULT_CONFIG;
};

/**
 * פונקציה לבחירת פריטים אקראיים מרשימה
 * משתמשת באלגוריתם Fisher-Yates לערבוב טוב יותר
 */
export const selectRandomItems = <T>(items: T[], count: number): T[] => {
  if (count >= items.length) return shuffleArray(items);
  
  const shuffled = shuffleArray(items);
  return shuffled.slice(0, count);
};

/**
 * פונקציה לערבוב מערך
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * פונקציה לקבלת פריט אקראי מרשימה
 */
export const getRandomItem = <T>(items: T[]): T => {
  if (items.length === 0) {
    throw new Error('Cannot get random item from empty array');
  }
  return items[Math.floor(Math.random() * items.length)];
};

/**
 * פונקציה לחישוב מספר הפריטים לפי רמה
 */
export const calculateItemCount = (level: number, config: GameConfig): number => {
  const additionalLevels = Math.floor((level - 1) / config.levelThreshold);
  const count = config.baseCount + (additionalLevels * config.increment);
  return config.maxCount ? Math.min(count, config.maxCount) : count;
};

/**
 * פונקציה לבדיקה אם יש לעלות רמה
 */
export const shouldLevelUp = (score: number, level: number, config: GameConfig): boolean => {
  const scoreThreshold = level * config.levelThreshold * GAME_CONSTANTS.POINTS_PER_CORRECT_ANSWER;
  return score >= scoreThreshold;
};

/**
 * פונקציה לוולידציה של קונפיגורציית משחק
 */
export const validateGameConfig = (config: GameConfig): boolean => {
  return (
    config.baseCount > 0 &&
    config.increment >= 0 &&
    config.levelThreshold > 0 &&
    (!config.maxCount || config.maxCount >= config.baseCount)
  );
};

/**
 * פונקציה לחישוב אחוז הצלחה
 */
export const calculateSuccessRate = (correctAnswers: number, totalAnswers: number): number => {
  if (totalAnswers === 0) return 0;
  return Math.round((correctAnswers / totalAnswers) * 100);
};

/**
 * פונקציה לקבלת הודעת עידוד לפי ביצועים
 */
export const getEncouragementMessage = (successRate: number): string => {
  const { EXPERT, EXCELLENT, VERY_GOOD, GOOD } = GAME_CONSTANTS.ENCOURAGEMENT_THRESHOLDS;
  
  if (successRate >= EXPERT) return ENCOURAGEMENT_MESSAGES.EXPERT;
  if (successRate >= EXCELLENT) return ENCOURAGEMENT_MESSAGES.EXCELLENT;
  if (successRate >= VERY_GOOD) return ENCOURAGEMENT_MESSAGES.VERY_GOOD;
  if (successRate >= GOOD) return ENCOURAGEMENT_MESSAGES.GOOD;
  return ENCOURAGEMENT_MESSAGES.TRY_AGAIN;
};

/**
 * פונקציה לעיצוב זמן במשך (מילישניות לפורמט קריא)
 */
export const formatGameTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${remainingSeconds}s`;
};

/**
 * פונקציה לבדיקה אם פריט קיים ברשימה
 */
export const isItemInList = <T extends BaseGameItem>(item: T, list: T[]): boolean => {
  return list.some(listItem => listItem.name === item.name);
};

/**
 * פונקציה לספירת פריטים ייחודיים ברשימה
 */
export const getUniqueItemsCount = <T extends BaseGameItem>(items: T[]): number => {
  const uniqueNames = new Set(items.map(item => item.name));
  return uniqueNames.size;
};

/**
 * פונקציה לקבלת סטטיסטיקות על המשחק
 */
export const getGameStats = (score: number, level: number, config: GameConfig) => {
  const totalQuestionsAnswered = Math.floor(score / GAME_CONSTANTS.POINTS_PER_CORRECT_ANSWER);
  const currentLevelItemCount = calculateItemCount(level, config);
  const nextLevelScore = shouldLevelUp(score, level, config) ? 
    (level + 1) * config.levelThreshold * GAME_CONSTANTS.POINTS_PER_CORRECT_ANSWER : 
    level * config.levelThreshold * GAME_CONSTANTS.POINTS_PER_CORRECT_ANSWER;

  return {
    totalQuestionsAnswered,
    currentLevelItemCount,
    nextLevelScore,
    pointsToNextLevel: Math.max(0, nextLevelScore - score),
  };
};
