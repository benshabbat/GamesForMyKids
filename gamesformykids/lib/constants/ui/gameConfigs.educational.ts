import type { GameType } from '@/lib/types/core/base';
import type { GameUIConfig } from './gameUIConfig.types';
import { coreLearningConfigs } from './educationalConfigData/coreLearning';
import { mathLogicConfigs } from './educationalConfigData/mathLogic';
import { socialEmotionalConfigs } from './educationalConfigData/socialEmotional';

export const educationalConfigs: Partial<Record<GameType, GameUIConfig>> = {
  ...coreLearningConfigs,
  ...mathLogicConfigs,
  ...socialEmotionalConfigs,
};
