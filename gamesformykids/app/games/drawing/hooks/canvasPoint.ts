/**
 * Maps a pointer position (client/CSS pixels) to the canvas's logical drawing
 * coordinates. The canvas is stretched by CSS (`w-full`) and has a border, so the
 * drawable area is the border-box rect minus the border, scaled to the logical size
 * (the intrinsic size before DPR scaling — the context is pre-scaled by the DPR).
 */
export interface CanvasRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function clientToCanvasPoint(
  client: { x: number; y: number },
  rect: CanvasRect,
  border: { x: number; y: number },
  logical: { width: number; height: number },
): { x: number; y: number } {
  const innerWidth = rect.width - 2 * border.x;
  const innerHeight = rect.height - 2 * border.y;
  if (innerWidth <= 0 || innerHeight <= 0) return { x: 0, y: 0 };
  return {
    x: (client.x - rect.left - border.x) * (logical.width / innerWidth),
    y: (client.y - rect.top - border.y) * (logical.height / innerHeight),
  };
}
