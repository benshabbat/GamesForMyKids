import { create } from 'zustand';
import type { PuzzleState } from '../types/puzzle';
import { initialTouchState } from './puzzleStoreConstants';
import { type FeedbackSlice, createFeedbackSlice } from './slices/feedbackSlice';
import { type GameSlice, createGameSlice } from './slices/gameSlice';
import { type DropSlice, createDropSlice } from './slices/dropSlice';
import { type DragSlice, createDragSlice } from './slices/dragSlice';
import { type ControlsSlice, createControlsSlice } from './slices/controlsSlice';

export type PuzzleStore = PuzzleState & FeedbackSlice & GameSlice & DropSlice & DragSlice & ControlsSlice;

export const usePuzzleStore = create<PuzzleStore>()((...a) => ({
  // --- Base PuzzleState ---
  gameStarted: false,
  isCompleted: false,
  timer: 0,
  difficulty: 9,
  score: 0,
  showHints: false,
  showDebug: false,
  showHelp: false,
  pieces: [],
  placedPieces: [],
  image: null,
  imageLoaded: false,
  draggedPiece: null,
  touchState: initialTouchState,
  selectedPuzzle: null,

  // --- Slices ---
  ...createFeedbackSlice(...a),
  ...createGameSlice(...a),
  ...createDropSlice(...a),
  ...createDragSlice(...a),
  ...createControlsSlice(...a),
}));
