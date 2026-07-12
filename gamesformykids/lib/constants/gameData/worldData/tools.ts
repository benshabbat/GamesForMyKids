import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const TOOL_CONSTANTS: Record<string, BaseGameItem> = {
  HAMMER: { name: "hammer", hebrew: "פטיש", hebrewNikud: "פַּטִּישׁ", english: "Hammer", emoji: "🔨", color: "bg-gray-600", sound: [440, 550, 660] },
  SCREWDRIVER: { name: "screwdriver", hebrew: "מברג", hebrewNikud: "מַבְרֵג", english: "Screwdriver", emoji: "🪛", color: "bg-blue-500", sound: [392, 494, 587] },
  SAW: { name: "saw", hebrew: "מסור", hebrewNikud: "מַסּוֹר", english: "Saw", emoji: "🪚", color: "bg-yellow-600", sound: [349, 440, 523] },
  SCISSORS: { name: "scissors", hebrew: "מספריים", hebrewNikud: "מִסְפָּרַיִם", english: "Scissors", emoji: "✂️", color: "bg-purple-500", sound: [294, 370, 440] },
};

export const ALL_TOOLS = createItemsList(TOOL_CONSTANTS);
export const TOOL_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(TOOL_CONSTANTS);
export const TOOL_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
