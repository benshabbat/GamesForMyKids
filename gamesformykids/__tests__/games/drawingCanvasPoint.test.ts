import { describe, expect, it } from 'vitest';
import { clientToCanvasPoint } from '@/app/games/drawing/hooks/canvasPoint';

const NO_BORDER = { x: 0, y: 0 };

describe('clientToCanvasPoint', () => {
  it('is the identity when the canvas is displayed at its logical size', () => {
    const rect = { left: 100, top: 50, width: 800, height: 600 };
    expect(clientToCanvasPoint({ x: 300, y: 250 }, rect, NO_BORDER, { width: 800, height: 600 }))
      .toEqual({ x: 200, y: 200 });
  });

  it('scales up when CSS shrinks the canvas (800x600 logical shown at 400x300)', () => {
    const rect = { left: 0, top: 0, width: 400, height: 300 };
    expect(clientToCanvasPoint({ x: 100, y: 75 }, rect, NO_BORDER, { width: 800, height: 600 }))
      .toEqual({ x: 200, y: 150 });
  });

  it('scales down when CSS stretches the canvas', () => {
    const rect = { left: 0, top: 0, width: 1600, height: 1200 };
    expect(clientToCanvasPoint({ x: 800, y: 600 }, rect, NO_BORDER, { width: 800, height: 600 }))
      .toEqual({ x: 400, y: 300 });
  });

  it('measures from the inside of the border', () => {
    // border-4: the drawable area starts 4px in and is 8px narrower/shorter than the rect.
    const rect = { left: 10, top: 20, width: 408, height: 308 };
    const border = { x: 4, y: 4 };
    const logical = { width: 800, height: 600 };
    expect(clientToCanvasPoint({ x: 14, y: 24 }, rect, border, logical)).toEqual({ x: 0, y: 0 });
    expect(clientToCanvasPoint({ x: 414, y: 324 }, rect, border, logical)).toEqual({ x: 800, y: 600 });
    expect(clientToCanvasPoint({ x: 214, y: 174 }, rect, border, logical)).toEqual({ x: 400, y: 300 });
  });

  it('returns the origin for a degenerate (zero-size) rect instead of NaN/Infinity', () => {
    const rect = { left: 0, top: 0, width: 0, height: 0 };
    expect(clientToCanvasPoint({ x: 5, y: 5 }, rect, NO_BORDER, { width: 800, height: 600 }))
      .toEqual({ x: 0, y: 0 });
  });
});
