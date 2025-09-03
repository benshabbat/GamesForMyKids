 /**
 * ===============================================
 * טיפוסים לhooks של Game State - Clean Code & SOLID
 * ===============================================
 */

import type { ComponentType } from 'react';
import { BaseGameItem, GameType, BaseGameState, ProgressModalState, GameTyped, BaseDifficultyConfig } from '../core/base';
import type { GameItemCardProps } from '../components/cards';

// ייצוא הטייפ למען תאימות - עקרון Liskov Substitution
export type { GameItemCardProps };

// Alias for backward compatibility - עקרון Liskov Substitution
export type GameCardProps = GameItemCardProps;

/**
 * תצורת UI בסיסית למשחק - עקרון Single Responsibility
 */
export interface BasicGameUIConfig {
  readonly title: string;
  readonly description: string;
  readonly instructions: readonly string[];
}

/**
 * Props לאפשרויות משחק - עקרון Single Responsibility
 */
export interface UseGameOptionsProps {
  readonly allItems: readonly BaseGameItem[];
  readonly level: number;
  readonly baseCount?: number;
  readonly increment?: number;  
  readonly levelThreshold?: number;
}

/**
 * קבועי משחק - עקרון Single Responsibility
 */
export interface GameConstants {
  readonly BASE_COUNT: number;
  readonly INCREMENT: number;
  readonly LEVEL_THRESHOLD: number;
}

/**
 * הגדרת משחק בסיסית - עקרון Interface Segregation
 */
export interface UseBaseGameConfig {
  readonly gameType: GameType;
  readonly items: readonly BaseGameItem[];
  readonly pronunciations: Readonly<Record<string, string>>;
  readonly gameConstants: GameConstants;
}

/**
 * מצב משחק נוכחי - עקרון Single Responsibility
 */
export interface GameState {
  readonly isPlaying: boolean;
  readonly showCelebration: boolean;
  readonly currentChallenge: BaseGameItem | null;
  readonly options: BaseGameItem[];
  readonly score: number;
  readonly level: number;
}

/**
 * נתוני אימון וסטטיסטיקות - עקרון Single Responsibility
 */
export interface GameProgress {
  readonly currentAccuracy: number;
  readonly streak: number;
  readonly timeSpent: number;
  readonly totalQuestions: number;
  readonly correctAnswers: number;
}

/**
 * תכונות מתקדמות של משחק - עקרון Single Responsibility
 */
export interface GameEnhancements {
  readonly hints?: readonly string[];
  readonly hasMoreHints?: boolean;
  readonly showNextHint?: () => void;
}

/**
 * פעולות משחק - עקרון Single Responsibility
 */
export interface GameActions {
  readonly startGame: () => void;
  readonly resetGame: () => void;
  readonly handleItemClick: (item: BaseGameItem) => void;
  readonly speakItemName: (itemName: string) => void;
  readonly pauseGame: () => void;
  readonly resumeGame: () => void;
  readonly resetProgress: () => void;
  readonly navigateToGame: (gameType: GameType) => void;
}

/**
 * פעולות תגובה למשחק - עקרון Single Responsibility
 */
export interface GameResponseActions {
  readonly handleCorrectAnswer: (data?: Record<string, unknown>) => void;
  readonly handleWrongAnswer: (data?: Record<string, unknown>) => void;
}

/**
 * מצב UI של משחק - עקרון DRY, type alias
 */
export type GameUIState = ProgressModalState;

/**
 * הגדרות משחק - עקרון Single Responsibility
 */
export interface GameConfiguration {
  readonly config: BasicGameUIConfig;
  readonly items: readonly BaseGameItem[];
  readonly CardComponent: ComponentType<GameItemCardProps>;
  readonly gameType: GameType;
}

/**
 * מצב משחק לוגי מלא - עקרון Interface Segregation
 */
export interface GameLogicState extends 
  GameState,
  GameProgress,
  GameEnhancements,
  GameActions,
  GameResponseActions,
  GameUIState,
  GameConfiguration {
  readonly gameState: GameState | null;
  readonly isGameActive: boolean;
}

/**
 * הגדרת מתקדמת למצב משחק - עקרון Single Responsibility
 */
export interface UseAdvancedGameStateConfig<T extends BaseGameItem> {
  readonly initialState: BaseGameState<T>;
}

/**
 * פריט משחק במסד נתונים - עקרון Single Responsibility
 */
export interface GameItem {
  readonly id: string;
  readonly name: string;
  readonly hebrew: string;
  readonly english: string;
  readonly emoji: string;
  readonly category: string;
  readonly subcategory?: string;
  readonly color_class?: string;
  readonly sound_frequencies: readonly number[];
  readonly additional_data: Readonly<Record<string, object>>;
  readonly created_at: string;
  readonly updated_at: string;
}

/**
 * רשומת סוג משחק במסד נתונים - עקרון Single Responsibility
 */
export interface GameTypeDbRecord {
  readonly id: string;
  readonly name: string;
  readonly display_name_hebrew: string;
  readonly display_name_english: string;
  readonly description?: string;
  readonly icon?: string;
  readonly category: string;
  readonly difficulty_level: string;
  readonly min_age: number;
  readonly max_age: number;
  readonly is_active: boolean;
  readonly created_at: string;
  readonly updated_at: string;
}

/**
 * מידע בסיסי על סוג משחק - עקרון Single Responsibility
 */
export interface GameTypeInfo {
  readonly gameType: string | null;
  readonly gameConfig: {
    readonly title: string;
    readonly subTitle: string;
  } | null;
}

/**
 * החזרת Hook קונטקסט משחק מלאה - עקרון Interface Segregation
 */
export interface GameContextHookReturn extends 
  GameTypeInfo,
  GameProgress,
  GameActions,
  GameResponseActions {
  readonly isGameActive: boolean;
}

/**
 * הגדרות בסיסיות למשחק פשוט - עקרון DRY, type alias
 */
export type SimpleGameBasicConfig = GameTyped;

/**
 * הגדרות קושי למשחק - עקרון DRY, type alias
 */
export type GameDifficultyConfig = BaseDifficultyConfig;

/**
 * הגדרות התחלה אוטומטית - עקרון Single Responsibility
 */
export interface AutoStartConfig {
  readonly autoStart?: boolean;
}

/**
 * הגדרות זמן למשחק - עקרון Single Responsibility
 */
export interface GameTimeConfig {
  readonly timeLimit?: number;
}

/**
 * Props למשחק פשוט - עקרון Interface Segregation
 */
export interface UseSimpleGameProps extends 
  SimpleGameBasicConfig,
  GameDifficultyConfig,
  AutoStartConfig,
  GameTimeConfig {}

export interface UseGameDataReturn {
  // Data
  gameItems: GameItem[];
  gameTypes: GameTypeDbRecord[];
  
  // Loading states
  loading: boolean;
  error: string | null;
  
  // Helper functions
  getItemsByCategory: (category: string) => GameItem[];
  getItemsBySubcategory: (subcategory: string) => GameItem[];
  getGameTypeByName: (name: string) => GameTypeDbRecord | undefined;
  getGameTypesByCategory: (category: string) => GameTypeDbRecord[];
  refreshData: () => Promise<void>;
  
  // Quick access to common categories
  colors: GameItem[];
  shapes: GameItem[];
  coloredShapes: GameItem[];
  numbers: GameItem[];
  letters: GameItem[];
  animals: GameItem[];
  fruits: GameItem[];
  vegetables: GameItem[];
}
