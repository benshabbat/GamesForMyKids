/**
 * ===============================================
 * lib/stores — Zustand Global State
 * ===============================================
 * יצוא מרכזי לכל ה-stores.
 *
 * שימוש:
 *   import { useAuthStore, useGameStore, useUIStore } from '@/lib/stores';
 */

// Auth
export { useAuthStore, selectIsLoggedIn, selectCanPlay } from './authStore';
export type { AuthState, AuthActions } from './authStore';

// Game
export {
  useGameStore,
  selectHighScore,
  selectIsPlayingGame,
} from './gameStore';
export type {
  ActiveGameState,
  GameStats,
  GameActions,
} from './gameStore';

// UI / Notifications
export {
  useUIStore,
  useNotifications,
  useAddNotification,
} from './uiStore';
export type { Notification, NotificationType, UIState, UIActions } from './uiStore';

// Game Type
export {
  useGameTypeStore,
  selectCurrentGameType,
  selectPreviousGameType,
  selectGameHistory,
} from './gameTypeStore';
export type { GameTypeState, GameTypeActions } from './gameTypeStore';

// Game Progress
export {
  useGameProgressStore,
  selectScore,
  selectLevel,
  selectIsGameActive,
  selectAccuracy,
} from './gameProgressStore';
export type { GameProgressState, GameProgressActions } from './gameProgressStore';
