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
  tailwindClass: string;
}

export type GameItemType = BaseGameItem | ColorItem | ShapeItem | NumberItem;

export interface GameCardGridProps<T extends GameItemType> {
  items: T[];
  onItemClick: (item: T) => void;
  selectedItem?: T | null;
  gameTitle: string;
  showHebrew?: boolean;
  showEnglish?: boolean;
  showEmoji?: boolean;
  cardVariant?: 'default' | 'large' | 'compact';
  gridCols?: number;
  animationEnabled?: boolean;
}

export interface BaseGameCardProps {
  item: BaseGameItem;
  onClick: () => void;
  isSelected?: boolean;
  showHebrew?: boolean;
  showEnglish?: boolean;
  showEmoji?: boolean;
  variant?: 'default' | 'large' | 'compact';
  animationEnabled?: boolean;
}

export interface ColoredShapeCardProps {
  item: ColoredShapeItem;
  onClick: () => void;
  isSelected?: boolean;
  showShape?: boolean;
  showColor?: boolean;
  showValue?: boolean;
  size?: 'small' | 'medium' | 'large';
  animationEnabled?: boolean;
}

export interface UnifiedCardProps {
  item: BaseGameItem;
  onClick: () => void;
  isSelected?: boolean;
  variant?: 'default' | 'large' | 'compact';
  showContent?: {
    hebrew?: boolean;
    english?: boolean;
    emoji?: boolean;
  };
  animationEnabled?: boolean;
}
