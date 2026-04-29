'use client';

import { create } from 'zustand';
import { makeInitialBoard, applyMove, isInCheck, pieceColor, INIT_CASTLING, INIT, gc } from '../logic/chessBoardUtils';
import { getAllValidMoves, getValidMoves } from '../logic/chessMoveGen';
import { bestComputerMove } from '../logic/chessAI';
import {
  type ChessState, type Pos, type GamePhase, type Piece, type ChessMove,
  type MoveRating, type MoveRecord, PIECE_SYMBOLS,
} from '../logic/chessTypes';

// ─────────────────────── Helpers ─────────────────────────────
const FILES_HEB = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח'];

function toNotation(move: ChessMove, piece: string): string {
  const sym = PIECE_SYMBOLS[piece] ?? '?';
  if (move.castle) return move.castle === 'K' ? '🏰 הצלחה קצרה' : '🏰 הצלחה ארוכה';
  const from = `${FILES_HEB[move.from.col]}${8 - move.from.row}`;
  const to = `${FILES_HEB[move.to.col]}${8 - move.to.row}`;
  return `${sym} ${from}→${to}`;
}

function rateMove(captured: Piece, gaveCheck: boolean, castle: 'K' | 'Q' | null): MoveRating {
  if (castle) return 'castle';
  if (!captured && !gaveCheck) return 'normal';
  if (!captured) return 'good'; // gave check without capture
  const pt = captured[1];
  if (pt === 'Q') return 'excellent';
  if (pt === 'R') return 'great';
  if (pt === 'B' || pt === 'N') return 'good';
  return 'normal'; // pawn capture
}

function buildRecord(
  move: ChessMove, piece: string, by: 'w' | 'b',
  captured: Piece, gaveCheck: boolean, moveNumber: number,
): MoveRecord {
  const castle = move.castle ?? null;
  return { by, piece, captured, gaveCheck, castle, moveNumber,
    rating: rateMove(captured, gaveCheck, castle),
    notation: toNotation(move, piece),
  };
}

// ─────────────────────── Store ───────────────────────────────
export interface ChessStore extends ChessState {
  startGame: () => void;
  selectSquare: (pos: Pos) => void;
}

let _timer: ReturnType<typeof setTimeout> | null = null;

function scheduleComputerMove() {
  if (_timer) clearTimeout(_timer);
  _timer = setTimeout(() => {
    const s = useChessStore.getState();
    if (s.turn !== 'b') return;

    const move = bestComputerMove(s.board, s.castling, s.enPassant);
    if (!move) {
      const phrase = isInCheck(s.board, 'b') ? 'שחמט! ניצחת!' : 'פאט!';
      useChessStore.setState({
        phase: 'checkmate',
        playerScore: s.playerScore + (isInCheck(s.board, 'b') ? 1 : 0),
        message: `🏆 ${phrase}`,
      });
      return;
    }

    const pieceMoved = gc(s.board, move.from.row, move.from.col);
    const { board: nb, castling: nc, enPassant: nep, captured } = applyMove(s.board, move, s.castling, s.enPassant);
    const playerMoves = getAllValidMoves(nb, 'w', nc, nep);

    if (playerMoves.length === 0) {
      const phrase = isInCheck(nb, 'w') ? 'שחמט' : 'פאט';
      const record = buildRecord(move, pieceMoved ?? '', 'b', captured, false, Math.floor(s.moveHistory.length / 2) + 1);
      useChessStore.setState({
        board: nb, castling: nc, enPassant: nep, lastMove: move,
        phase: 'checkmate',
        computerScore: s.computerScore + (isInCheck(nb, 'w') ? 1 : 0),
        message: `😢 ${phrase}! המחשב ניצח.`,
        capturedByComputer: captured ? [...s.capturedByComputer, captured] : s.capturedByComputer,
        moveHistory: [...s.moveHistory, record],
      });
      return;
    }

    const gaveCheck = isInCheck(nb, 'w');
    const phase: GamePhase = gaveCheck ? 'check' : 'playing';
    const record = buildRecord(move, pieceMoved ?? '', 'b', captured, gaveCheck, Math.floor(s.moveHistory.length / 2) + 1);
    useChessStore.setState({
      board: nb, castling: nc, enPassant: nep, lastMove: move,
      selected: null, validMoves: [], turn: 'w', phase,
      message: phase === 'check' ? '⚠️ אתה בשח! תורך' : 'תורך!',
      capturedByComputer: captured ? [...s.capturedByComputer, captured] : s.capturedByComputer,
      moveHistory: [...s.moveHistory, record],
    });
  }, 600);
}

export const useChessStore = create<ChessStore>((set, get) => ({
  ...INIT,

  startGame: () => {
    if (_timer) clearTimeout(_timer);
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
      const pieceMoved = gc(prev.board, move.from.row, move.from.col);
      const { board: nb, castling: nc, enPassant: nep, captured } = applyMove(prev.board, move, prev.castling, prev.enPassant);
      const compMoves = getAllValidMoves(nb, 'b', nc, nep);

      if (compMoves.length === 0) {
        const phrase = isInCheck(nb, 'b') ? 'שחמט!' : 'פאט!';
        const gaveCheck = isInCheck(nb, 'b');
        const record = buildRecord(move, pieceMoved ?? '', 'w', captured, gaveCheck, Math.floor(prev.moveHistory.length / 2) + 1);
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
      const record = buildRecord(move, pieceMoved ?? '', 'w', captured, gaveCheck, Math.floor(prev.moveHistory.length / 2) + 1);
      set({
        board: nb, castling: nc, enPassant: nep, lastMove: move,
        selected: null, validMoves: [], turn: 'b', phase,
        message: phase === 'check' ? '⚠️ שח! תור המחשב...' : 'תור המחשב...',
        capturedByPlayer: captured ? [...prev.capturedByPlayer, captured] : prev.capturedByPlayer,
        moveHistory: [...prev.moveHistory, record],
      });
      scheduleComputerMove();
      return;
    }

    if (pieceColor(gc(prev.board, pos.row, pos.col)) !== 'w') {
      set({ selected: null, validMoves: [], message: 'בחר כלי לבן שלך!' });
      return;
    }
    const vm = getValidMoves(prev.board, pos, prev.castling, prev.enPassant);
    set({ selected: pos, validMoves: vm, message: vm.length ? 'לאן לזוז?' : 'לכלי זה אין מהלכים חוקיים' });
  },
}));
