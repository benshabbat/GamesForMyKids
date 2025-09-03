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
}

/**
 * טייפ כללי לפריט משחק - עקרון Single Responsibility
 */
export interface GameItemType {
  readonly id: string;
  readonly name: string;
}

/**
 * Props לפריט משחק - עקרון Single Responsibility & Generics
 */
export interface GameItemProps<T = GameItemType> {
  readonly item: T;
  readonly onClick?: (item: T) => void;
}

/**
 * Props להצגת התקדמות - עקרון Single Responsibility
 */
export interface GameProgressDisplayProps {
  readonly score?: number;
  readonly level?: number;
}

/**
 * Props להצגת מצב התקדמות - עקרון Single Responsibility
 */
export interface ProgressDisplayProps {
  readonly current: number;
  readonly total: number;
}

/**
 * Props לקופסה כללית - עקרון Single Responsibility
 */
export interface GenericBoxProps {
  readonly title?: string;
  readonly children?: ReactNode;
}

/**
 * Props לתמונה מותאמת - עקרון Single Responsibility
 */
export interface OptimizedImageProps {
  readonly src: string;
  readonly alt: string;
}

/**
 * Props לקופסת חגיגה - עקרון Single Responsibility
 */
export interface CelebrationBoxProps {
  readonly label?: ReactNode;
  readonly value?: ReactNode;
}

/**
 * הגדרת אתגר - עקרון Single Responsibility
 */
export interface ChallengeConfig {
  readonly difficulty: 'easy' | 'medium' | 'hard';
  readonly timeLimit?: number;
}

/**
 * Props לקופסת אתגר - עקרון Interface Segregation
 */
export interface ChallengeBoxProps {
  readonly icon?: ReactNode;
  readonly description?: ReactNode;
  readonly config?: ChallengeConfig;
}

/**
 * Props לרמזי משחק - עקרון Single Responsibility
 */
export interface GameHintsProps {
  readonly hints: readonly string[];
}

/**
 * צעדי משחק - עקרון Single Responsibility
 */
export interface GameStep {
  readonly step: number;
  readonly instruction: string;
}

/**
 * Props להוראות משחק - עקרון Interface Segregation
 */
export interface GameInstructionsProps {
  readonly steps?: readonly GameStep[];
  readonly config?: ChallengeConfig;
}

/**
 * Props להוראות פשוטות - עקרון Single Responsibility
 */
export interface SimpleGameInstructionsProps {
  readonly instructions?: readonly string[];
}

/**
 * Props לקופסת טיפים - עקרון Single Responsibility
 */
export interface TipsBoxProps {
  readonly tips?: readonly string[];
}

/**
 * Props לכותרת משחק - עקרון Single Responsibility
 */
export interface GameHeaderProps {
  readonly title?: string;
}

/**
 * Props לכותרת מסך התחלה - עקרון Liskov Substitution
 */
export type StartScreenHeaderProps = GameHeaderProps;

/**
 * Props לכותרת מאוחדת - עקרון Liskov Substitution
 */
export type UnifiedHeaderProps = GameHeaderProps;

/**
 * Props למסך שגיאה של משחק - עקרון Liskov Substitution
 */
export type GameErrorScreenProps = ErrorScreenProps;

/**
 * Props למסך התחלה כללי - עקרון Single Responsibility & Generics
 */
export interface GenericStartScreenProps<T = object> {
  readonly title: string;
  readonly subTitle?: string;
  readonly description?: string;
  readonly items?: readonly T[];
  readonly onStart?: () => void;
  readonly gameSteps?: readonly GameStep[];
  readonly textColorHeader?: string;
  readonly textColorSubHeader?: string;
  readonly gameStepsBgClass?: string;
  readonly buttonFromColor?: string;
  readonly buttonToColor?: string;
  readonly backgroundStyle?: string;
  readonly itemsTitle?: string;
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