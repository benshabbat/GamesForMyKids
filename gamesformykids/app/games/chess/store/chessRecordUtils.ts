/**
 * Pure helpers for building chess move records and notation.
 * Shared between useChessStore and useChessAI.
 */

import { type ChessMove, type Piece, type MoveRating, type MoveRecord, PIECE_SYMBOLS } from '../logic/chessTypes';

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
  if (!captured) return 'good';
  const pt = captured[1];
  if (pt === 'Q') return 'excellent';
  if (pt === 'R') return 'great';
  if (pt === 'B' || pt === 'N') return 'good';
  return 'normal';
}

export function buildRecord(
  move: ChessMove, piece: string, by: 'w' | 'b',
  captured: Piece, gaveCheck: boolean, moveNumber: number,
): MoveRecord {
  const castle = move.castle ?? null;
  return {
    by, piece, captured, gaveCheck, castle, moveNumber,
    rating: rateMove(captured, gaveCheck, castle),
    notation: toNotation(move, piece),
  };
}
