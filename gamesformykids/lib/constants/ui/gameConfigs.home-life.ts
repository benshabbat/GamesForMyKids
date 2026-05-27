import type { GameType } from '@/lib/types/core/base';
import type { GameUIConfig } from './gameUIConfig.types';
import { objectsConfigs } from './homeLifeConfigData/objects';
import { peopleConfigs } from './homeLifeConfigData/people';
import { healthSensesConfigs } from './homeLifeConfigData/healthSenses';
import { timeLearningConfigs } from './homeLifeConfigData/timeLearning';

export const homeLifeConfigs: Partial<Record<GameType, GameUIConfig>> = {
  ...objectsConfigs,
  ...peopleConfigs,
  ...healthSensesConfigs,
  ...timeLearningConfigs,
};
