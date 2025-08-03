import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_NUMBERS, NUMBER_HEBREW_PRONUNCIATIONS, NUMBER_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק מספרים - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useNumberGameDry() {
  return useSimpleGame({
    gameType: 'numbers',
    items: ALL_NUMBERS,
    pronunciations: NUMBER_HEBREW_PRONUNCIATIONS,
    gameConstants: NUMBER_GAME_CONSTANTS,
  });
}
