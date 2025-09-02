/**
 * ===============================================
 * טיפוסים לקומפוננטות Cards
 * ===============================================
 */

import { BaseGameItem } from '../base';
import { ColorItem, ShapeItem, NumberItem } from '../games';

// ColoredShapeItem מוגדר ב-adapter
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
  tailwindClass?: string; // Optional to match the real data
}

export type GameItemType = BaseGameItem | ColorItem | ShapeItem | NumberItem;

export interface GameCardGridProps<T extends GameItemType> {
  // Core properties
  /** Array of items to display in the grid */
  items: T[];
  /** Callback function when an item is clicked */
  onItemClick?: (item: T) => void;
  /** The current challenge/selected item (used to highlight the correct item) */
  currentChallenge?: T | null;
  /** The selected item */
  selectedItem?: T | null;
  /** Game title for accessibility */
  gameTitle?: string;
  
  // Display options
  /** Whether to show Hebrew text */
  showHebrew?: boolean;
  /** Whether to show English text */
  showEnglish?: boolean;
  /** Whether to show emoji */
  showEmoji?: boolean;
  /** Card display variant */
  cardVariant?: 'default' | 'large' | 'compact';
  /** Number of grid columns for responsive layout */
  gridCols?: number | string;
  /** Maximum width CSS class */
  maxWidth?: string;
  /** Gap CSS class */
  gap?: string;
  /** Whether to show sound icon on cards */
  showSoundIcon?: boolean;
  /** Animation enabled flag */
  animationEnabled?: boolean;
  
  // Comparison and rendering
  /** Which property to use when comparing items */
  compareKey?: keyof T;
  /** Custom render function for cards */
  renderCustomCard?: (item: T, isCorrect: boolean) => React.ReactNode;
  /** Additional CSS classes to apply to default cards */
  cardClassName?: string;
  
  // Context usage
  /** Whether to use game context for click handling */
  useContext?: boolean;
}

export interface BaseGameCardProps {
  item: BaseGameItem;
  onClick: (item: BaseGameItem) => void;
  isSelected?: boolean;
  showHebrew?: boolean;
  showEnglish?: boolean;
  showEmoji?: boolean;
  variant?: 'default' | 'large' | 'compact';
  animationEnabled?: boolean;
  
  // עיצוב הכרטיס
  gradientFrom?: string;
  gradientTo?: string;
  hoverFrom?: string;
  hoverTo?: string;
  borderColor?: string;
  borderWidth?: string;
  
  // תוכן הכרטיס
  customContent?: React.ReactNode;
  
  // גודל וצורה
  size?: "small" | "medium" | "large";
  aspectRatio?: "square" | "wide" | "tall";
  borderRadius?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  
  // אנימציות ואפקטים
  animation?: "bounce" | "pulse" | "none";
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  hoverEffect?: "scale" | "lift" | "glow" | "none";
  
  // אפקטים מיוחדים
  backgroundPattern?: "stars" | "dots" | "none";
  customDecoration?: React.ReactNode;
  
  // עבור כרטיסי מקצועות
  description?: string;
  
  // עבור כרטיסי מספרים
  digit?: string;
  
  // CSS classes נוספים
  className?: string;
}

export interface ColoredShapeCardProps {
  item: ColoredShapeItem;
  onClick?: () => void;
  isSelected?: boolean;
  showShape?: boolean;
  showColor?: boolean;
  showValue?: boolean;
  size?: 'small' | 'medium' | 'large';
  animationEnabled?: boolean;
  className?: string;
}

export interface UnifiedCardProps {
  // Data
  item?: BaseGameItem;
  onClick?: (item?: BaseGameItem) => void;
  isSelected?: boolean;
  variant?: 'default' | 'large' | 'compact' | 'simple' | 'advanced' | 'auto';
  showContent?: {
    hebrew?: boolean;
    english?: boolean;
    emoji?: boolean;
  };
  animationEnabled?: boolean;
  
  // Simple mode (like GameItem)
  hebrewText?: string;
  secondaryText?: string;
  name?: string;
  icon?: React.ReactNode;
  
  // Advanced mode (like BaseGameCard)
  customContent?: React.ReactNode;
  
  // Appearance - Colors
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  hoverFrom?: string;
  hoverTo?: string;
  borderColor?: string;
  borderWidth?: string;
  textColor?: string;
  
  // Appearance - Layout
  size?: "small" | "medium" | "large";
  shape?: "rounded" | "circle" | "square";
  aspectRatio?: "square" | "wide" | "tall";
  borderRadius?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  
  // Content display
  showEmoji?: boolean;
  showHebrew?: boolean;
  showEnglish?: boolean;
  showSoundIcon?: boolean;
  hideSoundIcon?: boolean;
  
  // Effects
  animation?: "bounce" | "pulse" | "none";
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  hoverEffect?: "scale" | "lift" | "glow" | "none";
  backgroundPattern?: "stars" | "dots" | "none";
  
  // Special content
  description?: string;
  digit?: string;
  svg?: string;
  value?: string;
  tailwindClass?: string;
  customDecoration?: React.ReactNode;
  
  // Audio
  onSpeak?: () => void;
  autoSpeak?: boolean;
  
  // CSS
  className?: string;
}
