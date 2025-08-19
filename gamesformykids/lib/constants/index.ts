/**
 * נקודת כניסה מרכזית לכל הקבועים
 * מודול מרכזי שמאפשר ייבוא נוח של כל נתוני המשחקים
 */

// קבועי ליבה
export * from './core';

// נתוני משחקים - משחקי יסוד
export * from './gameData/basic';

// נתוני משחקים - טבע ואוכל
export * from './gameData/nature';

// נתוני משחקים - עולם ותחבורה
export * from './gameData/world';

// נתוני משחקים - בית וחיים
export * from './gameData/lifestyle';

// משחקים מיוחדים
export * from './gameData/special';

// ממשק משתמש
export * from './ui';
export * from './ui/shapes';

// קונפיגורציות UI ועיצוב
export * from './ui/gameConfigs';
export * from './ui/designTokens';

/**
 * ===============================================
 * רשימה מרכזית של כל המשחקים הזמינים
 * ===============================================
 */
export const AVAILABLE_GAMES = [
  'colors', 'letters', 'shapes', 'colored-shapes', 'numbers', 
  'fruits', 'vegetables', 'animals', 'smell-taste',
  'weather', 'transport', 'vehicles', 'tools', 'space',
  'house', 'clothing', 'instruments', 'professions', 'emotions',
  'memory', 'counting', 'math', 'puzzles', 'bubbles', 'drawing'
] as const;

export type GameType = typeof AVAILABLE_GAMES[number];
