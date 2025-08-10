'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useBuildingGame } from '@/app/games/building/hooks';
import { Block, ShapeType, ToolType } from '@/app/games/building/types';

// Types
interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  size?: number;
}

interface BuildingContextType {
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

// Context
const BuildingContext = createContext<BuildingContextType | undefined>(undefined);

// Hook to use context
export const useBuildingContext = (): BuildingContextType => {
  const context = useContext(BuildingContext);
  if (!context) {
    throw new Error('useBuildingContext must be used within a BuildingProvider');
  }
  return context;
};

// Provider Component
interface BuildingProviderProps {
  children: ReactNode;
}

export const BuildingProvider: React.FC<BuildingProviderProps> = ({ children }) => {
  const game = useBuildingGame();

  const contextValue: BuildingContextType = {
    // State
    blocks: game.blocks,
    selectedBlock: game.selectedBlock,
    particles: game.particles,
    achievements: game.achievements,
    score: game.score,
    history: game.history,
    historyIndex: game.historyIndex,
    
    // Settings
    soundEnabled: game.soundEnabled,
    setSoundEnabled: game.setSoundEnabled,
    selectedTool: game.selectedTool,
    setSelectedTool: game.setSelectedTool,
    selectedColor: game.selectedColor,
    setSelectedColor: game.setSelectedColor,
    selectedSize: game.selectedSize,
    setSelectedSize: game.setSelectedSize,
    showGrid: game.showGrid,
    setShowGrid: game.setShowGrid,
    animationMode: game.animationMode,
    setAnimationMode: game.setAnimationMode,
    
    // Constants
    COLORS: game.COLORS,
    SHAPES: game.SHAPES,
    
    // Actions
    createBlock: game.createBlock,
    handleDoubleClick: game.handleDoubleClick,
    handleBlockClick: game.handleBlockClick,
    handleRotate: game.handleRotate,
    updateSelectedBlockSize: game.updateSelectedBlockSize,
    clearAll: game.clearAll,
    magicShuffle: game.magicShuffle,
    saveCreation: game.saveCreation,
    undo: game.undo,
    redo: game.redo,
    handleColorSelect: game.handleColorSelect,
    handleToolSelect: game.handleToolSelect,
    handleSizeChange: game.handleSizeChange,
    
    // Drag and Drop
    canvasRef: game.canvasRef,
    handleMouseDown: game.handleMouseDown,
    handleTouchStart: game.handleTouchStart,
    handleMouseMove: game.handleMouseMove,
    handleMouseUp: game.handleMouseUp,
    handleTouchMove: game.handleTouchMove,
    handleTouchEnd: game.handleTouchEnd,
    deselectBlock: game.deselectBlock,
  };

  return (
    <BuildingContext.Provider value={contextValue}>
      {children}
    </BuildingContext.Provider>
  );
};
