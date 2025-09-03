/**
 * ===============================================
 * ייצוא מרכזי לטיפוסי קומפוננטות - Clean Code
 * ===============================================
 */

import type { ReactNode } from 'react';

// ייצוא האינטרפייסים הקיימים מה-UI
import type {
  ButtonProps,
  ErrorScreenProps,
  NavigationProps
} from '../ui/core';

// Individual type exports for namespace access
export type AgeGroupCardProps = {
  ageGroup: Record<string, unknown>;
};

export type AllGamesViewProps = {
  games?: Record<string, unknown>[];
};

export type CategoriesViewProps = {
  categories?: Record<string, unknown>[];
};

export type CategoryGamesViewProps = {
  category?: Record<string, unknown>;
};

export type CategoryCardProps = {
  category: Record<string, unknown>;
};

export type CategoryNavigationProps = NavigationProps;

export type FeaturedGameCallToActionProps = {
  featuredGame: Record<string, unknown>;
};

export type GameCardProps = {
  game: Record<string, unknown>;
  onClick?: () => void;
};

export type RecommendationsHeaderProps = {
  title: string;
  description?: string;
};

export type SimpleGameStartButtonProps = ButtonProps;

export type BaseGameCardProps = {
  title: string;
  onClick?: () => void;
};

export type ColoredShapeCardProps = {
  item: Record<string, unknown>;
  onClick?: (item: Record<string, unknown>) => void;
};

export type UnifiedCardProps = {
  size?: 'small' | 'medium' | 'large';
  shape?: 'rounded' | 'circle' | 'square';
  aspectRatio?: 'square' | 'wide' | 'tall';
  hoverEffect?: 'scale' | 'lift' | 'glow' | 'none';
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
  animation?: 'bounce' | 'pulse' | 'none';
};

export type GameCardGridProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  items: T[];
  renderItem?: (item: T, index: number) => ReactNode;
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