// Barrel re-export  split into focused files for maintainability
export type { PuzzlePiece, SimplePuzzlePiece } from './puzzleTypes';
export { createPuzzlePieces } from './puzzlePieceFactory';
export {
  isPieceInCorrectPosition,
  calculateCompletionPercentage,
  formatTime,
  calculateFinalScore,
} from './puzzleScoring';
