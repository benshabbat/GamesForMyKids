/**
 * ===============================================
 * GameCardMap - מיפוי קומפוננטי Cards לכל סוג משחק
 * ===============================================
 */

import { ComponentType } from 'react';
import { GameType } from '@/lib/types/core/base';
import { GameItemCardProps } from '@/lib/types/components/cards';
import UnifiedCard from './cards/UnifiedCard';

// Generic card component that works for all game types
const DefaultGameCard = ({ item, onClick, isSelected }: GameItemCardProps) => (
  <UnifiedCard 
    item={item}
    onClick={onClick ? () => onClick(item) : undefined}
    isSelected={isSelected}
    variant="advanced"
  />
);

/**
 * מיפוי של כל סוגי המשחקים לקומפוננט Card המתאים
 * DRY Principle: כל המשחקים משתמשים באותו קומפוננט בסיס
 */
export const GameCardMap: Record<GameType, ComponentType<GameItemCardProps>> = {
  animals: DefaultGameCard,
  fruits: DefaultGameCard,
  vegetables: DefaultGameCard,
  colors: DefaultGameCard,
  shapes: DefaultGameCard,
  numbers: DefaultGameCard,
  letters: DefaultGameCard,
  'colored-shapes': DefaultGameCard,
  professions: DefaultGameCard,
  vehicles: DefaultGameCard,
  house: DefaultGameCard,
  tools: DefaultGameCard,
  instruments: DefaultGameCard,
  clothing: DefaultGameCard,
  space: DefaultGameCard,
  weather: DefaultGameCard,
  transport: DefaultGameCard,
  'smells-tastes': DefaultGameCard,
  counting: DefaultGameCard,
  math: DefaultGameCard,
  memory: DefaultGameCard,
  emotions: DefaultGameCard,
  bubbles: DefaultGameCard,
  puzzles: DefaultGameCard,
  building: DefaultGameCard,
  tetris: DefaultGameCard,
  // משחקים חדשים
  sports: DefaultGameCard,
  kitchen: DefaultGameCard,
  'body-parts': DefaultGameCard,
  family: DefaultGameCard,
  dinosaurs: DefaultGameCard,
};

export default GameCardMap;
