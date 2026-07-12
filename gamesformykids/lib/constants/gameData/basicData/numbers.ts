import { BaseGameItem } from "@/lib/types/core/base";
import { createGameConfig, createPronunciationDictionary } from "@/lib/constants/core";

export const NUMBER_CONSTANTS: Record<string, BaseGameItem> = {
  ZERO: { name: "zero", hebrew: "אפס", english: "Zero", emoji: "0️⃣", digit: "0", color: "bg-gradient-to-br from-slate-400 to-slate-600", sound: [261, 329, 392] },
  ONE: { name: "one", hebrew: "אחד", english: "One", emoji: "1️⃣", digit: "1", color: "bg-gradient-to-br from-blue-400 to-blue-600", sound: [293, 369, 440] },
  TWO: { name: "two", hebrew: "שתיים", english: "Two", emoji: "2️⃣", digit: "2", color: "bg-gradient-to-br from-green-400 to-green-600", sound: [329, 415, 494] },
  THREE: { name: "three", hebrew: "שלוש", english: "Three", emoji: "3️⃣", digit: "3", color: "bg-gradient-to-br from-yellow-400 to-yellow-600", sound: [349, 440, 523] },
  FOUR: { name: "four", hebrew: "ארבע", english: "Four", emoji: "4️⃣", digit: "4", color: "bg-gradient-to-br from-orange-400 to-orange-600", sound: [392, 494, 587] },
  FIVE: { name: "five", hebrew: "חמש", english: "Five", emoji: "5️⃣", digit: "5", color: "bg-gradient-to-br from-red-400 to-red-600", sound: [440, 554, 659] },
  SIX: { name: "six", hebrew: "שש", english: "Six", emoji: "6️⃣", digit: "6", color: "bg-gradient-to-br from-purple-400 to-purple-600", sound: [493, 622, 740] },
  SEVEN: { name: "seven", hebrew: "שבע", english: "Seven", emoji: "7️⃣", digit: "7", color: "bg-gradient-to-br from-pink-400 to-pink-600", sound: [523, 659, 784] },
  EIGHT: { name: "eight", hebrew: "שמונה", english: "Eight", emoji: "8️⃣", digit: "8", color: "bg-gradient-to-br from-cyan-400 to-cyan-600", sound: [587, 740, 880] },
  NINE: { name: "nine", hebrew: "תשע", english: "Nine", emoji: "9️⃣", digit: "9", color: "bg-gradient-to-br from-teal-400 to-teal-600", sound: [659, 831, 988] },
  TEN: { name: "ten", hebrew: "עשר", english: "Ten", emoji: "🔟", digit: "10", color: "bg-gradient-to-br from-indigo-400 to-indigo-600", sound: [698, 880, 1047] }
};

export const ALL_NUMBERS = Object.values(NUMBER_CONSTANTS);
export const NUMBER_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(NUMBER_CONSTANTS);
export const NUMBER_GAME_CONSTANTS = createGameConfig(5, 1, 3);
