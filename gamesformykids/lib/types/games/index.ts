/**
 * ===============================================
 * ייצוא מרכזי לטיפוסי משחקים
 * ===============================================
 */

// ייצוא הטייפים מהקבצים השונים
export * from './base';
export * from './items';
export * from './ui';

// ייצוא לתאימות לאחור - משתמש בגרסה הישנה שלא דורשת id
export type {
  BaseGameItemLegacy as BaseGameItem,
  BaseGameItem as BaseGameItemWithId,
  GameType
} from '../core/base';

// ייצוא טייפים ספציפיים למשחקים קיימים
export interface CountingChallenge {
  targetNumber: number;
  question: string;
  correctAnswer: number;
}

export interface CountingGameState {
  currentChallenge: CountingChallenge | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: number[];
}

export interface MathChallenge {
  operand1: number;
  operand2: number;
  operator: '+' | '-' | '*' | '/';
  answer: number;
  question: string;
}

export interface AnimalData {
  id: string;
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

export interface NumberItem {
  id: string;
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
  value: number;
}

export interface ShapeItem {
  id: string;
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
  shape: string;
}

export interface ProfessionItem {
  id: string;
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
  description?: string;
}