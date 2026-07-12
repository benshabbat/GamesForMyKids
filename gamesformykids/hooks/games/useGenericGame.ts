'use client';

import { useBaseGame } from "@/hooks/shared/game-state/useBaseGame";
import { BaseGameItem, GameType } from "@/lib/types/core/base";
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';
import { LETTER_HEBREW_PRONUNCIATIONS } from "@/lib/constants/gameData/basicData/letters";

const DIFFICULTY_BASE_COUNT: Record<string, number> = { easy: 3, medium: 4, hard: 6 };

// Some game types can't just speak item.hebrew as-is (e.g. a bare letter glyph
// is unclear or silent in Hebrew TTS) — they need a dedicated pronunciation per item.
const PRONUNCIATION_OVERRIDES: Partial<Record<GameType, Record<string, string>>> = {
  letters: LETTER_HEBREW_PRONUNCIATIONS,
};

export function useGenericGame(items: BaseGameItem[], gameType: GameType) {
  const { difficulty } = useGameDifficulty();
  const overrides = PRONUNCIATION_OVERRIDES[gameType];
  const pronunciations = items.reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = overrides?.[item.name] ?? item.hebrew;
    return acc;
  }, {});

  return useBaseGame({
    gameType,
    items,
    pronunciations,
    gameConstants: {
      BASE_COUNT: DIFFICULTY_BASE_COUNT[difficulty] ?? 4,
      INCREMENT: 1,
      LEVEL_THRESHOLD: 3,
    },
  });
}
