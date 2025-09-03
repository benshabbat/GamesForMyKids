import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { BaseGameItem, GameType } from "@/lib/types/core/base";

/**
 * Hook כללי למשחקים - הפתרון האוניברסלי למשחקים פשוטים
 * 
 * @description
 * Hook זה מהווה את הליבה של כל המשחקים הפשוטים במערכת.
 * הוא מקבל רשימת פריטים ויוצר משחק מלא עם כל הפונקציונליות הנדרשת:
 * - ניהול מצב משחק
 * - הגייה והשמעה
 * - ניקוד ורמות
 * - אנימציות וחגיגות
 * 
 * @param {BaseGameItem[]} items - רשימת פריטי המשחק (צבעים, צורות, חיות וכו')
 * @param {GameType} gameType - סוג המשחק לצורך זיהוי וניתוח
 * 
 * @returns {Object} אובייקט עם כל הפונקציות הנדרשות למשחק:
 * - gameState: מצב המשחק הנוכחי
 * - speakItemName: פונקציה להשמעת שם הפריט
 * - startGame: התחלת משחק חדש
 * - handleItemClick: טיפול בלחיצה על פריט
 * - resetGame: איפוס המשחק
 * - hints: רמזים ועזרות למשחק
 * - performanceHooks: מעקב אחר ביצועים
 * 
 * @example
 * ```typescript
 * // יצירת משחק צבעים
 * const colorGame = useGenericGame(ALL_COLORS, 'colors');
 * 
 * // שימוש במשחק
 * const { gameState, startGame, handleItemClick } = colorGame;
 * 
 * // בקומפוננט
 * if (!gameState.isPlaying) {
 *   return <StartScreen onStart={startGame} />;
 * }
 * 
 * return (
 *   <GameGrid 
 *     items={gameState.options} 
 *     onItemClick={handleItemClick} 
 *   />
 * );
 * ```
 * 
 * @since 1.0.0
 * @author Games For My Kids Team
 */
export function useGenericGame(items: BaseGameItem[], gameType: GameType) {
  // יצירת מילון הגייה אוטומטי מהפריטים עצמם
  const pronunciations = items.reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = item.hebrew;
    return acc;
  }, {});

  return useSimpleGame({
    gameType,
    items,
    pronunciations,
    gameConstants: {
      BASE_COUNT: 4,
      INCREMENT: 1,
      LEVEL_THRESHOLD: 3,
    },
  });
}
