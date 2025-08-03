import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_INSTRUMENTS, INSTRUMENT_HEBREW_PRONUNCIATIONS, INSTRUMENT_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק כלי נגינה - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useInstrumentGameDry() {
  return useSimpleGame({
    gameType: 'instruments',
    items: ALL_INSTRUMENTS,
    pronunciations: INSTRUMENT_HEBREW_PRONUNCIATIONS,
    gameConstants: INSTRUMENT_GAME_CONSTANTS,
  });
}
