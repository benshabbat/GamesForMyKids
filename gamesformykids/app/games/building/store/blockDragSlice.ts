import type { StateCreator } from 'zustand';
import type { BuildingStore } from './buildingStore';
import type { Block, DragState } from '../types';
import { calcDragPosition } from './blockDragUtils';

// ── Types ─────────────────────────────────────────────────────────────────────

export type BlockDragSlice = {
  dragState: DragState;
  handleMouseDown: (e: React.MouseEvent, block: Block) => void;
  handleTouchStart: (e: React.TouchEvent, block: Block) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleMouseUp: () => void;
  handleTouchEnd: () => void;
};

// ── Slice ─────────────────────────────────────────────────────────────────────

export const createBlockDragSlice: StateCreator<BuildingStore, [], [], BlockDragSlice> = (set, get) => ({
  dragState: {
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    draggedBlock: null,
  },

  handleMouseDown: (e, block) => {
    e.preventDefault();
    const { canvasEl, blocks } = get();
    const rect = canvasEl?.getBoundingClientRect();
    if (!rect) return;
    set({
      dragState: {
        isDragging: true,
        dragOffset: { x: e.clientX - rect.left - block.x, y: e.clientY - rect.top - block.y },
        draggedBlock: block,
      },
      blocks: [...blocks.filter((b) => b.id !== block.id), block],
    });
  },

  handleTouchStart: (e, block) => {
    e.preventDefault();
    const { canvasEl, blocks } = get();
    const rect = canvasEl?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    set({
      dragState: {
        isDragging: true,
        dragOffset: {
          x: touch.clientX - rect.left - block.x,
          y: touch.clientY - rect.top - block.y,
        },
        draggedBlock: block,
      },
      blocks: [...blocks.filter((b) => b.id !== block.id), block],
    });
  },

  handleMouseMove: (e) => {
    const { dragState, canvasEl, showGrid } = get();
    if (!dragState.isDragging || !dragState.draggedBlock) return;
    const rect = canvasEl?.getBoundingClientRect();
    if (!rect) return;
    const pos = calcDragPosition(e.clientX, e.clientY, rect, dragState.dragOffset, showGrid);
    set((s) => ({
      blocks: s.blocks.map((b) =>
        b.id === dragState.draggedBlock!.id ? { ...b, ...pos } : b,
      ),
    }));
  },

  handleTouchMove: (e) => {
    const { dragState, canvasEl, showGrid } = get();
    if (!dragState.isDragging || !dragState.draggedBlock) return;
    const rect = canvasEl?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    const pos = calcDragPosition(touch.clientX, touch.clientY, rect, dragState.dragOffset, showGrid);
    set((s) => ({
      blocks: s.blocks.map((b) =>
        b.id === dragState.draggedBlock!.id ? { ...b, ...pos } : b,
      ),
    }));
  },

  handleMouseUp: () => {
    const { dragState, blocks } = get();
    if (dragState.isDragging && dragState.draggedBlock) {
      get().addToHistory(blocks);
    }
    set({ dragState: { isDragging: false, dragOffset: { x: 0, y: 0 }, draggedBlock: null } });
  },

  handleTouchEnd: () => get().handleMouseUp(),
});
