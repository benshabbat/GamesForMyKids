import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const ART_CRAFT_CONSTANTS: Record<string, BaseGameItem> = {
  PAINTBRUSH: { name: "paintbrush", hebrew: "מכחול", english: "Paintbrush", emoji: "🖌️", color: "bg-red-400", sound: [440, 550, 660] },
  PENCIL: { name: "pencil", hebrew: "עיפרון", english: "Pencil", emoji: "✏️", color: "bg-yellow-400", sound: [294, 370, 440] },
  SCISSORS: { name: "scissors", hebrew: "מספרים", english: "Scissors", emoji: "✂️", color: "bg-gray-500", sound: [330, 415, 494] },
  GLUE: { name: "glue", hebrew: "דבק", english: "Glue", emoji: "🫙", color: "bg-amber-300", sound: [220, 277, 330] },
  CLAY: { name: "clay", hebrew: "חימר", english: "Clay", emoji: "🏺", color: "bg-orange-600", sound: [196, 247, 294] },
  ORIGAMI: { name: "origami", hebrew: "אוריגמי", english: "Origami", emoji: "🦢", color: "bg-pink-400", sound: [523, 622, 740] },
  STICKERS: { name: "stickers", hebrew: "מדבקות", english: "Stickers", emoji: "⭐", color: "bg-yellow-300", sound: [659, 784, 932] },
  PALETTE: { name: "palette", hebrew: "לוח צבעים", english: "Palette", emoji: "🎨", color: "bg-gradient-to-br from-red-400 to-blue-400", sound: [587, 698, 831] },
  CRAYON: { name: "crayon", hebrew: "צבע שעווה", english: "Crayon", emoji: "🖍️", color: "bg-orange-400", sound: [392, 494, 587] },
  CANVAS: { name: "canvas", hebrew: "בד ציור", english: "Canvas", emoji: "🖼️", color: "bg-amber-100", sound: [349, 440, 523] },
  STAMP: { name: "stamp", hebrew: "חותמת", english: "Stamp", emoji: "📮", color: "bg-blue-500", sound: [262, 330, 392] },
  RULER: { name: "ruler", hebrew: "סרגל", english: "Ruler", emoji: "📏", color: "bg-yellow-600", sound: [277, 349, 415] },
};

export const ART_CRAFT_ITEMS = createItemsList(ART_CRAFT_CONSTANTS);
export const ART_CRAFT_PRONUNCIATIONS = createPronunciationDictionary(ART_CRAFT_CONSTANTS);
export const ART_CRAFT_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק אמנות ויצירה",
  subTitle: "הכר כלי אמנות ויצירה!",
  description: "למד על כלי אמנות מגניבים ויצר יצירות מדהימות!",
  instructions: "לחץ על כלי האמנות הנכון כשאתה שומע את שמו",
};
