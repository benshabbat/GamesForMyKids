import type { GameType } from '@/lib/types/core/base';
import type { GameUIConfig } from './gameUIConfig.types';
import { logosSportsConfigs } from './photoQuizConfigData/logosSports';
import { natureAnimalsConfigs } from './photoQuizConfigData/natureAnimals';
import { cultureWorldConfigs } from './photoQuizConfigData/cultureWorld';
import { geographyConfigs } from './photoQuizConfigData/geography';

export const photoQuizConfigs: Partial<Record<GameType, GameUIConfig>> = {
  ...logosSportsConfigs,
  ...natureAnimalsConfigs,
  ...cultureWorldConfigs,
  ...geographyConfigs,
};
