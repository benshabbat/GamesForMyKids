import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const FAIRY_TALE_CHARS_CONSTANTS: Record<string, BaseGameItem> = {
  PRINCESS: { name: "princess", hebrew: "נסיכה", english: "Princess", emoji: "👸", color: "bg-pink-500", sound: [659, 784, 932] },
  PRINCE: { name: "prince", hebrew: "נסיך", english: "Prince", emoji: "🤴", color: "bg-blue-500", sound: [523, 659, 784] },
  DRAGON: { name: "dragon", hebrew: "דרקון", english: "Dragon", emoji: "🐉", color: "bg-red-600", sound: [196, 247, 294] },
  WITCH: { name: "witch", hebrew: "מכשפה", english: "Witch", emoji: "🧙‍♀️", color: "bg-purple-700", sound: [220, 277, 330] },
  WIZARD: { name: "wizard", hebrew: "קוסם", english: "Wizard", emoji: "🧙‍♂️", color: "bg-indigo-700", sound: [330, 415, 494] },
  FAIRY: { name: "fairy", hebrew: "פיה", english: "Fairy", emoji: "🧚", color: "bg-pink-300", sound: [784, 932, 1047] },
  UNICORN: { name: "unicorn", hebrew: "חד קרן", english: "Unicorn", emoji: "🦄", color: "bg-gradient-to-br from-pink-400 to-purple-400", sound: [880, 988, 1109] },
  GIANT: { name: "giant", hebrew: "ענק", english: "Giant", emoji: "🧌", color: "bg-green-700", sound: [131, 165, 196] },
  ELF: { name: "elf", hebrew: "אלף", english: "Elf", emoji: "🧝", color: "bg-emerald-500", sound: [587, 698, 831] },
  MERMAID: { name: "mermaid", hebrew: "בת ים", english: "Mermaid", emoji: "🧜", color: "bg-cyan-500", sound: [440, 554, 659] },
  KNIGHT: { name: "knight", hebrew: "אביר", english: "Knight", emoji: "🪖", color: "bg-gray-600", sound: [392, 494, 587] },
  GENIE: { name: "genie", hebrew: "ג'יני קסם", english: "Genie", emoji: "🧞", color: "bg-blue-600", sound: [698, 880, 1047] },
};

export const FAIRY_TALE_CHARS_ITEMS = createItemsList(FAIRY_TALE_CHARS_CONSTANTS);
export const FAIRY_TALE_CHARS_PRONUNCIATIONS = createPronunciationDictionary(FAIRY_TALE_CHARS_CONSTANTS);
export const FAIRY_TALE_CHARS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק דמויות מאגדות",
  subTitle: "הכר דמויות קסומות מאגדות!",
  description: "גלה דמויות קסומות מאגדות שמחוז ילדותך ולמד את שמותיהן!",
  instructions: "לחץ על הדמות הנכונה כשאתה שומע את שמה",
};
