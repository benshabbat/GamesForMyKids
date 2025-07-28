/**
 * ===============================================
 * מפת Hooks למשחקים - אוטומציה מלאה
 * ===============================================
 */

import { useAnimalGameDry } from "@/app/games/animals/useAnimalGameDry";
import { useColorGameAdvanced } from "@/app/games/colors/useColorGameAdvanced";
import { useFruitGameDry } from "@/app/games/fruits/useFruitGameDry";
import { useVegetableGameDry } from "@/app/games/vegetables/useVegetableGameDry";
import { useClothingGameDry } from "@/app/games/clothing/useClothingGameDry";
// TODO: להוסיף את שאר ה-hooks כשיהיו מוכנים

import { GameType, BaseGameState, BaseGameItem } from "@/lib/types/base";

/**
 * 🎯 מפה מרכזית של כל ה-Hooks
 * כל hook מוכן לשימוש עם useSimpleGame
 */
export const GAME_HOOKS_MAP = {
  animals: useAnimalGameDry,
  colors: useColorGameAdvanced,
  fruits: useFruitGameDry,
  vegetables: useVegetableGameDry,
  clothing: useClothingGameDry,
  // TODO: להוסיף את שאר המשחקים
  letters: useAnimalGameDry, // טמפורי - צריך ליצור
  shapes: useAnimalGameDry, // טמפורי - צריך ליצור
  numbers: useAnimalGameDry, // טמפורי - צריך ליצור
  "smells-tastes": useAnimalGameDry, // טמפורי
  weather: useAnimalGameDry, // טמפורי
  transport: useAnimalGameDry, // טמפורי
  vehicles: useAnimalGameDry, // טמפורי
  tools: useAnimalGameDry, // טמפורי
  space: useAnimalGameDry, // טמפורי
  house: useAnimalGameDry, // טמפורי
  instruments: useAnimalGameDry, // טמפורי
  professions: useAnimalGameDry, // טמפורי
  emotions: useAnimalGameDry, // טמפורי
  memory: useAnimalGameDry, // טמפורי
  counting: useAnimalGameDry, // טמפורי
  math: useAnimalGameDry, // טמפורי
  bubbles: useAnimalGameDry, // טמפורי
} as const satisfies Record<GameType, () => {
  gameState: BaseGameState<BaseGameItem>;
  speakItemName: (itemName: string) => Promise<void>;
  startGame: () => Promise<void>;
  handleItemClick: (selectedItem: BaseGameItem) => Promise<void>;
  resetGame: () => void;
}>;

export type GameHookType = typeof GAME_HOOKS_MAP[keyof typeof GAME_HOOKS_MAP];
