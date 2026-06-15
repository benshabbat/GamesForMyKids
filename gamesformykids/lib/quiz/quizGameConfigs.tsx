import type { GameType } from '@/lib/types/core/base';
import { spellingConfig, oppositesConfig, englishWordsConfig, worldLanguagesConfig, rhymingConfig, adjectivesConfig, verbsConfig, genderConfig, finalLettersConfig, alphabetOrderConfig } from './configs/language';
import { riddlesConfig, capitalsConfig, instrumentsConfig, sportsQuizConfig, continentsConfig } from './configs/knowledge';
import { emotionsConfig, familyConfig, healthyFoodConfig, singularPluralConfig, morningRoutineConfig } from './configs/social';
import { fractionsConfig, gematriaConfig, shapes3dConfig, skipCountingConfig, visualAdditionConfig } from './configs/math';

export type { QuizGameConfig } from './configs/types';
import type { QuizGameConfig } from './configs/types';

// QuizGameConfig<unknown> is the erased form; individual configs retain their Q via defineConfig.
// Bivariant method declarations in QuizGameConfig allow heterogeneous storage here.
export const QUIZ_GAME_CONFIGS: Partial<Record<GameType, QuizGameConfig<unknown>>> = {
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
  'singular-plural': singularPluralConfig,
  'morning-routine': morningRoutineConfig,
  rhyming: rhymingConfig,
  adjectives: adjectivesConfig,
  verbs: verbsConfig,
  'skip-counting': skipCountingConfig,
  'gender': genderConfig,
  'final-letters': finalLettersConfig,
  'alphabet-order': alphabetOrderConfig,
  'visual-addition': visualAdditionConfig,
  'gematria': gematriaConfig,
};
