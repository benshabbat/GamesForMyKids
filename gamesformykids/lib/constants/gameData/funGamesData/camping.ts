import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const CAMPING_CONSTANTS: Record<string, BaseGameItem> = {
  TENT: { name: "tent", hebrew: "אוהל", english: "Tent", emoji: "⛺", color: "bg-green-600", sound: [262, 330, 392] },
  CAMPFIRE: { name: "campfire", hebrew: "מדורה", english: "Campfire", emoji: "🔥", color: "bg-orange-500", sound: [196, 247, 294] },
  BACKPACK: { name: "backpack", hebrew: "תרמיל", english: "Backpack", emoji: "🎒", color: "bg-amber-700", sound: [330, 415, 494] },
  FLASHLIGHT: { name: "flashlight", hebrew: "פנס", english: "Flashlight", emoji: "🔦", color: "bg-yellow-400", sound: [440, 554, 659] },
  COMPASS: { name: "compass", hebrew: "מצפן", english: "Compass", emoji: "🧭", color: "bg-red-500", sound: [523, 659, 784] },
  SLEEPING_BAG: { name: "sleeping-bag", hebrew: "שק שינה", english: "Sleeping Bag", emoji: "🛏️", color: "bg-blue-500", sound: [294, 370, 440] },
  BINOCULARS: { name: "binoculars", hebrew: "משקפת", english: "Binoculars", emoji: "🔭", color: "bg-gray-700", sound: [392, 494, 587] },
  CANTEEN: { name: "canteen", hebrew: "קנטינת מים", english: "Water Canteen", emoji: "🫙", color: "bg-cyan-600", sound: [349, 440, 523] },
  MAP: { name: "map", hebrew: "מפה", english: "Map", emoji: "🗺️", color: "bg-amber-400", sound: [587, 698, 831] },
  HIKING_BOOTS: { name: "hiking-boots", hebrew: "נעלי הליכה", english: "Hiking Boots", emoji: "🥾", color: "bg-brown-600", sound: [220, 277, 330] },
  FISHING_ROD: { name: "fishing-rod", hebrew: "חכה", english: "Fishing Rod", emoji: "🎣", color: "bg-teal-600", sound: [659, 784, 932] },
  NATURE_BOOK: { name: "nature-book", hebrew: "ספר טבע", english: "Nature Book", emoji: "📚", color: "bg-green-500", sound: [262, 330, 392] },
};

export const CAMPING_ITEMS = createItemsList(CAMPING_CONSTANTS);
export const CAMPING_PRONUNCIATIONS = createPronunciationDictionary(CAMPING_CONSTANTS);
export const CAMPING_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק טיול ושטח",
  subTitle: "הכן את הציוד לטיול!",
  description: "קח את הציוד הנכון לטיול ולמד מה נחוץ להרפתקאה בטבע!",
  instructions: "לחץ על פריט הציוד הנכון כשאתה שומע את שמו",
};
