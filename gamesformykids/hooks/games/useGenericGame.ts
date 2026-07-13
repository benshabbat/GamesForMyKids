'use client';

import { useBaseGame } from "@/hooks/shared/game-state/useBaseGame";
import { BaseGameItem, GameType } from "@/lib/types/core/base";
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';
import { LETTER_HEBREW_PRONUNCIATIONS } from "@/lib/constants/gameData/basicData/letters";
import { ADVANCED_COLORS_PRONUNCIATIONS } from "@/lib/constants/gameData/basicData/colors";
import { COINS_PRONUNCIATIONS } from "@/lib/constants/gameData/coins";
import { HEBREW_SCRIPT_PRONUNCIATIONS } from "@/lib/constants/gameData/hebrewScript";
import { BODY_MOVEMENTS_PRONUNCIATIONS } from "@/lib/constants/gameData/innovativeData/bodyMovements";
import { CLIMATE_PLANET_PRONUNCIATIONS } from "@/lib/constants/gameData/innovativeData/climatePlanet";
import { EMOTIONAL_SOCIAL_PRONUNCIATIONS } from "@/lib/constants/gameData/innovativeData/emotionalSocial";
import { SOUND_IMITATION_PRONUNCIATIONS } from "@/lib/constants/gameData/innovativeData/soundImitation";
import { TIME_CLOCK_PRONUNCIATIONS } from "@/lib/constants/gameData/innovativeData/timeClock";
import { TOUCH_SENSES_PRONUNCIATIONS } from "@/lib/constants/gameData/innovativeData/touchSenses";
import { PROFESSION_HEBREW_PRONUNCIATIONS } from "@/lib/constants/gameData/lifestyleData/professions";
import { ADVANCED_WEATHER_PRONUNCIATIONS } from "@/lib/constants/gameData/worldData/weather";

const DIFFICULTY_BASE_COUNT: Record<string, number> = { easy: 3, medium: 4, hard: 6 };

// Most game types carry per-item pronunciation via item.hebrewNikud (see fallback below).
// These game types instead need a hand-authored map, either because their items don't
// carry hebrewNikud at all, or because a bare letter/glyph is unclear or silent in TTS.
const PRONUNCIATION_OVERRIDES: Partial<Record<GameType, Record<string, string>>> = {
  letters: LETTER_HEBREW_PRONUNCIATIONS,
  'advanced-colors': ADVANCED_COLORS_PRONUNCIATIONS,
  'coins-match': COINS_PRONUNCIATIONS,
  'hebrew-script': HEBREW_SCRIPT_PRONUNCIATIONS,
  'body-movements': BODY_MOVEMENTS_PRONUNCIATIONS,
  'climate-planet': CLIMATE_PLANET_PRONUNCIATIONS,
  'emotional-social': EMOTIONAL_SOCIAL_PRONUNCIATIONS,
  'sound-imitation': SOUND_IMITATION_PRONUNCIATIONS,
  'time-clock': TIME_CLOCK_PRONUNCIATIONS,
  'touch-senses': TOUCH_SENSES_PRONUNCIATIONS,
  professions: PROFESSION_HEBREW_PRONUNCIATIONS,
  'advanced-weather': ADVANCED_WEATHER_PRONUNCIATIONS,
};

export function useGenericGame(items: BaseGameItem[], gameType: GameType) {
  const { difficulty } = useGameDifficulty();
  const overrides = PRONUNCIATION_OVERRIDES[gameType];
  const pronunciations = items.reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = overrides?.[item.name] ?? item.hebrewNikud ?? item.hebrew;
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
