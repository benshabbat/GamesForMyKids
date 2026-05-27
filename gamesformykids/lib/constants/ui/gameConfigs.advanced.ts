import type { GameType } from '@/lib/types/core/base';
import type { GameUIConfig } from './gameUIConfig.types';
import { cognitiveLearningConfigs } from './advancedConfigData/cognitiveLearning';
import { sensoryEmotionalConfigs } from './advancedConfigData/sensoryEmotional';

export const advancedConfigs: Partial<Record<GameType, GameUIConfig>> = {
  ...cognitiveLearningConfigs,
  ...sensoryEmotionalConfigs,
};
