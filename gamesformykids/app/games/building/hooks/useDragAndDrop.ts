import { useState, useCallback, useRef } from 'react';
import { Block, DragState } from '../types';
import { CANVAS_CONFIG } from '../constants';

export const useDragAndDrop = (
  blocks: Block[],
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>,
  showGrid: boolean,
  addToHistory: (blocks: Block[]) => void
) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    draggedBlock: null
  });
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback((clientX: number, clientY: number, block: Block) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = clientX - rect.left - block.x;
    const offsetY = clientY - rect.top - block.y;

    setDragState({
      isDragging: true,
      dragOffset: { x: offsetX, y: offsetY },
      draggedBlock: block
    });

    // Move block to top
    setBlocks(prev => {
      const filtered = prev.filter(b => b.id !== block.id);
      return [...filtered, block];
    });
  }, [setBlocks]);

  const handleMouseDown = useCallback((e: React.MouseEvent, block: Block) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY, block);
  }, [startDrag]);

  const handleTouchStart = useCallback((e: React.TouchEvent, block: Block) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY, block);
  }, [startDrag]);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!dragState.isDragging || !dragState.draggedBlock) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newX = clientX - rect.left - dragState.dragOffset.x;
    const newY = clientY - rect.top - dragState.dragOffset.y;

    setBlocks(prev => prev.map(block =>
      block.id === dragState.draggedBlock!.id
        ? { 
            ...block, 
            x: showGrid 
              ? Math.round(Math.max(0, Math.min(newX, rect.width - CANVAS_CONFIG.BLOCK_SIZE)) / CANVAS_CONFIG.GRID_SIZE) * CANVAS_CONFIG.GRID_SIZE 
              : Math.max(0, Math.min(newX, rect.width - CANVAS_CONFIG.BLOCK_SIZE)),
            y: showGrid 
              ? Math.round(Math.max(0, Math.min(newY, rect.height - CANVAS_CONFIG.BLOCK_SIZE)) / CANVAS_CONFIG.GRID_SIZE) * CANVAS_CONFIG.GRID_SIZE 
              : Math.max(0, Math.min(newY, rect.height - CANVAS_CONFIG.BLOCK_SIZE))
          }
        : block
    ));
  }, [dragState, showGrid, setBlocks]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    updatePosition(e.clientX, e.clientY);
  }, [updatePosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  }, [updatePosition]);

  const endDrag = useCallback(() => {
    if (dragState.isDragging && dragState.draggedBlock) {
      addToHistory(blocks);
    }
    setDragState({
      isDragging: false,
      dragOffset: { x: 0, y: 0 },
      draggedBlock: null
    });
  }, [dragState, blocks, addToHistory]);

  return {
    canvasRef,
    dragState,
    handleMouseDown,
    handleTouchStart,
    handleMouseMove,
    handleTouchMove,
    handleMouseUp: endDrag,
    handleTouchEnd: endDrag
  };
};
