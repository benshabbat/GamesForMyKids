/**
 * ===============================================
 * טיפוסים מיוחדים למשחקים ספציפיים
 * ===============================================
 */

import { BaseGameItem, BaseGameState } from '../core/base';

/**
 * פריטים ייחודיים למשחקים מיוחדים
 */

// צורות - מכיל SVG נוסף
export interface ShapeItem extends BaseGameItem {
  svg: string;
}

// מספרים - מכיל ספרה נוספת
export interface NumberItem extends BaseGameItem {
  digit: string;
}

// מקצועות - מכיל תיאור נוסף
export interface ProfessionItem extends BaseGameItem {
  id: string;
  description: string;
}

// צבעים - מכיל ערך CSS ו-Tailwind class
export interface ColorItem extends BaseGameItem {
  value: string;
  tailwindClass?: string;
}

/**
 * אתגרים מיוחדים
 */

// אתגר מנייה
export interface CountingChallenge {
  emojis: string;
  correctAnswer: number;
  itemName: string;      // שם הפריט ביחיד (כלב)
  itemPlural: string;    // שם הפריט ברבים (כלבים)  
  emoji: string;         // האימוג'י הבודד
}

// אתגר מתמטיקה
export interface MathChallenge {
  firstNumber: number;
  secondNumber: number;
  operation: 'addition' | 'subtraction';
  correctAnswer: number;
  itemName: string;      // שם הפריט ביחיד (תפוח)
  itemPlural: string;    // שם הפריט ברבים (תפוחים)  
  emoji: string;         // האימוג'י הבודד
  // New format for compatibility
  operand1: number;
  operand2: number;
  operator: '+' | '-' | '*' | '/';
  answer: number;
  question: string;
}

/**
 * מצבי משחק מיוחדים
 */

// מצב משחק צבעים
export type ColorGameState = BaseGameState<ColorItem>;

// מצב משחק צורות
export type ShapeGameState = BaseGameState<ShapeItem>;

// מצב משחק מספרים
export type NumberGameState = BaseGameState<NumberItem>;

// מצב משחק מקצועות
export type ProfessionGameState = BaseGameState<ProfessionItem>;

// מצב משחק מנייה
export interface CountingGameState extends Omit<BaseGameState<never>, 'currentChallenge' | 'options'> {
  currentChallenge: CountingChallenge | null;
  options: number[];
}

// מצב משחק מתמטיקה
export interface MathGameState extends Omit<BaseGameState<never>, 'currentChallenge' | 'options'> {
  currentChallenge: MathChallenge | null;
  options: number[];
}

/**
 * מצבי משחק רגילים - עקרון DRY
 * כל המשחקים הבסיסיים משתמשים באותו type
 */
export type StandardGameState = BaseGameState<BaseGameItem>;

/**
 * Type aliases לתאימות לאחור - כולם מצביעים לאותו type
 */
export type LetterGameState = StandardGameState;
export type FruitGameState = StandardGameState;
export type AnimalGameState = StandardGameState;
export type WeatherGameState = StandardGameState;
export type TransportGameState = StandardGameState;
export type VegetableGameState = StandardGameState;
export type InstrumentGameState = StandardGameState;
export type SpaceGameState = StandardGameState;
export type ClothingGameState = StandardGameState;
export type SmellTasteGameState = StandardGameState;
export type HouseGameState = StandardGameState;
export type ToolGameState = StandardGameState;
export type VehicleGameState = StandardGameState;

/**
 * נתונים מיוחדים (לתאימות לאחור)
 */
export interface AnimalData {
  emoji: string;
  sound: string;
  name: string;
}
