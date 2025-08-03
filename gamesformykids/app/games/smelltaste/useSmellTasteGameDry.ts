import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_SMELLS_TASTES, SMELL_TASTE_HEBREW_PRONUNCIATIONS, SMELL_TASTE_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק ריח וטעם - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useSmellTasteGameDry() {
  return useSimpleGame({
    gameType: 'smells-tastes',
    items: ALL_SMELLS_TASTES,
    pronunciations: SMELL_TASTE_HEBREW_PRONUNCIATIONS,
    gameConstants: SMELL_TASTE_GAME_CONSTANTS,
  });
}
