/**
 * ===============================================
 * טיפוסים לutils כלליים - Clean Code & SOLID
 * ===============================================
 */

import type { DifficultyLevel } from '../games/base';

/**
 * מידע בסיסי לStructured Data - עקרון Single Responsibility
 */
export interface StructuredDataBasicInfo {
  readonly gameType: string;
  readonly title: string;
  readonly description: string;
}

/**
 * הגדרות קושי לStructured Data - עקרון Single Responsibility
 */
export interface StructuredDataDifficulty {
  readonly difficulty?: DifficultyLevel;
}

/**
 * טווח גילאים - עקרון Single Responsibility
 */
export interface AgeRange {
  readonly min: number;
  readonly max: number;
}

/**
 * מידע על קבוצת יעד - עקרון Single Responsibility
 */
export interface TargetAudience {
  readonly ageRange?: AgeRange;
}

/**
 * תכונות משחק - עקרון Single Responsibility
 */
export interface GameFeatures {
  readonly features?: ReadonlyArray<string>;
}

/**
 * Props לStructured Data של משחק - עקרון Interface Segregation
 */
export interface GameStructuredDataProps extends 
  StructuredDataBasicInfo,
  StructuredDataDifficulty,
  TargetAudience,
  GameFeatures {}

/**
 * צבעי עיצוב - עקרון Single Responsibility
 */
export interface ThemeColors {
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly backgroundColor: string;
  readonly textColor: string;
}

/**
 * מאפיינים טיפוגרפיים - עקרון Single Responsibility
 */
export interface ThemeTypography {
  readonly fontFamily: string;
}

/**
 * מאפיינים גיאומטריים - עקרון Single Responsibility
 */
export interface ThemeGeometry {
  readonly borderRadius: string;
}

/**
 * ערכת נושא למשחק - עקרון Interface Segregation
 */
export interface GameTheme extends ThemeColors, ThemeTypography, ThemeGeometry {
  readonly name: string;
}

/**
 * מיקום בועה - עקרון Single Responsibility
 */
export interface BubblePosition {
  readonly x: number;
  readonly y: number;
}

/**
 * מאפיינים פיזיקליים של בועה - עקרון Single Responsibility
 */
export interface BubblePhysics {
  readonly size: number;
  readonly speed: number;
}

/**
 * מאפיינים ויזואליים של בועה - עקרון Single Responsibility
 */
export interface BubbleVisuals {
  readonly color: string;
  readonly content?: string;
  readonly emoji?: string;
}

/**
 * נתוני בועה - עקרון Interface Segregation
 */
export interface BubbleData extends 
  BubblePosition,
  BubblePhysics,
  BubbleVisuals {
  readonly id: string;
}

/**
 * סטטוס משחק - עקרון Open/Closed
 */
export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameOver';

/**
 * מצב בועות במשחק - עקרון Single Responsibility
 */
export interface BubbleCollection {
  readonly bubbles: ReadonlyArray<BubbleData>;
  readonly poppedBubbles: number;
}

/**
 * מצב זמן במשחק - עקרון Single Responsibility
 */
export interface GameTiming {
  readonly timeLeft: number;
}

/**
 * מצב משחק בועות - עקרון Interface Segregation
 */
export interface BubbleGameState extends 
  BubbleCollection,
  GameTiming {
  readonly score: number;
  readonly level: number;
  readonly gameStatus: GameStatus;
}

/**
 * סוגי פעולות מתמטיות - עקרון Open/Closed
 */
export type MathOperator = '+' | '-' | '*' | '/';

/**
 * בעיה מתמטית - עקרון Single Responsibility
 */
export interface MathProblem {
  readonly operand1: number;
  readonly operand2: number;
  readonly operator: MathOperator;
  readonly answer: number;
}

/**
 * אפשרויות תשובה - עקרון Single Responsibility
 */
export interface AnswerOptions {
  readonly options: ReadonlyArray<number>;
}

/**
 * מערכת חיים במשחק - עקרון Single Responsibility
 */
export interface GameLives {
  readonly lives: number;
}

/**
 * זמן אופציונלי - עקרון Single Responsibility
 */
export interface OptionalTiming {
  readonly timeLeft?: number;
}

/**
 * מצב משחק בועות מתמטי - עקרון Interface Segregation
 */
export interface BubbleGameMathState extends 
  AnswerOptions,
  GameLives,
  OptionalTiming {
  readonly currentProblem: MathProblem | null;
  readonly score: number;
  readonly level: number;
  readonly gameStatus: Exclude<GameStatus, 'paused'>;
}
