import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_EMOTIONS, EMOTION_HEBREW_PRONUNCIATIONS, EMOTION_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק רגשות - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useEmotionGameDry() {
  return useSimpleGame({
    items: ALL_EMOTIONS,
    pronunciations: EMOTION_HEBREW_PRONUNCIATIONS,
    gameConstants: EMOTION_GAME_CONSTANTS,
  });
}
