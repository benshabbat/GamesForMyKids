import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const INSTRUMENT_CONSTANTS: Record<string, BaseGameItem> = {
  PIANO: { name: "piano", hebrew: "פסנתר", english: "Piano", emoji: "🎹", color: "bg-black", sound: [523, 659, 784] },
  GUITAR: { name: "guitar", hebrew: "גיטרה", english: "Guitar", emoji: "🎸", color: "bg-amber-600", sound: [330, 415, 494] },
  VIOLIN: { name: "violin", hebrew: "כינור", english: "Violin", emoji: "🎻", color: "bg-amber-800", sound: [440, 554, 659] },
  DRUMS: { name: "drums", hebrew: "תופים", english: "Drums", emoji: "🥁", color: "bg-red-600", sound: [196, 247, 294] },
  TRUMPET: { name: "trumpet", hebrew: "חצוצרה", english: "Trumpet", emoji: "🎺", color: "bg-yellow-500", sound: [587, 740, 880] },
  FLUTE: { name: "flute", hebrew: "חליל", english: "Flute", emoji: "🪈", color: "bg-gray-400", sound: [659, 831, 988] },
};

export const ALL_INSTRUMENTS = createItemsList(INSTRUMENT_CONSTANTS);
export const INSTRUMENT_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(INSTRUMENT_CONSTANTS);
export const INSTRUMENT_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
