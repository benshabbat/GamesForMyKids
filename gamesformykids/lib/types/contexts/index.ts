/**
 * ===============================================
 * ייצוא מרכזי לטיפוסי Contexts
 * ===============================================
 */

// ייצוא טיפוסים ללא collisions
export * from './hebrew-letters';
export * from './memory';
export * from './puzzle';
export * from './general';

// ייצוא מפורש לטיפוסים עם collisions
export type { 
  PuzzleState, 
  PuzzleAction, 
  TouchState,
  PuzzleContextValue 
} from './puzzle';

export type { 
  SimpleGameProgress, 
  SimpleGameProgressContextValue 
} from './simple-game-progress';

export type { 
  UniversalGameContextValue as BaseUniversalGameContextValue
} from './universal-game';

// ייצוא טיפוסים חדשים
export type {
  BuildingContextType,
  BuildingProviderProps
} from './building';

export type {
  GameConfigContextValue,
  GameConfigProviderProps,
  GameCardProps as GameConfigCardProps
} from './game-config';

export type {
  GameTypeState,
  GameTypeContextValue,
  GameTypeProviderProps
} from './game-type';
