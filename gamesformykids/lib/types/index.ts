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
  DifficultyLevel
} from './games/base';

export type { 
  MathChallenge,
  CountingChallenge 
} from './games/items';

export * from './games/items';
export * from './games/ui';
export * from './games/phase';
export * from './games/shared';

// ===== טיפוסים לממשק משתמש =====
export * from './ui';

// ===== ייצוא מאורגן לפי קטגוריות =====
export * as ComponentTypes from './components';

// ===== ייצוא תאימות לאחור =====
export type { 
  GameType,
  BaseGameItem,
  BaseGameState,
  GameConfig,
  Game,
  Card
} from './core/base';
