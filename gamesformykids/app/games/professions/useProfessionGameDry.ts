import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_PROFESSIONS, PROFESSION_HEBREW_PRONUNCIATIONS, PROFESSION_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק מקצועות - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useProfessionGameDry() {
  return useSimpleGame({
    items: ALL_PROFESSIONS,
    pronunciations: PROFESSION_HEBREW_PRONUNCIATIONS,
    gameConstants: PROFESSION_GAME_CONSTANTS,
  });
}
