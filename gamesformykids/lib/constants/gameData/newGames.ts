/**
 * נתוני המשחקים החדשים - מזון מסביב לעולם ומחזור
 */

import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

/**
 * ===============================================
 * נתוני מזון מסביב לעולם
 * ===============================================
 */
export const WORLD_FOOD_CONSTANTS: Record<string, BaseGameItem> = {
  PIZZA: { name: "pizza", hebrew: "פיצה", english: "Pizza", emoji: "🍕", color: "bg-red-500", sound: [440, 550, 660] },
  FALAFEL: { name: "falafel", hebrew: "פלאפל", english: "Falafel", emoji: "🧆", color: "bg-green-500", sound: [392, 494, 587] },
  SUSHI: { name: "sushi", hebrew: "סושי", english: "Sushi", emoji: "🍣", color: "bg-blue-500", sound: [349, 440, 523] },
  TACO: { name: "taco", hebrew: "טאקו", english: "Taco", emoji: "🌮", color: "bg-yellow-500", sound: [294, 370, 440] },
  PASTA: { name: "pasta", hebrew: "פסטה", english: "Pasta", emoji: "🍝", color: "bg-orange-500", sound: [330, 415, 494] },
  BURGER: { name: "burger", hebrew: "המבורגר", english: "Burger", emoji: "🍔", color: "bg-brown-500", sound: [262, 330, 392] },
  RAMEN: { name: "ramen", hebrew: "ראמן", english: "Ramen", emoji: "🍜", color: "bg-amber-500", sound: [523, 659, 784] },
  CROISSANT: { name: "croissant", hebrew: "קרואסון", english: "Croissant", emoji: "🥐", color: "bg-yellow-600", sound: [587, 698, 831] },
  PAELLA: { name: "paella", hebrew: "פאייה", english: "Paella", emoji: "🥘", color: "bg-red-600", sound: [196, 247, 294] },
  DUMPLING: { name: "dumpling", hebrew: "כיסונין", english: "Dumpling", emoji: "🥟", color: "bg-pink-500", sound: [277, 349, 415] },
};

/**
 * ===============================================
 * נתוני מחזור וקיימות
 * ===============================================
 */
export const RECYCLING_CONSTANTS: Record<string, BaseGameItem> = {
  PLASTIC_BOTTLE: { name: "plastic-bottle", hebrew: "בקבוק פלסטיק", english: "Plastic Bottle", emoji: "🍼", color: "bg-blue-400", sound: [440, 550, 660] },
  PAPER: { name: "paper", hebrew: "נייר", english: "Paper", emoji: "📄", color: "bg-white", sound: [392, 494, 587] },
  GLASS: { name: "glass", hebrew: "זכוכית", english: "Glass", emoji: "🥛", color: "bg-cyan-300", sound: [349, 440, 523] },
  ALUMINUM_CAN: { name: "aluminum-can", hebrew: "פחית אלומיניום", english: "Aluminum Can", emoji: "🥤", color: "bg-gray-400", sound: [294, 370, 440] },
  CARDBOARD: { name: "cardboard", hebrew: "קרטון", english: "Cardboard", emoji: "📦", color: "bg-amber-600", sound: [330, 415, 494] },
  BATTERY: { name: "battery", hebrew: "סוללה", english: "Battery", emoji: "🔋", color: "bg-green-600", sound: [262, 330, 392] },
  ELECTRONICS: { name: "electronics", hebrew: "אלקטרוניקה", english: "Electronics", emoji: "📱", color: "bg-black", sound: [523, 659, 784] },
  ORGANIC_WASTE: { name: "organic-waste", hebrew: "פסולת אורגנית", english: "Organic Waste", emoji: "🍌", color: "bg-brown-400", sound: [587, 698, 831] },
  RECYCLING_BIN: { name: "recycling-bin", hebrew: "פח מחזור", english: "Recycling Bin", emoji: "♻️", color: "bg-green-500", sound: [196, 247, 294] },
  COMPOST: { name: "compost", hebrew: "קומפוסט", english: "Compost", emoji: "🌱", color: "bg-green-700", sound: [277, 349, 415] },
};

// רשימות מוכנות לשימוש
export const WORLD_FOOD_ITEMS = createItemsList(WORLD_FOOD_CONSTANTS);
export const RECYCLING_ITEMS = createItemsList(RECYCLING_CONSTANTS);

// מילוני ביטוי
export const WORLD_FOOD_PRONUNCIATIONS = createPronunciationDictionary(WORLD_FOOD_CONSTANTS);
export const RECYCLING_PRONUNCIATIONS = createPronunciationDictionary(RECYCLING_CONSTANTS);

// קונפיגורציות משחק
export const WORLD_FOOD_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק מזון מסביב לעולם",
  subTitle: "הכר מתאכלים מתרבויות שונות!",
  description: "גלה מתאכלים מדהימים מרחבי העולם ולמד על תרבויות שונות!",
  instructions: "לחץ על המאכל הנכון כשאתה שומע את השם שלו",
};

export const RECYCLING_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק מחזור וקיימות",
  subTitle: "למד על מחזור וחשיבות שמירה על הסביבה!",
  description: "גלה איך למחזר נכון ולשמור על הסביבה שלנו!",
  instructions: "לחץ על הפריט הנכון ולמד איך למחזר אותו",
};