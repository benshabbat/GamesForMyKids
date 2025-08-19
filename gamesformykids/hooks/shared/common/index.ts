/**
 * ===============================================
 * Shared Common Hooks - Index
 * ===============================================
 */

// Common Game Patterns
export {
  useGameTimer,
  useGameScore,
  useGameAudio,
  useCommonGamePatterns
} from './useCommonGamePatterns';

export type {
  GameTimer,
  GameScore,
  GameAudio
} from './useCommonGamePatterns';

// Game Difficulty
export {
  useGameDifficulty
} from './useGameDifficulty';

export type {
  DifficultyLevel,
  DifficultySettings,
  DifficultyActions
} from './useGameDifficulty';

// Game Settings
export {
  useGameSettings
} from './useGameSettings';

export type {
  GameSettings,
  GameSettingsActions
} from './useGameSettings';

// Player Profile
export {
  usePlayerProfile
} from './usePlayerProfile';

export type {
  PlayerProfile,
  PlayerStats,
  Achievement,
  PlayerProfileData
} from './usePlayerProfile';
