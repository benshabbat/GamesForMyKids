import { useState, useCallback, useEffect } from 'react';
import { Block, ShapeType, ToolType } from '../types';
import { COLORS, SHAPES, SIZE_LIMITS } from '../constants';
import { 
  generateBlockId, 
  getRandomPosition, 
  getBlockColor, 
  getBlockProperties, 
  rotateBlock, 
  shuffleBlocks,
  playSound 
} from '../utils';
import { useHistory } from './useHistory';
import { useParticles } from './useParticles';
import { useDragAndDrop } from './useDragAndDrop';
import { useAchievements } from './useAchievements';

export const useBuildingGame = () => {
  // Core state
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  
  // Settings
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ToolType>('normal');
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [animationMode, setAnimationMode] = useState(false);

  // Custom hooks
  const { history, historyIndex, addToHistory, undo, redo } = useHistory(blocks, setBlocks);
  const { particles, setParticles, createParticles, clearParticles } = useParticles();
  const { achievements, score, checkAchievements, addScore } = useAchievements();
  const dragAndDrop = useDragAndDrop(blocks, setBlocks, showGrid, addToHistory);

  // Particle animation effect
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.5,
          life: p.life - 1,
          size: Math.max(0, p.size - 0.2)
        }))
        .filter(p => p.life > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [particles.length, setParticles]);

  // Block animation effect
  useEffect(() => {
    if (!animationMode) return;

    const interval = setInterval(() => {
      setBlocks(prev => prev.map(block => ({
        ...block,
        rotation: (block.rotation + 2) % 360
      })));
    }, 100);

    return () => clearInterval(interval);
  }, [animationMode]);

  // Block creation
  const createBlock = useCallback((shape: ShapeType) => {
    const position = getRandomPosition();
    const color = getBlockColor(selectedTool, selectedColor);
    const properties = getBlockProperties(selectedTool);
    
    const newBlock: Block = {
      id: generateBlockId(),
      ...position,
      color,
      shape,
      size: selectedSize,
      ...properties
    };

    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    addToHistory(newBlocks);
    addScore(10);
    playSound(soundEnabled);
    createParticles(newBlock.x, newBlock.y, newBlock.color);
    checkAchievements(newBlocks);
  }, [blocks, selectedTool, selectedColor, selectedSize, addToHistory, addScore, soundEnabled, createParticles, checkAchievements]);

  // Block interactions
  const handleDoubleClick = useCallback((block: Block) => {
    const rotatedBlock = rotateBlock(block);
    setBlocks(prev => prev.map(b => b.id === block.id ? rotatedBlock : b));
    createParticles(block.x, block.y, block.color);
  }, [createParticles]);

  const handleBlockClick = useCallback((block: Block) => {
    setSelectedBlock(selectedBlock?.id === block.id ? null : block);
  }, [selectedBlock]);

  const handleRotate = useCallback((block: Block) => {
    const rotatedBlock = rotateBlock(block, 45);
    setBlocks(prev => {
      const newBlocks = prev.map(b => b.id === block.id ? rotatedBlock : b);
      addToHistory(newBlocks);
      return newBlocks;
    });
    createParticles(block.x, block.y, block.color);
  }, [addToHistory, createParticles]);

  // Size management
  const updateSelectedBlockSize = useCallback((newSize: number) => {
    if (!selectedBlock) return;
    
    setBlocks(prev => {
      const newBlocks = prev.map(b => 
        b.id === selectedBlock.id ? { ...b, size: newSize } : b
      );
      addToHistory(newBlocks);
      return newBlocks;
    });
    
    setSelectedBlock(prev => prev ? { ...prev, size: newSize } : null);
  }, [selectedBlock, addToHistory]);

  // Actions
  const clearAll = useCallback(() => {
    setBlocks([]);
    addToHistory([]);
    clearParticles();
    playSound(soundEnabled);
  }, [addToHistory, clearParticles, soundEnabled]);

  const magicShuffle = useCallback(() => {
    const shuffledBlocks = shuffleBlocks(blocks);
    setBlocks(shuffledBlocks);
    playSound(soundEnabled);
    
    blocks.forEach(block => {
      createParticles(block.x, block.y, block.color);
    });
  }, [blocks, soundEnabled, createParticles]);

  const saveCreation = useCallback(() => {
    const data = {
      blocks,
      timestamp: new Date().toISOString(),
      score
    };
    console.log('Saving creation:', data);
    alert('יצירה נשמרה! 🎉');
  }, [blocks, score]);

  // Wrapper functions for components
  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const handleToolSelect = useCallback((tool: ToolType) => {
    setSelectedTool(tool);
  }, []);

  const handleSizeChange = useCallback((size: number) => {
    setSelectedSize(size);
  }, []);

  const deselectBlock = useCallback(() => {
    setSelectedBlock(null);
  }, []);

  return {
    // State
    blocks,
    selectedBlock,
    particles,
    achievements,
    score,
    history,
    historyIndex,
    
    // Settings
    soundEnabled,
    setSoundEnabled,
    selectedTool,
    setSelectedTool,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    showGrid,
    setShowGrid,
    animationMode,
    setAnimationMode,
    
    // Actions
    createBlock,
    handleDoubleClick,
    handleBlockClick,
    handleRotate,
    updateSelectedBlockSize,
    clearAll,
    magicShuffle,
    saveCreation,
    deselectBlock,
    undo,
    redo,
    handleColorSelect,
    handleToolSelect,
    handleSizeChange,
    
    // Drag and drop state and handlers
    dragState: dragAndDrop.dragState,
    handleMouseDown: dragAndDrop.handleMouseDown,
    handleMouseMove: dragAndDrop.handleMouseMove,
    handleMouseUp: dragAndDrop.handleMouseUp,
    handleTouchStart: dragAndDrop.handleTouchStart,
    handleTouchMove: dragAndDrop.handleTouchMove,
    handleTouchEnd: dragAndDrop.handleTouchEnd,
    
    // Constants
    COLORS,
    SHAPES,
    SIZE_LIMITS
  };
};
