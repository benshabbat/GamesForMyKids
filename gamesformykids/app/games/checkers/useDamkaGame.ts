'use client';
import { useShallow } from 'zustand/react/shallow';
import { useDamkaStore } from './damkaStore';

export type { Side, GamePhase, Cell, Board, Pos, DamkaMove } from './damkaStore';

export function useDamkaGame() {
  const { phase, board, selected, validMoves, currentTurn, playerScore, computerScore, message, startGame, selectCell } =
    useDamkaStore(useShallow((s) => s));
  return { phase, board, selected, validMoves, currentTurn, playerScore, computerScore, message, startGame, selectCell };
}
