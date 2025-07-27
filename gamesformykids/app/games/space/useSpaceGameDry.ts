import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_SPACE_OBJECTS, SPACE_HEBREW_PRONUNCIATIONS, SPACE_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק חלל - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useSpaceGameDry() {
  return useSimpleGame({
    items: ALL_SPACE_OBJECTS,
    pronunciations: SPACE_HEBREW_PRONUNCIATIONS,
    gameConstants: SPACE_GAME_CONSTANTS,
  });
}
