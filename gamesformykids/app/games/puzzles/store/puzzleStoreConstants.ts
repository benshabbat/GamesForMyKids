import type { PuzzlePiece } from '../utils/puzzleUtils';
import type { SimplePuzzle } from '../constants/simplePuzzlesData';
import type { TouchState } from '../types/puzzle';

export const initialTouchState: TouchState = {
  draggedPiece: null,
  offset: { x: 0, y: 0 },
  isDragging: false,
  dragPosition: { x: 0, y: 0 },
};

export const MENU_RESET = {
  gameStarted: false,
  isCompleted: false,
  timer: 0,
  score: 0,
  pieces: [] as PuzzlePiece[],
  placedPieces: [] as (PuzzlePiece | null)[],
  image: null as HTMLImageElement | null,
  imageLoaded: false,
  draggedPiece: null as PuzzlePiece | null,
  touchState: initialTouchState,
  selectedPuzzle: null as SimplePuzzle | null,
};
