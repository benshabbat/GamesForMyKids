import type { GameProgress, GameActions, GameResponseActions } from './state';
import type { GameItem, GameTypeDbRecord } from './db';

interface GameTypeInfo {
  readonly gameType: string | null;
  readonly gameConfig: {
    readonly title: string;
    readonly subTitle: string;
  } | null;
}

export interface GameContextHookReturn extends
  GameTypeInfo,
  GameProgress,
  GameActions,
  GameResponseActions {
  readonly isGameActive: boolean;
}

export interface UseGameDataReturn {
  gameItems: GameItem[];
  gameTypes: GameTypeDbRecord[];
  loading: boolean;
  error: string | null;
  getItemsByCategory: (category: string) => GameItem[];
  getItemsBySubcategory: (subcategory: string) => GameItem[];
  getGameTypeByName: (name: string) => GameTypeDbRecord | undefined;
  getGameTypesByCategory: (category: string) => GameTypeDbRecord[];
  refreshData: () => Promise<void>;
  colors: GameItem[];
  shapes: GameItem[];
  coloredShapes: GameItem[];
  numbers: GameItem[];
  letters: GameItem[];
  animals: GameItem[];
  fruits: GameItem[];
  vegetables: GameItem[];
}
