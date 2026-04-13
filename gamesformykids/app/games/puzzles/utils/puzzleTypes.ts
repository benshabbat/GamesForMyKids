export interface PuzzlePiece {
  id: number;
  canvas: HTMLCanvasElement;
  correctRow: number;
  correctCol: number;
  currentRow: number | null;
  currentCol: number | null;
  isPlaced: boolean;
  isCorrect: boolean;
  expectedPosition: { row: number; col: number };
  currentPosition?: { row: number; col: number };
}

export interface SimplePuzzlePiece extends PuzzlePiece {
  position: number;
  row: number;
  col: number;
  correctPosition: number;
}
