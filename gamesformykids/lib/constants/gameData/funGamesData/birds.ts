import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const BIRDS_CONSTANTS: Record<string, BaseGameItem> = {
  EAGLE: { name: "eagle", hebrew: "נשר", english: "Eagle", emoji: "🦅", color: "bg-amber-700", sound: [440, 550, 660] },
  OWL: { name: "owl", hebrew: "ינשוף", english: "Owl", emoji: "🦉", color: "bg-amber-800", sound: [294, 370, 440] },
  PARROT: { name: "parrot", hebrew: "תוכי", english: "Parrot", emoji: "🦜", color: "bg-green-500", sound: [523, 659, 784] },
  PENGUIN: { name: "penguin", hebrew: "פינגווין", english: "Penguin", emoji: "🐧", color: "bg-slate-700", sound: [349, 440, 523] },
  FLAMINGO: { name: "flamingo", hebrew: "פלמינגו", english: "Flamingo", emoji: "🦩", color: "bg-pink-400", sound: [392, 494, 587] },
  PEACOCK: { name: "peacock", hebrew: "טווס", english: "Peacock", emoji: "🦚", color: "bg-teal-500", sound: [330, 415, 494] },
  DUCK: { name: "duck", hebrew: "ברווז", english: "Duck", emoji: "🦆", color: "bg-yellow-500", sound: [262, 330, 392] },
  ROOSTER: { name: "rooster", hebrew: "תרנגול", english: "Rooster", emoji: "🐓", color: "bg-red-500", sound: [587, 698, 831] },
  SWAN: { name: "swan", hebrew: "ברבור", english: "Swan", emoji: "🦢", color: "bg-white", sound: [659, 784, 932] },
  TOUCAN: { name: "toucan", hebrew: "טוקן", english: "Toucan", emoji: "🦜", color: "bg-orange-500", sound: [220, 277, 330] },
  HUMMINGBIRD: { name: "hummingbird", hebrew: "יונק דבש", english: "Hummingbird", emoji: "🐦", color: "bg-emerald-500", sound: [698, 880, 1047] },
  CROW: { name: "crow", hebrew: "עורב", english: "Crow", emoji: "🐦‍⬛", color: "bg-gray-900", sound: [196, 247, 294] },
};

export const BIRDS_ITEMS = createItemsList(BIRDS_CONSTANTS);
export const BIRDS_PRONUNCIATIONS = createPronunciationDictionary(BIRDS_CONSTANTS);
export const BIRDS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק ציפורים",
  subTitle: "הכר ציפורים מרחבי העולם!",
  description: "גלה ציפורים מדהימות מכל קצות תבל ולמד את שמותיהן!",
  instructions: "לחץ על הציפור הנכונה כשאתה שומע את שמה",
};
