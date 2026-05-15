import { BaseGameItem, GameType } from '../../core/base';

interface GameConstants {
  readonly BASE_COUNT: number;
  readonly INCREMENT: number;
  readonly LEVEL_THRESHOLD: number;
}

export interface UseGameOptionsProps {
  readonly allItems: readonly BaseGameItem[];
  readonly level: number;
  readonly baseCount?: number;
  readonly increment?: number;
  readonly levelThreshold?: number;
}

export interface UseBaseGameConfig {
  readonly gameType: GameType;
  readonly items: readonly BaseGameItem[];
  readonly pronunciations: Readonly<Record<string, string>>;
  readonly gameConstants: GameConstants;
  readonly customAudio?: (itemName: string) => Promise<void>;
}
