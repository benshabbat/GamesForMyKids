/**
 * ===============================================
 * טיפוסים ל-UniversalGameContext
 * ===============================================
 */

import { BaseGameItem, GameType } from '../base';
import { GameUIConfig } from '@/lib/constants/ui/gameConfigs';

export interface GameCardProps {
  item: BaseGameItem;
  onClick: (item: BaseGameItem) => void;
}

export interface UniversalGameContextValue {
  // Game State
  gameState: unknown;
  isPlaying: boolean;
  showCelebration: boolean;
  currentChallenge: BaseGameItem | null;
  options: BaseGameItem[];
  score: number;
  level: number;
  isReady: boolean;
  error: string | null;
  
  // Game Actions
  startGame: () => void;
  resetGame: () => void;
  handleItemClick: (item: BaseGameItem) => void;
  speakItemName: (itemName: string) => void;
  
  // Game Config
  config: GameUIConfig;
  items: BaseGameItem[];
  CardComponent: React.ComponentType<GameCardProps>;
  gameType: GameType;
  
  // Hints & UI
  hints: string[];
  hasMoreHints: boolean;
  showNextHint: () => void;
  currentAccuracy: number;
  showProgressModal: boolean;
  setShowProgressModal: (show: boolean) => void;
}

export interface UniversalGameProviderProps {
  children: React.ReactNode;
}
