/**
 * ===============================================
 * טיפוסים לקומפוננטות Cards - מחולק ונקי
 * ===============================================
 */

import { BaseGameItem } from '../core/base';
import { ColorItem, ShapeItem, NumberItem } from '../games/items';

// ===== BASIC TYPES =====

export interface ColoredShapeItem {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
  shape: string;
  shapeHebrew: string;
  svg: string;
  value: string;
  tailwindClass?: string;
}

export type GameItemType = BaseGameItem | ColorItem | ShapeItem | NumberItem;

// ===== SHARED INTERFACES =====

/**
 * תוכן שמוצג על הכרטיס
 */
export interface CardContent {
  hebrew?: boolean;
  english?: boolean;
  emoji?: boolean;
  soundIcon?: boolean;
}

/**
 * עיצוב הכרטיס
 */
export interface CardAppearance {
  size?: "small" | "medium" | "large";
  shape?: "rounded" | "circle" | "square";
  variant?: 'default' | 'large' | 'compact' | 'simple' | 'advanced';
  
  // צבעים
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  hoverFrom?: string;
  hoverTo?: string;
  borderColor?: string;
  borderWidth?: string;
  textColor?: string;
  
  // צורה ומבנה
  aspectRatio?: "square" | "wide" | "tall";
  borderRadius?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  
  // אפקטים
  animation?: "bounce" | "pulse" | "none";
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  hoverEffect?: "scale" | "lift" | "glow" | "none";
  backgroundPattern?: "stars" | "dots" | "none";
}

/**
 * התנהגות הכרטיס
 */
export interface CardBehavior {
  animationEnabled?: boolean;
  autoSpeak?: boolean;
  onSpeak?: () => void;
  useContext?: boolean;
}

/**
 * תוכן מותאם אישית
 */
export interface CardCustomContent {
  customContent?: React.ReactNode;
  customDecoration?: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
  digit?: string;
  svg?: string;
  value?: string;
}

// ===== MAIN CARD PROPS =====

/**
 * Props בסיסיים לכל כרטיס
 */
export interface BaseCardProps extends CardAppearance, CardBehavior, CardCustomContent {
  className?: string;
  isSelected?: boolean;
}

/**
 * כרטיס פריט משחק כללי
 */
export interface GameItemCardProps extends BaseCardProps {
  item: BaseGameItem;
  onClick: (item: BaseGameItem) => void;
  showContent?: CardContent;
}

/**
 * כרטיס פריט עם צבע וצורה
 */
export interface ColoredShapeCardProps extends BaseCardProps {
  item: ColoredShapeItem;
  onClick?: () => void;
  showShape?: boolean;
  showColor?: boolean;
  showValue?: boolean;
}

/**
 * כרטיס מאוחד - יכול להיות הכל
 */
export interface UnifiedCardProps extends BaseCardProps {
  // Data
  item?: BaseGameItem;
  onClick?: (item?: BaseGameItem) => void;
  showContent?: CardContent;
  
  // Simple mode - for direct text input
  hebrewText?: string;
  secondaryText?: string;
  name?: string;
  
  // Display flags (deprecated - use showContent instead)
  /** @deprecated Use showContent.hebrew instead */
  showHebrew?: boolean;
  /** @deprecated Use showContent.english instead */
  showEnglish?: boolean;
  /** @deprecated Use showContent.emoji instead */
  showEmoji?: boolean;
  /** @deprecated Use showContent.soundIcon instead */
  showSoundIcon?: boolean;
  /** @deprecated Use showContent.soundIcon instead */
  hideSoundIcon?: boolean;
}

// ===== GRID COMPONENTS =====

/**
 * רשת כרטיסי משחק
 */
export interface GameCardGridProps<T extends GameItemType> {
  // Core properties
  items: T[];
  onItemClick?: (item: T) => void;
  currentChallenge?: T | null;
  selectedItem?: T | null;
  gameTitle?: string;
  
  // Display options
  showContent?: CardContent;
  cardProps?: Partial<BaseCardProps>;
  
  // Layout options
  gridCols?: number | string;
  maxWidth?: string;
  gap?: string;
  
  // Comparison and rendering
  compareKey?: keyof T;
  renderCustomCard?: (item: T, isCorrect: boolean) => React.ReactNode;
  cardClassName?: string;
  
  // Context usage
  useContext?: boolean;
  
  // Legacy props (deprecated)
  /** @deprecated Use showContent.hebrew instead */
  showHebrew?: boolean;
  /** @deprecated Use showContent.english instead */
  showEnglish?: boolean;
  /** @deprecated Use showContent.emoji instead */
  showEmoji?: boolean;
  /** @deprecated Use cardProps.variant instead */
  cardVariant?: 'default' | 'large' | 'compact';
  /** @deprecated Use showContent.soundIcon instead */
  showSoundIcon?: boolean;
  /** @deprecated Use cardProps.animationEnabled instead */
  animationEnabled?: boolean;
}
