import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_FRUITS, FRUIT_HEBREW_PRONUNCIATIONS, FRUIT_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק פירות - גרסה DRY
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useFruitGameDry() {
  return useSimpleGame({
    items: ALL_FRUITS,
    pronunciations: FRUIT_HEBREW_PRONUNCIATIONS,  
    gameConstants: FRUIT_GAME_CONSTANTS,
  });
}
