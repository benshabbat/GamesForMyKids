import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_TOOLS, TOOL_HEBREW_PRONUNCIATIONS, TOOL_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק כלים - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useToolGameDry() {
  return useSimpleGame({
    items: ALL_TOOLS,
    pronunciations: TOOL_HEBREW_PRONUNCIATIONS,
    gameConstants: TOOL_GAME_CONSTANTS,
  });
}
