/**
 * ===============================================
 * ייצוא מרכזי לכל הטיפוסים
 * ===============================================
 */

// ===== טיפוסים בסיסיים =====
export * from './core';

// ===== טיפוסים למשחקים (עם שמות מפורשים למניעת קונפליקטים) =====
export type {
  GameRegistration,
  Category,
  AgeGroup,
  GameChallenge,
  GameStats,
  DifficultyLevel
} from './games/base';

export * from './games/items';
export * from './games/ui';

// ===== טיפוסים לממשק משתמש =====
export * from './ui';

// ===== ייצוא מאורגן לפי קטגוריות =====
export * as Components from './components';
export * as Contexts from './contexts';
export * as Hooks from './hooks';
export * as Utils from './utils';
export * as Events from './events';

// ===== ייצוא נוסף עם שמות ברורים =====
export * as Core from './core';
export * as UI from './ui';
export * as Games from './games/base';

// ===== ייצוא תאימות לאחור =====
export type { 
  GameType,
  BaseGameItem,
  BaseGameState,
  GameConfig,
  Game,
  Card
} from './core/base';
