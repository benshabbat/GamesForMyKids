/**
 * ===============================================
 * Game Type Context Types - Clean Code & SOLID
 * ===============================================
 */

import type { GameStep } from '../components';
import { GameType, BaseGameItem } from '../core/base';

/**
 * הגדרת תצורת UI למשחק - עקרון Single Responsibility
 */
export interface GameUIConfiguration {
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
 * מפה של תצורות UI למשחקים - עקרון Open/Closed
 */
export const GAME_UI_CONFIGS: Readonly<Record<string, GameUIConfiguration>> = {};

/**
 * מצב סוג משחק - עקרון Single Responsibility
 */
export interface GameTypeState {
  readonly currentGameType: GameType | null;
  readonly previousGameType: GameType | null;
  readonly gameHistory: readonly GameType[];
}

/**
 * פעולות לניהול סוג משחק - עקרון Single Responsibility
 */
export interface GameTypeActions {
  readonly setCurrentGameType: (gameType: GameType) => void;
  readonly navigateToGame: (gameType: GameType) => void;
  readonly goToPreviousGame: () => void;
  readonly clearGameHistory: () => void;
}

/**
 * כלים עזר לסוג משחק - עקרון Single Responsibility
 */
export interface GameTypeUtilities {
  readonly isGameSupported: (gameType: string) => boolean;
  readonly getGameConfig: (gameType: GameType) => GameUIConfiguration | null;
  readonly getGameItems: (gameType: GameType) => readonly BaseGameItem[] | null;
}

/**
 * Value של GameType Context - עקרון Interface Segregation
 */
export interface GameTypeContextValue extends 
  GameTypeActions,
  GameTypeUtilities {
  readonly gameState: GameTypeState;
  readonly currentGameType: GameType | null;
  readonly currentGameConfig: GameUIConfiguration | null;
  readonly currentGameItems: readonly BaseGameItem[] | null;
}

// הערה: GameTypeProviderProps מוגדר ב-general.ts לפי עקרון DRY
