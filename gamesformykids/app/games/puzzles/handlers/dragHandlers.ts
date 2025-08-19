/**
 * ===============================================
 * Puzzle Touch & Drag Handlers - מנהלי מגע וגרירה
 * ===============================================
 * 
 * פונקציות עזר לטיפול בגרירה ומגע במשחק הפאזל
 */

import { PuzzlePiece } from '../utils/puzzleUtils';
import { TouchState } from '../types/puzzle';

/**
 * מתחיל גרירת חלק פאזל
 */
export const startDragging = (
  piece: PuzzlePiece,
  clientX: number,
  clientY: number
): {
  draggedPiece: PuzzlePiece;
  touchState: TouchState;
} => {
  const rect = piece.canvas.getBoundingClientRect();
  const offset = {
    x: clientX - rect.left,
    y: clientY - rect.top
  };

  return {
    draggedPiece: piece,
    touchState: {
      draggedPiece: piece,
      offset,
      isDragging: true,
      dragPosition: { x: clientX, y: clientY }
    }
  };
};

/**
 * מעדכן מיקום הגרירה
 */
export const updateDragPosition = (
  currentTouchState: TouchState,
  clientX: number,
  clientY: number
): TouchState => {
  if (!currentTouchState.isDragging || !currentTouchState.draggedPiece) {
    return currentTouchState;
  }

  return {
    ...currentTouchState,
    dragPosition: { x: clientX, y: clientY }
  };
};

/**
 * מסיים גרירה
 */
export const endDragging = (): {
  draggedPiece: null;
  touchState: TouchState;
} => ({
  draggedPiece: null,
  touchState: {
    draggedPiece: null,
    offset: { x: 0, y: 0 },
    isDragging: false,
    dragPosition: { x: 0, y: 0 }
  }
});

/**
 * מוצא את אינדקס הגריד הקרוב ביותר למיקום נתון
 */
export const findNearestGridIndex = (
  x: number,
  y: number,
  gridElement: HTMLElement,
  gridSize: number
): number | null => {
  const rect = gridElement.getBoundingClientRect();
  const relativeX = x - rect.left;
  const relativeY = y - rect.top;
  
  if (relativeX < 0 || relativeY < 0 || relativeX > rect.width || relativeY > rect.height) {
    return null;
  }
  
  const gridSide = Math.sqrt(gridSize);
  const cellWidth = rect.width / gridSide;
  const cellHeight = rect.height / gridSide;
  
  const col = Math.floor(relativeX / cellWidth);
  const row = Math.floor(relativeY / cellHeight);
  
  if (col >= gridSide || row >= gridSide) {
    return null;
  }
  
  return row * gridSide + col;
};

/**
 * בודק אם המיקום נמצא מעל הגריד
 */
export const isOverGrid = (
  x: number,
  y: number,
  gridElement: HTMLElement
): boolean => {
  const rect = gridElement.getBoundingClientRect();
  return (
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom
  );
};

/**
 * מחשב סטייל לחלק הנגרר
 */
export const getDragStyle = (
  touchState: TouchState,
  piece: PuzzlePiece
): React.CSSProperties => {
  if (!touchState.isDragging || touchState.draggedPiece?.id !== piece.id) {
    return {};
  }

  return {
    position: 'fixed',
    left: touchState.dragPosition.x - touchState.offset.x,
    top: touchState.dragPosition.y - touchState.offset.y,
    zIndex: 1000,
    pointerEvents: 'none',
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
  };
};
