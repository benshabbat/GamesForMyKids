/**
 * ===============================================
 * Game Config Context Types - Clean Code & SOLID
 * ===============================================
 */

import { ReactNode } from 'react';
import { GameType, BaseGameItem } from '../core/base';
import { GameItemCardProps } from '../hooks/game-state';

/**
 * תצורת UI למשחק - עקרון Single Responsibility
 */
export interface GameUIConfig {
  readonly title: string;
  readonly description: string;
  readonly instructions: readonly string[];
}

/**
 * סוג משחק אוטומטי - עקרון Single Responsibility
 */
export interface AutoGameType {
  readonly type: string;
  readonly config: Readonly<Record<string, object>>;
}

/**
 * Props לכרטיס משחק - עקרון Single Responsibility
 */
export interface GameCardProps {
  readonly item: BaseGameItem;
  readonly onClick?: () => void;
  readonly className?: string;
}

/**
 * מידע משחק נוכחי - עקרון Single Responsibility
 */
export interface CurrentGameInfo {
  readonly gameType: AutoGameType | GameType | null;
  readonly config: GameUIConfig | null;
  readonly items: readonly BaseGameItem[] | null;
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
 * Props עבור GameConfig Provider - עקרון Single Responsibility
 */
export interface GameConfigProviderProps {
  readonly children: ReactNode;
  readonly gameType?: AutoGameType | GameType;
}
