/**
 * ===============================================
 * Game Configuration Context Types - Clean Code & SOLID
 * ===============================================
 */

import { GameType, BaseGameItem } from '../core/base';
import { GameItemCardProps } from '../hooks/game-state';
import type { TypedConfiguration } from '../core/abstracts';
import { GameUIConfig } from '../../constants/ui/gameConfigs';

// Re-export GameUIConfig from constants to avoid duplication
export type { GameUIConfig } from '../../constants/ui/gameConfigs';

/**
 * סוג משחק אוטומטי - עקרון DRY, type alias
 */
export type AutoGameType = TypedConfiguration;

// הערה: GameCardProps מוגדר ב-components/game.ts לפי עקרון DRY

/**
 * מידע משחק נוכחי - עקרון Single Responsibility
 */
export interface CurrentGameInfo {
  readonly gameType: AutoGameType | GameType | null;
  readonly config: GameUIConfig | null;
  readonly items: BaseGameItem[] | null;
  readonly CardComponent: React.ComponentType<GameItemCardProps> | null;
  readonly useGameHook: object | null;
}

/**
 * מצב תקינות המשחק - עקרון Single Responsibility
 */
export interface GameValidationStatus {
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

/**
 * Props לProvider של GameConfig Context
 */
export interface GameConfigProviderProps {
  readonly children: React.ReactNode;
  readonly gameType?: GameType;
}

/**
 * Props לכרטיס משחק מתוך context
 */
export interface GameCardProps {
  readonly gameType: GameType;
  readonly items?: readonly BaseGameItem[];
}

// הערה: GameConfigProviderProps מוגדר כאן לפי עקרון DRY
