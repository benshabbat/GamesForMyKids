import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const BUGS_INSECTS_CONSTANTS: Record<string, BaseGameItem> = {
  BUTTERFLY: { name: "butterfly", hebrew: "פרפר", english: "Butterfly", emoji: "🦋", color: "bg-purple-400", sound: [523, 659, 784] },
  LADYBUG: { name: "ladybug", hebrew: "פרת משה רבנו", english: "Ladybug", emoji: "🐞", color: "bg-red-500", sound: [440, 554, 659] },
  BEE: { name: "bee", hebrew: "דבורה", english: "Bee", emoji: "🐝", color: "bg-yellow-400", sound: [392, 494, 587] },
  ANT: { name: "ant", hebrew: "נמלה", english: "Ant", emoji: "🐜", color: "bg-red-700", sound: [220, 277, 330] },
  CATERPILLAR: { name: "caterpillar", hebrew: "זחל", english: "Caterpillar", emoji: "🐛", color: "bg-green-500", sound: [294, 370, 440] },
  GRASSHOPPER: { name: "grasshopper", hebrew: "חגב", english: "Grasshopper", emoji: "🦗", color: "bg-lime-600", sound: [330, 415, 494] },
  SPIDER: { name: "spider", hebrew: "עכביש", english: "Spider", emoji: "🕷️", color: "bg-gray-700", sound: [196, 247, 294] },
  BEETLE: { name: "beetle", hebrew: "חיפושית", english: "Beetle", emoji: "🪲", color: "bg-teal-700", sound: [262, 330, 392] },
  DRAGONFLY: { name: "dragonfly", hebrew: "שפירית", english: "Dragonfly", emoji: "🪰", color: "bg-cyan-400", sound: [587, 698, 831] },
  SNAIL: { name: "snail", hebrew: "חילזון", english: "Snail", emoji: "🐌", color: "bg-orange-700", sound: [131, 165, 196] },
  FIREFLY: { name: "firefly", hebrew: "גחלילית", english: "Firefly", emoji: "✨", color: "bg-yellow-300", sound: [698, 880, 1047] },
  MOSQUITO: { name: "mosquito", hebrew: "יתוש", english: "Mosquito", emoji: "🦟", color: "bg-slate-500", sound: [880, 988, 1109] },
};

export const BUGS_INSECTS_ITEMS = createItemsList(BUGS_INSECTS_CONSTANTS);
export const BUGS_INSECTS_PRONUNCIATIONS = createPronunciationDictionary(BUGS_INSECTS_CONSTANTS);
export const BUGS_INSECTS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק חרקים ופרפרים",
  subTitle: "עולם זעיר ומרתק!",
  description: "הכר חרקים מעניינים ולמד מה מייחד כל אחד מהם!",
  instructions: "לחץ על החרק הנכון כשאתה שומע את שמו",
};
