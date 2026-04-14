export { useAdvancedGameState } from './useAdvancedGameState';
export { useBaseGame } from './useBaseGame';
export { useAutoGame } from './useAutoGame';
export { useGameContext, useGameInfo, useGameActions } from './useGameContext';
export { useGameData } from './useGameData';
export { useGameOptions } from './useGameOptions';

// Export types from centralized types file
export type { 
  GameLogicState, 
  GameItem, 
  GameContextHookReturn,
  UseGameDataReturn,
  GameCardProps,
  GameState
} from '@/lib/types/hooks/game-state';

// Zustand-backed hooks (migrated from contexts)
// Named with suffix to avoid conflicts with same-named hooks in other subfolders
export { useGameType, useCurrentGameType, useCurrentGameConfig } from './useGameType';
export { useGameProgress as useZustandGameProgress } from './useGameProgress';
export { useSimpleGameProgress } from './useSimpleGameProgress';
export { useGameConfig, useAutoGameConfig, useGameUIConfig, useGameItems, useGameCardComponent, generateGameMetadata, useGameMetadata } from './useGameConfig';
export { useGameLogic, useGameState, useGameActions as useGameActionsFromLogic, useGameUI, useGameConfigFromLogic, useGameHints as useZustandGameHints } from './useGameLogic';
export { useUniversalGame, useGameData as useUniversalGameData, useGameControls, useGameConfiguration, useGameEnhancements } from './useUniversalGame';
export { useGameEffects } from './useGameEffects';
