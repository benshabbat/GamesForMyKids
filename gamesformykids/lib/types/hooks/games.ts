/**
 * ===============================================
 * טיפוסים לhooks של Games - Clean Code & SOLID
 * ===============================================
 */

/**
 * הגדרות בסיסיות למשחק פשוט - עקרון Single Responsibility
 */
export interface SimpleGameBasicConfig {
  readonly gameType: string;
}

/**
 * הגדרות קושי למשחק - עקרון Single Responsibility
 */
export interface GameDifficultyConfig {
  readonly difficulty?: DifficultyLevel;
}

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

/**
 * ייבוא רמות הקושי מהטייפים הבסיסיים
 */
import type { DifficultyLevel } from '../games/base';
