/**
 * ===============================================
 * מערכת Hooks DRY למשחקים
 * ===============================================
 * 
 * מערכת חדשה ונקייה ליצירת משחקים עם פחות קוד
 * וקלות תחזוקה וטיפול בבאגים.
 */

// Game State Hooks
export * from './shared/game-state';

// Progress & Achievements
export * from './shared/progress';

// Analytics & Performance  
export * from './shared/analytics';

// User & Profile
export * from './shared/user';

// UI & Events
export * from './shared/ui';

// Games Hooks
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
 */
