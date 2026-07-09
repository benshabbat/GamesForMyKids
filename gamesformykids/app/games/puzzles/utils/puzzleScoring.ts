import type { PuzzlePiece } from './puzzleTypes';
import { formatGameTime } from '@/lib/utils/game/gameUtils';

export const isPieceInCorrectPosition = (
  piece: PuzzlePiece,
  targetRow: number,
  targetCol: number
): boolean => {
  return piece.correctRow === targetRow && piece.correctCol === targetCol;
};

export const calculateCompletionPercentage = (
  completedPieces: number,
  totalPieces: number
): number => {
  return Math.round((completedPieces / totalPieces) * 100);
};

export const formatTime = formatGameTime;

export const calculateFinalScore = (
  baseScore: number,
  timer: number,
  completionBonus = 50,
  timeBonus = 300
): number => {
  return baseScore + completionBonus + Math.max(0, timeBonus - timer);
};
