import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_COLORS, COLOR_HEBREW_PRONUNCIATIONS, COLOR_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק צבעים - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useColorGameDry() {
  return useSimpleGame({
    gameType: 'colors',
    items: ALL_COLORS,
    pronunciations: COLOR_HEBREW_PRONUNCIATIONS,
    gameConstants: COLOR_GAME_CONSTANTS,
  });
}
