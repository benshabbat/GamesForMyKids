import { describe, expect, it } from 'vitest';
import { applyMove, bestComputerMove, getAllMoves, makeInitialBoard } from '@/app/games/checkers/damkaLogic';
import type { Board, DamkaMove } from '@/app/games/checkers/damkaTypes';

function emptyBoard(): Board {
  return Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => ({ color: null, isKing: false })));
}

describe('damkaLogic', () => {
  describe('makeInitialBoard', () => {
    it('places 12 computer pieces on the top three rows', () => {
      const b = makeInitialBoard();
      const computerPieces = b.flat().filter((c) => c.color === 'computer');
      expect(computerPieces).toHaveLength(12);
    });

    it('places 12 player pieces on the bottom three rows', () => {
      const b = makeInitialBoard();
      const playerPieces = b.flat().filter((c) => c.color === 'player');
      expect(playerPieces).toHaveLength(12);
    });

    it('leaves the middle two rows empty', () => {
      const b = makeInitialBoard();
      const middle = [...b[3]!, ...b[4]!];
      expect(middle.every((c) => c.color === null)).toBe(true);
    });

    it('places pieces only on dark squares', () => {
      const b = makeInitialBoard();
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (b[r]![c]!.color !== null) {
            expect((r + c) % 2).toBe(1);
          }
        }
      }
    });

    it('starts with no kings', () => {
      const b = makeInitialBoard();
      expect(b.flat().every((c) => !c.isKing)).toBe(true);
    });
  });

  describe('getAllMoves', () => {
    it('returns only forward diagonal moves for the player on the opening position', () => {
      const b = makeInitialBoard();
      const moves = getAllMoves(b, 'player');
      expect(moves.length).toBeGreaterThan(0);
      expect(moves.every((m) => m.to.row < m.from.row)).toBe(true);
      expect(moves.every((m) => m.captures.length === 0)).toBe(true);
    });

    it('returns only forward diagonal moves for the computer on the opening position', () => {
      const b = makeInitialBoard();
      const moves = getAllMoves(b, 'computer');
      expect(moves.length).toBeGreaterThan(0);
      expect(moves.every((m) => m.to.row > m.from.row)).toBe(true);
    });

    it('forces a capture when one is available (mandatory jump rule)', () => {
      const b = emptyBoard();
      b[4]![3] = { color: 'player', isKing: false };
      b[3]![4] = { color: 'computer', isKing: false };
      // A second player piece with a normal (non-capturing) move available.
      b[5]![0] = { color: 'player', isKing: false };

      const moves = getAllMoves(b, 'player');
      expect(moves.every((m) => m.captures.length > 0)).toBe(true);
      expect(moves.some((m) => m.from.row === 4 && m.from.col === 3)).toBe(true);
    });

    it('chains multiple captures in a single move when possible', () => {
      const b = emptyBoard();
      b[2]![1] = { color: 'player', isKing: false };
      b[1]![2] = { color: 'computer', isKing: false };
      b[1]![4] = { color: 'computer', isKing: false };

      const moves = getAllMoves(b, 'player');
      const doubleJump = moves.find((m) => m.captures.length === 2);
      expect(doubleJump).toBeDefined();
    });
  });

  describe('applyMove', () => {
    it('moves the piece from its origin to its destination', () => {
      const b = makeInitialBoard();
      const move: DamkaMove = { from: { row: 5, col: 0 }, to: { row: 4, col: 1 }, captures: [] };
      const nb = applyMove(b, move);
      expect(nb[5]![0]!.color).toBeNull();
      expect(nb[4]![1]!.color).toBe('player');
    });

    it('removes captured pieces from the board', () => {
      const b = emptyBoard();
      b[4]![3] = { color: 'player', isKing: false };
      b[3]![4] = { color: 'computer', isKing: false };
      const move: DamkaMove = { from: { row: 4, col: 3 }, to: { row: 2, col: 5 }, captures: [{ row: 3, col: 4 }] };
      const nb = applyMove(b, move);
      expect(nb[3]![4]!.color).toBeNull();
      expect(nb[2]![5]!.color).toBe('player');
    });

    it('promotes a player piece to king on reaching row 0', () => {
      const b = emptyBoard();
      b[1]![2] = { color: 'player', isKing: false };
      const move: DamkaMove = { from: { row: 1, col: 2 }, to: { row: 0, col: 1 }, captures: [] };
      const nb = applyMove(b, move);
      expect(nb[0]![1]!.isKing).toBe(true);
    });

    it('promotes a computer piece to king on reaching row 7', () => {
      const b = emptyBoard();
      b[6]![2] = { color: 'computer', isKing: false };
      const move: DamkaMove = { from: { row: 6, col: 2 }, to: { row: 7, col: 1 }, captures: [] };
      const nb = applyMove(b, move);
      expect(nb[7]![1]!.isKing).toBe(true);
    });
  });

  describe('bestComputerMove', () => {
    it('returns a legal move from the opening position', () => {
      const b = makeInitialBoard();
      const move = bestComputerMove(b);
      expect(move).not.toBeNull();
      const legal = getAllMoves(b, 'computer');
      expect(legal).toContainEqual(move);
    });

    it('returns null when the computer has no pieces left', () => {
      const b = emptyBoard();
      b[5]![0] = { color: 'player', isKing: false };
      expect(bestComputerMove(b)).toBeNull();
    });

    it('prefers a move that captures over one that does not', () => {
      const b = emptyBoard();
      b[3]![2] = { color: 'computer', isKing: false };
      b[4]![3] = { color: 'player', isKing: false };
      const move = bestComputerMove(b);
      expect(move?.captures.length).toBeGreaterThan(0);
    });
  });
});
