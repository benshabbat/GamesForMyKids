/**
 * ===============================================
 * Game Type Context Types - Clean Code
 * ===============================================
 */

import { ReactNode } from 'react';
import { GameType } from '../core/base';

// טייפ זמני למען תאימות
export const GAME_UI_CONFIGS: Record<string, unknown> = {};

/**
 * State של GameType
 */
export interface GameTypeState {
  currentGameType: GameType | null;
  previousGameType: GameType | null;
  gameHistory: GameType[];
}

/**
 * Value של GameType Context
 */
export interface GameTypeContextValue {
  // State
  gameState: GameTypeState;
  
  // Current game info
  currentGameType: GameType | null;
  currentGameConfig: typeof GAME_UI_CONFIGS[GameType] | null;
  currentGameItems: unknown[] | null;
  
  // Actions
  setCurrentGameType: (gameType: GameType) => void;
  navigateToGame: (gameType: GameType) => void;
  goToPreviousGame: () => void;
  clearGameHistory: () => void;
  
  // Utilities
  isGameSupported: (gameType: string) => boolean;
  getGameConfig: (gameType: GameType) => typeof GAME_UI_CONFIGS[GameType] | null;
  getGameItems: (gameType: GameType) => unknown[] | null;
}

/**
 * Props עבור GameType Provider
 */
export interface GameTypeProviderProps {
  children: ReactNode;
  initialGameType?: GameType;
}
