/**
 * ===============================================
 * טיפוסים לContext של משחק זיכרון
 * ===============================================
 */

export interface MemoryCard {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  hebrew?: string;
  english?: string;
  emoji?: string;
}

export interface MemoryGameState {
  cards: MemoryCard[];
  flippedCards: string[];
  matchedPairs: number;
  moves: number;
  score: number;
  gameStatus: 'idle' | 'playing' | 'paused' | 'completed';
  difficulty: 'easy' | 'medium' | 'hard';
  timeLeft?: number;
  startTime?: Date;
  endTime?: Date;
}

export interface MemoryContextType {
  gameState: MemoryGameState;
  
  // Game actions
  startGame: (difficulty?: 'easy' | 'medium' | 'hard') => void;
  resetGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  
  // Card actions
  flipCard: (cardId: string) => void;
  checkMatch: () => void;
  
  // Game status
  isGameComplete: boolean;
  canFlipCard: (cardId: string) => boolean;
}

export interface MemoryProviderProps {
  children: React.ReactNode;
  gameType?: string;
}
