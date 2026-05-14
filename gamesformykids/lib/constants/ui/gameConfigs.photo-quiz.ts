import type { GameUIConfig } from './gameUIConfig.types';
import { logosSportsConfigs } from './photoQuizConfigData/logosSports';
import { natureAnimalsConfigs } from './photoQuizConfigData/natureAnimals';
import { cultureWorldConfigs } from './photoQuizConfigData/cultureWorld';

export const photoQuizConfigs: Partial<Record<string, GameUIConfig>> = {
  ...logosSportsConfigs,
  ...natureAnimalsConfigs,
  ...cultureWorldConfigs,
};
