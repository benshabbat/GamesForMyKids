/**
 * ===============================================
 * Game Events Types - Clean Code & SOLID
 * ===============================================
 */

/**
 * אירועי מחזור חיים של משחק - עקרון Single Responsibility
 */
type GameLifecycleEvent = 
  | 'game_start'
  | 'game_pause'
  | 'game_resume'
  | 'game_complete';

/**
 * אירועי תגובת שחקן - עקרון Single Responsibility
 */
type PlayerResponseEvent = 
  | 'correct_answer'
  | 'wrong_answer';

/**
 * אירועי התקדמות במשחק - עקרון Single Responsibility
 */
type GameProgressEvent = 
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
interface EventMetadata {
  readonly event: GameEvent;
  readonly timestamp: number;
}

// הוסר GameContext - השתמש ישירות ב-GameTyped עקרון DRY

/**
 * נתונים נוספים לאירוע - עקרון Single Responsibility
 */
interface EventPayload {
  readonly data?: Readonly<Record<string, unknown>> | undefined;
}

/**
 * נתוני אירוע משחק מלאים - עקרון Interface Segregation
 */
export interface GameEventData extends 
  EventMetadata,
  EventPayload {
  readonly gameType: string;
}

/**
 * הגדרת Window עבור gtag
 */
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: Record<string, unknown>) => void;
  }
}
