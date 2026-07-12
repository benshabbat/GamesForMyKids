import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const HOUSE_CONSTANTS: Record<string, BaseGameItem> = {
  CHAIR: { name: "chair", hebrew: "כיסא", hebrewNikud: "כִּיסֵּא", english: "Chair", emoji: "🪑", color: "bg-brown-500", sound: [440, 550, 660] },
  TABLE: { name: "table", hebrew: "שולחן", hebrewNikud: "שֻׁלְחָן", english: "Table", emoji: "🏓", color: "bg-amber-600", sound: [392, 494, 587] },
  BED: { name: "bed", hebrew: "מיטה", hebrewNikud: "מִיטָּה", english: "Bed", emoji: "🛏️", color: "bg-blue-500", sound: [349, 440, 523] },
  SOFA: { name: "sofa", hebrew: "ספה", hebrewNikud: "סַפָּה", english: "Sofa", emoji: "🛋️", color: "bg-red-500", sound: [330, 415, 494] },
  LAMP: { name: "lamp", hebrew: "מנורה", hebrewNikud: "מְנוֹרָה", english: "Lamp", emoji: "💡", color: "bg-yellow-500", sound: [294, 370, 440] },
};

export const ALL_HOUSE_ITEMS = createItemsList(HOUSE_CONSTANTS);
export const HOUSE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(HOUSE_CONSTANTS);
export const HOUSE_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
