'use client';

import { create } from 'zustand';
import { makeInitialBoard, applyMove, isInCheck, pieceColor, INIT_CASTLING, INIT } from '../logic/chessBoardUtils';
import { getAllValidMoves, getValidMoves } from '../logic/chessMoveGen';
import { bestComputerMove } from '../logic/chessAI';
import { type ChessState, type Pos, type GamePhase } from '../logic/chessTypes';

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

    const { board: nb, castling: nc, enPassant: nep } = applyMove(s.board, move, s.castling, s.enPassant);
    const playerMoves = getAllValidMoves(nb, 'w', nc, nep);

    if (playerMoves.length === 0) {
      const phrase = isInCheck(nb, 'w') ? 'שחמט' : 'פאט';
      useChessStore.setState({
        board: nb, castling: nc, enPassant: nep, lastMove: move,
        phase: 'checkmate',
        computerScore: s.computerScore + (isInCheck(nb, 'w') ? 1 : 0),
        message: `😢 ${phrase}! המחשב ניצח.`,
      });
      return;
    }

    const phase: GamePhase = isInCheck(nb, 'w') ? 'check' : 'playing';
    useChessStore.setState({
      board: nb, castling: nc, enPassant: nep, lastMove: move,
      selected: null, validMoves: [], turn: 'w', phase,
      message: phase === 'check' ? '⚠️ אתה בשח! תורך' : 'תורך!',
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
      const { board: nb, castling: nc, enPassant: nep } = applyMove(prev.board, move, prev.castling, prev.enPassant);
      const compMoves = getAllValidMoves(nb, 'b', nc, nep);

      if (compMoves.length === 0) {
        const phrase = isInCheck(nb, 'b') ? 'שחמט!' : 'פאט!';
        set({
          board: nb, castling: nc, enPassant: nep, lastMove: move,
          selected: null, validMoves: [],
          phase: 'checkmate',
          playerScore: prev.playerScore + (isInCheck(nb, 'b') ? 1 : 0),
          message: `🏆 ${phrase} ניצחת!`,
        });
        return;
      }

      const phase: GamePhase = isInCheck(nb, 'b') ? 'check' : 'playing';
      set({
        board: nb, castling: nc, enPassant: nep, lastMove: move,
        selected: null, validMoves: [], turn: 'b', phase,
        message: phase === 'check' ? '⚠️ שח! תור המחשב...' : 'תור המחשב...',
      });
      scheduleComputerMove();
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
