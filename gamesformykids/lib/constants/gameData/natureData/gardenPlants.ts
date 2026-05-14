import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const GARDEN_PLANTS_CONSTANTS: Record<string, BaseGameItem> = {
  ROSE: { name: "rose", hebrew: "ורד", english: "Rose", emoji: "🌹", color: "bg-red-500", sound: [523, 659, 784] },
  SUNFLOWER: { name: "sunflower", hebrew: "חמנייה", english: "Sunflower", emoji: "🌻", color: "bg-yellow-500", sound: [440, 554, 659] },
  TULIP: { name: "tulip", hebrew: "צבעוני", english: "Tulip", emoji: "🌷", color: "bg-pink-500", sound: [392, 494, 587] },
  DAISY: { name: "daisy", hebrew: "חרצית", english: "Daisy", emoji: "🌼", color: "bg-yellow-400", sound: [349, 440, 523] },
  LILY: { name: "lily", hebrew: "שושן", english: "Lily", emoji: "🌺", color: "bg-purple-400", sound: [330, 415, 494] },
  TREE: { name: "tree", hebrew: "עץ", english: "Tree", emoji: "🌳", color: "bg-green-600", sound: [220, 277, 330] },
  GRASS: { name: "grass", hebrew: "דשא", english: "Grass", emoji: "🌱", color: "bg-green-400", sound: [294, 370, 440] },
  LEAF: { name: "leaf", hebrew: "עלה", english: "Leaf", emoji: "🍃", color: "bg-green-500", sound: [262, 330, 392] },
  FLOWER: { name: "flower", hebrew: "פרח", english: "Flower", emoji: "💐", color: "bg-pink-400", sound: [587, 740, 880] },
  CACTUS: { name: "cactus", hebrew: "קקטוס", english: "Cactus", emoji: "🌵", color: "bg-green-700", sound: [196, 247, 294] },
};

export const GARDEN_PLANTS_ITEMS = createItemsList(GARDEN_PLANTS_CONSTANTS);
export const GARDEN_PLANTS_PRONUNCIATIONS = createPronunciationDictionary(GARDEN_PLANTS_CONSTANTS);
export const GARDEN_PLANTS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "צמחי גן",
  description: "גלה צמחים ופרחים יפים בגן!",
};
