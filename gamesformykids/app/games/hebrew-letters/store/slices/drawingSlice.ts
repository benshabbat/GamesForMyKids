import type { StateCreator } from 'zustand';
import type { HebrewLettersStore } from '../types';
import type { DrawingState } from '../../types/hebrew-letters';
import { DEFAULT_DRAWING_STATE } from '../../constants/hebrewLettersConstants';

export type DrawingSlice = {
  drawingState: DrawingState;
  updateDrawingState: (updates: Partial<DrawingState>) => void;
  clearCanvas: () => void;
  saveCanvasState: (imageData: ImageData) => void;
  undoLastAction: () => void;
  initializeCanvas: (width: number, height: number, backgroundColor?: string) => void;
  startDrawing: (x: number, y: number) => void;
  continueDrawing: (x: number, y: number) => void;
  stopDrawing: () => void;
  resetCanvas: () => void;
  updateStrokeColor: (color: string) => void;
  updateStrokeWidth: (width: number) => void;
};

export const createDrawingSlice: StateCreator<HebrewLettersStore, [['zustand/devtools', never]], [], DrawingSlice> = (set, get) => ({
  drawingState: { ...DEFAULT_DRAWING_STATE },

  updateDrawingState: (updates) =>
    set(
      (s) => ({ drawingState: { ...s.drawingState, ...updates } }),
      false,
      'hebrewLetters/updateDrawing',
    ),

  clearCanvas: () =>
    set(
      (s) => ({ drawingState: { ...s.drawingState, paths: [], isDrawing: false } }),
      false,
      'hebrewLetters/clearCanvas',
    ),

  saveCanvasState: (imageData) =>
    set(
      (s) => ({ drawingState: { ...s.drawingState, paths: [...s.drawingState.paths, imageData] } }),
      false,
      'hebrewLetters/saveCanvas',
    ),

  undoLastAction: () =>
    set(
      (s) => ({ drawingState: { ...s.drawingState, paths: s.drawingState.paths.slice(0, -1) } }),
      false,
      'hebrewLetters/undo',
    ),

  initializeCanvas: (width, height, backgroundColor = '#ffffff') =>
    set(
      (s) => ({
        drawingState: {
          ...s.drawingState,
          canvasWidth: width,
          canvasHeight: height,
          backgroundColor,
          paths: [],
          isDrawing: false,
          lastDrawPosition: null,
        },
      }),
      false,
      'hebrewLetters/initCanvas',
    ),

  startDrawing: (x, y) =>
    set(
      (s) => ({ drawingState: { ...s.drawingState, isDrawing: true, lastDrawPosition: { x, y } } }),
      false,
      'hebrewLetters/startDrawing',
    ),

  continueDrawing: (x, y) => {
    if (!get().drawingState.isDrawing) return;
    set(
      (s) => ({ drawingState: { ...s.drawingState, lastDrawPosition: { x, y } } }),
      false,
      'hebrewLetters/continueDrawing',
    );
  },

  stopDrawing: () =>
    set(
      (s) => ({ drawingState: { ...s.drawingState, isDrawing: false, lastDrawPosition: null } }),
      false,
      'hebrewLetters/stopDrawing',
    ),

  resetCanvas: () =>
    set({ drawingState: { ...DEFAULT_DRAWING_STATE } }, false, 'hebrewLetters/resetCanvas'),

  updateStrokeColor: (color) =>
    set(
      (s) => ({ drawingState: { ...s.drawingState, currentStrokeColor: color } }),
      false,
      'hebrewLetters/strokeColor',
    ),

  updateStrokeWidth: (width) =>
    set(
      (s) => ({ drawingState: { ...s.drawingState, currentStrokeWidth: width } }),
      false,
      'hebrewLetters/strokeWidth',
    ),
});
