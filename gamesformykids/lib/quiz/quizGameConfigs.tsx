import type { GameType } from '@/lib/types/core/base';
import { spellingConfig, oppositesConfig, englishWordsConfig, worldLanguagesConfig } from './configs/language';
import { riddlesConfig, capitalsConfig, instrumentsConfig, sportsQuizConfig, continentsConfig } from './configs/knowledge';
import { emotionsConfig, familyConfig, healthyFoodConfig } from './configs/social';
import { fractionsConfig, shapes3dConfig } from './configs/math';

export type { QuizGameConfig } from './configs/types';
import type { QuizGameConfig } from './configs/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const QUIZ_GAME_CONFIGS: Partial<Record<GameType, QuizGameConfig<any>>> = {
  riddles: riddlesConfig,
  capitals: capitalsConfig,
  spelling: spellingConfig,
  fractions: fractionsConfig,
  emotions: emotionsConfig,
  instruments: instrumentsConfig,
  'world-languages': worldLanguagesConfig,
  opposites: oppositesConfig,
  'sports-quiz': sportsQuizConfig,
  continents: continentsConfig,
  'healthy-food': healthyFoodConfig,
  family: familyConfig,
  'english-words': englishWordsConfig,
  'shapes-3d': shapes3dConfig,
};
