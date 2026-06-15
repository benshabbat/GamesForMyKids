import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const SPACE_CONSTANTS: Record<string, BaseGameItem> = {
  SUN: { name: "sun", hebrew: "שמש", english: "Sun", emoji: "☀️", color: "bg-yellow-500", sound: [523, 659, 784], funFact: "השמש כה גדולה שיכולות להיכנס בה מיליון כדורי ארץ!" },
  MOON: { name: "moon", hebrew: "ירח", english: "Moon", emoji: "🌙", color: "bg-gray-300", sound: [392, 494, 587], funFact: "הירח מתרחק מכדור הארץ כ-3.8 ס\"מ בכל שנה!" },
  STAR: { name: "star", hebrew: "כוכב", english: "Star", emoji: "⭐", color: "bg-yellow-400", sound: [659, 831, 988], funFact: "אור הכוכבים לוקח שנים להגיע אלינו — אנו רואים את עברם!" },
  EARTH: { name: "earth", hebrew: "כדור הארץ", english: "Earth", emoji: "🌍", color: "bg-blue-500", sound: [349, 440, 523], funFact: "כדור הארץ עוטף עצמו בסיבוב אחד כל 24 שעות!" },
  ROCKET: { name: "rocket", hebrew: "חללית", english: "Rocket", emoji: "🚀", color: "bg-red-500", sound: [440, 554, 659], funFact: "טיסה לירח אורכת כ-3 ימים בחללית!" },
  PLANET: { name: "planet", hebrew: "כוכב לכת", english: "Planet", emoji: "🪐", color: "bg-purple-500", sound: [330, 415, 494], funFact: "צדק הוא הכוכב לכת הגדול ביותר — 1,300 כדורי ארץ יכנסו בו!" },
};

export const ALL_SPACE_OBJECTS = createItemsList(SPACE_CONSTANTS);
export const SPACE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(SPACE_CONSTANTS);
export const SPACE_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
