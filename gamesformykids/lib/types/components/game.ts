/**
 * ===============================================
 * טיפוסים לקומפוננטות Game
 * ===============================================
 */

import { Category, GameRegistration } from '../games/base';

/**
 * Step במשחק - להוראות משחק, עקרון DRY
 */
export interface GameStep {
  readonly title: string;
  readonly description: string; // חובה כיוון שהקומפוננט מצפה לזה
  readonly icon: string;
  readonly stepNumber?: number;
  readonly stepText?: string;
}

/**
 * Props לקלף קטגוריה
 * @description קומפוננט המציג קטגוריית משחקים
 */
export interface CategoryCardProps {
  /** הקטגוריה המוצגת */
  category: Category;
  /** מספר כלל המשחקים בקטגוריה */
  gamesCount: number;
  /** פונקציה שמתבצעת בלחיצה */
  onClick: () => void;
}

/**
 * Props לקלף משחק
 * @description קומפוננט המציג משחק ספציפי
 */
export interface GameCardProps {
  /** המשחק המוצג */
  game: GameRegistration;
}

export interface RecommendationsHeaderProps {
  title: string;
  description: string;
}


