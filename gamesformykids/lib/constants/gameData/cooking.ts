/**
 * נתוני המשחקים - בישול ומטבח
 */

import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

/**
 * ===============================================
 * נתוני כלי מטבח
 * ===============================================
 */
export const KITCHEN_CONSTANTS: Record<string, BaseGameItem> = {
  POT: { name: "pot", hebrew: "סיר", english: "Pot", emoji: "🍲", color: "bg-gray-600", sound: [440, 550, 660] },
  PAN: { name: "pan", hebrew: "מחבת", english: "Pan", emoji: "🍳", color: "bg-gray-700", sound: [392, 494, 587] },
  KNIFE: { name: "knife", hebrew: "סכין", english: "Knife", emoji: "🔪", color: "bg-silver-500", sound: [349, 440, 523] },
  FORK: { name: "fork", hebrew: "מזלג", english: "Fork", emoji: "🍴", color: "bg-gray-500", sound: [523, 659, 784] },
  SPOON: { name: "spoon", hebrew: "כף", english: "Spoon", emoji: "🥄", color: "bg-gray-400", sound: [294, 370, 440] },
  PLATE: { name: "plate", hebrew: "צלחת", english: "Plate", emoji: "🍽️", color: "bg-white", sound: [330, 415, 494] },
  CUP: { name: "cup", hebrew: "כוס", english: "Cup", emoji: "🥤", color: "bg-blue-400", sound: [587, 698, 784] },
  BOWL: { name: "bowl", hebrew: "קערה", english: "Bowl", emoji: "🥣", color: "bg-blue-300", sound: [196, 247, 294] },
  OVEN: { name: "oven", hebrew: "תנור", english: "Oven", emoji: "🔥", color: "bg-red-600", sound: [659, 831, 988] },
  REFRIGERATOR: { name: "refrigerator", hebrew: "מקרר", english: "Refrigerator", emoji: "🧊", color: "bg-blue-600", sound: [277, 349, 415] },
  MIXER: { name: "mixer", hebrew: "מיקסר", english: "Mixer", emoji: "🥄", color: "bg-purple-500", sound: [415, 523, 622] },
  CUTTING_BOARD: { name: "cutting_board", hebrew: "קרש חיתוך", english: "Cutting Board", emoji: "🪓", color: "bg-yellow-700", sound: [220, 277, 330] },
};

/**
 * ===============================================
 * נתוני פעולות בישול
 * ===============================================
 */
export const COOKING_ACTIONS_CONSTANTS: Record<string, BaseGameItem> = {
  COOK: { name: "cook", hebrew: "לבשל", english: "Cook", emoji: "👨‍🍳", color: "bg-orange-500", sound: [440, 550, 660] },
  BAKE: { name: "bake", hebrew: "לאפות", english: "Bake", emoji: "🍰", color: "bg-pink-400", sound: [392, 494, 587] },
  FRY: { name: "fry", hebrew: "לטגן", english: "Fry", emoji: "🍳", color: "bg-yellow-600", sound: [349, 440, 523] },
  BOIL: { name: "boil", hebrew: "להרתיח", english: "Boil", emoji: "💨", color: "bg-blue-500", sound: [523, 659, 784] },
  CUT: { name: "cut", hebrew: "לחתוך", english: "Cut", emoji: "🔪", color: "bg-gray-600", sound: [294, 370, 440] },
  MIX: { name: "mix", hebrew: "לערבב", english: "Mix", emoji: "🥄", color: "bg-purple-400", sound: [330, 415, 494] },
  POUR: { name: "pour", hebrew: "לשפוך", english: "Pour", emoji: "🥛", color: "bg-blue-300", sound: [587, 698, 784] },
  SERVE: { name: "serve", hebrew: "להגיש", english: "Serve", emoji: "🍽️", color: "bg-green-400", sound: [196, 247, 294] },
  WASH: { name: "wash", hebrew: "לשטוף", english: "Wash", emoji: "🧽", color: "bg-blue-400", sound: [659, 831, 988] },
  SEASON: { name: "season", hebrew: "לתבל", english: "Season", emoji: "🧂", color: "bg-gray-300", sound: [277, 349, 415] },
};

/**
 * ===============================================
 * נתוני מאכלים מוכנים
 * ===============================================
 */
export const PREPARED_FOOD_CONSTANTS: Record<string, BaseGameItem> = {
  PIZZA: { name: "pizza", hebrew: "פיצה", english: "Pizza", emoji: "🍕", color: "bg-red-500", sound: [440, 550, 660] },
  BURGER: { name: "burger", hebrew: "המבורגר", english: "Burger", emoji: "🍔", color: "bg-yellow-600", sound: [392, 494, 587] },
  SANDWICH: { name: "sandwich", hebrew: "כריך", english: "Sandwich", emoji: "🥪", color: "bg-yellow-500", sound: [349, 440, 523] },
  SOUP: { name: "soup", hebrew: "מרק", english: "Soup", emoji: "🍲", color: "bg-orange-400", sound: [523, 659, 784] },
  SALAD: { name: "salad", hebrew: "סלט", english: "Salad", emoji: "🥗", color: "bg-green-500", sound: [294, 370, 440] },
  PASTA: { name: "pasta", hebrew: "פסטה", english: "Pasta", emoji: "🍝", color: "bg-yellow-400", sound: [330, 415, 494] },
  CAKE: { name: "cake", hebrew: "עוגה", english: "Cake", emoji: "🍰", color: "bg-pink-400", sound: [587, 698, 784] },
  BREAD: { name: "bread", hebrew: "לחם", english: "Bread", emoji: "🍞", color: "bg-yellow-700", sound: [196, 247, 294] },
  RICE: { name: "rice", hebrew: "אורז", english: "Rice", emoji: "🍚", color: "bg-white", sound: [659, 831, 988] },
  EGGS: { name: "eggs", hebrew: "ביצים", english: "Eggs", emoji: "🥚", color: "bg-yellow-200", sound: [277, 349, 415] },
};

// ייצוא רשימות והגדרות
export const KITCHEN_ITEMS = createItemsList(KITCHEN_CONSTANTS);
export const KITCHEN_PRONUNCIATIONS = createPronunciationDictionary(KITCHEN_CONSTANTS);
export const KITCHEN_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "כלי מטבח",
  description: "למד על כלי מטבח ובישול!"
};

export const COOKING_ACTIONS_ITEMS = createItemsList(COOKING_ACTIONS_CONSTANTS);
export const COOKING_ACTIONS_PRONUNCIATIONS = createPronunciationDictionary(COOKING_ACTIONS_CONSTANTS);
export const COOKING_ACTIONS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "פעולות בישול",
  description: "למד על פעולות בישול שונות!"
};

export const PREPARED_FOOD_ITEMS = createItemsList(PREPARED_FOOD_CONSTANTS);
export const PREPARED_FOOD_PRONUNCIATIONS = createPronunciationDictionary(PREPARED_FOOD_CONSTANTS);
export const PREPARED_FOOD_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "מאכלים מוכנים",
  description: "למד על מאכלים טעימים ומוכנים!"
};