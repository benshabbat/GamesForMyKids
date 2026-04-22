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
 * Type aliases לתאימות לאחור - כולם מצביעים לאותו type
 */
// הערה: מחקתי 12 type aliases זהים - עקרון DRY

/**
 * נתונים מיוחדים (לתאימות לאחור)
 */
export interface AnimalData {
  emoji: string;
  sound: string;
  name: string;
}
