import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_VEHICLES, VEHICLE_HEBREW_PRONUNCIATIONS, VEHICLE_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק כלי רכב - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useVehicleGameDry() {
  return useSimpleGame({
    items: ALL_VEHICLES,
    pronunciations: VEHICLE_HEBREW_PRONUNCIATIONS,
    gameConstants: VEHICLE_GAME_CONSTANTS,
  });
}
