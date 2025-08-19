/**
 * ===============================================
 * ייצוא מרכזי לטיפוסי Contexts
 * ===============================================
 */

// ייצוא טיפוסים ללא collisions
export * from '@/app/games/hebrew-letters/types/hebrew-letters';
export * from '@/app/games/memory/types/memory';
export * from '@/app/games/puzzles/types/puzzle';
export * from './general';

// ייצוא מפורש לטיפוסים עם collisions
export type { 
  PuzzleState, 
  PuzzleAction, 
  TouchState,
  PuzzleContextValue 
} from '@/app/games/puzzles/types/puzzle';

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
} from '@/app/games/building/types/building';

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
