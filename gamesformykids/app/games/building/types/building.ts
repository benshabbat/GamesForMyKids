/**
 * ===============================================
 * Building Context Types
 * ===============================================
 */

import { ReactNode } from 'react';
import { Block, ShapeType, ToolType, Particle } from '@/app/games/building/types';

/**
 * Building Context Type
 */
export interface BuildingContextType {
  // Game state
  isPlaying: boolean;
  startGame: () => void;
  
  // State
  blocks: Block[];
  selectedBlock: Block | null;
  particles: Particle[];
  achievements: string[];
  score: number;
  history: Block[][];
  historyIndex: number;
  
  // Settings
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  selectedTool: ToolType;
  setSelectedTool: (tool: ToolType) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: number;
  setSelectedSize: (size: number) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  animationMode: boolean;
  setAnimationMode: (mode: boolean) => void;
  
  // Constants
  COLORS: readonly string[];
  SHAPES: readonly ShapeType[];
  
  // Actions
  createBlock: (shape: ShapeType) => void;
  handleDoubleClick: (block: Block) => void;
  handleBlockClick: (block: Block) => void;
  handleRotate: (block: Block) => void;
  updateSelectedBlockSize: (size: number) => void;
  clearAll: () => void;
  magicShuffle: () => void;
  saveCreation: () => void;
  undo: () => void;
  redo: () => void;
  handleColorSelect: (color: string) => void;
  handleToolSelect: (tool: ToolType) => void;
  handleSizeChange: (size: number) => void;
  
  // Drag and Drop
  canvasRef: React.RefObject<HTMLDivElement | null>;
  handleMouseDown: (e: React.MouseEvent, block: Block) => void;
  handleTouchStart: (e: React.TouchEvent, block: Block) => void;
  handleMouseMove?: (e: React.MouseEvent) => void;
  handleMouseUp?: (e: React.MouseEvent) => void;
  handleTouchMove?: (e: React.TouchEvent) => void;
  handleTouchEnd?: (e: React.TouchEvent) => void;
  deselectBlock: () => void;
}

/**
 * Props עבור Building Provider
 */
export interface BuildingProviderProps {
  children: ReactNode;
}
