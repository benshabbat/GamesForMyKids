import { AnimalData } from '@/lib/types/games';
import { MEMORY_GAME_ANIMALS, MEMORY_GAME_CONSTANTS } from '@/lib/constants';
import { DifficultyLevel, MemoryCard, GameStats } from '../types/memory';
import { DifficultyOption, PerformanceLevel, WinAchievement } from '../types/memoryDisplay';

// ─── Initial values ───────────────────────────────────────────────────────────

export const initialGameStats: GameStats = {
  moves: 0,
  matches: 0,
  score: 0,
  timeElapsed: 0,
  perfectMatches: 0,
  streak: 0,
};

// ─── State shape ──────────────────────────────────────────────────────────────

export interface MemoryStoreState {
  // Game flow
  gameStarted: boolean;
  isCompleted: boolean;
  isGameWon: boolean;
  timer: number;
  timeLeft: number;
  isGamePaused: boolean;
  difficulty: DifficultyLevel;
  gameStats: GameStats;

  // Cards
  cards: MemoryCard[];
  animals: AnimalData[];
  flippedCards: number[];
  matchedPairs: string[];

  // Audio
  audioContext: AudioContext | null;

  // UI
  showHints: boolean;
  showDebug: boolean;
}

// ─── Actions shape ────────────────────────────────────────────────────────────

export interface MemoryStoreActions {
  initializeGame: (targetDifficulty?: DifficultyLevel) => void;
  handleCardClick: (cardIndex: number) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  resetToMenu: () => void;
  setDifficulty: (difficulty: DifficultyLevel) => void;

  // Called from timer useEffect in useMemoryGameContent
  incrementTimer: () => void;
  decrementTimeLeft: () => void;
  setCompleted: (value: boolean) => void;
  setGameWon: (value: boolean) => void;

  // Computed helpers
  getDifficultyConfig: () => { pairs: number; name: string; emoji: string; timeLimit: number };
  getDifficultyOptions: () => DifficultyOption[];
  getGridCols: () => string;
  getCardDisplayData: (index: number) => {
    id: number;
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
  };
  getAnimationDelay: (index: number) => string;
  getGameProgress: () => {
    totalPairs: number;
    completedPairs: number;
    remainingPairs: number;
    progressPercentage: number;
  };
  canClickCard: (cardIndex: number) => boolean;
  getGameStateDescription: () => string;
  formatTime: (seconds: number) => string;
  getFormattedTimeLeft: () => string;
  getTimeColor: () => string;
  getPerformanceLevel: () => PerformanceLevel;
  getWinAchievements: () => WinAchievement[];
}

// ─── Initial store state ──────────────────────────────────────────────────────

export const initialState: MemoryStoreState = {
  gameStarted: false,
  isCompleted: false,
  isGameWon: false,
  timer: 0,
  timeLeft: 0,
  isGamePaused: false,
  difficulty: 'MEDIUM',
  gameStats: initialGameStats,
  cards: [],
  animals: MEMORY_GAME_ANIMALS.slice(0, MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS.MEDIUM.pairs),
  flippedCards: [],
  matchedPairs: [],
  audioContext: null,
  showHints: false,
  showDebug: false,
};
