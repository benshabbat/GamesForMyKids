import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const OCEAN_LIFE_CONSTANTS: Record<string, BaseGameItem> = {
  FISH: { name: "fish", hebrew: "דג", hebrewNikud: "דָּג", english: "Fish", emoji: "🐟", color: "bg-blue-400", sound: [440, 554, 659] },
  DOLPHIN: { name: "dolphin", hebrew: "דולפין", hebrewNikud: "דּוֹלְפִין", english: "Dolphin", emoji: "🐬", color: "bg-blue-500", sound: [523, 659, 784] },
  WHALE: { name: "whale", hebrew: "לוויתן", hebrewNikud: "לִוְיָתָן", english: "Whale", emoji: "🐋", color: "bg-blue-600", sound: [200, 250, 300] },
  SHARK: { name: "shark", hebrew: "כריש", hebrewNikud: "כָּרִישׁ", english: "Shark", emoji: "🦈", color: "bg-gray-600", sound: [150, 200, 250] },
  OCTOPUS: { name: "octopus", hebrew: "תמנון", hebrewNikud: "תַּמְנוּן", english: "Octopus", emoji: "🐙", color: "bg-purple-500", sound: [330, 415, 494] },
  JELLYFISH: { name: "jellyfish", hebrew: "מדוזה", hebrewNikud: "מֶדוּזָה", english: "Jellyfish", emoji: "🪼", color: "bg-pink-400", sound: [587, 740, 880] },
  SEAHORSE: { name: "seahorse", hebrew: "סוס ים", hebrewNikud: "סוּס יָם", english: "Seahorse", emoji: "🦓", color: "bg-yellow-500", sound: [392, 494, 587] },
  STARFISH: { name: "starfish", hebrew: "כוכב ים", hebrewNikud: "כּוֹכַב יָם", english: "Starfish", emoji: "⭐", color: "bg-orange-400", sound: [294, 370, 440] },
  CRAB: { name: "crab", hebrew: "סרטן", hebrewNikud: "סַרְטָן", english: "Crab", emoji: "🦀", color: "bg-red-500", sound: [262, 330, 392] },
  TURTLE: { name: "turtle", hebrew: "צב", hebrewNikud: "צָב", english: "Turtle", emoji: "🐢", color: "bg-green-600", sound: [220, 277, 330] },
};

export const OCEAN_LIFE_ITEMS = createItemsList(OCEAN_LIFE_CONSTANTS);
export const OCEAN_LIFE_PRONUNCIATIONS = createPronunciationDictionary(OCEAN_LIFE_CONSTANTS);
export const OCEAN_LIFE_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "חיי ים",
  description: "למד על בעלי חיים ימיים מרתקים!",
};
