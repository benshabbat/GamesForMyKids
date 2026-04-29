import type { StateCreator } from 'zustand';
import { type PuzzlePiece, isPieceInCorrectPosition, calculateFinalScore } from '../../utils/puzzleUtils';
import type { PuzzleStore } from '../puzzleStore';

export interface DropSlice {
  handleDropLogic: (piece: PuzzlePiece, gridIndex: number) => boolean;
}

export const createDropSlice: StateCreator<PuzzleStore, [], [], DropSlice> = (set, get) => ({
  handleDropLogic: (piece, gridIndex) => {
    const { difficulty, placedPieces, timer, showFeedback, speak } = get();
    const gridSide = Math.sqrt(difficulty);
    const row = Math.floor(gridIndex / gridSide);
    const col = gridIndex % gridSide;

    const newPlacedPieces = [...placedPieces];

    // Remove piece from current placed position if already placed
    const currentIdx = newPlacedPieces.findIndex(p => p?.id === piece.id);
    if (currentIdx !== -1) newPlacedPieces[currentIdx] = null;

    // Return existing piece at target back to pool
    const existingPiece = newPlacedPieces[gridIndex];
    if (existingPiece) {
      set({
        pieces: get().pieces.map(p =>
          p.id === existingPiece.id
            ? (({ currentPosition: _cp, ...rest }) => ({ ...rest, isPlaced: false, isCorrect: false }))(p)
            : p,
        ),
      });
    }

    newPlacedPieces[gridIndex] = null;

    const isCorrect = isPieceInCorrectPosition(piece, row, col);
    const updatedPiece: PuzzlePiece = { ...piece, currentPosition: { row, col }, isPlaced: true, isCorrect };
    newPlacedPieces[gridIndex] = updatedPiece;

    set({
      placedPieces: newPlacedPieces,
      pieces: get().pieces.map(p => p.id === piece.id ? updatedPiece : p),
    });

    if (isCorrect) {
      showFeedback('כל הכבוד! החלק במקום הנכון! 🎉', 'success');
      speak('כל הכבוד! החלק במקום הנכון!');
      if (navigator.vibrate) navigator.vibrate(100);
    } else {
      showFeedback('לא במקום הנכון, אבל אפשר לנסות שוב 🔄', 'error');
      speak('לא במקום הנכון, נסה למקום אחר');
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    }

    const correctPieces = newPlacedPieces.filter(p => p?.isCorrect).length;
    set({ score: calculateFinalScore(correctPieces, difficulty, timer) });

    if (correctPieces === difficulty) {
      set({ isCompleted: true });
      showFeedback('מדהים! השלמת את הפאזל! 🎊', 'success');
      speak('מדהים! השלמת את הפאזל בהצלחה!');
    }

    return isCorrect;
  },
});
