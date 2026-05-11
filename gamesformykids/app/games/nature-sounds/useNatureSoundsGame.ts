'use client';

import { useBaseGame } from "@/hooks/shared/game-state/useBaseGame";
import { useGameTypeStore } from "@/lib/stores/gameTypeStore";
import { useGameAudioStore } from "@/lib/stores/gameAudioStore";
import { playNatureSound } from "@/lib/utils/audio/natureSoundSynth";
import type { BaseGameItem } from "@/lib/types/core/base";

/**
 * Hook ייעודי למשחק "צלילי הטבע".
 *
 * ההבדל מ-useGenericGame: במקום TTS שאומר את שם החיה/הדבר,
 * כאן משמיע סינתזה של Web Audio API שמחקה את הצליל האמיתי.
 * כך השחקן שומע קול טבע אמיתי ולא קול אדם.
 */
export function useNatureSoundsGame() {
  const items = useGameTypeStore((s) => s.gameItems) as BaseGameItem[];

  return useBaseGame({
    gameType: 'nature-sounds',
    items: items ?? [],
    pronunciations: {},          // לא בשימוש — customAudio מחליף את ה-TTS
    gameConstants: {
      BASE_COUNT: 4,
      INCREMENT: 1,
      LEVEL_THRESHOLD: 3,
    },
    customAudio: async (itemName: string) => {
      const audioContext = useGameAudioStore.getState().audioContext;
      if (!audioContext) return;
      await playNatureSound(itemName, audioContext);
    },
  });
}
