import { Block, ToolType } from './types';

export const generateBlockId = (() => {
  let id = 1;
  return () => `block-${id++}`;
})();

export const getRandomPosition = () => ({
  x: Math.random() * 300 + 50,
  y: Math.random() * 200 + 50
});

export const getBlockColor = (selectedTool: ToolType, selectedColor: string): string => {
  switch (selectedTool) {
    case 'rainbow':
      return `hsl(${Math.random() * 360}, 80%, 60%)`;
    case 'magic':
    case 'normal':
    default:
      return selectedColor;
  }
};

export const getBlockProperties = (selectedTool: ToolType) => ({
  rotation: selectedTool === 'magic' ? Math.random() * 360 : 0,
  scale: selectedTool === 'magic' ? 0.8 + Math.random() * 0.4 : 1,
  shadow: selectedTool === 'magic',
  sparkles: selectedTool === 'magic'
});

export const rotateBlock = (block: Block, degrees: number = 90): Block => ({
  ...block,
  rotation: (block.rotation + degrees) % 360,
  sparkles: true
});

export const shuffleBlocks = (blocks: Block[]): Block[] => 
  blocks.map(block => ({
    ...block,
    color: `hsl(${Math.random() * 360}, 80%, 60%)`,
    rotation: Math.random() * 360,
    scale: 0.8 + Math.random() * 0.4,
    sparkles: true
  }));

export const playSound = (soundEnabled: boolean) => {
  if (!soundEnabled) return;
  // Sound effects implementation would go here
};
