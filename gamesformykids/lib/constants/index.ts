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

// נתוני משחקים חדשים - ספורט ופעילות
export * from './gameData/sports';

// נתוני משחקים חדשים - בישול ומטבח
export * from './gameData/cooking';

// נתוני משחקים חדשים - גוף ובריאות
export * from './gameData/body';

// נתוני משחקים חדשים - משפחה ויחסים
export * from './gameData/family';

// נתוני משחקים חדשים - דינוזאורים ופרהיסטוריה
export * from './gameData/dinosaurs';

// נתוני משחקים חדשים - מזון מסביב לעולם ומחזור
export * from './gameData/newGames';

// נתוני משחקים נוספים - בריאות, טבע ובטיחות
export * from './gameData/additionalGames';

// נתוני משחקים מתקדמים - טכנולוגיה וחדשנות
export * from './gameData/technology';

// נתוני משחקים חדשניים - משחקים יוצאי דופן
export * from './gameData/innovative';

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
  'memory', 'counting', 'math', 'puzzles', 'bubbles', 'drawing',
  // משחקים חדשים
  'sports', 'sports-equipment', 'kitchen', 'cooking-actions', 'prepared-food',
  'body-parts', 'senses', 'body-actions', 'family', 'extended-family', 'family-roles',
  'dinosaurs', 'dinosaur-types', 'prehistoric-periods', 'fossils',
  // משחקים נוספים חדשים
  'world-food', 'recycling', 'medicine', 'nature-sounds', 
  'seasons-holidays', 'feelings', 'shopping-money', 'road-safety'
] as const;

export type GameType = typeof AVAILABLE_GAMES[number];
