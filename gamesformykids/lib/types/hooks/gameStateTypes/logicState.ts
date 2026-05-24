import { ComponentType } from 'react';
import { BaseGameItem, GameType } from '../../core/base';
import type { GameItemCardProps } from '../../components/cards';
import type { GameUIConfig } from '../../contexts/game-config';
import type { GameState, GameProgress, GameActions, GameResponseActions } from './state';

interface GameEnhancements {
  readonly hints?: readonly string[] | undefined;
  readonly hasMoreHints?: boolean | undefined;
  readonly showNextHint?: (() => void) | undefined;
}

type GameUIState = {
  readonly showProgressModal: boolean;
  readonly setShowProgressModal: (show: boolean) => void;
};

type GameConfiguration = {
  readonly config: GameUIConfig;
  readonly items: readonly BaseGameItem[];
  readonly CardComponent: ComponentType<GameItemCardProps>;
  readonly gameType: GameType;
};

export interface GameLogicState extends
  GameState,
  GameProgress,
  GameEnhancements,
  GameActions,
  GameResponseActions,
  GameUIState,
  GameConfiguration {
  readonly gameState: GameState | null;
  readonly isGameActive: boolean;
}
