export { PuzzleProvider, usePuzzleContext } from '@/app/games/puzzles/contexts/PuzzleContext';

// Export types from contexts
export type { 
  PuzzleState, 
  TouchState
} from '@/app/games/puzzles/types/puzzle';

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
} from '@/app/games/building/types/building';

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

export { MemoryProvider, useMemoryContext } from '@/app/games/memory/contexts/MemoryContext';
export { HebrewLettersProvider, useHebrewLetters } from '@/app/games/hebrew-letters/contexts/HebrewLettersContext';
export { BuildingProvider, useBuildingContext } from '@/app/games/building/contexts/BuildingContext';
export { GameTypeProvider, useGameType, useCurrentGameType, useCurrentGameConfig } from './GameTypeContext';
export { GameProgressProvider, useGameProgress, type GameProgressContextValue } from './GameProgressContext';
export type { GameProgressState as GameProgress } from '@/lib/stores/gameProgressStore';
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
