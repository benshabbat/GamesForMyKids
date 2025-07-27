import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_ANIMALS, ANIMAL_HEBREW_PRONUNCIATIONS, ANIMAL_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק חיות - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useAnimalGameDry() {
  return useSimpleGame({
    items: ALL_ANIMALS,
    pronunciations: ANIMAL_HEBREW_PRONUNCIATIONS,
    gameConstants: ANIMAL_GAME_CONSTANTS,
  });
}
