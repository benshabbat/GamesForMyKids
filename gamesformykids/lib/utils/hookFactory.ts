/**
 * ===============================================
 * Hook Factory - יצירת Hooks אוטומטית
 * ===============================================
 * 
 * פתרון לדופליקייטים ב-hooks של משחקים
 */

import { BaseGameItem, GameType } from "@/lib/types/base";
import { useBaseGame } from "@/hooks/shared/useBaseGame";

/**
 * יוצר hook למשחק בצורה אוטומטית
 */
export function createGameHook(
  items: BaseGameItem[],
  gameType: GameType,
  customConfig?: {
    baseCount?: number;
    increment?: number;
    levelThreshold?: number;
  }
) {
  return function useGameHook() {
    // יצירת מילון הגייה אוטומטי
    const pronunciations = items.reduce<Record<string, string>>((acc, item) => {
      acc[item.name] = item.hebrew;
      return acc;
    }, {});

    return useBaseGame({
      gameType,
      items,
      pronunciations,
      gameConstants: {
        BASE_COUNT: customConfig?.baseCount || 4,
        INCREMENT: customConfig?.increment || 1,
        LEVEL_THRESHOLD: customConfig?.levelThreshold || 3,
      },
    });
  };
}

/**
 * דוגמה לשימוש:
 * 
 * ```typescript
 * import { ALL_COLORS } from '@/lib/constants/items/colors';
 * 
 * export const useColorsGame = createGameHook(ALL_COLORS, 'colors');
 * 
 * // בקומפוננט:
 * function ColorsGame() {
 *   const { gameState, startGame, handleItemClick } = useColorsGame();
 *   // ...
 * }
 * ```
 */

/**
 * מפעל ליצירת hooks למשחקים נפוצים
 */
export function createStandardGameHooks(items: Record<GameType, BaseGameItem[]>) {
  return Object.entries(items).reduce((hooks, [gameType, gameItems]) => {
    hooks[`use${gameType.charAt(0).toUpperCase() + gameType.slice(1)}Game`] = 
      createGameHook(gameItems, gameType as GameType);
    return hooks;
  }, {} as Record<string, () => ReturnType<typeof useBaseGame>>);
}
