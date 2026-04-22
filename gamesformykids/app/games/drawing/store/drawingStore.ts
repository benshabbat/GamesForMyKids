'use client';

import { create } from 'zustand';

interface DrawingStore {
  // Tool state
  currentColor: string;
  brushSize: number;
  isErasing: boolean;
  eraserSize: number;

  // Game state
  isGameStarted: boolean;
  timeRemaining: number;
  isTimerRunning: boolean;

  // Canvas ops (registered by useDrawingCanvas)
  clearCanvas: () => void;
  registerClearCanvas: (fn: () => void) => void;
  saveDrawing: () => void;
  registerSaveDrawing: (fn: () => void) => void;

  // Tool actions
  setCurrentColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  setIsErasing: (erasing: boolean) => void;
  toggleEraser: () => void;
  selectDrawMode: () => void;
  setEraserSize: (size: number) => void;

  // Game actions
  setIsGameStarted: (started: boolean) => void;
  setTimeRemaining: (time: number) => void;
  setIsTimerRunning: (running: boolean) => void;
  startGame: (timeLimit?: number) => void;
  stopGame: (defaultTimeLimit?: number) => void;
}

export const useDrawingStore = create<DrawingStore>((set) => ({
  // Tool state
  currentColor: '#000000',
  brushSize: 5,
  isErasing: false,
  eraserSize: 10,

  // Game state
  isGameStarted: false,
  timeRemaining: 300,
  isTimerRunning: false,

  // Canvas ops (registered by useDrawingCanvas on mount)
  clearCanvas: () => {},
  registerClearCanvas: (fn) => set({ clearCanvas: fn }),
  saveDrawing: () => {},
  registerSaveDrawing: (fn) => set({ saveDrawing: fn }),

  // Tool actions
  setCurrentColor: (color) => set({ currentColor: color }),
  setBrushSize: (size) => set({ brushSize: size }),
  setIsErasing: (erasing) => set({ isErasing: erasing }),
  toggleEraser: () => set((state) => ({ isErasing: !state.isErasing })),
  selectDrawMode: () => set({ isErasing: false }),
  setEraserSize: (size) => set({ eraserSize: size }),

  // Game actions
  setIsGameStarted: (started) => set({ isGameStarted: started }),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  setIsTimerRunning: (running) => set({ isTimerRunning: running }),
  startGame: (timeLimit) =>
    set((state) => ({
      isGameStarted: true,
      isTimerRunning: true,
      timeRemaining: timeLimit ?? state.timeRemaining,
    })),
  stopGame: (defaultTimeLimit = 300) =>
    set({
      isGameStarted: false,
      isTimerRunning: false,
      timeRemaining: defaultTimeLimit,
    }),
}));
