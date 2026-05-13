import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const CLOTHING_CONSTANTS: Record<string, BaseGameItem> = {
  SHIRT: { name: "shirt", hebrew: "חולצה", english: "Shirt", emoji: "👕", color: "bg-blue-500", sound: [440, 550, 660] },
  PANTS: { name: "pants", hebrew: "מכנסיים", english: "Pants", emoji: "👖", color: "bg-indigo-600", sound: [392, 494, 587] },
  DRESS: { name: "dress", hebrew: "שמלה", english: "Dress", emoji: "👗", color: "bg-pink-500", sound: [523, 659, 784] },
  SHOES: { name: "shoes", hebrew: "נעליים", english: "Shoes", emoji: "👟", color: "bg-gray-600", sound: [349, 440, 523] },
  HAT: { name: "hat", hebrew: "כובע", english: "Hat", emoji: "🧢", color: "bg-red-500", sound: [330, 415, 494] },
  JACKET: { name: "jacket", hebrew: "מעיל", english: "Jacket", emoji: "🧥", color: "bg-brown-600", sound: [262, 330, 392] },
};

export const ALL_CLOTHING = createItemsList(CLOTHING_CONSTANTS);
export const CLOTHING_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(CLOTHING_CONSTANTS);
export const CLOTHING_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
