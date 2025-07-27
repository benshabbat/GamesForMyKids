import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_CLOTHING, CLOTHING_HEBREW_PRONUNCIATIONS, CLOTHING_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק בגדים - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useClothingGameDry() {
  return useSimpleGame({
    items: ALL_CLOTHING,
    pronunciations: CLOTHING_HEBREW_PRONUNCIATIONS,
    gameConstants: CLOTHING_GAME_CONSTANTS,
  });
}
