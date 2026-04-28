/**
 * ===============================================
 * Game Configuration Context Types - Clean Code & SOLID
 * ===============================================
 */

import { GameType, BaseGameItem } from '../core/base';
import { GameItemCardProps } from '../hooks/game-state';
import { GameUIConfig } from '../../constants/ui/gameConfigs';

// Re-export GameUIConfig from constants to avoid duplication
export type { GameUIConfig } from '../../constants/ui/gameConfigs';

/**
 * מידע משחק נוכחי - עקרון Single Responsibility
 */
interface CurrentGameInfo {
  readonly gameType: GameType | null;
  readonly config: GameUIConfig | null;
  readonly items: BaseGameItem[] | null;
  readonly CardComponent: React.ComponentType<GameItemCardProps> | null;
  readonly useGameHook: object | null;
}

/**
 * מצב תקינות המשחק - עקרון Single Responsibility
 */
interface GameValidationStatus {
  readonly isSupported: boolean;
  readonly isReady: boolean;
  readonly error: string | null;
}

/**
 * Value של GameConfig Context - עקרון Interface Segregation
 */
export interface GameConfigContextValue extends 
  CurrentGameInfo,
  GameValidationStatus {}

// GameConfigProviderProps removed (unused)
