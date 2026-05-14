import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const SUPERHEROES_CONSTANTS: Record<string, BaseGameItem> = {
  FLYING: { name: "flying", hebrew: "טיסה", english: "Flying", emoji: "🦸", color: "bg-blue-600", sound: [523, 659, 784] },
  STRENGTH: { name: "strength", hebrew: "כוח", english: "Strength", emoji: "💪", color: "bg-red-600", sound: [294, 370, 440] },
  SPEED: { name: "speed", hebrew: "מהירות", english: "Speed", emoji: "⚡", color: "bg-yellow-400", sound: [698, 880, 1047] },
  INVISIBILITY: { name: "invisibility", hebrew: "אי-ראות", english: "Invisibility", emoji: "👻", color: "bg-gray-300", sound: [175, 220, 262] },
  LASER_EYES: { name: "laser-eyes", hebrew: "עיני לייזר", english: "Laser Eyes", emoji: "👁️", color: "bg-red-500", sound: [880, 988, 1109] },
  SHIELD: { name: "shield", hebrew: "מגן", english: "Shield", emoji: "🛡️", color: "bg-indigo-600", sound: [330, 415, 494] },
  WEB: { name: "web", hebrew: "רשת עכביש", english: "Spider Web", emoji: "🕸️", color: "bg-slate-600", sound: [392, 494, 587] },
  CAPE: { name: "cape", hebrew: "גלימה", english: "Cape", emoji: "🦸‍♂️", color: "bg-purple-700", sound: [440, 554, 659] },
  ICE: { name: "ice", hebrew: "קרח", english: "Ice Powers", emoji: "🧊", color: "bg-cyan-500", sound: [196, 247, 294] },
  FIRE: { name: "fire", hebrew: "אש", english: "Fire Powers", emoji: "🔥", color: "bg-orange-500", sound: [587, 698, 831] },
  HEALING: { name: "healing", hebrew: "ריפוי", english: "Healing", emoji: "💚", color: "bg-green-500", sound: [523, 659, 784] },
  TELEPATHY: { name: "telepathy", hebrew: "טלפתיה", english: "Telepathy", emoji: "🧠", color: "bg-violet-600", sound: [262, 330, 392] },
};

export const SUPERHEROES_ITEMS = createItemsList(SUPERHEROES_CONSTANTS);
export const SUPERHEROES_PRONUNCIATIONS = createPronunciationDictionary(SUPERHEROES_CONSTANTS);
export const SUPERHEROES_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק גיבורי על",
  subTitle: "למד על כוחות על מדהימים!",
  description: "גלה עולם גיבורי העל ולמד על כוחות וסמלים מרתקים!",
  instructions: "לחץ על הכוח הנכון כשאתה שומע את שמו",
};
