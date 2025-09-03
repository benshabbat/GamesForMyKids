/**
 * ===============================================
 * Game Events Types - Clean Code & SOLID
 * ===============================================
 */

import type { GameTyped } from '../core/base';

/**
 * אירועי מחזור חיים של משחק - עקרון Single Responsibility
 */
export type GameLifecycleEvent = 
  | 'game_start'
  | 'game_pause'
  | 'game_resume'
  | 'game_complete';

/**
 * אירועי תגובת שחקן - עקרון Single Responsibility
 */
export type PlayerResponseEvent = 
  | 'correct_answer'
  | 'wrong_answer';

/**
 * אירועי התקדמות במשחק - עקרון Single Responsibility
 */
export type GameProgressEvent = 
  | 'level_up'
  | 'new_high_score'
  | 'streak_milestone';

/**
 * כל סוגי האירועים במשחק - עקרון Open/Closed
 */
export type GameEvent = 
  | GameLifecycleEvent
  | PlayerResponseEvent
  | GameProgressEvent;

/**
 * מידע בסיסי לאירוע - עקרון Single Responsibility
 */
export interface EventMetadata {
  readonly event: GameEvent;
  readonly timestamp: number;
}

/**
 * הקשר משחק לאירוע - עקרון DRY, type alias
 */
export type GameContext = GameTyped;

/**
 * נתונים נוספים לאירוע - עקרון Single Responsibility
 */
export interface EventPayload {
  readonly data?: Readonly<Record<string, unknown>>;
}

/**
 * נתוני אירוע משחק מלאים - עקרון Interface Segregation
 */
export interface GameEventData extends 
  EventMetadata,
  GameContext,
  EventPayload {}

/**
 * הגדרת Window עבור gtag
 */
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: Record<string, unknown>) => void;
  }
}
