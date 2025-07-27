import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_WEATHERS, WEATHER_HEBREW_PRONUNCIATIONS, WEATHER_GAME_CONSTANTS } from "@/lib/constants";

/**
 * Hook למשחק מזג אוויר - גרסה DRY  
 * 5 שורות בלבד במקום 150+ שורות!
 */
export function useWeatherGameDry() {
  return useSimpleGame({
    items: ALL_WEATHERS,
    pronunciations: WEATHER_HEBREW_PRONUNCIATIONS,
    gameConstants: WEATHER_GAME_CONSTANTS,
  });
}
