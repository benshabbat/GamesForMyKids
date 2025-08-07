export interface Block {
  id: string;
  x: number;
  y: number;
  color: string;
  shape: 'square' | 'rectangle' | 'triangle' | 'circle' | 'star' | 'heart' | 'diamond';
  rotation: number;
  scale: number;
  size: number;
  shadow: boolean;
  sparkles: boolean;
}

export interface DragState {
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  draggedBlock: Block | null;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

export type ShapeType = 'square' | 'rectangle' | 'triangle' | 'circle' | 'star' | 'heart' | 'diamond';
export type ToolType = 'normal' | 'magic' | 'rainbow';
