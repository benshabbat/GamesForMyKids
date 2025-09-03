/**
 * ===============================================
 * Game Configuration Context Types - Clean Code & SOLID
 * ===============================================
 */

import type { GameStep } from '../components';
import { GameType, BaseGameItem } from '../core/base';
import { GameItemCardProps } from '../hooks/game-state';
import type { TypedConfiguration } from '../core/abstracts';

/**
 * תצורת UI למשחק - עקרון Single Responsibility
 */
export interface GameUIConfig {
  readonly title: string;
  readonly description?: string;
  readonly instructions?: readonly string[];
  readonly subTitle?: string;
  readonly itemsTitle?: string;
  readonly itemsDescription?: string;
  readonly challengeTitle?: string;
  readonly challengeIcon?: string;
  readonly challengeDescription?: string;
  readonly itemLabel?: string;
  readonly steps?: readonly GameStep[];
  readonly colors?: {
    readonly background?: string;
    readonly header?: string;
    readonly subHeader?: string;
    readonly itemsDescription?: string;
    readonly button?: { 
      readonly from: string; 
      readonly to: string; 
    };
    readonly stepsBg?: string;
  };
  readonly grid?: {
    readonly className?: string;
    readonly showSpeaker?: boolean;
  };
}

/**
 * סוג משחק אוטומטי - עקרון DRY, שימוש ב-TypedConfiguration
 */
export interface AutoGameType extends TypedConfiguration {}

// הערה: GameCardProps מוגדר ב-components/game.ts לפי עקרון DRY

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

// הערה: GameConfigProviderProps מוגדר ב-general.ts לפי עקרון DRY
