import { Block, ToolType } from './types';

// Enhanced ID generator with prefix
export const generateBlockId = (() => {
  let id = 1;
  return () => `building-block-${id++}`;
})();

// Smart positioning to avoid overlap
export const getRandomPosition = () => {
  const padding = 50;
  const maxWidth = 400;
  const maxHeight = 300;
  
  return {
    x: Math.random() * (maxWidth - padding * 2) + padding,
    y: Math.random() * (maxHeight - padding * 2) + padding
  };
};

// Color selection logic
export const getBlockColor = (selectedTool: ToolType, selectedColor: string): string => {
  switch (selectedTool) {
    case 'rainbow':
      return `hsl(${Math.random() * 360}, 85%, 65%)`;
    case 'magic':
    case 'normal':
    default:
      return selectedColor;
  }
};

// Enhanced block properties
export const getBlockProperties = (selectedTool: ToolType) => {
  const baseProps = {
    rotation: 0,
    scale: 1,
    shadow: false,
    sparkles: false
  };

  if (selectedTool === 'magic') {
    return {
      ...baseProps,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
      shadow: true,
      sparkles: true
    };
  }

  return baseProps;
};

// Smooth rotation
export const rotateBlock = (block: Block, degrees: number = 90): Block => ({
  ...block,
  rotation: (block.rotation + degrees) % 360,
  sparkles: true
});

// Magic shuffle with enhanced effects
export const shuffleBlocks = (blocks: Block[]): Block[] => 
  blocks.map(block => ({
    ...block,
    color: `hsl(${Math.random() * 360}, 85%, 65%)`,
    rotation: Math.random() * 360,
    scale: 0.8 + Math.random() * 0.4,
    sparkles: true,
    shadow: true
  }));

// Audio feedback system
export const playSound = (soundEnabled: boolean, soundType: 'create' | 'rotate' | 'magic' = 'create') => {
  if (!soundEnabled || typeof window === 'undefined') return;
  
  // Future: implement actual sound effects
  console.log(`Playing ${soundType} sound effect`);
};
