/**
 * ===============================================
 * טיפוסים לקומפוננטות Game
 * ===============================================
 */

import { Category, AgeGroup, GameRegistration } from '../game';

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
  /** מספר המשחקים הזמינים */
  availableCount: number;
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

export interface CategoriesViewProps {
  categories: Record<string, Category>;
  allGameRegistrations: GameRegistration[];
  onCategorySelect: (categoryKey: string) => void;
}

export interface CategoryGamesViewProps {
  selectedCategory: string;
  categories: Record<string, Category>;
  allGameRegistrations: GameRegistration[];
  onBackToCategories: () => void;
}

export interface AllGamesViewProps {
  allGameRegistrations: GameRegistration[];
  totalGamesCount: number;
}

export interface AgeGroupCardProps {
  ageGroup: AgeGroup;
}

export interface CategoryNavigationProps {
  selectedCategory: string | null;
  showAllGames: boolean;
  totalGamesCount: number;
  onShowCategories: () => void;
  onShowAllGames: () => void;
}

export interface RecommendationsHeaderProps {
  title: string;
  description: string;
}

export interface FeaturedGameCallToActionProps {
  featuredGame: GameRegistration;
}
