import type { StateCreator } from 'zustand';
import type { BuildingStore } from './buildingStore';
import type { Block, ShapeType } from '../types';
import {
  generateBlockId,
  getRandomPosition,
  getBlockColor,
  getBlockProperties,
  rotateBlock,
  shuffleBlocks,
} from '../utils';

// ── Types ─────────────────────────────────────────────────────────────────────

export type BlockGameSlice = {
  isPlaying: boolean;
  blocks: Block[];
  selectedBlock: Block | null;
  canvasEl: HTMLDivElement | null;
  pendingSound: 'create' | 'rotate' | 'magic' | null;
  saveSuccess: boolean;
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
};

// ── Slice ─────────────────────────────────────────────────────────────────────

export const createBlockSlice: StateCreator<BuildingStore, [], [], BlockGameSlice> = (set, get) => ({
  isPlaying: false,
  blocks: [],
  selectedBlock: null,
  canvasEl: null,
  pendingSound: null,
  saveSuccess: false,

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
    set({ blocks: newBlocks, pendingSound: 'create' });
    get().addScore(10);
    get().createParticles(newBlock.x, newBlock.y, newBlock.color);
    get().checkAchievements(newBlocks);
  },

  handleDoubleClick: (block) => {
    const rotatedBlock = rotateBlock(block);
    set((s) => ({ blocks: s.blocks.map((b) => (b.id === block.id ? rotatedBlock : b)), pendingSound: 'rotate' }));
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
    get().addToHistory([]);
    get().clearParticles();
    set({ blocks: [], selectedBlock: null, pendingSound: 'create' });
  },

  magicShuffle: () => {
    const { blocks } = get();
    const shuffledBlocks = shuffleBlocks(blocks);
    get().addToHistory(shuffledBlocks);
    set({ blocks: shuffledBlocks, pendingSound: 'magic' });
    blocks.forEach((block) => get().createParticles(block.x, block.y, block.color));
    get().addScore(blocks.length * 5);
  },

  saveCreation: () => {
    set({ saveSuccess: true });
  },

  setCanvasElement: (el) => set({ canvasEl: el }),
});
