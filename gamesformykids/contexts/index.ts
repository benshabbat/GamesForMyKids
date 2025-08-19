export { PuzzleProvider, usePuzzleContext } from './PuzzleContext';
export type { 
  PuzzleState, 
  PuzzleAction, 
  TouchState,
  PuzzleContextValue 
} from '@/lib/types/contexts/puzzle';

// Export types from other contexts
export type { 
  SimpleGameProgress, 
  SimpleGameProgressContextValue 
} from '@/lib/types/contexts/simple-game-progress';

export type { 
  UniversalGameContextValue 
} from '@/lib/types/contexts/universal-game';
export { MemoryProvider, useMemoryContext } from './MemoryContext';
export { HebrewLettersProvider, useHebrewLetters } from './HebrewLettersContext';
export { BuildingProvider, useBuildingContext } from './BuildingContext';
export { GameTypeProvider, useGameType, useCurrentGameType, useCurrentGameConfig, type GameTypeState, type GameTypeContextValue } from './GameTypeContext';
export { GameProgressProvider, useGameProgress, useGameScore, useGameStats, type GameProgress, type GameProgressContextValue } from './GameProgressContext';
export { 
  GameConfigProvider, 
  useGameConfig, 
  useAutoGameConfig, 
  useGameUIConfig, 
  useGameItems, 
  useGameCardComponent,
  useGameMetadata,
  type GameConfigContextValue 
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
