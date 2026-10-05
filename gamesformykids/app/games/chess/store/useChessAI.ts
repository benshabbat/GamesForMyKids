'use client';

/**
 * =====================================================
 * useChessAI — React lifecycle wrapper for the AI move
 * =====================================================
 * Watches turn === 'b' and schedules the computer move
 * via useRef + useEffect so the timer is cleaned up on
 * unmount, fixing the module-level _timer pattern.
 */

import { useEffect, useRef } from 'react';
import { useChessStore } from './useChessStore';
import { applyMove, isInCheck } from '../logic/chessBoardUtils';
import { getAllValidMoves } from '../logic/chessMoveGen';
import { bestComputerMove } from '../logic/chessAI';
import { buildRecord } from './chessRecordUtils';

export function useChessAI() {
  const turn = useChessStore((s) => s.turn);
  const phase = useChessStore((s) => s.phase);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (turn !== 'b' || (phase !== 'playing' && phase !== 'check')) return;

    timerRef.current = setTimeout(() => {
      const s = useChessStore.getState();
      if (s.turn !== 'b') return;

      const move = bestComputerMove(s.board, s.castling, s.enPassant);
      if (!move) {
        const mated = isInCheck(s.board, 'b');
        useChessStore.setState({
          phase: mated ? 'checkmate' : 'stalemate',
          // On checkmate `turn` marks the winner (the side that delivered mate)
          turn: 'w',
          playerScore: s.playerScore + (mated ? 1 : 0),
          message: mated ? '🏆 שחמט! ניצחת!' : '🤝 פאט! המשחק נגמר בתיקו',
        });
        return;
      }

      const pieceMoved = s.board[move.from.row]![move.from.col]!;
      const { board: nb, castling: nc, enPassant: nep, captured } = applyMove(s.board, move, s.castling, s.enPassant);
      const playerMoves = getAllValidMoves(nb, 'w', nc, nep);

      if (playerMoves.length === 0) {
        const mated = isInCheck(nb, 'w');
        const record = buildRecord(move, pieceMoved, 'b', captured, false, Math.floor(s.moveHistory.length / 2) + 1);
        useChessStore.setState({
          board: nb, castling: nc, enPassant: nep, lastMove: move,
          // `turn` stays 'b' on checkmate (the computer delivered mate); no check means stalemate: a draw
          phase: mated ? 'checkmate' : 'stalemate',
          computerScore: s.computerScore + (mated ? 1 : 0),
          message: mated ? '😢 שחמט! המחשב ניצח.' : '🤝 פאט! המשחק נגמר בתיקו',
          capturedByComputer: captured ? [...s.capturedByComputer, captured] : s.capturedByComputer,
          moveHistory: [...s.moveHistory, record],
        });
        return;
      }

      const gaveCheck = isInCheck(nb, 'w');
      const phase2 = gaveCheck ? 'check' : 'playing';
      const record = buildRecord(move, pieceMoved, 'b', captured, gaveCheck, Math.floor(s.moveHistory.length / 2) + 1);
      useChessStore.setState({
        board: nb, castling: nc, enPassant: nep, lastMove: move,
        selected: null, validMoves: [], turn: 'w', phase: phase2,
        message: phase2 === 'check' ? '⚠️ אתה בשח! תורך' : 'תורך!',
        capturedByComputer: captured ? [...s.capturedByComputer, captured] : s.capturedByComputer,
        moveHistory: [...s.moveHistory, record],
      });
    }, 600);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [turn, phase]);
}
