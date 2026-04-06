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

// Game Session (currentChallenge / options / showCelebration / wrongAttempts)
export { useGameSessionStore } from './gameSessionStore';
export type { GameSessionState, GameSessionActions } from './gameSessionStore';

// Game Actions (startGame / handleItemClick / resetGame / speakItemName / hints)
export { useGameActionsStore } from './gameActionsStore';
export type { GameActionsState, GameActionsStoreActions } from './gameActionsStore';

// Audio Settings (speechRate / speechPitch / volume / enabled — persisted)
export { useAudioSettingsStore } from './audioSettingsStore';
export type { AudioSettingsState, AudioSettingsActions } from './audioSettingsStore';

// Game Settings (sound / music / darkMode / fontSize / language / … — persisted)
export { useSettingsStore } from './settingsStore';
export type { SettingsState, SettingsActions } from './settingsStore';

// Home Page (selectedCategory / showAllGames)
export { useHomePageStore } from './homePageStore';
export type { HomePageState, HomePageActions } from './homePageStore';

// Hebrew Letters (currentLetter / completedLetters / isAudioEnabled)
export { useHebrewLettersStore } from './hebrewLettersStore';
export type { HebrewLettersState, HebrewLettersStoreActions } from './hebrewLettersStore';

// Game Difficulty (per-game adaptive difficulty — persisted)
export { useGameDifficultyStore } from './gameDifficultyStore';
export type { GameDifficultyState, GameDifficultyActions, DifficultyLevel, PerformanceHistory } from './gameDifficultyStore';

// High Scores (best score per gameId — persisted)
export { useHighScoreStore } from './highScoreStore';
export type { HighScoreState, HighScoreActions } from './highScoreStore';

// Progress Tracking (allSessions — persisted)
export { useProgressTrackingStore } from './progressTrackingStore';
export type { ProgressTrackingState, ProgressTrackingActions } from './progressTrackingStore';

// Game Hints (hints / revealedHintsCount — session-level)
export { useGameHintsStore } from './gameHintsStore';
export type { GameHintsState, GameHintsActions } from './gameHintsStore';

// User Profile (profile / settings / loading / error — Supabase)
export { useUserProfileStore } from './userProfileStore';
export type { UserProfileState, UserProfileStoreActions } from './userProfileStore';

// Achievements (achievements / loading / error — Supabase)
export { useAchievementsStore } from './achievementsStore';
export type { AchievementsState, AchievementsStoreActions } from './achievementsStore';

// Game Progress Data (progress[] / loading / error — Supabase)
export { useGameProgressDataStore } from './gameProgressDataStore';
export type { GameProgressDataState, GameProgressDataActions } from './gameProgressDataStore';

// Performance Settings (performanceMode / animationsEnabled / preloadingEnabled — persisted)
export { usePerformanceSettingsStore } from './performanceSettingsStore';

// Game Data (gameItems / gameTypes / loading / error — Supabase, deduplicated)
export { useGameDataStore } from './gameDataStore';

// Player Profile (profiles keyed by playerId — in-memory cache)
export { usePlayerProfileStore } from './playerProfileStore';

// Featured Game (daily featured game / isClient — shared across marketing components)
export { useFeaturedGameStore } from './featuredGameStore';

// Game Audio (audioContext / speechEnabled — initialized once, shared)
export { useGameAudioStore } from './gameAudioStore';
