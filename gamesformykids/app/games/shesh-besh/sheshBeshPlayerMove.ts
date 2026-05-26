import type { SheshState, SimpleMove, TurnSnapshot } from './sheshBeshTypes';
import { clonePoints, applyMove, computeValidMoves } from './gameLogic';

/**
 * Pure function — applies `move` to the given state and returns the
 * next partial state (no store access, no side-effects).
 *
 * Returns `null` when the move triggers a turn-end so the caller can
 * schedule `runComputerTurn`; the returned state is still valid in that case.
 */
export type PlayerMoveResult =
  | { kind: 'won'; next: Partial<SheshState> }
  | { kind: 'computer-turn'; next: Partial<SheshState> }
  | { kind: 'continue'; next: Partial<SheshState> };

export function executePlayerMove(
  s: SheshState,
  move: SimpleMove,
): PlayerMoveResult {
  // Save snapshot before applying move (for undo)
  const snapshot: TurnSnapshot = {
    points: clonePoints(s.points), barPlayer: s.barPlayer,
    barComputer: s.barComputer, dice: [...s.dice],
  };

  const { pts: np, barP: nbP, barC: nbC } = applyMove(
    s.points, s.barPlayer, s.barComputer, move, 'player',
  );
  const diceIdx = s.dice.indexOf(move.die);
  const newDice = s.dice.filter((_, i) => i !== diceIdx);

  // Win
  if (np[0]!.player === 15) {
    return {
      kind: 'won',
      next: {
        points: np, barPlayer: nbP, barComputer: nbC,
        dice: [], selected: null, validMoves: [], turnHistory: [],
        phase: 'won', playerScore: s.playerScore + 1,
        message: '🎉 ניצחת! ריקנת את כל האסימונים!',
      },
    };
  }

  const newHistory = [...s.turnHistory, snapshot];

  // Dice exhausted → computer turn
  if (newDice.length === 0) {
    return {
      kind: 'computer-turn',
      next: {
        points: np, barPlayer: nbP, barComputer: nbC,
        dice: [], rolledDice: [], selected: null, validMoves: [], turnHistory: [],
        currentTurn: 'computer', phase: 'rolling', message: 'תור המחשב...',
      },
    };
  }

  // No more legal moves with remaining dice → computer turn
  const nextMoves = computeValidMoves(np, nbP, nbC, newDice, 'player');
  if (nextMoves.length === 0) {
    return {
      kind: 'computer-turn',
      next: {
        points: np, barPlayer: nbP, barComputer: nbC,
        dice: newDice, selected: null, validMoves: [], turnHistory: [],
        currentTurn: 'computer', phase: 'rolling', message: 'אין יותר מהלכים. תור המחשב...',
      },
    };
  }

  // Continue player's turn
  return {
    kind: 'continue',
    next: {
      points: np, barPlayer: nbP, barComputer: nbC,
      dice: newDice, selected: null, validMoves: [], turnHistory: newHistory, phase: 'moving',
      message: `נותרו ${newDice.length} קוביות. בחר אסימון להמשך`,
    },
  };
}
