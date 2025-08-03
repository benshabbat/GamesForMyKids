import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_SHAPES, SHAPE_HEBREW_PRONUNCIATIONS, SHAPE_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק צורות - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useShapeGameDry() {
  return useSimpleGame({
    gameType: 'shapes',
    items: ALL_SHAPES,
    pronunciations: SHAPE_HEBREW_PRONUNCIATIONS,
    gameConstants: SHAPE_GAME_CONSTANTS,
  });
}
