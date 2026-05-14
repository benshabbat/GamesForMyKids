import type { GameUIConfig } from './gameUIConfig.types';
import { animalsCreaturesConfigs } from './natureConfigData/animalsCreatures';
import { foodPlantsConfigs } from './natureConfigData/foodPlants';
import { environmentConfigs } from './natureConfigData/environment';

export const natureConfigs: Partial<Record<string, GameUIConfig>> = {
  ...animalsCreaturesConfigs,
  ...foodPlantsConfigs,
  ...environmentConfigs,
};
