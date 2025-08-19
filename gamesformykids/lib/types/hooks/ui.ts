/**
 * ===============================================
 * טיפוסים לhooks של UI
 * ===============================================
 */

import { BaseGameItem } from '../base';

export interface UseGameHintsProps {
  currentChallenge: BaseGameItem | null;
  wrongAttempts: number;
}

export interface Hint {
  type: 'color' | 'shape' | 'sound' | 'description' | 'visual';
  text: string;
  audioText?: string;
  isRevealed: boolean;
  order: number;
}

export interface UseGameHintsReturn {
  hints: Hint[];
  hasMoreHints: boolean;
  showNextHint: () => void;
  resetHints: () => void;
  revealedHintsCount: number;
  revealedCount: number;
  totalHints: number;
}

export interface UseGameEventsProps {
  gameType?: string;
  onGameStateChange?: (state: Record<string, unknown>) => void;
}

// Game event types (copied from useGameEvents)
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

export interface UseGameEventsReturn {
  onCorrectAnswer: (data?: Record<string, unknown>) => void;
  onWrongAnswer: (data?: Record<string, unknown>) => void;
  onGameStart: () => void;
  onGamePause: () => void;
  onGameResume: () => void;
  onLevelUp: () => void;
  triggerEvent: (event: GameEvent, data?: Record<string, unknown>) => void;
}

export interface UseGamePerformanceProps {
  items: BaseGameItem[];
  currentChallenge: BaseGameItem | null;
}

export interface UseGamePerformanceReturn {
  getPreloadedAudio: (itemName: string) => HTMLAudioElement | null;
  getPreloadedImage: (itemName: string) => HTMLImageElement | null;
  requestAnimationFrame: (callback: () => void) => void;
  cleanup: () => void;
  isAudioPreloaded: (itemName: string) => boolean;
  isImagePreloaded: (itemName: string) => boolean;
}

export interface GameEventsHookReturn {
  trackEvent: (eventName: string, eventData?: Record<string, unknown>) => void;
  trackGameStart: (gameType: string) => void;
  trackGameEnd: (gameType: string, score: number, duration: number) => void;
  trackLevelComplete: (gameType: string, level: number, score: number) => void;
  trackError: (error: string, context?: Record<string, unknown>) => void;
}
