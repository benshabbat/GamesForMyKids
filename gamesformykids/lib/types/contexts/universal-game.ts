/**
 * ===============================================
 * טיפוסים ל-UniversalGameContext - Clean Code & SOLID
 * ===============================================
 */

import React from 'react';
import { BaseGameItem, GameType } from '../core/base';
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
 * מצב משחק עם סטטיסטיקות - עקרון Single Responsibility
 */
export interface GameStatistics {
  readonly score: number;
  readonly level: number;
  readonly currentAccuracy: number;
}

/**
 * מצב משחק נוכחי - עקרון Single Responsibility
 */
export interface GameCurrentState {
  readonly isPlaying: boolean;
  readonly showCelebration: boolean;
  readonly currentChallenge: BaseGameItem | null;
  readonly options: readonly BaseGameItem[];
}

/**
 * מצב תקינות משחק - עקרון Single Responsibility
 */
export interface GameReadinessState {
  readonly isReady: boolean;
  readonly error: string | null;
}

/**
 * פעולות משחק - עקרון Single Responsibility
 */
export interface GameActions {
  readonly startGame: () => void;
  readonly resetGame: () => void;
  readonly handleItemClick: (item: BaseGameItem) => void;
  readonly speakItemName: (itemName: string) => void;
}

/**
 * תצורת משחק - עקרון Single Responsibility
 */
export interface GameConfiguration {
  readonly config: GameUIConfig;
  readonly items: readonly BaseGameItem[];
  readonly CardComponent: React.ComponentType<GameItemCardProps>;
  readonly gameType: GameType;
}

/**
 * מערכת רמזים - עקרון Single Responsibility
 */
export interface GameHintsSystem {
  readonly hints: readonly string[];
  readonly hasMoreHints: boolean;
  readonly showNextHint: () => void;
}

/**
 * UI משחק - עקרון Single Responsibility
 */
export interface GameUI {
  readonly showProgressModal: boolean;
  readonly setShowProgressModal: (show: boolean) => void;
}

/**
 * Value של UniversalGame Context - עקרון Interface Segregation
 */
export interface UniversalGameContextValue extends 
  GameStatistics,
  GameCurrentState,
  GameReadinessState,
  GameActions,
  GameConfiguration,
  GameHintsSystem,
  GameUI {}

/**
 * טיפוס לProps של UniversalGameProvider
 * SOLID Principle: Interface Segregation - פירוד אחריות
 */
export interface UniversalGameProviderProps {
  children: React.ReactNode;
  gameType?: GameType;
}
