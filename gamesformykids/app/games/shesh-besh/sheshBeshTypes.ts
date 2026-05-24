import type { Side, GamePhase, Die, PointState, SimpleMove, TurnSnapshot } from './types';

export type { Side, GamePhase, Die, PointState, SimpleMove, TurnSnapshot };

// ─────────────────────── State / Actions types ───────────────
export interface SheshState {
  phase: GamePhase;
  points: PointState[];
  barPlayer: number;
  barComputer: number;
  dice: Die[];
  rolledDice: Die[];
  currentTurn: Side;
  playerScore: number;
  computerScore: number;
  message: string;
  selected: number | null;
  validMoves: SimpleMove[];
  turnHistory: TurnSnapshot[];
}

export interface SheshActions {
  startGame: () => void;
  rollDice: () => void;
  selectPoint: (pointIdx: number) => void;
  undoMove: () => void;
}

// ─────────────────────── Initial state ───────────────────────
export const INIT: SheshState = {
  phase: 'menu',
  points: [] as PointState[], // populated at runtime via makeInitialPoints()
  barPlayer: 0, barComputer: 0,
  dice: [], rolledDice: [],
  currentTurn: 'player',
  playerScore: 0, computerScore: 0,
  message: '',
  selected: null, validMoves: [],
  turnHistory: [],
};
