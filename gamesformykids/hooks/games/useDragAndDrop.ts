'use client';

import { useState, useCallback } from 'react';
import { type PuzzlePiece } from '@/lib/utils/puzzleUtils';
import { getTouchCoordinates, getTouchDragPosition, getElementFromTouch } from '@/lib/utils/touchHelpers';

interface TouchState {
  draggedPiece: PuzzlePiece | null;
  offset: { x: number; y: number };
  isDragging: boolean;
  dragPosition: { x: number; y: number };
}

interface UseDragAndDropReturn {
  draggedPiece: PuzzlePiece | null;
  touchState: TouchState;
  setDraggedPiece: React.Dispatch<React.SetStateAction<PuzzlePiece | null>>;
  handleDragStart: (e: React.DragEvent, piece: PuzzlePiece) => void;
  handleTouchStart: (e: React.TouchEvent, piece: PuzzlePiece) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent, onDrop: (piece: PuzzlePiece, gridIndex: number) => void) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, gridIndex: number, onDrop: (piece: PuzzlePiece, gridIndex: number) => void) => void;
}

export function useDragAndDrop(): UseDragAndDropReturn {
  const [draggedPiece, setDraggedPiece] = useState<PuzzlePiece | null>(null);
  const [touchState, setTouchState] = useState<TouchState>({
    draggedPiece: null,
    offset: { x: 0, y: 0 },
    isDragging: false,
    dragPosition: { x: 0, y: 0 }
  });

  // Desktop drag start
  const handleDragStart = useCallback((e: React.DragEvent, piece: PuzzlePiece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
    console.log('🎯 CustomPuzzle - Dragging piece:', piece.id, 'expected at:', piece.expectedPosition);
  }, []);

  // Mobile touch start
  const handleTouchStart = useCallback((e: React.TouchEvent, piece: PuzzlePiece) => {
    e.preventDefault();
    if (!e.touches[0]) return;
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const touchCoords = getTouchCoordinates(e.nativeEvent, rect);
    const dragPos = getTouchDragPosition(e.nativeEvent);
    
    if (!touchCoords || !dragPos) return;
    
    setTouchState({
      draggedPiece: piece,
      offset: touchCoords,
      isDragging: true,
      dragPosition: dragPos
    });
    
    setDraggedPiece(piece);
    console.log('🎯 CustomPuzzle - Touch dragging piece:', piece.id);
  }, []);

  // Mobile touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchState.isDragging || !touchState.draggedPiece) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    setTouchState(prev => ({
      ...prev,
      dragPosition: { x: touch.clientX, y: touch.clientY }
    }));
  }, [touchState.isDragging, touchState.draggedPiece]);

  // Mobile touch end
  const handleTouchEnd = useCallback((
    e: React.TouchEvent, 
    onDrop: (piece: PuzzlePiece, gridIndex: number) => void
  ) => {
    if (!touchState.isDragging || !touchState.draggedPiece) {
      setTouchState({ 
        draggedPiece: null, 
        offset: { x: 0, y: 0 }, 
        isDragging: false, 
        dragPosition: { x: 0, y: 0 } 
      });
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
    
    setTouchState({ 
      draggedPiece: null, 
      offset: { x: 0, y: 0 }, 
      isDragging: false, 
      dragPosition: { x: 0, y: 0 } 
    });
    setDraggedPiece(null);
  }, [touchState.isDragging, touchState.draggedPiece]);

  // Desktop drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  // Desktop drop
  const handleDrop = useCallback((
    e: React.DragEvent, 
    gridIndex: number, 
    onDrop: (piece: PuzzlePiece, gridIndex: number) => void
  ) => {
    e.preventDefault();
    
    if (!draggedPiece) return;
    
    onDrop(draggedPiece, gridIndex);
    setDraggedPiece(null);
  }, [draggedPiece]);

  return {
    draggedPiece,
    touchState,
    setDraggedPiece,
    handleDragStart,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDragOver,
    handleDrop
  };
}
