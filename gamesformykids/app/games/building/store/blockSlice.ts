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
  playSound,
} from '../utils';

// ── Types ─────────────────────────────────────────────────────────────────────

export type BlockGameSlice = {
  isPlaying: boolean;
  blocks: Block[];
  selectedBlock: Block | null;
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
};

// ── Slice ─────────────────────────────────────────────────────────────────────

export const createBlockSlice: StateCreator<BuildingStore, [], [], BlockGameSlice> = (set, get) => ({
  isPlaying: false,
  blocks: [],
  selectedBlock: null,
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
});
