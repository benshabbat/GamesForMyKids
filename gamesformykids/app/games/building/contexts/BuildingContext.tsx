'use client';

import { createContext, useContext } from 'react';
import { useBuildingGame } from '@/app/games/building/hooks';
import { BuildingContextType, BuildingProviderProps } from '../types/building';

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
export const BuildingProvider: React.FC<BuildingProviderProps> = ({ children }) => {
  const game = useBuildingGame();

  const contextValue: BuildingContextType = {
    // Game state
    isPlaying: game.isPlaying,
    startGame: game.startGame,
    
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
