/**
 * ===============================================
 * טיפוסים לממשק המשתמש - ישנים (לתאימות לאחור)
 * ===============================================
 */

/**
 * שלב הדרכה במשחק
 */
export interface GameStep {
  stepNumber?: number;
  stepText?: string; // alias ל-description 
  icon: string;
  title: string;
  description: string;
}

/**
 * מאפייני כפתורי התחלה
 */
export interface StartButtonProps {
  fromColor?: string;
  toColor?: string;
  onStart: () => void;
}

/**
 * מאפייני הוראות משחק
 */
export interface GameInstructionsProps {
  steps: GameStep[];
  bgClass?: string;
}
