/**
 * ===============================================
 * Game Config Context Types
 * ===============================================
 */

import { ReactNode } from 'react';
import { GameType, BaseGameItem } from '../base';
import { GameUIConfig } from '@/lib/constants/ui/gameConfigs';
import { AutoGameType } from '@/lib/constants/gameHooksMap';
import { GameItemCardProps } from '../hooks/game-state';

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
