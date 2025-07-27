/**
 * ===============================================
 * מערכת Hooks DRY למשחקים
 * ===============================================
 * 
 * מערכת חדשה ונקייה ליצירת משחקים עם פחות קוד
 * וקלות תחזוקה וטיפול בבאגים.
 */

// Hooks בסיסיים ומשותפים
export { useGameAudio } from "./shared/useGameAudio";
export { useGameAnalytics } from "./shared/useGameAnalytics";
export { useGameOptions } from "./shared/useGameOptions";
export { useAdvancedGameState } from "./shared/useAdvancedGameState";
export { useBaseGame } from "./shared/useBaseGame";

// Hooks למשחקים
export { useSimpleGame } from "./games/useSimpleGame";

// דוגמאות למשחקים DRY - אמורים להחליף את הישנים
export { useVegetableGameDry } from "../app/games/vegetables/useVegetableGameDry";
export { useFruitGameDry } from "../app/games/fruits/useFruitGameDry";
export { useAnimalGameDry } from "../app/games/animals/useAnimalGameDry";
export { useColorGameAdvanced } from "../app/games/colors/useColorGameAdvanced";

/**
 * ===============================================
 * שימוש - דוגמאות
 * ===============================================
 * 
 * // לעשל משחק פשוט:
 * import { useSimpleGame } from "@/hooks";
 * 
 * const useMyGame = () => useSimpleGame({
 *   items: MY_ITEMS,
 *   pronunciations: MY_PRONUNCIATIONS,
 *   gameConstants: MY_CONSTANTS
 * });
 * 
 * // למשחק מתקדם:  
 * import { useSimpleGame, useGameAnalytics } from "@/hooks";
 * 
 * const useMyAdvancedGame = () => {
 *   const game = useSimpleGame({...});
 *   const analytics = useGameAnalytics(game.gameState);
 *   return { ...game, analytics };
 * };
 */
