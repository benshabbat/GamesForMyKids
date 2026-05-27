/**
 * ===============================================
 * ׳§׳•׳ ׳₪׳™׳’׳•׳¨׳¦׳™׳•׳× UI ׳׳׳©׳—׳§׳™׳ - barrel index
 * ===============================================
 * ׳”׳§׳•׳‘׳¥ ׳”׳’׳“׳•׳ ׳₪׳•׳¦׳ ׳׳§׳‘׳¦׳™ ׳“׳•׳׳™׳™׳ ׳ ׳₪׳¨׳“׳™׳.
 * ׳™׳‘׳•׳ ׳׳”׳§׳•׳‘׳¥ ׳”׳–׳” ׳׳׳©׳™׳ ׳׳¢׳‘׳•׳“ ׳׳׳ ׳©׳™׳ ׳•׳™.
 */

import type { GameType } from "@/lib/types/core/base";
import type { GameUIConfig } from './gameUIConfig.types';
export type { GameUIConfig } from './gameUIConfig.types';

import { educationalConfigs }  from './gameConfigs.educational';
import { natureConfigs }       from './gameConfigs.nature';
import { homeLifeConfigs }     from './gameConfigs.home-life';
import { activitiesConfigs }   from './gameConfigs.activities';
import { advancedConfigs }     from './gameConfigs.advanced';
import { photoQuizConfigs }    from './gameConfigs.photo-quiz';

export const GAME_UI_CONFIGS = {
  ...educationalConfigs,
  ...natureConfigs,
  ...homeLifeConfigs,
  ...activitiesConfigs,
  ...advancedConfigs,
  ...photoQuizConfigs,
} satisfies Partial<Record<GameType, GameUIConfig>>;