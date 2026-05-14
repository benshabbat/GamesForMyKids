import type { GameUIConfig } from './gameUIConfig.types';
import { objectsConfigs } from './homeLifeConfigData/objects';
import { peopleConfigs } from './homeLifeConfigData/people';
import { healthSensesConfigs } from './homeLifeConfigData/healthSenses';
import { timeLearningConfigs } from './homeLifeConfigData/timeLearning';

export const homeLifeConfigs: Partial<Record<string, GameUIConfig>> = {
  ...objectsConfigs,
  ...peopleConfigs,
  ...healthSensesConfigs,
  ...timeLearningConfigs,
};
