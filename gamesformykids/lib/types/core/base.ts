/**
 * ===============================================
 * טיפוסים בסיסיים למערכת המשחקים
 * ===============================================
 */

import { ReactNode } from 'react';
import type { Identifiable } from './abstracts';
import type { GameAvailability, DifficultyLevel } from '../games/base';

/**
 * שם בסיסי - עקרון Single Responsibility  
 */
export interface Nameable {
  readonly name: string;
}

/**
 * מאפיינים בסיסיים עם כותרת ותיאור - עקרון DRY
 */
export interface TitledEntity {
  readonly title: string;
  readonly description?: string;
}

/**
 * זיהוי סוג משחק - עקרון DRY
 */
export interface GameTyped {
  readonly gameType: string;
}

/**
 * ממשק לניהול modal התקדמות - עקרון DRY
 */
export interface ProgressModalState {
  readonly showProgressModal: boolean;
  readonly setShowProgressModal: (show: boolean) => void;
}

/**
 * ממשק בסיסי לרמת קושי - עקרון DRY
 */
export interface BaseDifficultyConfig {
  readonly difficulty?: DifficultyLevel;
}

/**
 * תרגום רב-לשוני - עקרון Single Responsibility
 */
export interface Translatable {
  readonly hebrew: string;
  readonly english: string;
  readonly plural?: string;
}

/**
 * מאפיינים ויזואליים - עקרון Single Responsibility
 */
export interface Visualizable {
  readonly emoji: string;
  readonly color: string;
}

/**
 * מאפיינים קוליים - עקרון Single Responsibility
 */
export interface Audioable {
  readonly sound?: number[];
}

/**
 * גרסה מקוצרת של BaseGameItem לתאימות לאחור - ללא id חובה
 * להשתמש כאשר id לא נדרש
 */
export interface BaseGameItemLegacy extends 
  Nameable,
  Translatable, 
  Visualizable, 
  Audioable {
  readonly id?: string;
}

/**
 * טייפ לנתוני משחקים ללא ID - לתמיכה בקבצי קבועים קיימים
 * SOLID Principle: Single Responsibility - אחראי רק על נתוני פריט בסיסיים ללא מזהה
 */
export interface GameDataItem {
  readonly name: string;
  readonly hebrew: string;
  readonly english: string;
  readonly emoji?: string;
  readonly color?: string;
  readonly sound?: number[];
}

// טייפ אליאס זמני לתאימות לאחור  
export type BaseGameItem = GameDataItem & { 
  id?: string;
  svg?: string; // לצורות
  digit?: string; // למספרים
  shape?: string; // לצורות צבועות
  colorName?: string; // לצורות צבועות
  svgPath?: string; // לצורות צבועות
  plural?: string; // לרבים
};

/**
 * מצב אתגר משחק בסיסי - עקרון Single Responsibility
 * מכיל רק מידע על מצב נוכחי
 */
export interface GameChallengeState<T extends BaseGameItem = BaseGameItem> {
  readonly currentChallenge: T | null;
  readonly options: T[];
}

/**
 * מצב משחק עם ניקוד - עקרון Single Responsibility
 */
export interface GameScoreState {
  readonly score: number;
  readonly level: number;
}

/**
 * מצב משחק עם סטטוס - עקרון Single Responsibility
 */
export interface GamePlayState {
  readonly isPlaying: boolean;
  readonly showCelebration: boolean;
}

/**
 * מצב משחק מלא - עקרון Interface Segregation
 * יורש מכל הממשקים הנדרשים
 */
export interface BaseGameState<T extends BaseGameItem = BaseGameItem> extends 
  GameChallengeState<T>,
  GameScoreState,
  GamePlayState {}

/**
 * הגדרות בסיסיות למשחק - עקרון Single Responsibility
 */
export interface BaseGameSettings {
  readonly baseCount: number;
  readonly increment: number;
  readonly levelThreshold: number;
}

/**
 * הגדרות מתקדמות למשחק - עקרון Interface Segregation
 */
export interface AdvancedGameSettings {
  readonly maxCount?: number;
  readonly timeLimit?: number;
  readonly difficultyScaling?: boolean;
}

/**
 * הגדרות משחק מלאות - עקרון Open/Closed
 */
export interface GameConfig extends BaseGameSettings, AdvancedGameSettings {}

/**
 * מאפיינים בסיסיים למשחק - עקרון Single Responsibility
 */
export interface GameBasicInfo extends Identifiable, Translatable {
  readonly description: string;
  readonly href: string;
}

/**
 * מאפיינים ויזואליים למשחק - עקרון Single Responsibility
 */
export interface GameVisualInfo {
  readonly icon: ReactNode;
  readonly color: string;
}

/**
 * משחק ברשימת המשחקים - עקרון Interface Segregation
 */
export interface Game extends 
  GameBasicInfo,
  GameVisualInfo,
  GameAvailability {}

/**
 * מצב כרטיס זיכרון - עקרון Single Responsibility
 */
export interface CardState {
  readonly isFlipped: boolean;
  readonly isMatched: boolean;
}

/**
 * מידע כרטיס זיכרון - עקרון Single Responsibility
 */
export interface CardInfo {
  readonly id: number;
  readonly emoji: string;
}

/**
 * כרטיס זיכרון מלא - עקרון Interface Segregation
 */
export interface Card extends CardInfo, CardState {}

/**
 * טיפוסי משחקים נתמכים
 */
export type GameType = 
  | 'colors'
  | 'letters'
  | 'shapes'
  | 'colored-shapes'
  | 'numbers'
  | 'fruits'
  | 'animals'
  | 'weather'
  | 'transport'
  | 'vegetables'
  | 'instruments'
  | 'space'
  | 'clothing'
  | 'smells-tastes'
  | 'house'
  | 'tools'
  | 'counting'
  | 'math'
  | 'memory'
  | 'professions'
  | 'vehicles'
  | 'emotions'
  | 'bubbles'
  | 'puzzles'
  | 'building'
  | 'tetris'
  // משחקים חדשים
  | 'sports'
  | 'kitchen'
  | 'body-parts'
  | 'family'
  | 'dinosaurs'
  // משחקים נוספים חדשים
  | 'world-food'
  | 'recycling'
  | 'medicine'
  | 'nature-sounds'
  | 'seasons-holidays'
  | 'feelings'
  | 'shopping-money'
  | 'road-safety'
  // 6 משחקים חדשים נוספים
  | 'ocean-life'
  | 'garden-plants'
  | 'magic-fairy-tales'
  | 'space-adventure'
  | 'cooking-kitchen'
  | 'circus-show'
  // 6 משחקים חדשים נוספים 2
  | 'virtual-reality'
  | 'new-professions'
  | 'advanced-weather'
  | 'advanced-colors'
  | 'jewish-holidays'
  | 'logic-games'
  // 6 משחקים חדשניים יוצאי דופן
  | 'sound-imitation'
  | 'body-movements'
  | 'touch-senses'
  | 'emotional-social'
  | 'time-clock'
  | 'climate-planet';
