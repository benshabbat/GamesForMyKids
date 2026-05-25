/**
 * ===============================================
 * טיפוסים לhooks של UI - Clean Code & SOLID
 * ===============================================
 */

import { BaseGameItem } from '../core/base';
import type { GameEvent } from '../events/game-events';

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

/**
 * סוגי אירועי משחק מורחבים - עקרון DRY, uses existing types
 */
type ExtendedGameEvent = 
  | GameEvent
  | 'streak_milestone';

/**
 * החזרת Hook לאירועי משחק - עקרון Interface Segregation
 */
export interface UseGameEventsReturn {
  readonly onCorrectAnswer: (data?: Record<string, unknown>) => void;
  readonly onWrongAnswer: (data?: Record<string, unknown>) => void;
  readonly onGameStart: () => void;
  readonly onGamePause: () => void;
  readonly onGameResume: () => void;
  readonly onLevelUp: () => void;
  readonly triggerEvent: (event: ExtendedGameEvent, data?: Record<string, unknown>) => void;
}


