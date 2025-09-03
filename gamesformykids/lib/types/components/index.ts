/**
 * ===============================================
 * ייצוא מרכזי לטיפוסי קומפוננטות - Clean Code & SOLID
 * ===============================================
 */

import type { ReactNode } from 'react';
import type { AgeGroup, Category, GameRegistration } from '../games/base';

// ייצוא האינטרפייסים הקיימים מה-UI
import type {
  ButtonProps,
  ErrorScreenProps,
  NavigationProps
} from '../ui/core';

/**
 * Props לכרטיס קבוצת גיל - עקרון Single Responsibility
 */
export interface AgeGroupCardProps {
  readonly ageGroup: AgeGroup;
}

/**
 * Props לתצוגת כל המשחקים - עקרון Single Responsibility
 */
export interface AllGamesViewProps {
  readonly games?: readonly GameRegistration[];
}

/**
 * Props לתצוגת קטגוריות - עקרון Single Responsibility
 */
export interface CategoriesViewProps {
  readonly categories?: readonly Category[];
}

/**
 * Props לתצוגת משחקי קטגוריה - עקרון Single Responsibility
 */
export interface CategoryGamesViewProps {
  readonly category?: Category;
}

/**
 * Props לכרטיס קטגוריה - עקרון Single Responsibility
 */
export interface CategoryCardProps {
  readonly category: Category;
}

/**
 * Props לניווט קטגוריה - עקרון Liskov Substitution
 */
export type CategoryNavigationProps = NavigationProps;

/**
 * Props לקריאה לפעולה של משחק מומלץ - עקרון Single Responsibility
 */
export interface FeaturedGameCallToActionProps {
  readonly featuredGame: GameRegistration;
}

/**
 * Props לכרטיס משחק - עקרון Single Responsibility & Interface Segregation
 */
export interface GameCardProps {
  readonly game: GameRegistration;
  readonly onClick?: () => void;
}

/**
 * Props לכותרת המלצות - עקרון Single Responsibility
 */
export interface RecommendationsHeaderProps {
  readonly title: string;
  readonly description?: string;
}

/**
 * Props לכפתור התחלת משחק פשוט - עקרון Liskov Substitution
 */
export type SimpleGameStartButtonProps = ButtonProps;

/**
 * Props בסיסיים לכרטיס משחק - עקרון Single Responsibility
 */
export interface BaseGameCardProps {
  readonly title: string;
  readonly onClick?: () => void;
}

/**
 * Props לכרטיס צורה צבועה - עקרון Single Responsibility & Interface Segregation
 */
export interface ColoredShapeCardProps<T = object> {
  readonly item: T;
  readonly onClick?: (item: T) => void;
}

/**
 * מאפיינים ויזואליים מתקדמים - עקרון Single Responsibility
 */
export interface AdvancedVisualProps {
  readonly size?: 'small' | 'medium' | 'large';
  readonly shape?: 'rounded' | 'circle' | 'square';
  readonly aspectRatio?: 'square' | 'wide' | 'tall';
  readonly hoverEffect?: 'scale' | 'lift' | 'glow' | 'none';
  readonly shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
  readonly animation?: 'bounce' | 'pulse' | 'none';
}

/**
 * Props לכרטיס מאוחד - עקרון Interface Segregation
 */
export interface UnifiedCardProps extends AdvancedVisualProps {
  readonly children?: ReactNode;
}

/**
 * Props עבור רשת כרטיסי משחק - עקרון Single Responsibility & Generics
 */
export interface GameCardGridProps<T = object> {
  readonly items: readonly T[];
  readonly renderItem?: (item: T, index: number) => ReactNode;
};

export type GameItemType = Record<string, unknown>;

export type GameItemProps = {
  item: Record<string, unknown>;
  onClick?: (item: Record<string, unknown>) => void;
};

export type GameProgressDisplayProps = {
  score?: number;
  level?: number;
};

export type ProgressDisplayProps = {
  current: number;
  total: number;
};

export type GenericBoxProps = {
  title?: string;
  children?: ReactNode;
};

export type OptimizedImageProps = {
  src: string;
  alt: string;
};

export type CelebrationBoxProps = {
  label?: ReactNode;
  value?: ReactNode;
};

export type ChallengeBoxProps = {
  icon?: ReactNode;
  description?: ReactNode;
  config?: Record<string, unknown>;
};

export type GameHintsProps = {
  hints: string[];
};

export type GameInstructionsProps = {
  steps?: Record<string, unknown>;
  config?: Record<string, unknown>;
};

export type SimpleGameInstructionsProps = {
  instructions?: string[];
};

export type TipsBoxProps = {
  tips?: string[];
};

export type GameHeaderProps = {
  title?: string;
  [key: string]: unknown;
};
export type StartScreenHeaderProps = {
  title?: string;
  [key: string]: unknown;
};
export type UnifiedHeaderProps = {
  title?: string;
  [key: string]: unknown;
};

export type GameErrorScreenProps = ErrorScreenProps;
export type GenericStartScreenProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  title: string;
  subTitle?: string;
  description?: string;
  items?: T[];
  onStart?: () => void;
  gameSteps?: unknown[];
  textColorHeader?: string;
  textColorSubHeader?: string;
  gameStepsBgClass?: string;
  buttonFromColor?: string;
  buttonToColor?: string;
  backgroundStyle?: string;
  itemsTitle?: string;
  itemsDescription?: string;
  itemsDescriptionColor?: string;
  itemsGridClass?: string;
  renderItem?: (item: T) => ReactNode;
  hideSoundIcon?: boolean;
  showAudioCheck?: boolean;
  customOnStart?: () => void;
  customItemsRenderer?: () => ReactNode;
};

// ===== קומפוננטות בסיסיות =====
export * from './buttons';    // כפתורים וקומפוננטות אינטראקטיביות
export * from './headers';    // כותרות וניווט
export * from './layout';     // מבנה עמוד ופריסה

// ===== קומפוננטות משחק =====
export * from './cards';      // קלפים ופריטי משחק
export * from './game';       // קומפוננטות ספציפיות למשחקים
export * from './icons';      // איקונים וגרפיקה

// ===== תצוגה ומשוב =====
export * from './displays';   // תצוגת מידע וסטטיסטיקות
export * from './feedback';   // רמזים, הוראות וחגיגות
export * from './screens';    // מסכים מלאים