/**
 * ===============================================
 * ייצוא מרכזי לטיפוסי Contexts - Clean Code
 * ===============================================
 */

// ייצוא טיפוסים מקומיים בלבד
export * from './general';

// ייצוא ממשקים מתוקנים
export type { 
  GameConfigContextValue,
  GameConfigProviderProps,
  GameCardProps
} from './game-config';

export type {
  GameTypeState,
  GameTypeContextValue,
  GameTypeProviderProps
} from './game-type';

export type {
  UniversalGameContextValue
} from './universal-game';
