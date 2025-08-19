/**
 * ===============================================
 * Game Events Types
 * ===============================================
 */

/**
 * סוגי אירועים במשחק
 */
export type GameEvent = 
  | 'game_start'
  | 'game_pause'
  | 'game_resume'
  | 'correct_answer'
  | 'wrong_answer'
  | 'level_up'
  | 'new_high_score'
  | 'streak_milestone'
  | 'game_complete';

/**
 * נתוני אירוע משחק
 */
export interface GameEventData {
  event: GameEvent;
  gameType: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

/**
 * הגדרת Window עבור gtag
 */
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: Record<string, unknown>) => void;
  }
}
