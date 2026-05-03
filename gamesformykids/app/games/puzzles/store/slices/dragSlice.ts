import type { DragEvent, TouchEvent } from 'react';
import type { StateCreator } from 'zustand';
import type { PuzzlePiece } from '../../utils/puzzleUtils';
import { initialTouchState } from '../puzzleStoreConstants';
import type { PuzzleStore } from '../puzzleStore';

export interface DragSlice {
  handleDragStart: (e: DragEvent<Element>, piece: PuzzlePiece) => void;
  handleTouchStart: (e: TouchEvent<Element>, piece: PuzzlePiece) => void;
  handleTouchMove: (e: TouchEvent<Element>) => void;
  handleTouchEnd: (e: TouchEvent<Element>) => void;
  handleDragOver: (e: DragEvent<Element>) => void;
  handleDrop: (e: DragEvent<Element>, gridIndex: number) => void;
}

export const createDragSlice: StateCreator<PuzzleStore, [], [], DragSlice> = (set, get) => ({
  handleDragStart: (e, piece) => {
    set({ draggedPiece: piece });
    e.dataTransfer.effectAllowed = 'move';
  },

  handleTouchStart: (e, piece) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    set({
      touchState: {
        draggedPiece: piece,
        offset: { x: touch.clientX - rect.left, y: touch.clientY - rect.top },
        isDragging: true,
        dragPosition: { x: touch.clientX, y: touch.clientY },
      },
    });
  },

  handleTouchMove: (e) => {
    const { touchState } = get();
    if (!touchState.isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    if (!touch) return;
    set({ touchState: { ...touchState, dragPosition: { x: touch.clientX, y: touch.clientY } } });

    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const gridCell = elementBelow?.closest('.puzzle-grid-cell');
    document.querySelectorAll('.puzzle-grid-cell').forEach(cell => cell.classList.remove('drop-zone-highlight'));
    if (gridCell?.getAttribute('data-grid-index')) {
      gridCell.classList.add('drop-zone-highlight');
    }
  },

  handleTouchEnd: (e) => {
    const { touchState, showDebug, showFeedback, handleDropLogic } = get();
    if (!touchState.isDragging || !touchState.draggedPiece) return;
    e.preventDefault();
    e.stopPropagation();
    const touch = e.changedTouches[0];
    if (!touch) return;

    let gridCell: Element | null = null;
    const searchRadius = 10;

    let el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (el) gridCell = el.closest('.puzzle-grid-cell');

    if (!gridCell) {
      const offsets: [number, number][] = [
        [-searchRadius, 0], [searchRadius, 0],
        [0, -searchRadius], [0, searchRadius],
        [-searchRadius, -searchRadius], [searchRadius, searchRadius],
      ];
      for (const [dx, dy] of offsets) {
        el = document.elementFromPoint(touch.clientX + dx, touch.clientY + dy);
        if (el) {
          gridCell = el.closest('.puzzle-grid-cell');
          if (gridCell) break;
        }
      }
    }

    if (gridCell) {
      const gridIndex = parseInt(gridCell.getAttribute('data-grid-index') || '-1');
      if (gridIndex >= 0) {
        if (showDebug) showFeedback(`מנסה לשים חלק ${touchState.draggedPiece.id} במקום ${gridIndex}`, 'success');
        const success = handleDropLogic(touchState.draggedPiece, gridIndex);
        if (showDebug) showFeedback(success ? '✅ החלק נשם בהצלחה!' : '❌ החלק לא במקום הנכון', success ? 'success' : 'error');
      } else if (showDebug) {
        showFeedback('לא נמצא אינדקס grid תקין', 'error');
      }
    } else if (showDebug) {
      showFeedback(`לא נמצא grid cell תחת הנקודה ${touch.clientX},${touch.clientY}`, 'error');
    }

    document.querySelectorAll('.puzzle-grid-cell').forEach(cell => cell.classList.remove('drop-zone-highlight'));
    set({ touchState: initialTouchState });
  },

  handleDragOver: (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  },

  handleDrop: (e, gridIndex) => {
    e.preventDefault();
    const { draggedPiece, handleDropLogic } = get();
    if (!draggedPiece) return;
    handleDropLogic(draggedPiece, gridIndex);
    set({ draggedPiece: null });
  },
});
