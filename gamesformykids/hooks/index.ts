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

// Audio & Speech
export * from './shared/audio';

// Analytics & Performance  
export * from './shared/analytics';

// User & Profile
export * from './shared/user';

// UI & Events
export * from './shared/ui';

// Games Hooks
export { useSimpleGame } from "./games/useSimpleGame";
export { useGenericGame } from "./games/useGenericGame";
export { usePuzzleFeedback } from "@/app/games/puzzles/hooks/usePuzzleFeedback";

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

// Hebrew Letters specific hooks
export { default as useHebrewLetterPractice } from '@/app/games/hebrew-letters/hooks/useHebrewLetterPractice';
