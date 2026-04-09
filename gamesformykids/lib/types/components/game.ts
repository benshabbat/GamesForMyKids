/**
 * ===============================================
 * טיפוסים לקומפוננטות Game
 * ===============================================
 */

import { Category, AgeGroup, GameRegistration } from '../games/base';

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
 * Props לפריט משחק בסיסי
 * @description קומפוננט המייצג פריט יחיד במשחק (כמו אות, מספר, צבע וכו')
 */
export interface GameItemProps {
  /** הפריט המוצג */
  item: {
    /** שם הפריט */
    name: string;
    /** טקסט בעברית */
    hebrew?: string;
    /** טקסט באנגלית */
    english?: string;
    /** אמוג'י לתצוגה */
    emoji?: string;
  };
  /** פונקציה שמתבצעת בלחיצה */
  onClick: () => void;
  /** האם הפריט נבחר */
  isSelected?: boolean;
  /** סוג התצוגה */
  variant?: 'card' | 'button' | 'tile';
  
  // נוספים לתאימות
  hebrewText?: string;
  secondaryText?: string;
  color?: string;
  icon?: React.ReactNode;
  shape?: "rounded" | "circle" | "square";
  size?: "small" | "medium" | "large";
  hideSoundIcon?: boolean;
  textColor?: string;
  borderColor?: string;
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

export interface AgeGroupCardProps {
  ageGroup: AgeGroup;
}

export interface RecommendationsHeaderProps {
  title: string;
  description: string;
}

export interface FeaturedGameCallToActionProps {
  featuredGame: GameRegistration;
}
