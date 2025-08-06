'use client';

import React from 'react';
import { PuzzlePiece } from '@/lib/utils/puzzleUtils';

export interface TouchState {
  draggedPiece: PuzzlePiece | null;
  offset: { x: number; y: number };
  isDragging: boolean;
  dragPosition: { x: number; y: number };
}

export const initialTouchState: TouchState = {
  draggedPiece: null,
  offset: { x: 0, y: 0 },
  isDragging: false,
  dragPosition: { x: 0, y: 0 }
};

export interface TouchHandlersResult {
  touchState: TouchState;
  setTouchState: React.Dispatch<React.SetStateAction<TouchState>>;
  handleTouchStart: (e: React.TouchEvent, piece: PuzzlePiece) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent, onDrop: (piece: PuzzlePiece, gridIndex: number) => void) => void;
}

export function useTouchHandlers(
  setDraggedPiece: React.Dispatch<React.SetStateAction<PuzzlePiece | null>>
): TouchHandlersResult {
  const [touchState, setTouchState] = React.useState<TouchState>(initialTouchState);

  const handleTouchStart = (e: React.TouchEvent, piece: PuzzlePiece) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    setTouchState({
      draggedPiece: piece,
      offset: {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      },
      isDragging: true,
      dragPosition: { x: touch.clientX, y: touch.clientY }
    });
    
    setDraggedPiece(piece);
    console.log('🎯 SimplePuzzle - Touch dragging piece:', piece.id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchState.isDragging || !touchState.draggedPiece) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    setTouchState(prev => ({
      ...prev,
      dragPosition: { x: touch.clientX, y: touch.clientY }
    }));
  };

  const handleTouchEnd = (
    e: React.TouchEvent, 
    onDrop: (piece: PuzzlePiece, gridIndex: number) => void
  ) => {
    if (!touchState.isDragging || !touchState.draggedPiece) {
      setTouchState(initialTouchState);
      return;
    }
    
    e.preventDefault();
    const touch = e.changedTouches[0];
    
    // Find the drop target
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropTarget = elementBelow?.closest('[data-grid-index]');
    
    if (dropTarget) {
      const gridIndex = parseInt(dropTarget.getAttribute('data-grid-index') || '0');
      onDrop(touchState.draggedPiece, gridIndex);
    }
    
    setTouchState(initialTouchState);
    setDraggedPiece(null);
  };

  return {
    touchState,
    setTouchState,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}
