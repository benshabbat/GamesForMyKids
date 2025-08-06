'use client';

import { useState, useCallback } from 'react';
import { 
  isPieceInCorrectPosition, 
  calculateFinalScore,
  type PuzzlePiece 
} from '@/lib/utils/puzzleUtils';
import { usePuzzleFeedback } from '@/hooks/games/usePuzzleFeedback';

interface UsePuzzleGameLogicProps {
  difficulty: number;
  timer: number;
}

interface UsePuzzleGameLogicReturn {
  pieces: PuzzlePiece[];
  placedPieces: (PuzzlePiece | null)[];
  score: number;
  setPieces: React.Dispatch<React.SetStateAction<PuzzlePiece[]>>;
  setPlacedPieces: React.Dispatch<React.SetStateAction<(PuzzlePiece | null)[]>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  handleDropLogic: (piece: PuzzlePiece, gridIndex: number) => boolean;
  shufflePieces: () => void;
  resetPuzzle: (newPieces: PuzzlePiece[]) => void;
}

export function usePuzzleGameLogic({ 
  difficulty, 
  timer 
}: UsePuzzleGameLogicProps): UsePuzzleGameLogicReturn {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [placedPieces, setPlacedPieces] = useState<(PuzzlePiece | null)[]>([]);
  const [score, setScore] = useState(0);
  
  const { showFeedback, speak } = usePuzzleFeedback();

  // Handle drop logic for puzzle pieces
  const handleDropLogic = useCallback((piece: PuzzlePiece, gridIndex: number): boolean => {
    const gridSide = Math.sqrt(difficulty);
    const row = Math.floor(gridIndex / gridSide);
    const col = gridIndex % gridSide;
    
    console.log('🎯 CustomPuzzle - Drop attempt:', {
      pieceId: piece.id,
      droppedAt: `(${row}, ${col})`,
      expectedAt: `(${piece.expectedPosition.row}, ${piece.expectedPosition.col})`,
      gridIndex
    });

    setPlacedPieces(currentPlacedPieces => {
      const newPlacedPieces = [...currentPlacedPieces];
      
      // Remove piece from current position if it's already placed
      const currentIndex = newPlacedPieces.findIndex(p => p?.id === piece.id);
      if (currentIndex !== -1) {
        newPlacedPieces[currentIndex] = null;
      }

      // Check if there's already a piece at the target position
      const existingPiece = newPlacedPieces[gridIndex];
      if (existingPiece) {
        // If there's a piece there, return it to the pool by marking it as not placed
        setPieces(prevPieces => 
          prevPieces.map(p => 
            p.id === existingPiece.id 
              ? { ...p, isPlaced: false, isCorrect: false, currentPosition: undefined } 
              : p
          )
        );
      }

      // Remove any piece that might be at the target position
      newPlacedPieces[gridIndex] = null;

      // Check if placement is correct
      const isCorrect = isPieceInCorrectPosition(piece, row, col);
      
      const updatedPiece: PuzzlePiece = {
        ...piece,
        currentPosition: { row, col },
        isPlaced: true,
        isCorrect
      };

      // Place the piece on the grid
      newPlacedPieces[gridIndex] = updatedPiece;
      
      // Update pieces array
      setPieces(prevPieces => 
        prevPieces.map(p => 
          p.id === piece.id ? updatedPiece : p
        )
      );

      // Provide feedback
      if (isCorrect) {
        showFeedback('כל הכבוד! החלק במקום הנכון! 🎉', 'success');
        speak('כל הכבוד! החלק במקום הנכון!');
      } else {
        showFeedback('לא במקום הנכון, אבל אפשר לנסות שוב 🔄', 'error');
        speak('לא במקום הנכון, נסה למקום אחר');
      }

      // Check for completion and update score
      const correctPieces = newPlacedPieces.filter(p => p?.isCorrect).length;
      const newScore = calculateFinalScore(correctPieces, difficulty, timer);
      setScore(newScore);

      // Check if puzzle is completed
      const isCompleted = correctPieces === difficulty;
      if (isCompleted) {
        showFeedback('מדהים! השלמת את הפאזל! 🎊', 'success');
        speak('מדהים! השלמת את הפאזל בהצלחה!');
      }

      return newPlacedPieces;
    });

    return isPieceInCorrectPosition(piece, row, col);
  }, [difficulty, timer, showFeedback, speak]);

  // Shuffle pieces
  const shufflePieces = useCallback(() => {
    setPieces(prevPieces => [...prevPieces].sort(() => Math.random() - 0.5));
    speak('החלקים עורבבו');
  }, [speak]);

  // Reset puzzle with new pieces
  const resetPuzzle = useCallback((newPieces: PuzzlePiece[]) => {
    setPieces(newPieces);
    setPlacedPieces(new Array(difficulty).fill(null));
    setScore(0);
    speak('המשחק אופס');
  }, [difficulty, speak]);

  return {
    pieces,
    placedPieces,
    score,
    setPieces,
    setPlacedPieces,
    setScore,
    handleDropLogic,
    shufflePieces,
    resetPuzzle
  };
}
