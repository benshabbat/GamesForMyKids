/**
 * ===============================================
 * טיפוסים לhooks של UI
 * ===============================================
 */

export interface UseGameHintsProps {
  gameType: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  maxHints?: number;
}

export interface Hint {
  id: string;
  text: string;
  type: 'tip' | 'warning' | 'info';
  priority: number;
}

export interface GameEventsHookReturn {
  trackEvent: (eventName: string, eventData?: Record<string, unknown>) => void;
  trackGameStart: (gameType: string) => void;
  trackGameEnd: (gameType: string, score: number, duration: number) => void;
  trackLevelComplete: (gameType: string, level: number, score: number) => void;
  trackError: (error: string, context?: Record<string, unknown>) => void;
}
