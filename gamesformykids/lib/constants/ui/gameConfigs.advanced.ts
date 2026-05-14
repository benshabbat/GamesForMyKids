import type { GameUIConfig } from './gameUIConfig.types';
import { cognitiveLearningConfigs } from './advancedConfigData/cognitiveLearning';
import { sensoryEmotionalConfigs } from './advancedConfigData/sensoryEmotional';

export const advancedConfigs: Partial<Record<string, GameUIConfig>> = {
  ...cognitiveLearningConfigs,
  ...sensoryEmotionalConfigs,
};
