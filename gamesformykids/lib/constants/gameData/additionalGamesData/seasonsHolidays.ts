import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const SEASONS_HOLIDAYS_CONSTANTS: Record<string, BaseGameItem> = {
  SPRING: { name: "spring", hebrew: "אביב", english: "Spring", emoji: "🌸", color: "bg-pink-400", sound: [440, 550, 660] },
  SUMMER: { name: "summer", hebrew: "קיץ", english: "Summer", emoji: "☀️", color: "bg-yellow-500", sound: [523, 659, 784] },
  AUTUMN: { name: "autumn", hebrew: "סתיו", english: "Autumn", emoji: "🍂", color: "bg-orange-500", sound: [392, 494, 587] },
  WINTER: { name: "winter", hebrew: "חורף", english: "Winter", emoji: "❄️", color: "bg-blue-300", sound: [294, 370, 440] },
  PASSOVER: { name: "passover", hebrew: "פסח", english: "Passover", emoji: "🍷", color: "bg-red-500", sound: [349, 440, 523] },
  ROSH_HASHANA: { name: "rosh-hashana", hebrew: "ראש השנה", english: "Rosh Hashana", emoji: "🍎", color: "bg-red-400", sound: [330, 415, 494] },
  YOM_KIPPUR: { name: "yom-kippur", hebrew: "יום כיפור", english: "Yom Kippur", emoji: "🕊️", color: "bg-white", sound: [262, 330, 392] },
  SUKKOT: { name: "sukkot", hebrew: "סוכות", english: "Sukkot", emoji: "🏠", color: "bg-green-500", sound: [587, 698, 831] },
  HANUKKAH: { name: "hanukkah", hebrew: "חנוכה", english: "Hanukkah", emoji: "🕎", color: "bg-blue-600", sound: [196, 247, 294] },
  PURIM: { name: "purim", hebrew: "פורים", english: "Purim", emoji: "🎭", color: "bg-purple-500", sound: [277, 349, 415] },
};

export const SEASONS_HOLIDAYS_ITEMS = createItemsList(SEASONS_HOLIDAYS_CONSTANTS);
export const SEASONS_HOLIDAYS_PRONUNCIATIONS = createPronunciationDictionary(SEASONS_HOLIDAYS_CONSTANTS);
export const SEASONS_HOLIDAYS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק עונות השנה ומועדים",
  subTitle: "למד על עונות השנה והחגים היהודיים!",
  description: "גלה את עונות השנה והחגים המיוחדים!",
  instructions: "לחץ על העונה או החג הנכון",
};
