"use client";

/**
 * ===============================================
 * GameCardMap - מיפוי קומפוננטי Cards לכל סוג משחק
 * ===============================================
 */

import { ComponentType } from 'react';
import { GameType } from '@/lib/types/core/base';
import { GameItemCardProps } from '@/lib/types/components/cards';
import UnifiedCard from './cards/UnifiedCard';
import MathGameCard from './cards/MathGameCard';
import FlagsGameCard from './cards/FlagsGameCard';
import { createPhotoCard } from './cards/PhotoGameCard';

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
export const GameCardMap: Partial<Record<GameType, ComponentType<GameItemCardProps>>> = {
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
  math: MathGameCard,
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
  dinosaurs: createPhotoCard('dinosaurs'),
  // משחקים נוספים חדשים
  'world-food': DefaultGameCard,
  recycling: DefaultGameCard,
  medicine: DefaultGameCard,
  'nature-sounds': DefaultGameCard,
  'seasons-holidays': DefaultGameCard,
  feelings: DefaultGameCard,
  'shopping-money': DefaultGameCard,
  'road-safety': DefaultGameCard,
  // 6 משחקים חדשים נוספים
  'ocean-life': DefaultGameCard,
  'garden-plants': DefaultGameCard,
  'magic-fairy-tales': DefaultGameCard,
  'space-adventure': DefaultGameCard,
  'cooking-kitchen': DefaultGameCard,
  'circus-show': DefaultGameCard,
  // 6 משחקים טכנולוגיים חדשים
  'virtual-reality': DefaultGameCard,
  'new-professions': DefaultGameCard,
  'advanced-weather': DefaultGameCard,
  'advanced-colors': DefaultGameCard,
  'jewish-holidays': DefaultGameCard,
  'logic-games': DefaultGameCard,
  // 6 משחקים חדשניים יוצאי דופן
  'sound-imitation': DefaultGameCard,
  'body-movements': DefaultGameCard,
  'touch-senses': DefaultGameCard,
  'emotional-social': DefaultGameCard,
  'time-clock': DefaultGameCard,
  'climate-planet': DefaultGameCard,
  // 6 משחקים כיפיים חדשים
  'birds': DefaultGameCard,
  'bugs-insects': DefaultGameCard,
  'superheroes': DefaultGameCard,
  'art-craft': DefaultGameCard,
  'camping': DefaultGameCard,
  'fairy-tale-chars': DefaultGameCard,
  // משחקי גיאוגרפיה
  'flags': FlagsGameCard,
  // משחקי תמונות / לוגואים — נוצרים דינמית מ-createPhotoCard
  'soccer-logos': createPhotoCard('soccer-logos'),
  'car-brands': createPhotoCard('car-brands'),
  'world-landmarks': createPhotoCard('world-landmarks'),
  'solar-system': createPhotoCard('solar-system'),
  'famous-paintings': createPhotoCard('famous-paintings'),
  'tech-logos': createPhotoCard('tech-logos'),
  'dog-breeds': createPhotoCard('dog-breeds'),
  'cat-breeds': createPhotoCard('cat-breeds'),
  'nba-teams': createPhotoCard('nba-teams'),
  'exotic-birds': createPhotoCard('exotic-birds'),
  'butterflies': createPhotoCard('butterflies'),
};

export default GameCardMap;
