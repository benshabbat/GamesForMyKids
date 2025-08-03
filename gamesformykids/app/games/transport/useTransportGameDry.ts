import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_TRANSPORTS, TRANSPORT_HEBREW_PRONUNCIATIONS, TRANSPORT_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק תחבורה - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useTransportGameDry() {
  return useSimpleGame({
    gameType: 'transport',
    items: ALL_TRANSPORTS,
    pronunciations: TRANSPORT_HEBREW_PRONUNCIATIONS,
    gameConstants: TRANSPORT_GAME_CONSTANTS,
  });
}
