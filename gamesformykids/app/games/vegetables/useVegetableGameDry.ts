import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_VEGETABLES, VEGETABLE_HEBREW_PRONUNCIATIONS, VEGETABLE_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק ירקות - גרסה DRY
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useVegetableGameDry() {
  return useSimpleGame({
    gameType: 'vegetables',
    items: ALL_VEGETABLES,
    pronunciations: VEGETABLE_HEBREW_PRONUNCIATIONS,
    gameConstants: VEGETABLE_GAME_CONSTANTS,
  });
}
