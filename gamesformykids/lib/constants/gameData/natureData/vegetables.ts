import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const VEGETABLES: Record<string, BaseGameItem> = {
  CARROT: { name: "carrot", hebrew: "גזר", english: "Carrot", emoji: "🥕", color: "bg-orange-500", sound: [440, 550, 660] },
  TOMATO: { name: "tomato", hebrew: "עגבנייה", english: "Tomato", emoji: "🍅", color: "bg-red-500", sound: [392, 494, 587] },
  CUCUMBER: { name: "cucumber", hebrew: "מלפפון", english: "Cucumber", emoji: "🥒", color: "bg-green-500", sound: [349, 440, 523] },
  PEPPER: { name: "pepper", hebrew: "פלפל", english: "Pepper", emoji: "🫑", color: "bg-green-600", sound: [330, 415, 494] },
  ONION: { name: "onion", hebrew: "בצל", english: "Onion", emoji: "🧅", color: "bg-yellow-600", sound: [294, 370, 440] },
  LETTUCE: { name: "lettuce", hebrew: "חסה", english: "Lettuce", emoji: "🥬", color: "bg-green-400", sound: [262, 330, 392] },
  POTATO: { name: "potato", hebrew: "תפוח אדמה", english: "Potato", emoji: "🥔", color: "bg-amber-600", sound: [220, 277, 330] },
  CORN: { name: "corn", hebrew: "תירס", english: "Corn", emoji: "🌽", color: "bg-yellow-500", sound: [494, 587, 698] },
};

export const ALL_VEGETABLES = createItemsList(VEGETABLES);
export const VEGETABLE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(VEGETABLES);
export const VEGETABLE_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
