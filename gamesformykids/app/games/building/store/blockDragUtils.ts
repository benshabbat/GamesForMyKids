import { CANVAS_CONFIG } from '../constants';

/**
 * Pure helper — no Zustand dependency.
 * Converts raw pointer coordinates into clamped (and optionally grid-snapped)
 * block position coordinates relative to the canvas element.
 */
export function calcDragPosition(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  dragOffset: { x: number; y: number },
  showGrid: boolean,
): { x: number; y: number } {
  const rawX = clientX - rect.left - dragOffset.x;
  const rawY = clientY - rect.top - dragOffset.y;
  const clampX = Math.max(0, Math.min(rawX, rect.width - CANVAS_CONFIG.BLOCK_SIZE));
  const clampY = Math.max(0, Math.min(rawY, rect.height - CANVAS_CONFIG.BLOCK_SIZE));
  return {
    x: showGrid ? Math.round(clampX / CANVAS_CONFIG.GRID_SIZE) * CANVAS_CONFIG.GRID_SIZE : clampX,
    y: showGrid ? Math.round(clampY / CANVAS_CONFIG.GRID_SIZE) * CANVAS_CONFIG.GRID_SIZE : clampY,
  };
}
