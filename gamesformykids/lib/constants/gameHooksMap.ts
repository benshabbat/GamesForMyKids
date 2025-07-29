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
import { useGenericGame } from "@/hooks/games/useGenericGame";
import { GAME_ITEMS_MAP } from "./gameItemsMap";

import { GameType, BaseGameState, BaseGameItem } from "@/lib/types/base";

// יצירת hooks כלליים לכל המשחקים החסרים
const useLettersGame = () => useGenericGame(GAME_ITEMS_MAP.letters);
const useShapesGame = () => useGenericGame(GAME_ITEMS_MAP.shapes);
const useNumbersGame = () => useGenericGame(GAME_ITEMS_MAP.numbers);
const useSmellsTastesGame = () => useGenericGame(GAME_ITEMS_MAP["smells-tastes"]);
const useWeatherGame = () => useGenericGame(GAME_ITEMS_MAP.weather);
const useTransportGame = () => useGenericGame(GAME_ITEMS_MAP.transport);
const useVehiclesGame = () => useGenericGame(GAME_ITEMS_MAP.vehicles);
const useToolsGame = () => useGenericGame(GAME_ITEMS_MAP.tools);
const useSpaceGame = () => useGenericGame(GAME_ITEMS_MAP.space);
const useHouseGame = () => useGenericGame(GAME_ITEMS_MAP.house);
const useInstrumentsGame = () => useGenericGame(GAME_ITEMS_MAP.instruments);
const useProfessionsGame = () => useGenericGame(GAME_ITEMS_MAP.professions);
const useEmotionsGame = () => useGenericGame(GAME_ITEMS_MAP.emotions);
const useMemoryGame = () => useGenericGame(GAME_ITEMS_MAP.memory);
const useCountingGame = () => useGenericGame(GAME_ITEMS_MAP.counting);
const useMathGame = () => useGenericGame(GAME_ITEMS_MAP.math);
const useBubblesGame = () => useGenericGame(GAME_ITEMS_MAP.bubbles);

/**
 * 🎯 מפה מרכזית של כל ה-Hooks
 * כל hook מוכן לשימוש עם useSimpleGame או useGenericGame
 */
export const GAME_HOOKS_MAP = {
  animals: useAnimalGameDry,
  colors: useColorGameAdvanced,
  fruits: useFruitGameDry,
  vegetables: useVegetableGameDry,
  clothing: useClothingGameDry,
  // המשחקים הבאים משתמשים בהוק הכללי עם הפריטים הנכונים
  letters: useLettersGame,
  shapes: useShapesGame,
  numbers: useNumbersGame,
  "smells-tastes": useSmellsTastesGame,
  weather: useWeatherGame,
  transport: useTransportGame,
  vehicles: useVehiclesGame,
  tools: useToolsGame,
  space: useSpaceGame,
  house: useHouseGame,
  instruments: useInstrumentsGame,
  professions: useProfessionsGame,
  emotions: useEmotionsGame,
  memory: useMemoryGame,
  counting: useCountingGame,
  math: useMathGame,
  bubbles: useBubblesGame,
} as const satisfies Record<GameType, () => {
  gameState: BaseGameState<BaseGameItem>;
  speakItemName: (itemName: string) => Promise<void>;
  startGame: () => Promise<void>;
  handleItemClick: (selectedItem: BaseGameItem) => Promise<void>;
  resetGame: () => void;
}>;

export type GameHookType = typeof GAME_HOOKS_MAP[keyof typeof GAME_HOOKS_MAP];
