/**
 * ===============================================
 * טיפוסים בסיסיים למערכת המשחקים
 * ===============================================
 */

import { ReactNode } from 'react';

/**
 * פריט משחק בסיסי - מכיל את כל המאפיינים הנפוצים
 */
export interface BaseGameItem {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
  plural?: string; // רבים עבור משחקי מתמטיקה ורגשות
}

/**
 * מצב משחק גנרי
 */
export interface BaseGameState<T = BaseGameItem> {
  currentChallenge: T | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: T[];
}

/**
 * מצב משחק ספירה מיוחד - האופציות הן מספרים
 */
export interface CountingGameState {
  currentChallenge: import('./games').CountingChallenge | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: number[];
}

/**
 * הגדרות משחק
 */
export interface GameConfig {
  baseCount: number;
  increment: number;
  levelThreshold: number;
  maxCount?: number;
}

/**
 * משחק ברשימת המשחקים
 */
export interface Game {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;  
  href: string;
  available: boolean;
}

/**
 * כרטיס זיכרון
 */
export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

/**
 * טיפוסי משחקים נתמכים
 */
export type GameType = 
  | 'colors'
  | 'letters'
  | 'shapes'
  | 'numbers'
  | 'fruits'
  | 'animals'
  | 'weather'
  | 'transport'
  | 'vegetables'
  | 'instruments'
  | 'space'
  | 'clothing'
  | 'smells-tastes'
  | 'house'
  | 'tools'
  | 'counting'
  | 'math'
  | 'memory'
  | 'professions'
  | 'vehicles'
  | 'bubbles';
