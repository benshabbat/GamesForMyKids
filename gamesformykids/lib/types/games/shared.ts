/**
 * ===============================================
 * טיפוסים בסיסיים משותפים למשחקים שונים
 * ===============================================
 */

/** קואורדינטה דו-ממדית — משמשת ב-canvas games */
export interface Point {
  x: number;
  y: number;
}

/** שאלת חידון עם תשובות מרובות */
export interface QuizQuestion {
  question: string;
  answers: string[];
  correctIndex: number;
}

/** אופרטור חשבון */
export type ArithOp = '+' | '-' | '×';
