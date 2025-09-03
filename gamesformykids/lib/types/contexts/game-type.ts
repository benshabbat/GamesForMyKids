/**
 * ===============================================
 * Game Type Context Types - Clean Code & SOLID
 * ===============================================
 */

import { ReactNode } from 'react';
import { GameType, BaseGameItem } from '../core/base';

/**
 * הגדרת תצורת UI למשחק - עקרון Single Responsibility
 */
export interface GameUIConfiguration {
  readonly title: string;
  readonly description: string;
  readonly instructions: readonly string[];
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

/**
 * Props עבור GameType Provider - עקרון Single Responsibility
 */
export interface GameTypeProviderProps {
  readonly children: ReactNode;
  initialGameType?: GameType;
}
