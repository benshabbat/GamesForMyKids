/**
 * ===============================================
 * טיפוסים לhooks של UI - Clean Code & SOLID
 * ===============================================
 */

import { BaseGameItem } from '../core/base';

/**
 * Props עבור רמזים במשחק - עקרון Single Responsibility
 */
export interface UseGameHintsProps {
  readonly currentChallenge: BaseGameItem | null;
  readonly wrongAttempts: number;
}

/**
 * רמז משחק באינטראקציה - עקרון Single Responsibility
 */
export interface GameHint {
  readonly type: 'color' | 'shape' | 'sound' | 'description' | 'visual';
  readonly text: string;
  readonly audioText?: string;
  readonly isRevealed: boolean;
  readonly order: number;
}

/**
 * החזרת Hook לרמזים - עקרון Interface Segregation
 */
export interface UseGameHintsReturn {
  readonly hints: GameHint[];
  readonly hasMoreHints: boolean;
  readonly showNextHint: () => void;
  readonly resetHints: () => void;
  readonly revealedHintsCount: number;
  readonly revealedCount: number;
  readonly totalHints: number;
}
