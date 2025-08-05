/**
 * Application-wide constants
 * Centralized location for all constant values used across the app
 */

// App configuration
export const APP_CONFIG = {
  name: 'Games For My Kids',
  description: 'משחקים חינוכיים ומהנים לילדים בגיל 2-5',
  version: '1.0.0',
  author: 'Games For My Kids Team',
  locale: 'he-IL',
  direction: 'rtl',
} as const;

// Age groups for games
export const AGE_GROUPS = {
  TODDLER: { min: 2, max: 3, label: '2-3 שנים' },
  PRESCHOOL: { min: 3, max: 4, label: '3-4 שנים' },
  KINDERGARTEN: { min: 4, max: 5, label: '4-5 שנים' },
  ALL: { min: 2, max: 5, label: '2-5 שנים' },
} as const;

// Game categories
export const GAME_CATEGORIES = {
  EDUCATIONAL: 'educational',
  ENTERTAINMENT: 'entertainment',
  MEMORY: 'memory',
  DRAWING: 'drawing',
  MATH: 'math',
  LANGUAGE: 'language',
  PUZZLE: 'puzzle',
} as const;

// Game difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: { value: 1, label: 'קל', color: 'green' },
  MEDIUM: { value: 2, label: 'בינוני', color: 'yellow' },
  HARD: { value: 3, label: 'קשה', color: 'red' },
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// Screen breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Game scoring system
export const SCORING = {
  PERFECT_SCORE: 100,
  GOOD_SCORE: 80,
  FAIR_SCORE: 60,
  MIN_SCORE: 0,
  BONUS_MULTIPLIER: 1.2,
} as const;

// Audio settings
export const AUDIO_CONFIG = {
  DEFAULT_VOLUME: 0.7,
  SOUND_EFFECTS_VOLUME: 0.5,
  MUSIC_VOLUME: 0.3,
  SPEECH_VOLUME: 0.8,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  GAME_PROGRESS: 'gfmk_game_progress',
  USER_PREFERENCES: 'gfmk_user_preferences',
  AUDIO_SETTINGS: 'gfmk_audio_settings',
  HIGH_SCORES: 'gfmk_high_scores',
} as const;

// Game time limits (in seconds)
export const TIME_LIMITS = {
  QUICK_GAME: 60,
  NORMAL_GAME: 120,
  LONG_GAME: 300,
  UNLIMITED: 0,
} as const;

// Colors used throughout the app
export const THEME_COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  SECONDARY: {
    50: '#fdf4ff',
    100: '#fae8ff',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
  },
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
} as const;

// Performance thresholds
export const PERFORMANCE = {
  SLOW_RENDER_THRESHOLD: 16, // milliseconds
  LARGE_LIST_THRESHOLD: 100, // items
  DEBOUNCE_DELAY: 300, // milliseconds
  THROTTLE_DELAY: 100, // milliseconds
} as const;
