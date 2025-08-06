/**
 * ===============================================
 * מפת Hooks למשחקים - אוטומציה מלאה
 * ===============================================
 */

import { useGenericGame } from "@/hooks/games/useGenericGame";
import { GAME_ITEMS_MAP } from "./gameItemsMap";
import { BaseGameState, BaseGameItem } from "@/lib/types/base";

// Hooks מיוחדים עבור משחקים עם לוגיקה מורכבת
import { useMathGame } from "@/app/games/math/useMathGame";
// Memory game כעת משתמש בקונטקסט ולא בhook נפרד

// יצירת hooks כלליים לכל המשחקים - כולם משתמשים ב-useGenericGame!
// הערה: משחקי Math ו-Memory לא כלולים כי יש להם לוגיקה מיוחדת משלהם
const useAnimalsGame = () => useGenericGame(GAME_ITEMS_MAP.animals, 'animals');
const useColorsGame = () => useGenericGame(GAME_ITEMS_MAP.colors, 'colors');
const useFruitsGame = () => useGenericGame(GAME_ITEMS_MAP.fruits, 'fruits');
const useVegetablesGame = () => useGenericGame(GAME_ITEMS_MAP.vegetables, 'vegetables');
const useClothingGame = () => useGenericGame(GAME_ITEMS_MAP.clothing, 'clothing');
const useLettersGame = () => useGenericGame(GAME_ITEMS_MAP.letters, 'letters');
const useShapesGame = () => useGenericGame(GAME_ITEMS_MAP.shapes, 'shapes');
const useNumbersGame = () => useGenericGame(GAME_ITEMS_MAP.numbers, 'numbers');
const useSmellsTastesGame = () => useGenericGame(GAME_ITEMS_MAP["smells-tastes"], 'smells-tastes');
const useWeatherGame = () => useGenericGame(GAME_ITEMS_MAP.weather, 'weather');
const useTransportGame = () => useGenericGame(GAME_ITEMS_MAP.transport, 'transport');
const useVehiclesGame = () => useGenericGame(GAME_ITEMS_MAP.vehicles, 'vehicles');
const useToolsGame = () => useGenericGame(GAME_ITEMS_MAP.tools, 'tools');
const useSpaceGame = () => useGenericGame(GAME_ITEMS_MAP.space, 'space');
const useHouseGame = () => useGenericGame(GAME_ITEMS_MAP.house, 'house');
const useInstrumentsGame = () => useGenericGame(GAME_ITEMS_MAP.instruments, 'instruments');
const useProfessionsGame = () => useGenericGame(GAME_ITEMS_MAP.professions, 'professions');
const useEmotionsGame = () => useGenericGame(GAME_ITEMS_MAP.emotions, 'emotions');
// משחקים אלה הוסרו כי יש להם לוגיקה מיוחדת שלא תואמת ל-AutoGamePage:
// - counting: לוגיקת ספירה מיוחדת
// - bubbles: אנימציות ואפקטים ויזואליים
// - puzzles: מערכת פאזלים מורכבת

// טיפוס עבור משחקים שתומכים ב-AutoGamePage בלבד
export type AutoGameType = 
  | 'animals' | 'colors' | 'fruits' | 'vegetables' | 'clothing'
  | 'letters' | 'shapes' | 'numbers' | 'smells-tastes' | 'weather'
  | 'transport' | 'vehicles' | 'tools' | 'space' | 'house'
  | 'instruments' | 'professions' | 'emotions' | 'math';
// הערה: 'memory' הוסר כי הוא משתמש בקונטקסט ולא בhook

/**
 * 🎯 מפה מרכזית של כל ה-Hooks
 * כל hook משתמש ב-useGenericGame - עקביות מושלמת!
 * 
 * הערה: משחקי Math ו-Memory משתמשים בהוקים מיוחדים משלהם
 */
export const GAME_HOOKS_MAP = {
  animals: useAnimalsGame,
  colors: useColorsGame,
  fruits: useFruitsGame,
  vegetables: useVegetablesGame,
  clothing: useClothingGame,
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
  // משחקים מיוחדים עם לוגיקה מורכבת - לא דרך AutoGamePage
  math: useMathGame as unknown as typeof useAnimalsGame, // טיפוס שונה, לא יתיישם דרך AutoGamePage
  // memory: משתמש בקונטקסט ולא בhook, לא נכלל במפה
} as const satisfies Record<AutoGameType, () => {
  gameState: BaseGameState<BaseGameItem>;
  speakItemName: (itemName: string) => Promise<void>;
  startGame: () => Promise<void>;
  handleItemClick: (selectedItem: BaseGameItem) => Promise<void>;
  resetGame: () => void;
  // שיפורים חדשים
  hints?: Array<{
    type: 'color' | 'shape' | 'sound' | 'description' | 'visual';
    text: string;
    audioText?: string;
    isRevealed: boolean;
    order: number;
  }>;
  hasMoreHints?: boolean;
  showNextHint?: () => void;
  currentAccuracy?: number;
  progressStats?: object | null;
  performanceHooks?: object;
}>;

export type GameHookType = typeof GAME_HOOKS_MAP[keyof typeof GAME_HOOKS_MAP];
