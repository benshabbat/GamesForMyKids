/**
 * ===============================================
 * טיפוסים ל-UniversalGameContext
 * ===============================================
 */

import { BaseGameItem, GameType } from '../core/base';
import { GameUIConfig } from '@/lib/constants/ui/gameConfigs';
import { GameItemCardProps } from '../hooks/game-state';

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
  CardComponent: React.ComponentType<GameItemCardProps>;
  gameType: GameType;
  
  // Hints & UI
  hints: string[];
  hasMoreHints: boolean;
  showNextHint: () => void;
  currentAccuracy: number;
  showProgressModal: boolean;
  setShowProgressModal: (show: boolean) => void;
}
