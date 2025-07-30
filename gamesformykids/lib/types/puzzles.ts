/**
 * ===============================================
 * טיפוסים עבור משחק הפאזל
 * ===============================================
 */

export interface PuzzleImage {
  id: number;
  name: string;
  url: string;
  difficulty: 'easy' | 'medium' | 'hard';
  pieces: number;
  category: string;
}

export interface PuzzlePiece {
  id: number;
  canvas: HTMLCanvasElement;
  correctRow: number;
  correctCol: number;
  currentRow: number | null;
  currentCol: number | null;
  isPlaced: boolean;
}

export interface CompletedPuzzlePiece extends PuzzlePiece {
  currentRow: number;
  currentCol: number;
  isPlaced: true;
}
