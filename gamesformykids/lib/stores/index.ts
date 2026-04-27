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

// Game
export { useGameStore } from './gameStore';
export type { GameStats } from './gameStore';

// UI / Notifications
export {
  useUIStore,
  useNotifications,
  useAddNotification,
} from './uiStore';
export type { Notification, NotificationType } from './uiStore';

// Game Type
export { useGameTypeStore } from './gameTypeStore';
export type { GameTypeState } from './gameTypeStore';

// Game Progress
export { useGameProgressStore } from './gameProgressStore';
export type { GameProgressState } from './gameProgressStore';

// Game Session (currentChallenge / options / showCelebration / wrongAttempts)
export { useGameSessionStore } from './gameSessionStore';

// Quiz Game Session (phase / index / score / selected / isCorrect — quiz games)
export { useQuizGameStore } from './quizGameStore';

// Game Actions (startGame / handleItemClick / resetGame / speakItemName / hints)
export { useGameActionsStore } from './gameActionsStore';

// Audio Settings (speechRate / speechPitch / volume / enabled — persisted)
export { useAudioSettingsStore } from './audioSettingsStore';
export type { AudioSettingsState } from './audioSettingsStore';

// Home Page (selectedCategory / showAllGames)
export { useHomePageStore } from './homePageStore';

// Hebrew Letters (currentLetter / completedLetters / isAudioEnabled)
export { useHebrewLettersStore } from '@/app/games/hebrew-letters/store/hebrewLettersStore';

// Animals (category / questions / game actions)
export { useAnimalsStore } from './animalsStore';
export type { AnimalsState, AnimalsActions, AnimalQuestion, QuestionMode } from './animalsStore';

// Progress Tracking (allSessions — persisted)
export { useProgressTrackingStore } from './progressTrackingStore';

// Game Hints (hints / revealedHintsCount — session-level)
export { useGameHintsStore } from './gameHintsStore';

// User Profile (profile / settings / loading / error — Supabase)
export { useUserProfileStore } from './userProfileStore';

// Achievements (achievements / loading / error — Supabase)
export { useAchievementsStore } from './achievementsStore';

// Game Progress Data (progress[] / loading / error — Supabase)
export { useGameProgressDataStore } from './gameProgressDataStore';

// Game Data (gameItems / gameTypes / loading / error — Supabase, deduplicated)
export { useGameDataStore } from './gameDataStore';

// Featured Game (daily featured game / ageGroups — shared across marketing components)
export { useFeaturedGameStore } from './featuredGameStore';

// Game Audio (audioContext / speechEnabled — initialized once, shared)
export { useGameAudioStore } from './gameAudioStore';

// Favorites (favoriteIds — persisted in localStorage)
export { useFavoritesStore } from './favoritesStore';
