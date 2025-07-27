import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { useGameAnalytics } from "@/hooks/shared/useGameAnalytics";
import { useGameAudio } from "@/hooks/shared/useGameAudio";  
import { ALL_COLORS, COLOR_HEBREW_PRONUNCIATIONS, COLOR_GAME_CONSTANTS } from "@/lib/constants";
import { BaseGameItem } from "@/lib/types/base";

/**
 * Hook מתקדם למשחק צבעים - דוגמה לשימוש בכל ה-Hooks
 * משלב את כל הפונקציונליות המתקדמת
 */
export function useColorGameAdvanced() {
  // משחק בסיסי
  const gameLogic = useSimpleGame({
    items: ALL_COLORS,
    pronunciations: COLOR_HEBREW_PRONUNCIATIONS,
    gameConstants: COLOR_GAME_CONSTANTS,
  });

  // אנליטיקס
  const analytics = useGameAnalytics(gameLogic.gameState);

  // אודיו נוסף
  const audio = useGameAudio();

  // פונקציה משולבת לטיפול בלחיצה
  const handleItemClick = async (item: BaseGameItem) => {
    const isCorrect = item.name === gameLogic.gameState.currentChallenge?.name;
    
    // רשום את התשובה
    analytics.recordAnswer(isCorrect);
    
    // השמע אפקט מיוחד
    if (isCorrect) {
      audio.playSuccessSound();
    }
    
    // הפעל לוגיקה רגילה
    await gameLogic.handleItemClick(item);
  };

  return {
    ...gameLogic,
    handleItemClick, // החלף בגרסה המשולבת
    analytics,
    audio,
  };
}
