/**
 * ===============================================
 * טיפוסים לקומפוננטות Cards - Clean Code & SOLID
 * ===============================================
 */

import { BaseGameItem } from '../core/base';
import { ColorItem, ShapeItem, NumberItem } from '../games/items';

import type { Nameable, Translatable, Visualizable, Audioable } from '../core/base';

// ===== SOLID Principle: Single Responsibility =====

/**
 * תוכן טקסטואלי - שימוש ב-Translatable, עקרון DRY
 */
export interface ItemTextContent extends Translatable {}

/**
 * מאפיינים ויזואליים בסיסיים - שימוש ב-Visualizable, עקרון DRY
 */
export interface ItemVisuals extends Visualizable {}

/**
 * מאפיינים קוליים - שימוש ב-Audioable, עקרון DRY
 */
export interface ItemAudio extends Audioable {}

/**
 * מאפיינים גיאומטריים - עקרון Single Responsibility
 */
export interface ShapeProperties {
  readonly shape: string;
  readonly shapeHebrew: string;
  readonly svg: string;
}

/**
 * מאפיינים של ערך - עקרון Single Responsibility
 */
export interface ValueProperties {
  readonly value: string;
  readonly tailwindClass?: string;
}

/**
 * פריט צורה צבעונית - עקרון Interface Segregation
 */
export interface ColoredShapeItem extends 
  Nameable,
  ItemTextContent,
  ItemVisuals,
  ItemAudio,
  ShapeProperties,
  ValueProperties {}

// ===== SOLID Principle: Open/Closed =====

/**
 * טייפ union למיני פריטים - עקרון Open/Closed
 * ניתן להוסיף טייפים חדשים מבלי לשנות קוד קיים
 */
export type GameItemType = BaseGameItem | ColorItem | ShapeItem | NumberItem | ColoredShapeItem;

// ===== SOLID Principle: Interface Segregation =====

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
}
