import { useMemo } from "react";
import { BaseGameItem } from "@/lib/types/base";
import { generateOptions as generateGameOptions, getRandomItem } from "@/lib/utils/gameUtils";
import { GAME_CONSTANTS } from "@/lib/constants";

interface UseGameOptionsProps {
  allItems: BaseGameItem[];
  level: number;
  baseCount?: number;
  increment?: number;  
  levelThreshold?: number;
}

/**
 * Hook לניהול אפשרויות משחק ובחירת אתגרים
 * מחזיר פריטים זמינים לפי רמה ופונקציות לבחירת אתגרים
 */
export function useGameOptions({
  allItems,
  level,
  baseCount = 4,
  increment = 1,
  levelThreshold = 3,
}: UseGameOptionsProps) {
  
  const availableItems = useMemo(() => {
    const additionalItems = Math.floor((level - 1) / levelThreshold) * increment;
    const totalItems = Math.min(baseCount + additionalItems, allItems.length);
    return allItems.slice(0, totalItems);
  }, [allItems, level, baseCount, increment, levelThreshold]);

  const getRandomChallenge = () => {
    return getRandomItem(availableItems);
  };

  const getOptionsForChallenge = (challenge: BaseGameItem) => {
    return generateGameOptions(challenge, availableItems, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  return {
    availableItems,
    getRandomChallenge,
    getOptionsForChallenge,
  };
}
