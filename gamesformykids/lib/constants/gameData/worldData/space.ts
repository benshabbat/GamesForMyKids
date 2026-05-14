import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const SPACE_CONSTANTS: Record<string, BaseGameItem> = {
  SUN: { name: "sun", hebrew: "שמש", english: "Sun", emoji: "☀️", color: "bg-yellow-500", sound: [523, 659, 784] },
  MOON: { name: "moon", hebrew: "ירח", english: "Moon", emoji: "🌙", color: "bg-gray-300", sound: [392, 494, 587] },
  STAR: { name: "star", hebrew: "כוכב", english: "Star", emoji: "⭐", color: "bg-yellow-400", sound: [659, 831, 988] },
  EARTH: { name: "earth", hebrew: "כדור הארץ", english: "Earth", emoji: "🌍", color: "bg-blue-500", sound: [349, 440, 523] },
  ROCKET: { name: "rocket", hebrew: "חללית", english: "Rocket", emoji: "🚀", color: "bg-red-500", sound: [440, 554, 659] },
  PLANET: { name: "planet", hebrew: "כוכב לכת", english: "Planet", emoji: "🪐", color: "bg-purple-500", sound: [330, 415, 494] },
};

export const ALL_SPACE_OBJECTS = createItemsList(SPACE_CONSTANTS);
export const SPACE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(SPACE_CONSTANTS);
export const SPACE_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
