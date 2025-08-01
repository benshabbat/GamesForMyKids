import { useBaseGame } from "@/hooks/shared/useBaseGame";
import { BaseGameItem, GameType } from "@/lib/types/base";

interface UseSimpleGameProps {
  gameType: GameType;
  items: BaseGameItem[];
  pronunciations: Record<string, string>;
  gameConstants: {
    BASE_COUNT: number;
    INCREMENT: number;
    LEVEL_THRESHOLD: number;
  };
}

/**
 * Hook פשוט למשחקים בסיסיים
 * מעטפת נוחה לעבודה עם useBaseGame
 */
export function useSimpleGame(props: UseSimpleGameProps) {
  return useBaseGame(props);
}
