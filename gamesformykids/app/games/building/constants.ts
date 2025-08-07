import { ShapeType } from './types';

export const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
  '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
  '#FD79A8', '#6C5CE7', '#A29BFE', '#74B9FF', '#00B894',
  '#E17055', '#81ECEC', '#74B9FF', '#A29BFE', '#FD79A8'
] as const;

export const SHAPES: readonly ShapeType[] = [
  'square', 
  'rectangle', 
  'triangle', 
  'circle', 
  'star', 
  'heart', 
  'diamond'
] as const;

export const SHAPE_ICONS: Record<ShapeType, string> = {
  square: '⬜',
  rectangle: '▬',
  triangle: '🔺',
  circle: '⭕',
  star: '⭐',
  heart: '❤️',
  diamond: '💎'
} as const;

export const CANVAS_CONFIG = {
  HEIGHT: {
    MOBILE: 384, // h-96 = 24rem = 384px
    DESKTOP: 600
  },
  GRID_SIZE: 20,
  BLOCK_SIZE: 60
} as const;

export const SIZE_LIMITS = {
  NEW_BLOCKS: { MIN: 0.5, MAX: 2, STEP: 0.1 },
  SELECTED_BLOCKS: { MIN: 0.5, MAX: 3, STEP: 0.1 }
} as const;

export const ACHIEVEMENTS = {
  BUILDER: { threshold: 10, id: 'builder' },
  STAR_COLLECTOR: { threshold: 5, id: 'star-collector', shape: 'star' }
} as const;
