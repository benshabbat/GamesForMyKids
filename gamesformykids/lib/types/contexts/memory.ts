/**
 * ===============================================
 * טיפוסים לContext של משחק זיכרון
 * ===============================================
 */

import { AnimalData } from "@/lib/types/games";

// Types
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface MemoryCard {
  id: number;
  animal: AnimalData;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameStats {
  moves: number;
  matches: number;
  score: number;
  timeElapsed: number;
  perfectMatches: number;
  streak: number;
}

export interface MemoryState {
  // Game State
  gameStarted: boolean;
  isCompleted: boolean;
  isGameWon: boolean;
  timer: number;
  timeLeft: number;
  isGamePaused: boolean;
  difficulty: DifficultyLevel;
  gameStats: GameStats;
  
  // Cards and Animals
  cards: MemoryCard[];
  animals: AnimalData[];
  flippedCards: number[];
  matchedPairs: string[];
  
  // Audio
  audioContext: AudioContext | null;
  
  // UI State
  showHints: boolean;
  showDebug: boolean;
}

export type MemoryAction =
  | { type: 'SET_GAME_STARTED'; payload: boolean }
  | { type: 'SET_COMPLETED'; payload: boolean }
  | { type: 'SET_GAME_WON'; payload: boolean }
  | { type: 'SET_TIMER'; payload: number }
  | { type: 'INCREMENT_TIMER' }
  | { type: 'SET_TIME_LEFT'; payload: number }
  | { type: 'DECREMENT_TIME_LEFT' }
  | { type: 'SET_GAME_PAUSED'; payload: boolean }
  | { type: 'SET_DIFFICULTY'; payload: DifficultyLevel }
  | { type: 'SET_GAME_STATS'; payload: GameStats }
  | { type: 'UPDATE_GAME_STATS'; payload: Partial<GameStats> }
  | { type: 'SET_CARDS'; payload: MemoryCard[] }
  | { type: 'SET_ANIMALS'; payload: AnimalData[] }
  | { type: 'SET_FLIPPED_CARDS'; payload: number[] }
  | { type: 'ADD_FLIPPED_CARD'; payload: number }
  | { type: 'CLEAR_FLIPPED_CARDS' }
  | { type: 'SET_MATCHED_PAIRS'; payload: string[] }
  | { type: 'ADD_MATCHED_PAIR'; payload: string }
  | { type: 'SET_AUDIO_CONTEXT'; payload: AudioContext | null }
  | { type: 'TOGGLE_HINTS' }
  | { type: 'TOGGLE_DEBUG' }
  | { type: 'RESET_GAME' }
  | { type: 'RESET_TO_MENU' };

// Context
export interface MemoryContextType {
  state: MemoryState;
  dispatch: React.Dispatch<MemoryAction>;
  
  // Game Actions
  initializeGame: (targetDifficulty?: DifficultyLevel) => void;
  handleCardClick: (cardIndex: number) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  resetToMenu: () => void;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  
  // Computed Values
  difficultyConfig: {
    pairs: number;
    name: string;
    emoji: string;
    timeLimit: number;
  };
  isGameWon: boolean;
  gridCols: string;
  
  // Game Logic
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
}

export interface MemoryProviderProps {
  children: React.ReactNode;
}
