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
export { useAuthStore } from './authStore';
export type { AuthState, AuthActions } from './authStore';

// Game
export { useGameStore } from './gameStore';
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
export { useGameTypeStore } from './gameTypeStore';
export type { GameTypeState, GameTypeActions } from './gameTypeStore';

// Game Progress
export { useGameProgressStore } from './gameProgressStore';
export type { GameProgressState, GameProgressActions } from './gameProgressStore';

// Game Session (currentChallenge / options / showCelebration / wrongAttempts)
export { useGameSessionStore } from './gameSessionStore';
export type { GameSessionState, GameSessionActions } from './gameSessionStore';

// Quiz Game Session (phase / index / score / selected / isCorrect — quiz games)
export { useQuizGameStore } from './quizGameStore';
export type { QuizGameState, QuizGameActions, QuizPhase } from './quizGameStore';

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
export { useHebrewLettersStore } from '@/app/games/hebrew-letters/store/hebrewLettersStore';
export type { HebrewLettersState, HebrewLettersStoreActions } from '@/app/games/hebrew-letters/store/hebrewLettersStore';

// Animals (category / questions / game actions)
export { useAnimalsStore } from './animalsStore';
export type { AnimalsState, AnimalsActions, AnimalQuestion, QuestionMode } from './animalsStore';

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

// Game Data (gameItems / gameTypes / loading / error — Supabase, deduplicated)
export { useGameDataStore } from './gameDataStore';

// Featured Game (daily featured game / ageGroups — shared across marketing components)
export { useFeaturedGameStore } from './featuredGameStore';
export type { AgeGroupData } from './featuredGameStore';

// Game Audio (audioContext / speechEnabled — initialized once, shared)
export { useGameAudioStore } from './gameAudioStore';

// Favorites (favoriteIds — persisted in localStorage)
export { useFavoritesStore } from './favoritesStore';
export type { FavoritesState, FavoritesActions } from './favoritesStore';
