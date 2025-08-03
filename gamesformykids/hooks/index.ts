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
export { useGenericGame } from "./games/useGenericGame";

/**
 * ===============================================
 * שימוש - דוגמאות
 * ===============================================
 * 
 * // למשחק פשוט:
 * import { useSimpleGame } from "@/hooks";
 * 
 * const useMyGame = () => useSimpleGame({
 *   gameType: 'my-game',
 *   items: MY_ITEMS,
 *   pronunciations: MY_PRONUNCIATIONS,
 *   gameConstants: MY_CONSTANTS
 * });
 * 
 * // למשחק כללי (מומלץ):
 * import { useGenericGame } from "@/hooks";
 * 
 * const useMyGame = () => useGenericGame(MY_ITEMS, 'my-game');
 * 
 * // למשחק מתקדם:  
 * import { useGenericGame, useGameAnalytics } from "@/hooks";
 * 
 * const useMyAdvancedGame = () => {
 *   const game = useGenericGame(MY_ITEMS, 'my-game');
 *   const analytics = useGameAnalytics(game.gameState);
 *   return { ...game, analytics };
 * };
 */
