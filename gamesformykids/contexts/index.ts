export { PuzzleProvider, usePuzzleContext } from './PuzzleContext';

// Export types from contexts
export type { 
  PuzzleState, 
  PuzzleAction, 
  TouchState,
  PuzzleContextValue 
} from '@/lib/types/contexts/puzzle';

export type { 
  SimpleGameProgress, 
  SimpleGameProgressContextValue 
} from '@/lib/types/contexts/simple-game-progress';

export type { 
  UniversalGameContextValue as BaseUniversalGameContextValue
} from '@/lib/types/contexts/universal-game';

export type {
  BuildingContextType,
  BuildingProviderProps
} from '@/lib/types/contexts/building';

export type {
  GameConfigContextValue,
  GameConfigProviderProps,
  GameCardProps as GameConfigCardProps
} from '@/lib/types/contexts/game-config';

export type {
  GameTypeState,
  GameTypeContextValue,
  GameTypeProviderProps
} from '@/lib/types/contexts/game-type';

export { MemoryProvider, useMemoryContext } from './MemoryContext';
export { HebrewLettersProvider, useHebrewLetters } from './HebrewLettersContext';
export { BuildingProvider, useBuildingContext } from './BuildingContext';
export { GameTypeProvider, useGameType, useCurrentGameType, useCurrentGameConfig } from './GameTypeContext';
export { GameProgressProvider, useGameProgress, useGameScore, useGameStats, type GameProgress, type GameProgressContextValue } from './GameProgressContext';
export { 
  GameConfigProvider, 
  useGameConfig, 
  useAutoGameConfig, 
  useGameUIConfig, 
  useGameItems, 
  useGameCardComponent,
  useGameMetadata
} from './GameConfigContext';
export {
  GameLogicProvider,
  useGameLogic,
  useGameState,
  useGameActions,
  useGameUI,
  useGameConfig as useGameConfigFromLogic,
  useGameHints,
  type GameLogicContextValue
} from './GameLogicContext';
export {
  UniversalGameProvider,
  useUniversalGame,
  useGameData,
  useGameControls,
  useGameConfiguration,
  useGameEnhancements
} from './UniversalGameContext';
