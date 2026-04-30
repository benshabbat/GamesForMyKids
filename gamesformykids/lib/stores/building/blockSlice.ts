import type { StateCreator } from 'zustand';
import type { BuildingStore } from '../buildingStore';
import type { Block, DragState, ShapeType } from '@/app/games/building/types';
import { CANVAS_CONFIG } from '@/app/games/building/constants';
import {
  generateBlockId,
  getRandomPosition,
  getBlockColor,
  getBlockProperties,
  rotateBlock,
  shuffleBlocks,
  playSound,
} from '@/app/games/building/utils';

export type BlockSlice = {
  isPlaying: boolean;
  blocks: Block[];
  selectedBlock: Block | null;
  dragState: DragState;
  canvasEl: HTMLDivElement | null;
  startGame: () => void;
  createBlock: (shape: ShapeType) => void;
  handleDoubleClick: (block: Block) => void;
  handleBlockClick: (block: Block) => void;
  handleRotate: (block: Block, degrees?: number) => void;
  updateSelectedBlockSize: (size: number) => void;
  deselectBlock: () => void;
  clearAll: () => void;
  magicShuffle: () => void;
  saveCreation: () => void;
  setCanvasElement: (el: HTMLDivElement | null) => void;
  handleMouseDown: (e: React.MouseEvent, block: Block) => void;
  handleTouchStart: (e: React.TouchEvent, block: Block) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleMouseUp: () => void;
  handleTouchEnd: () => void;
};

function calcDragPosition(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  dragOffset: { x: number; y: number },
  showGrid: boolean,
) {
  const rawX = clientX - rect.left - dragOffset.x;
  const rawY = clientY - rect.top - dragOffset.y;
  const clampX = Math.max(0, Math.min(rawX, rect.width - CANVAS_CONFIG.BLOCK_SIZE));
  const clampY = Math.max(0, Math.min(rawY, rect.height - CANVAS_CONFIG.BLOCK_SIZE));
  return {
    x: showGrid ? Math.round(clampX / CANVAS_CONFIG.GRID_SIZE) * CANVAS_CONFIG.GRID_SIZE : clampX,
    y: showGrid ? Math.round(clampY / CANVAS_CONFIG.GRID_SIZE) * CANVAS_CONFIG.GRID_SIZE : clampY,
  };
}

export const createBlockSlice: StateCreator<BuildingStore, [], [], BlockSlice> = (set, get) => ({
  isPlaying: false,
  blocks: [],
  selectedBlock: null,
  dragState: {
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    draggedBlock: null,
  },
  canvasEl: null,

  startGame: () => set({ isPlaying: true }),

  createBlock: (shape) => {
    const { blocks, selectedTool, selectedColor, selectedSize, soundEnabled } = get();
    const position = getRandomPosition();
    const color = getBlockColor(selectedTool, selectedColor);
    const properties = getBlockProperties(selectedTool);

    const newBlock: Block = {
      id: generateBlockId(),
      ...position,
      color,
      shape,
      size: selectedSize,
      ...properties,
    };

    const newBlocks = [...blocks, newBlock];
    get().addToHistory(newBlocks);
    set({ blocks: newBlocks });
    get().addScore(10);
    playSound(soundEnabled, 'create');
    get().createParticles(newBlock.x, newBlock.y, newBlock.color);
    get().checkAchievements(newBlocks);
  },

  handleDoubleClick: (block) => {
    const { soundEnabled } = get();
    const rotatedBlock = rotateBlock(block);
    set((s) => ({ blocks: s.blocks.map((b) => (b.id === block.id ? rotatedBlock : b)) }));
    playSound(soundEnabled, 'rotate');
    get().createParticles(block.x, block.y, block.color);
  },

  handleBlockClick: (block) => {
    const { selectedBlock } = get();
    set({ selectedBlock: selectedBlock?.id === block.id ? null : block });
  },

  handleRotate: (block, degrees = 45) => {
    const rotatedBlock = rotateBlock(block, degrees);
    set((s) => {
      const newBlocks = s.blocks.map((b) => (b.id === block.id ? rotatedBlock : b));
      get().addToHistory(newBlocks);
      return { blocks: newBlocks };
    });
    get().createParticles(block.x, block.y, block.color);
  },

  updateSelectedBlockSize: (newSize) => {
    const { selectedBlock } = get();
    if (!selectedBlock) return;
    set((s) => {
      const newBlocks = s.blocks.map((b) =>
        b.id === selectedBlock.id ? { ...b, size: newSize } : b,
      );
      get().addToHistory(newBlocks);
      return { blocks: newBlocks, selectedBlock: { ...selectedBlock, size: newSize } };
    });
  },

  deselectBlock: () => set({ selectedBlock: null }),

  clearAll: () => {
    const { soundEnabled } = get();
    get().addToHistory([]);
    get().clearParticles();
    playSound(soundEnabled, 'create');
    set({ blocks: [], selectedBlock: null });
  },

  magicShuffle: () => {
    const { blocks, soundEnabled } = get();
    const shuffledBlocks = shuffleBlocks(blocks);
    get().addToHistory(shuffledBlocks);
    set({ blocks: shuffledBlocks });
    playSound(soundEnabled, 'magic');
    blocks.forEach((block) => get().createParticles(block.x, block.y, block.color));
    get().addScore(blocks.length * 5);
  },

  saveCreation: () => {
    get();
    alert('יצירה נשמרה! 🎉');
  },

  setCanvasElement: (el) => set({ canvasEl: el }),

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
    if (!touch) return;
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
    const draggedBlockId = dragState.draggedBlock.id;
    set((s) => ({
      blocks: s.blocks.map((b) =>
        b.id === draggedBlockId ? { ...b, ...pos } : b,
      ),
    }));
  },

  handleTouchMove: (e) => {
    const { dragState, canvasEl, showGrid } = get();
    if (!dragState.isDragging || !dragState.draggedBlock) return;
    const rect = canvasEl?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    if (!touch) return;
    const pos = calcDragPosition(touch.clientX, touch.clientY, rect, dragState.dragOffset, showGrid);
    const draggedBlockId = dragState.draggedBlock.id;
    set((s) => ({
      blocks: s.blocks.map((b) =>
        b.id === draggedBlockId ? { ...b, ...pos } : b,
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
