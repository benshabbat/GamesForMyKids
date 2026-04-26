import { create } from 'zustand';
import { Block, Particle, DragState, ShapeType, ToolType } from '@/app/games/building/types';
import { COLORS, SHAPES, CANVAS_CONFIG, ACHIEVEMENTS } from '@/app/games/building/constants';
import {
  generateBlockId,
  getRandomPosition,
  getBlockColor,
  getBlockProperties,
  rotateBlock,
  shuffleBlocks,
  playSound,
} from '@/app/games/building/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BuildingState {
  // Game
  isPlaying: boolean;

  // Blocks
  blocks: Block[];
  selectedBlock: Block | null;

  // Particles
  particles: Particle[];

  // Achievements & score
  achievements: string[];
  score: number;

  // History (undo/redo)
  history: Block[][];
  historyIndex: number;

  // Settings
  soundEnabled: boolean;
  selectedTool: ToolType;
  selectedColor: string;
  selectedSize: number;
  showGrid: boolean;
  animationMode: boolean;

  // Drag state
  dragState: DragState;

  // Canvas element ref (plain object, updated by component)
  canvasEl: HTMLDivElement | null;
}

interface BuildingActions {
  // Game lifecycle
  startGame: () => void;

  // Block management
  createBlock: (shape: ShapeType) => void;
  handleDoubleClick: (block: Block) => void;
  handleBlockClick: (block: Block) => void;
  handleRotate: (block: Block, degrees?: number) => void;
  updateSelectedBlockSize: (size: number) => void;
  deselectBlock: () => void;
  clearAll: () => void;
  magicShuffle: () => void;
  saveCreation: () => void;

  // History
  addToHistory: (blocks: Block[]) => void;
  undo: () => void;
  redo: () => void;

  // Settings
  setSoundEnabled: (enabled: boolean) => void;
  setSelectedTool: (tool: ToolType) => void;
  setSelectedColor: (color: string) => void;
  setSelectedSize: (size: number) => void;
  setShowGrid: (show: boolean) => void;
  setAnimationMode: (mode: boolean) => void;
  handleColorSelect: (color: string) => void;
  handleToolSelect: (tool: ToolType) => void;
  handleSizeChange: (size: number) => void;

  // Particles
  createParticles: (x: number, y: number, color: string) => void;
  tickParticles: () => void;
  clearParticles: () => void;

  // Achievements
  checkAchievements: (blocks: Block[]) => void;
  addScore: (points: number) => void;

  // Canvas element
  setCanvasElement: (el: HTMLDivElement | null) => void;

  // Drag and drop
  handleMouseDown: (e: React.MouseEvent, block: Block) => void;
  handleTouchStart: (e: React.TouchEvent, block: Block) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleMouseUp: () => void;
  handleTouchEnd: () => void;
}

export type BuildingStore = BuildingState & BuildingActions;

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBuildingStore = create<BuildingStore>((set, get) => ({
  // ── Initial state ────────────────────────────────────────────────────────────
  isPlaying: false,
  blocks: [],
  selectedBlock: null,
  particles: [],
  achievements: [],
  score: 0,
  history: [[]],
  historyIndex: 0,
  soundEnabled: false,
  selectedTool: 'normal',
  selectedColor: COLORS[0],
  selectedSize: 1,
  showGrid: false,
  animationMode: false,
  dragState: {
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    draggedBlock: null,
  },
  canvasEl: null,

  // ── Game lifecycle ───────────────────────────────────────────────────────────
  startGame: () => set({ isPlaying: true }),

  // ── Block management ─────────────────────────────────────────────────────────
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
        b.id === selectedBlock.id ? { ...b, size: newSize } : b
      );
      get().addToHistory(newBlocks);
      return {
        blocks: newBlocks,
        selectedBlock: { ...selectedBlock, size: newSize },
      };
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

  // ── History ──────────────────────────────────────────────────────────────────
  addToHistory: (newBlocks) => {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newBlocks]);
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({ historyIndex: newIndex, blocks: [...history[newIndex]] });
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({ historyIndex: newIndex, blocks: [...history[newIndex]] });
    }
  },

  // ── Settings ─────────────────────────────────────────────────────────────────
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setSelectedColor: (color) => set({ selectedColor: color }),
  setSelectedSize: (size) => set({ selectedSize: size }),
  setShowGrid: (show) => set({ showGrid: show }),
  setAnimationMode: (mode) => set({ animationMode: mode }),
  handleColorSelect: (color) => set({ selectedColor: color }),
  handleToolSelect: (tool) => set({ selectedTool: tool }),
  handleSizeChange: (size) => set({ selectedSize: size }),

  // ── Particles ────────────────────────────────────────────────────────────────
  createParticles: (x, y, color) => {
    const newParticles: Particle[] = Array.from({ length: 10 }, (_, i) => ({
      id: `particle-${Date.now()}-${i}`,
      x: x + 30,
      y: y + 30,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -8 - 2,
      life: 30,
      color,
      size: Math.random() * 4 + 2,
    }));
    set((s) => ({ particles: [...s.particles, ...newParticles] }));
  },

  tickParticles: () => {
    set((s) => ({
      particles: s.particles
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.5,
          life: p.life - 1,
          size: Math.max(0, (p.size ?? 6) - 0.2),
        }))
        .filter((p) => p.life > 0),
    }));
  },

  clearParticles: () => set({ particles: [] }),

  // ── Achievements ─────────────────────────────────────────────────────────────
  checkAchievements: (blocks) => {
    const { achievements } = get();
    const newAchievements = [...achievements];

    if (
      blocks.length >= ACHIEVEMENTS.BUILDER.threshold &&
      !newAchievements.includes(ACHIEVEMENTS.BUILDER.id)
    ) {
      newAchievements.push(ACHIEVEMENTS.BUILDER.id);
    }

    const starCount = blocks.filter((b) => b.shape === ACHIEVEMENTS.STAR_COLLECTOR.shape).length;
    if (
      starCount >= ACHIEVEMENTS.STAR_COLLECTOR.threshold &&
      !newAchievements.includes(ACHIEVEMENTS.STAR_COLLECTOR.id)
    ) {
      newAchievements.push(ACHIEVEMENTS.STAR_COLLECTOR.id);
    }

    if (newAchievements.length !== achievements.length) {
      set({ achievements: newAchievements });
    }
  },

  addScore: (points) => set((s) => ({ score: s.score + points })),

  // ── Canvas element ───────────────────────────────────────────────────────────
  setCanvasElement: (el) => set({ canvasEl: el }),

  // ── Drag and Drop ────────────────────────────────────────────────────────────
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
      blocks: s.blocks.map((b) => b.id === dragState.draggedBlock!.id ? { ...b, ...pos } : b),
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
      blocks: s.blocks.map((b) => b.id === dragState.draggedBlock!.id ? { ...b, ...pos } : b),
    }));
  },

  handleMouseUp: () => {
    const { dragState, blocks } = get();
    if (dragState.isDragging && dragState.draggedBlock) {
      get().addToHistory(blocks);
    }
    set({
      dragState: { isDragging: false, dragOffset: { x: 0, y: 0 }, draggedBlock: null },
    });
  },

  handleTouchEnd: () => get().handleMouseUp(),
}));

// ─── Private helpers ──────────────────────────────────────────────────────────
function calcDragPosition(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  dragOffset: { x: number; y: number },
  showGrid: boolean
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

// ─── Selectors ────────────────────────────────────────────────────────────────
export const BUILDING_COLORS = COLORS;
export const BUILDING_SHAPES = SHAPES;
