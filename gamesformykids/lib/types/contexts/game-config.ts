/**
 * ===============================================
 * Game Config Context Types - Clean Code
 * ===============================================
 */

import { ReactNode } from 'react';
import { GameType, BaseGameItem } from '../core/base';
import { GameItemCardProps } from '../hooks/game-state';

// טייפים זמניים למען תאימות
export interface GameUIConfig {
  title: string;
  description: string;
  instructions: string[];
  [key: string]: unknown;
}

export interface AutoGameType {
  type: string;
  config: Record<string, unknown>;
}

export interface GameCardProps {
  item: BaseGameItem;
  onClick?: () => void;
  className?: string;
}

/**
 * Value של GameConfig Context
 */
export interface GameConfigContextValue {
  // Current game info
  gameType: AutoGameType | GameType | null;
  config: GameUIConfig | null;
  items: BaseGameItem[] | null;
  CardComponent: React.ComponentType<GameItemCardProps> | null;
  useGameHook: unknown | null;
  
  // Validation
  isSupported: boolean;
  isReady: boolean;
  
  // Error handling
  error: string | null;
}

/**
 * Props עבור GameConfig Provider
 */
export interface GameConfigProviderProps {
  children: ReactNode;
  gameType?: AutoGameType | GameType;
}
