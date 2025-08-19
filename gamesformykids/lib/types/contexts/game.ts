/**
 * ===============================================
 * טיפוסים לContexts של משחקים
 * ===============================================
 */

// UniversalGameContext
export interface GameCardProps {
  name: string;
  hebrew?: string;
  english?: string;
  emoji?: string;
  color_class?: string;
  sound_frequencies?: number[];
}

export interface UniversalGameContextValue {
  currentGameType: string | null;
  setGameType: (gameType: string) => void;
  gameState: {
    score: number;
    level: number;
    isPlaying: boolean;
    showCelebration: boolean;
  };
  updateGameState: (updates: Partial<UniversalGameContextValue['gameState']>) => void;
  resetGame: () => void;
}

export interface UniversalGameProviderProps {
  children: React.ReactNode;
  defaultGameType?: string;
}

// SimpleGameProgressContext
export interface SimpleGameProgressProviderProps {
  children: React.ReactNode;
  gameType: string;
}
