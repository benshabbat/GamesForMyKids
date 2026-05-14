import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const FRUITS: Record<string, BaseGameItem> = {
  APPLE: { name: "apple", hebrew: "תפוח", english: "Apple", emoji: "🍎", color: "bg-red-500", sound: [440, 550, 660] },
  BANANA: { name: "banana", hebrew: "בננה", english: "Banana", emoji: "🍌", color: "bg-yellow-500", sound: [392, 494, 587] },
  ORANGE: { name: "orange", hebrew: "תפוז", english: "Orange", emoji: "🍊", color: "bg-orange-500", sound: [330, 415, 494] },
  GRAPES: { name: "grapes", hebrew: "ענבים", english: "Grapes", emoji: "🍇", color: "bg-purple-500", sound: [294, 370, 440] },
  STRAWBERRY: { name: "strawberry", hebrew: "תות", english: "Strawberry", emoji: "🍓", color: "bg-pink-500", sound: [587, 698, 784] },
  WATERMELON: { name: "watermelon", hebrew: "אבטיח", english: "Watermelon", emoji: "🍉", color: "bg-green-500", sound: [349, 440, 523] },
  PEACH: { name: "peach", hebrew: "אפרסק", english: "Peach", emoji: "🍑", color: "bg-orange-400", sound: [277, 349, 415] },
  PEAR: { name: "pear", hebrew: "אגס", english: "Pear", emoji: "🍐", color: "bg-green-400", sound: [262, 330, 392] },
  PINEAPPLE: { name: "pineapple", hebrew: "אננס", english: "Pineapple", emoji: "🍍", color: "bg-yellow-600", sound: [233, 294, 349] },
  CHERRY: { name: "cherry", hebrew: "דובדבן", english: "Cherry", emoji: "🍒", color: "bg-red-600", sound: [523, 659, 784] },
};

export const ALL_FRUITS = createItemsList(FRUITS);
export const FRUIT_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(FRUITS);
export const FRUIT_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
