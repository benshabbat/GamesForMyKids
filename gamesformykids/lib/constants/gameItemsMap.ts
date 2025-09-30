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
  // משחקים חדשים
  SPORTS_ITEMS,
  KITCHEN_ITEMS,
  BODY_PARTS_ITEMS,
  FAMILY_ITEMS,
  DINOSAURS_ITEMS,
  // משחקים נוספים חדשים
  WORLD_FOOD_ITEMS,
  RECYCLING_ITEMS,
  MEDICINE_ITEMS,
  NATURE_SOUNDS_ITEMS,
  SEASONS_HOLIDAYS_ITEMS,
  FEELINGS_ITEMS,
  SHOPPING_MONEY_ITEMS,
  ROAD_SAFETY_ITEMS,
  // משחקים חדשים נוספים
  OCEAN_LIFE_ITEMS,
  GARDEN_PLANTS_ITEMS,
  MAGIC_FAIRY_TALES_ITEMS,
  CIRCUS_SHOW_ITEMS,
  // קבועים נוספים יתווספו במידת הצורך
} from "@/lib/constants";

import { GameType, BaseGameItem } from "@/lib/types/core/base";

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
  building: ALL_SHAPES, // ✅ עודכן! משחק בנייה יצירתי
  tetris: ALL_SHAPES, // ✅ טטריס עם צורות
  // משחקים חדשים
  sports: SPORTS_ITEMS, // ✅ משחק ספורט
  kitchen: KITCHEN_ITEMS, // ✅ משחק כלי מטבח
  "body-parts": BODY_PARTS_ITEMS, // ✅ משחק חלקי גוף
  family: FAMILY_ITEMS, // ✅ משחק בני משפחה
  dinosaurs: DINOSAURS_ITEMS, // ✅ משחק דינוזאורים
  // משחקים נוספים חדשים
  "world-food": WORLD_FOOD_ITEMS, // ✅ משחק מזון מסביב לעולם
  recycling: RECYCLING_ITEMS, // ✅ משחק מחזור וקיימות
  medicine: MEDICINE_ITEMS, // ✅ משחק מרקחת ותרופות
  "nature-sounds": NATURE_SOUNDS_ITEMS, // ✅ משחק צלילי הטבע
  "seasons-holidays": SEASONS_HOLIDAYS_ITEMS, // ✅ משחק עונות השנה ומועדים
  feelings: FEELINGS_ITEMS, // ✅ משחק ריגושים ותחושות
  "shopping-money": SHOPPING_MONEY_ITEMS, // ✅ משחק קניות וכסף
  "road-safety": ROAD_SAFETY_ITEMS, // ✅ משחק בטיחות בדרכים
  // 6 משחקים חדשים
  "ocean-life": OCEAN_LIFE_ITEMS, // ✅ משחק חיי ים
  "garden-plants": GARDEN_PLANTS_ITEMS, // ✅ משחק צמחי גן
  "magic-fairy-tales": MAGIC_FAIRY_TALES_ITEMS, // ✅ משחק אגדות קסם
  "space-adventure": ALL_SPACE_OBJECTS, // ✅ משחק הרפתקאות בחלל
  "cooking-kitchen": KITCHEN_ITEMS, // ✅ משחק בישול במטבח
  "circus-show": CIRCUS_SHOW_ITEMS, // ✅ משחק מופע קרקס
} as const;
