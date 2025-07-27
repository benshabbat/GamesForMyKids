import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_LETTERS, LETTER_HEBREW_PRONUNCIATIONS, LETTER_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק אותיות - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useLetterGameDry() {
  return useSimpleGame({
    items: ALL_LETTERS,
    pronunciations: LETTER_HEBREW_PRONUNCIATIONS,
    gameConstants: LETTER_GAME_CONSTANTS,
  });
}
