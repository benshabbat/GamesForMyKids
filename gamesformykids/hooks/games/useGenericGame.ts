import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { BaseGameItem } from "@/lib/types/base";

/**
 * Hook כללי למשחקים שעדיין אין להם hook ייעודי
 * מקבל את הפריטים ויוצר hook תואם
 */
export function useGenericGame(items: BaseGameItem[]) {
  // יצירת מילון הגייה אוטומטי מהפריטים עצמם
  const pronunciations = items.reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = item.hebrew;
    return acc;
  }, {});

  return useSimpleGame({
    items,
    pronunciations,
    gameConstants: {
      BASE_COUNT: 4,
      INCREMENT: 1,
      LEVEL_THRESHOLD: 3,
    },
  });
}
