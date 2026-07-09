import { describe, expect, it } from 'vitest';
import {
  applyMove, cloneBoard, isInCheck, makeInitialBoard, INIT_CASTLING,
} from '@/app/games/chess/logic/chessBoardUtils';
import { getAllValidMoves, getValidMoves } from '@/app/games/chess/logic/chessMoveGen';
import type { Board, CastleRights } from '@/app/games/chess/logic/chessTypes';

function emptyBoard(): Board {
  return Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));
}

const NO_CASTLING: CastleRights = { wK: false, wQ: false, bK: false, bQ: false };

describe('chessBoardUtils', () => {
  describe('makeInitialBoard', () => {
    it('places white pieces on the back two ranks (rows 6-7)', () => {
      const b = makeInitialBoard();
      expect(b[7]).toEqual(['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']);
      expect(b[6]!.every((p) => p === 'wP')).toBe(true);
    });

    it('places black pieces on the back two ranks (rows 0-1)', () => {
      const b = makeInitialBoard();
      expect(b[0]).toEqual(['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR']);
      expect(b[1]!.every((p) => p === 'bP')).toBe(true);
    });

    it('leaves the middle four rows empty', () => {
      const b = makeInitialBoard();
      for (let r = 2; r <= 5; r++) expect(b[r]!.every((p) => p === null)).toBe(true);
    });
  });

  describe('isInCheck', () => {
    it('is false in the opening position', () => {
      const b = makeInitialBoard();
      expect(isInCheck(b, 'w')).toBe(false);
      expect(isInCheck(b, 'b')).toBe(false);
    });

    it('detects check from a rook on an open file', () => {
      const b = emptyBoard();
      b[7]![4] = 'wK';
      b[0]![4] = 'bR';
      expect(isInCheck(b, 'w')).toBe(true);
    });

    it('is false when the attacking line is blocked', () => {
      const b = emptyBoard();
      b[7]![4] = 'wK';
      b[0]![4] = 'bR';
      b[4]![4] = 'wP';
      expect(isInCheck(b, 'w')).toBe(false);
    });

    it('detects check from a knight', () => {
      const b = emptyBoard();
      b[4]![4] = 'wK';
      b[2]![3] = 'bN';
      expect(isInCheck(b, 'w')).toBe(true);
    });
  });

  describe('applyMove', () => {
    it('moves a piece and clears its origin square', () => {
      const b = makeInitialBoard();
      const { board: nb } = applyMove(b, { from: { row: 6, col: 4 }, to: { row: 4, col: 4 } }, INIT_CASTLING, null);
      expect(nb[6]![4]).toBeNull();
      expect(nb[4]![4]).toBe('wP');
    });

    it('records a two-square pawn push as an en passant target', () => {
      const b = makeInitialBoard();
      const { enPassant } = applyMove(b, { from: { row: 6, col: 4 }, to: { row: 4, col: 4 } }, INIT_CASTLING, null);
      expect(enPassant).toEqual({ row: 5, col: 4 });
    });

    it('captures the pawn that just double-moved when applying en passant', () => {
      const b = emptyBoard();
      b[4]![4] = 'wP';
      b[4]![3] = 'bP';
      const { board: nb, captured } = applyMove(
        b, { from: { row: 4, col: 4 }, to: { row: 3, col: 3 }, enPassant: true }, NO_CASTLING, { row: 3, col: 3 },
      );
      expect(captured).toBe('bP');
      expect(nb[4]![3]).toBeNull();
      expect(nb[3]![3]).toBe('wP');
    });

    it('moves both king and rook on kingside castling', () => {
      const b = emptyBoard();
      b[7]![4] = 'wK';
      b[7]![7] = 'wR';
      const { board: nb } = applyMove(b, { from: { row: 7, col: 4 }, to: { row: 7, col: 6 }, castle: 'K' }, INIT_CASTLING, null);
      expect(nb[7]![6]).toBe('wK');
      expect(nb[7]![5]).toBe('wR');
      expect(nb[7]![7]).toBeNull();
    });

    it('revokes castling rights once the king moves', () => {
      const b = makeInitialBoard();
      const { castling } = applyMove(b, { from: { row: 7, col: 4 }, to: { row: 6, col: 4 } }, INIT_CASTLING, null);
      expect(castling.wK).toBe(false);
      expect(castling.wQ).toBe(false);
    });

    it('promotes a pawn that reaches the back rank', () => {
      const b = emptyBoard();
      b[1]![0] = 'wP';
      const { board: nb } = applyMove(b, { from: { row: 1, col: 0 }, to: { row: 0, col: 0 }, promotion: 'wQ' }, NO_CASTLING, null);
      expect(nb[0]![0]).toBe('wQ');
    });
  });

  it('cloneBoard produces an independent copy', () => {
    const b = makeInitialBoard();
    const nb = cloneBoard(b);
    nb[0]![0] = null;
    expect(b[0]![0]).toBe('bR');
  });
});

describe('chessMoveGen', () => {
  describe('getAllValidMoves', () => {
    it('gives white exactly 20 legal moves in the opening position', () => {
      const b = makeInitialBoard();
      const moves = getAllValidMoves(b, 'w', INIT_CASTLING, null);
      expect(moves).toHaveLength(20);
    });

    it('gives black exactly 20 legal moves in the opening position', () => {
      const b = makeInitialBoard();
      const moves = getAllValidMoves(b, 'b', INIT_CASTLING, null);
      expect(moves).toHaveLength(20);
    });

    it('has no legal moves for a king caught in a back-rank mate', () => {
      const b = emptyBoard();
      // wK on g1, boxed in by its own f2/g2/h2 pawns, black rook mates on the back rank.
      b[7]![6] = 'wK';
      b[6]![5] = 'wP';
      b[6]![6] = 'wP';
      b[6]![7] = 'wP';
      b[7]![0] = 'bR';
      expect(isInCheck(b, 'w')).toBe(true);
      expect(getAllValidMoves(b, 'w', NO_CASTLING, null)).toHaveLength(0);
    });
  });

  describe('getValidMoves (per-piece)', () => {
    it('gives the b1 knight exactly 2 legal moves in the opening position', () => {
      const b = makeInitialBoard();
      const moves = getValidMoves(b, { row: 7, col: 1 }, INIT_CASTLING, null);
      expect(moves).toHaveLength(2);
      const destinations = moves.map((m) => `${m.to.row},${m.to.col}`).sort();
      expect(destinations).toEqual(['5,0', '5,2']);
    });

    it('gives a pawn on its start row two forward moves', () => {
      const b = makeInitialBoard();
      const moves = getValidMoves(b, { row: 6, col: 4 }, INIT_CASTLING, null);
      expect(moves).toHaveLength(2);
    });

    it('filters out moves that would leave the king in check (pinned piece)', () => {
      const b = emptyBoard();
      b[7]![4] = 'wK';
      b[6]![4] = 'wR';
      b[0]![4] = 'bR';
      // The white rook is pinned to its king and can only move along the file.
      const moves = getValidMoves(b, { row: 6, col: 4 }, NO_CASTLING, null);
      expect(moves.every((m) => m.to.col === 4)).toBe(true);
    });

    it('returns no moves for an empty square', () => {
      const b = makeInitialBoard();
      expect(getValidMoves(b, { row: 4, col: 4 }, INIT_CASTLING, null)).toHaveLength(0);
    });
  });
});
