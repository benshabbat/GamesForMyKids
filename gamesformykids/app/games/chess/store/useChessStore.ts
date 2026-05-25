'use client';

import { makeStore } from '@/lib/stores/createStore';
import { makeInitialBoard, applyMove, isInCheck, pieceColor, INIT_CASTLING, INIT } from '../logic/chessBoardUtils';
import { getAllValidMoves, getValidMoves } from '../logic/chessMoveGen';
import { buildRecord } from './chessRecordUtils';
import {
  type ChessState, type Pos, type GamePhase,
} from '../logic/chessTypes';

// ─────────────────────── Store ───────────────────────────────
export interface ChessStore extends ChessState {
  startGame: () => void;
  selectSquare: (pos: Pos) => void;
}

export const useChessStore = makeStore<ChessStore>('ChessStore', (set, get) => ({
  ...INIT,

  startGame: () => {
    const { playerScore, computerScore } = get();
    set({
      ...INIT,
      phase: 'playing',
      board: makeInitialBoard(),
      playerScore,
      computerScore,
      castling: INIT_CASTLING,
      message: 'תורך! אתה משחק לבן (♙)',
    });
  },

  selectSquare: (pos: Pos) => {
    const prev = get();
    if (prev.phase !== 'playing' && prev.phase !== 'check') return;
    if (prev.turn !== 'w') return;

    const move = prev.validMoves.find(m => m.to.row === pos.row && m.to.col === pos.col);
    if (move) {
      const pieceMoved = prev.board[move.from.row][move.from.col]!;
      const { board: nb, castling: nc, enPassant: nep, captured } = applyMove(prev.board, move, prev.castling, prev.enPassant);
      const compMoves = getAllValidMoves(nb, 'b', nc, nep);

      if (compMoves.length === 0) {
        const phrase = isInCheck(nb, 'b') ? 'שחמט!' : 'פאט!';
        const gaveCheck = isInCheck(nb, 'b');
        const record = buildRecord(move, pieceMoved, 'w', captured, gaveCheck, Math.floor(prev.moveHistory.length / 2) + 1);
        set({
          board: nb, castling: nc, enPassant: nep, lastMove: move,
          selected: null, validMoves: [],
          phase: 'checkmate',
          playerScore: prev.playerScore + (gaveCheck ? 1 : 0),
          message: `🏆 ${phrase} ניצחת!`,
          capturedByPlayer: captured ? [...prev.capturedByPlayer, captured] : prev.capturedByPlayer,
          moveHistory: [...prev.moveHistory, record],
        });
        return;
      }

      const gaveCheck = isInCheck(nb, 'b');
      const phase: GamePhase = gaveCheck ? 'check' : 'playing';
      const record = buildRecord(move, pieceMoved, 'w', captured, gaveCheck, Math.floor(prev.moveHistory.length / 2) + 1);
      set({
        board: nb, castling: nc, enPassant: nep, lastMove: move,
        selected: null, validMoves: [], turn: 'b', phase,
        message: phase === 'check' ? '⚠️ שח! תור המחשב...' : 'תור המחשב...',
        capturedByPlayer: captured ? [...prev.capturedByPlayer, captured] : prev.capturedByPlayer,
        moveHistory: [...prev.moveHistory, record],
      });
      // AI move is now triggered by useChessAI hook watching turn === 'b'
      return;
    }

    if (pieceColor(prev.board[pos.row][pos.col]) !== 'w') {
      set({ selected: null, validMoves: [], message: 'בחר כלי לבן שלך!' });
      return;
    }
    const vm = getValidMoves(prev.board, pos, prev.castling, prev.enPassant);
    set({ selected: pos, validMoves: vm, message: vm.length ? 'לאן לזוז?' : 'לכלי זה אין מהלכים חוקיים' });
  },
}));
