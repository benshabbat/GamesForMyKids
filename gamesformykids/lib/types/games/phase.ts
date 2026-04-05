/**
 * ===============================================
 * טיפוסי Phase משותפים למשחקים
 * ===============================================
 * במקום להגדיר `type Phase = ...` בכל hook בנפרד,
 * מייבאים מכאן.
 */

/** שלבי משחק בסיסיים: תפריט → משחק → תוצאה */
export type PhaseResult = 'menu' | 'playing' | 'result';

/** שלבי משחק ארקייד: תפריט → משחק → מוות */
export type PhaseDead = 'menu' | 'playing' | 'dead';

/** שלבי משחק חידון: תפריט → משחק → תשובה → סיום */
export type PhaseQuiz = 'menu' | 'playing' | 'answered' | 'finished';

/** שלבי משחק עם ניצחון ומוות (brick-breaker) */
export type PhaseWonDead = 'menu' | 'playing' | 'won' | 'dead';

/** שלבי משחק סיימון */
export type PhaseSimon = 'menu' | 'showing' | 'input' | 'dead';

/** שלבי משחק עם תוצאות (results) — number-bubbles, word-scramble */
export type PhaseResults = 'menu' | 'playing' | 'results';
