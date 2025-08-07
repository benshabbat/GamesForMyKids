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
  ALL_EMOTIONS,
  ALL_HOUSE_ITEMS,
  ALL_INSTRUMENTS,
  ALL_PROFESSIONS,
  ALL_SMELLS_TASTES,
  ALL_TRANSPORTS,
  ALL_VEHICLES,
  ALL_TOOLS,
  ALL_SPACE_OBJECTS,
  ALL_COLORED_SHAPES,
  // TODO: להוסיף את שאר הקבועים במידת הצורך
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
  "colored-shapes": ALL_COLORED_SHAPES, // ✅ חדש! משחק צורות צבעוניות
  
  // עודכן עם הקבועים הנכונים:
  "smells-tastes": ALL_SMELLS_TASTES, // ✅ עודכן!
  transport: ALL_TRANSPORTS, // ✅ עודכן!
  vehicles: ALL_VEHICLES, // ✅ עודכן!
  tools: ALL_TOOLS, // ✅ עודכן!
  space: ALL_SPACE_OBJECTS, // ✅ עודכן!
  house: ALL_HOUSE_ITEMS, // ✅ עודכן!
  instruments: ALL_INSTRUMENTS, // ✅ עודכן!
  professions: ALL_PROFESSIONS, // ✅ עודכן!
  emotions: ALL_EMOTIONS, // ✅ עודכן!
  memory: ALL_ANIMALS, // נשאר בעלי חיים - יש לוגיקה מיוחדת במשחק
  counting: ALL_NUMBERS, // ✅ עודכן!
  math: ALL_NUMBERS, // ✅ עודכן!
  bubbles: ALL_COLORS, // ✅ עודכן!
  puzzles: ALL_SHAPES, // ✅ עודכן! (זמני - צריך נתוני פאזלים ייעודיים)
} as const;
