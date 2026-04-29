/**
 * ===============================================
 * טיפוסים ל-UniversalGameContext - Clean Code & SOLID
 * ===============================================
 */

import { ComponentType } from 'react';
import { BaseGameItem, GameType } from '../core/base';

// הערה: טיפוסים משותפים קיימים גם ב-hooks/game-state, יש להוסיף הפנייה מתאימה
import { GameItemCardProps } from '../hooks/game-state';

/**
 * מצב משחק כללי - עקרון Single Responsibility
 */
import type { GameUIConfig } from './game-config';

// הערה: GameUIConfig מיובא מ-game-config לפי עקרון DRY

/**
 * מצב משחק עם סטטיסטיקות - עקרון Single Responsibility
 */
interface GameStatistics {
  readonly score: number;
  readonly level: number;
  readonly currentAccuracy: number;
}

/**
 * מצב משחק נוכחי - עקרון Single Responsibility
 */
interface GameCurrentState {
  readonly isPlaying: boolean;
  readonly showCelebration: boolean;
  readonly currentChallenge: BaseGameItem | null;
  readonly options: readonly BaseGameItem[];
  readonly gameState?: object | null; // לתאימות לאחור
}

/**
 * מצב תקינות משחק - עקרון Single Responsibility
 */
interface GameReadinessState {
  readonly isReady: boolean;
  readonly error: string | null;
}

/**
 * פעולות משחק בסיסיות - עקרון Single Responsibility
 */
interface BasicGameActions {
  readonly startGame: () => void;
  readonly resetGame: () => void;
  readonly handleItemClick: (item: BaseGameItem) => void;
  readonly speakItemName: (itemName: string) => void;
}

/**
 * תצורת משחק בסיסית - Base interface לכל התצורות - עקרון DRY
 */
interface BaseGameConfiguration {
  readonly config: GameUIConfig;
  readonly items: readonly BaseGameItem[];
  readonly CardComponent: ComponentType<GameItemCardProps>;
  readonly gameType: GameType;
}

/**
 * תצורת משחק אוניברסלית - עקרון Single Responsibility
 */
type UniversalGameConfiguration = BaseGameConfiguration;

/**
 * מערכת רמזים - עקרון Single Responsibility
 */
interface GameHintsSystem {
  readonly hints: readonly string[];
  readonly hasMoreHints: boolean;
  readonly showNextHint: () => void;
}

/**
 * UI משחק - עקרון DRY, type alias
 */
type GameUI = {
  readonly showProgressModal: boolean;
  readonly setShowProgressModal: (show: boolean) => void;
};

/**
 * Value של UniversalGame Context - עקרון Interface Segregation
 */
export interface UniversalGameContextValue extends 
  GameStatistics,
  GameCurrentState,
  GameReadinessState,
  BasicGameActions,
  UniversalGameConfiguration,
  GameHintsSystem,
  GameUI {}

// UniversalGameProviderProps removed (unused)
