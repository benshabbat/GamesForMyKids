import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const SMELL_TASTE_CONSTANTS: Record<string, BaseGameItem> = {
  SWEET: { name: "sweet", hebrew: "מתוק", english: "Sweet", emoji: "🍯", color: "bg-yellow-400", sound: [523, 659, 784] },
  SOUR: { name: "sour", hebrew: "חמוץ", english: "Sour", emoji: "🍋", color: "bg-yellow-500", sound: [659, 831, 988] },
  SALTY: { name: "salty", hebrew: "מלוח", english: "Salty", emoji: "🧂", color: "bg-gray-400", sound: [440, 554, 659] },
  BITTER: { name: "bitter", hebrew: "מר", english: "Bitter", emoji: "☕", color: "bg-amber-800", sound: [330, 415, 494] },
  SPICY: { name: "spicy", hebrew: "חריף", english: "Spicy", emoji: "🌶️", color: "bg-red-500", sound: [392, 494, 587] },
  MINT: { name: "mint", hebrew: "נענע", english: "Mint", emoji: "🌿", color: "bg-green-400", sound: [587, 740, 880] },
};

export const ALL_SMELLS_TASTES = createItemsList(SMELL_TASTE_CONSTANTS);
export const SMELL_TASTE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(SMELL_TASTE_CONSTANTS);
export const SMELL_TASTE_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
