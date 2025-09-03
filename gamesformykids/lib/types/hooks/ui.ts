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
 * Props עבור אירועי משחק - עקרון Single Responsibility
 */
export interface UseGameEventsProps {
  readonly gameType?: string;
  readonly onGameStateChange?: (state: object) => void;
}

/**
 * סוגי אירועי משחק מורחבים - עקרון DRY, uses existing types
 */
export type ExtendedGameEvent = 
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

/**
 * Props עבור ביצועי משחק - עקרון Single Responsibility
 */
export interface UseGamePerformanceProps {
  readonly items: readonly BaseGameItem[];
  readonly currentChallenge: BaseGameItem | null;
}

/**
 * החזרת Hook לביצועי משחק - עקרון Interface Segregation
 */
export interface UseGamePerformanceReturn {
  readonly getPreloadedAudio: (itemName: string) => HTMLAudioElement | null;
  readonly getPreloadedImage: (itemName: string) => HTMLImageElement | null;
  readonly requestAnimationFrame: (callback: () => void) => void;
  readonly cleanup: () => void;
  readonly isAudioPreloaded: (itemName: string) => boolean;
  readonly isImagePreloaded: (itemName: string) => boolean;
}

/**
 * נתוני אירוע למעקב - עקרון Single Responsibility
 */
export interface EventData {
  readonly gameType: string;
  readonly score?: number;
  readonly level?: number;
  readonly duration?: number;
  readonly context?: object;
}

/**
 * החזרת Hook לאירועי משחק עם אנליטיקה - עקרון Interface Segregation
 */
export interface GameEventsHookReturn {
  readonly trackEvent: (eventName: string, eventData?: Record<string, unknown>) => void;
  readonly trackGameStart: (gameType: string) => void;
  readonly trackGameEnd: (gameType: string, score: number, duration: number) => void;
  readonly trackLevelComplete: (gameType: string, level: number, score: number) => void;
  readonly trackError: (error: string, context?: Record<string, unknown>) => void;
}
