/**
 * ===============================================
 * טיפוסים מיוחדים למשחקים ספציפיים
 * ===============================================
 */

import { BaseGameItem, BaseGameState } from './base';

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
 * מצבי משחק רגילים (משתמשים ב-BaseGameItem)
 */
export type LetterGameState = BaseGameState<BaseGameItem>;
export type FruitGameState = BaseGameState<BaseGameItem>;
export type AnimalGameState = BaseGameState<BaseGameItem>;
export type WeatherGameState = BaseGameState<BaseGameItem>;
export type TransportGameState = BaseGameState<BaseGameItem>;
export type VegetableGameState = BaseGameState<BaseGameItem>;
export type InstrumentGameState = BaseGameState<BaseGameItem>;
export type SpaceGameState = BaseGameState<BaseGameItem>;
export type ClothingGameState = BaseGameState<BaseGameItem>;
export type SmellTasteGameState = BaseGameState<BaseGameItem>;
export type HouseGameState = BaseGameState<BaseGameItem>;
export type ToolGameState = BaseGameState<BaseGameItem>;
export type VehicleGameState = BaseGameState<BaseGameItem>;

/**
 * נתונים מיוחדים (לתאימות לאחור)
 */
export interface AnimalData {
  emoji: string;
  sound: string;
  name: string;
}
