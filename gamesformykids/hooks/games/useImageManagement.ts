'use client';

import { useState, useCallback } from 'react';
import { createPuzzlePieces, type PuzzlePiece } from '@/lib/utils/puzzleUtils';
import { usePuzzleFeedback } from '@/hooks/games/usePuzzleFeedback';

interface UseImageManagementReturn {
  image: HTMLImageElement | null;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePreMadeImageSelect: (imageSrc: string) => void;
  initializeGame: (img: HTMLImageElement, difficulty: number) => PuzzlePiece[];
}

export function useImageManagement(): UseImageManagementReturn {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const { showFeedback, speak } = usePuzzleFeedback();

  // Handle image upload from file
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = document.createElement('img') as HTMLImageElement;
      img.onload = () => {
        setImage(img);
        speak('תמונה הועלתה בהצלחה! כעת ניתן להתחיל לשחק');
      };
      img.onerror = () => {
        showFeedback('שגיאה בטעינת התמונה', 'error');
        speak('שגיאה בטעינת התמונה');
      };
      img.src = URL.createObjectURL(file);
    }
  }, [showFeedback, speak]);

  // Handle pre-made image selection
  const handlePreMadeImageSelect = useCallback((imageSrc: string) => {
    const img = document.createElement('img') as HTMLImageElement;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImage(img);
      speak('תמונה נבחרה! הפאזל מוכן');
    };
    img.onerror = () => {
      console.error('Failed to load pre-made image:', imageSrc);
      showFeedback('שגיאה בטעינת התמונה', 'error');
      speak('שגיאה בטעינת התמונה');
    };
    img.src = imageSrc;
  }, [showFeedback, speak]);

  // Initialize game with image
  const initializeGame = useCallback((img: HTMLImageElement, difficulty: number): PuzzlePiece[] => {
    const newPieces = createPuzzlePieces(img, difficulty);
    
    // Debug: Log created pieces
    console.log('🎮 CustomPuzzle - Created pieces:', newPieces.map(p => ({
      id: p.id,
      expectedPos: `(${p.expectedPosition.row}, ${p.expectedPosition.col})`,
      isPlaced: p.isPlaced,
      isCorrect: p.isCorrect
    })));
    
    speak('הפאזל החדש מוכן! בואו נתחיל לשחק');
    return newPieces;
  }, [speak]);

  return {
    image,
    handleImageUpload,
    handlePreMadeImageSelect,
    initializeGame
  };
}
