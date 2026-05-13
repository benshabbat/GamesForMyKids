import { BaseGameItem } from "@/lib/types/core/base";
import { createGameConfig, createPronunciationDictionary } from "@/lib/constants/core";

export const NUMBER_CONSTANTS: Record<string, BaseGameItem> = {
  ZERO: { name: "zero", hebrew: "אפס", english: "Zero", emoji: "0️⃣", digit: "0", color: "", sound: [261, 329, 392] },
  ONE: { name: "one", hebrew: "אחד", english: "One", emoji: "1️⃣", digit: "1", color: "", sound: [293, 369, 440] },
  TWO: { name: "two", hebrew: "שתיים", english: "Two", emoji: "2️⃣", digit: "2", color: "", sound: [329, 415, 494] },
  THREE: { name: "three", hebrew: "שלוש", english: "Three", emoji: "3️⃣", digit: "3", color: "", sound: [349, 440, 523] },
  FOUR: { name: "four", hebrew: "ארבע", english: "Four", emoji: "4️⃣", digit: "4", color: "", sound: [392, 494, 587] },
  FIVE: { name: "five", hebrew: "חמש", english: "Five", emoji: "5️⃣", digit: "5", color: "", sound: [440, 554, 659] },
  SIX: { name: "six", hebrew: "שש", english: "Six", emoji: "6️⃣", digit: "6", color: "", sound: [493, 622, 740] },
  SEVEN: { name: "seven", hebrew: "שבע", english: "Seven", emoji: "7️⃣", digit: "7", color: "", sound: [523, 659, 784] },
  EIGHT: { name: "eight", hebrew: "שמונה", english: "Eight", emoji: "8️⃣", digit: "8", color: "", sound: [587, 740, 880] },
  NINE: { name: "nine", hebrew: "תשע", english: "Nine", emoji: "9️⃣", digit: "9", color: "", sound: [659, 831, 988] },
  TEN: { name: "ten", hebrew: "עשר", english: "Ten", emoji: "🔟", digit: "10", color: "", sound: [698, 880, 1047] }
};

export const ALL_NUMBERS = Object.values(NUMBER_CONSTANTS);
export const NUMBER_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(NUMBER_CONSTANTS);
export const NUMBER_GAME_CONSTANTS = createGameConfig(5, 1, 3);
