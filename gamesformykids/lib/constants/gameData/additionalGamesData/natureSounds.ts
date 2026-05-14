import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const NATURE_SOUNDS_CONSTANTS: Record<string, BaseGameItem> = {
  BIRD_SONG: { name: "bird-song", hebrew: "ציוץ ציפור", english: "Bird Song", emoji: "🐦", color: "bg-yellow-400", sound: [659, 831, 988] },
  RAIN: { name: "rain", hebrew: "גשם", english: "Rain", emoji: "🌧️", color: "bg-blue-400", sound: [220, 277, 330] },
  WIND: { name: "wind", hebrew: "רוח", english: "Wind", emoji: "💨", color: "bg-gray-300", sound: [196, 247, 294] },
  OCEAN_WAVES: { name: "ocean-waves", hebrew: "גלי ים", english: "Ocean Waves", emoji: "🌊", color: "bg-blue-500", sound: [123, 155, 185] },
  THUNDER: { name: "thunder", hebrew: "רעם", english: "Thunder", emoji: "⛈️", color: "bg-gray-700", sound: [98, 123, 147] },
  CRICKET: { name: "cricket", hebrew: "צרצר", english: "Cricket", emoji: "🦗", color: "bg-green-400", sound: [880, 1108, 1319] },
  FROG: { name: "frog", hebrew: "צפרדע", english: "Frog", emoji: "🐸", color: "bg-green-500", sound: [165, 208, 247] },
  WATERFALL: { name: "waterfall", hebrew: "מפל", english: "Waterfall", emoji: "💦", color: "bg-cyan-400", sound: [147, 185, 220] },
  OWL: { name: "owl", hebrew: "ינשוף", english: "Owl", emoji: "🦉", color: "bg-brown-500", sound: [131, 165, 196] },
  BEE: { name: "bee", hebrew: "דבורה", english: "Bee", emoji: "🐝", color: "bg-yellow-500", sound: [523, 659, 784] },
};

export const NATURE_SOUNDS_ITEMS = createItemsList(NATURE_SOUNDS_CONSTANTS);
export const NATURE_SOUNDS_PRONUNCIATIONS = createPronunciationDictionary(NATURE_SOUNDS_CONSTANTS);
export const NATURE_SOUNDS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק צלילי הטבע",
  subTitle: "הקשב לקולות הטבע ובעלי החיים!",
  description: "גלה את הקולות המדהימים של הטבע!",
  instructions: "לחץ על המקור הנכון של הצליל שאתה שומע",
};
