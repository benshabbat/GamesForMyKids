export { useAdvancedGameState } from './useAdvancedGameState';
export { useBaseGame } from './useBaseGame';
export { useAutoGame } from './useAutoGame';
export { useGameContext, useGameInfo, useGameActions } from './useGameContext';
export { useGameData } from './useGameData';
export { useGameOptions } from './useGameOptions';

// Zustand-backed hooks (migrated from contexts)
export { useGameType, useCurrentGameType, useCurrentGameConfig } from './useGameType';
export { useGameProgress } from './useGameProgress';
export { useSimpleGameProgress } from './useSimpleGameProgress';
export { useGameConfig, useAutoGameConfig, useGameUIConfig, useGameItems, useGameCardComponent, generateGameMetadata, useGameMetadata } from './useGameConfig';
export { useGameLogic, useGameState, useGameActions as useGameActionsFromLogic, useGameUI, useGameConfigFromLogic, useGameHints } from './useGameLogic';
export { useUniversalGame, useGameData as useUniversalGameData, useGameControls, useGameConfiguration, useGameEnhancements } from './useUniversalGame';

// Export types from centralized types file
export type { 
  GameLogicState, 
  GameItem, 
  GameContextHookReturn,
  UseGameDataReturn,
  GameCardProps,
  GameState
} from '@/lib/types/hooks/game-state';
