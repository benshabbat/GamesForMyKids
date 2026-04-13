import type { PuzzlePiece } from './puzzleTypes';

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

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const calculateFinalScore = (
  baseScore: number,
  timer: number,
  completionBonus = 50,
  timeBonus = 300
): number => {
  return baseScore + completionBonus + Math.max(0, timeBonus - timer);
};
