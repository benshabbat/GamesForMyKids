/**
 * ===============================================
 * טיפוסים לקומפוננטות Cards - Clean Code & SOLID
 * ===============================================
 */

import { BaseGameItem } from '../core/base';
import { ColorItem } from '../games/items';

/**
 * פריט צורה צבעונית - עקרון Interface Segregation
 */
export interface ColoredShapeItem {
  readonly name: string;
  readonly hebrew: string;
  readonly english: string;
  readonly plural?: string;
  readonly emoji: string;
  readonly color: string;
  readonly sound?: number[];
  readonly shape: string;
  readonly shapeHebrew: string;
  readonly svg: string;
  readonly value: string;
  readonly tailwindClass?: string;
}

// ===== SOLID Principle: Open/Closed =====

/**
 * טייפ union למיני פריטים - עקרון Open/Closed
 * ניתן להוסיף טייפים חדשים מבלי לשנות קוד קיים
 */
export type GameItemType = BaseGameItem | ColorItem | ColoredShapeItem;

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
interface CardAppearance {
  size?: "small" | "medium" | "large" | undefined;
  shape?: "rounded" | "circle" | "square" | undefined;
  variant?: 'default' | 'large' | 'compact' | 'simple' | 'advanced' | 'auto' | undefined;
  
  // צבעים
  color?: string | undefined;
  gradientFrom?: string | undefined;
  gradientTo?: string | undefined;
  hoverFrom?: string | undefined;
  hoverTo?: string | undefined;
  borderColor?: string | undefined;
  borderWidth?: string | undefined;
  textColor?: string | undefined;
  
  // צורה ומבנה
  aspectRatio?: "square" | "wide" | "tall" | undefined;
  borderRadius?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" | undefined;
  
  // אפקטים
  animation?: "bounce" | "pulse" | "none" | undefined;
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "none" | undefined;
  hoverEffect?: "scale" | "lift" | "glow" | "none" | undefined;
  backgroundPattern?: "stars" | "dots" | "none" | undefined;
}

/**
 * התנהגות הכרטיס
 */
interface CardBehavior {
  animationEnabled?: boolean | undefined;
  autoSpeak?: boolean | undefined;
  onSpeak?: (() => void) | undefined;
  useContext?: boolean | undefined;
}

/**
 * תוכן מותאם אישית
 */
interface CardCustomContent {
  customContent?: React.ReactNode | undefined;
  customDecoration?: React.ReactNode | undefined;
  icon?: React.ReactNode | undefined;
  description?: string | undefined;
  digit?: string | undefined;
  svg?: string | undefined;
  value?: string | undefined;
}

// ===== MAIN CARD PROPS =====

/**
 * Props בסיסיים לכל כרטיס
 */
interface BaseCardProps extends CardAppearance, CardBehavior, CardCustomContent {
  className?: string | undefined;
  isSelected?: boolean | undefined;
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
  item?: BaseGameItem | undefined;
  onClick?: ((item?: BaseGameItem) => void) | undefined;
  showContent?: CardContent | undefined;
  
  // Simple mode - for direct text input
  hebrewText?: string | undefined;
  secondaryText?: string | undefined;
  name?: string | undefined;
  
  // Display control
  showEmoji?: boolean | undefined;
  showHebrew?: boolean | undefined;
  showEnglish?: boolean | undefined;
  showSoundIcon?: boolean | undefined;
  hideSoundIcon?: boolean | undefined;
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
  showSoundIcon?: boolean;
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
