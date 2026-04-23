import type { ChangeEvent } from 'react';
import type { StateCreator } from 'zustand';
import { createPuzzlePieces } from '../../utils/puzzleUtils';
import type { SimplePuzzle } from '../../constants/simplePuzzlesData';
import { MENU_RESET } from '../puzzleStoreConstants';
import type { PuzzleStore } from '../puzzleStore';
import { ROUTES } from '@/lib/constants/routes';

export interface GameSlice {
  initializeGame: (img: HTMLImageElement, difficulty?: number) => void;
  initializeSimpleGame: (puzzle: SimplePuzzle) => void;
  resetGame: () => void;
  shufflePieces: () => void;
  handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePreMadeImageSelect: (imageSrc: string) => void;
  goHome: () => void;
  goToMenu: () => void;
  handlePuzzleSelect: (puzzle: SimplePuzzle) => void;
}

export const createGameSlice: StateCreator<PuzzleStore, [], [], GameSlice> = (set, get) => ({
  initializeGame: (img, difficulty) => {
    const targetDifficulty = difficulty ?? get().difficulty;
    const newPieces = createPuzzlePieces(img, targetDifficulty, 'custom');
    set({
      image: img,
      pieces: newPieces,
      placedPieces: new Array(targetDifficulty).fill(null),
      gameStarted: true,
      isCompleted: false,
      timer: 0,
      score: 0,
      imageLoaded: true,
      ...(difficulty !== undefined ? { difficulty } : {}),
    });
  },

  initializeSimpleGame: (puzzle) => {
    const img = document.createElement('img') as HTMLImageElement;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const newPieces = createPuzzlePieces(img, puzzle.gridSize, 'simple');
      set({
        selectedPuzzle: puzzle,
        pieces: newPieces,
        placedPieces: new Array(puzzle.gridSize).fill(null),
        gameStarted: true,
        isCompleted: false,
        timer: 0,
        score: 0,
        imageLoaded: true,
        difficulty: puzzle.gridSize,
      });
      get().speak(`התחיל משחק ${puzzle.name}! בואו נתחיל לשחק`);
    };
    img.onerror = () => get().showFeedback('שגיאה בטעינת התמונה', 'error');
    img.src = puzzle.imageUrl;
  },

  resetGame: () => {
    const { selectedPuzzle, image, initializeSimpleGame, initializeGame, speak } = get();
    if (selectedPuzzle) {
      initializeSimpleGame(selectedPuzzle);
    } else if (image) {
      initializeGame(image);
    }
    speak('המשחק אופס');
  },

  shufflePieces: () => {
    const { pieces, speak } = get();
    set({ pieces: [...pieces].sort(() => Math.random() - 0.5) });
    speak('החלקים עורבבו');
  },

  handleImageUpload: (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => get().initializeGame(img);
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  },

  handlePreMadeImageSelect: (imageSrc) => {
    const img = new Image();
    img.onload = () => get().initializeGame(img);
    img.src = imageSrc;
  },

  goHome: () => {
    if (typeof window !== 'undefined') window.location.href = ROUTES.HOME;
  },

  goToMenu: () => set(MENU_RESET),

  handlePuzzleSelect: (puzzle) => get().initializeSimpleGame(puzzle),
});
