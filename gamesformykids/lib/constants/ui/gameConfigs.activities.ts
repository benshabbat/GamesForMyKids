import type { GameType } from '@/lib/types/core/base';
import type { GameUIConfig } from './gameUIConfig.types';
import { creativeConfigs } from './activitiesConfigData/creative';
import { fantasyConfigs } from './activitiesConfigData/fantasy';
import { sportsTechConfigs } from './activitiesConfigData/sportsTech';

export const activitiesConfigs: Partial<Record<GameType, GameUIConfig>> = {
  ...creativeConfigs,
  ...fantasyConfigs,
  ...sportsTechConfigs,
};
