import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_HOUSE_ITEMS, HOUSE_HEBREW_PRONUNCIATIONS, HOUSE_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק בית - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useHouseGameDry() {
  return useSimpleGame({
    items: ALL_HOUSE_ITEMS,
    pronunciations: HOUSE_HEBREW_PRONUNCIATIONS,
    gameConstants: HOUSE_GAME_CONSTANTS,
  });
}
