/**
 * ===============================================
 * מפת פרטי משחקים - אוטומציה מלאה
 * ===============================================
 */

import { 
  ALL_ANIMALS, 
  ALL_COLORS, 
  ALL_FRUITS, 
  ALL_VEGETABLES, 
  ALL_CLOTHING,
  ALL_LETTERS,
  ALL_SHAPES,
  ALL_NUMBERS,
  ALL_WEATHERS,
  // TODO: להוסיף את שאר הקבועים
} from "@/lib/constants";

import { GameType, BaseGameItem } from "@/lib/types/base";

/**
 * 🎯 מפה מרכזית של כל פרטי המשחקים
 * כל רשימת פרטים מוכנה לשימוש
 */
export const GAME_ITEMS_MAP: Record<GameType, BaseGameItem[]> = {
  animals: ALL_ANIMALS,
  colors: ALL_COLORS,
  fruits: ALL_FRUITS,
  vegetables: ALL_VEGETABLES,
  clothing: ALL_CLOTHING,
  letters: ALL_LETTERS,
  shapes: ALL_SHAPES,
  numbers: ALL_NUMBERS,
  weather: ALL_WEATHERS,
  
  // TODO: להוסיף את שאר המשחקים כשהקבועים יהיו מוכנים
  "smells-tastes": ALL_ANIMALS, // טמפורי
  transport: ALL_ANIMALS, // טמפורי
  vehicles: ALL_ANIMALS, // טמפורי
  tools: ALL_ANIMALS, // טמפורי
  space: ALL_ANIMALS, // טמפורי
  house: ALL_ANIMALS, // טמפורי
  instruments: ALL_ANIMALS, // טמפורי
  professions: ALL_ANIMALS, // טמפורי
  emotions: ALL_ANIMALS, // טמפורי
  memory: ALL_ANIMALS, // טמפורי
  counting: ALL_ANIMALS, // טמפורי
  math: ALL_ANIMALS, // טמפורי
  bubbles: ALL_ANIMALS, // טמפורי
} as const;
