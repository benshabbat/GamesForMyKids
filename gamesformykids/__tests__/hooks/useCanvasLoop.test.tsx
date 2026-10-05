// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { useCanvasResize } from '@/hooks/canvas/useCanvasResize';

// ── rAF / canvas / ResizeObserver stand-ins ───────────────────────────────────

let rafCallbacks: Map<number, FrameRequestCallback>;
let nextRafId: number;
let observed: Element[];
let disconnected: number;

/** Fires every pending requestAnimationFrame callback with the given timestamp. */
function frame(now: number) {
  const pending = [...rafCallbacks.values()];
  rafCallbacks.clear();
  pending.forEach(cb => cb(now));
}

beforeEach(() => {
  rafCallbacks = new Map();
  nextRafId = 1;
  observed = [];
  disconnected = 0;

  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    const id = nextRafId++;
    rafCallbacks.set(id, cb);
    return id;
  });
  vi.stubGlobal('cancelAnimationFrame', (id: number) => { rafCallbacks.delete(id); });
  vi.stubGlobal('ResizeObserver', class {
    observe(el: Element) { observed.push(el); }
    unobserve() {}
    disconnect() { disconnected++; }
  });
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext')
    .mockImplementation(() => ({}) as unknown as CanvasRenderingContext2D);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

// ── Harnesses ─────────────────────────────────────────────────────────────────

function LoopHarness({ show, tick }: { show: boolean; tick: (ctx: CanvasRenderingContext2D, dt: number) => void }) {
  const canvasRef = useCanvasLoop(tick);
  return show ? <canvas ref={canvasRef} /> : <div />;
}

function ResizeHarness({ show }: { show: boolean }) {
  const canvasRef = useCanvasLoop(() => {});
  useCanvasResize(canvasRef);
  return show ? <canvas ref={canvasRef} /> : <div />;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('useCanvasLoop', () => {
  it('runs the loop when the canvas is rendered from the first render', () => {
    const tick = vi.fn();
    render(<LoopHarness show tick={tick} />);
    frame(16);
    frame(32);
    expect(tick).toHaveBeenCalledTimes(2);
  });

  it('starts the loop when the canvas appears after the hook has mounted (menu → playing)', () => {
    const tick = vi.fn();
    const { rerender } = render(<LoopHarness show={false} tick={tick} />);
    frame(16);
    expect(tick).not.toHaveBeenCalled();

    rerender(<LoopHarness show tick={tick} />);
    frame(32);
    frame(48);
    expect(tick).toHaveBeenCalledTimes(2);
  });

  it('stops the loop when the canvas unmounts and restarts it for a new canvas element', () => {
    const tick = vi.fn();
    const { rerender } = render(<LoopHarness show tick={tick} />);
    frame(16);
    expect(tick).toHaveBeenCalledTimes(1);

    rerender(<LoopHarness show={false} tick={tick} />);
    expect(rafCallbacks.size).toBe(0);
    frame(32);
    expect(tick).toHaveBeenCalledTimes(1);

    rerender(<LoopHarness show tick={tick} />);
    frame(48);
    expect(tick).toHaveBeenCalledTimes(2);
    // Exactly one loop is alive (no duplicated loops from re-attaching).
    expect(rafCallbacks.size).toBe(1);
  });

  it('keeps a single loop across re-renders while the same canvas stays mounted', () => {
    const tick = vi.fn();
    const { rerender } = render(<LoopHarness show tick={tick} />);
    rerender(<LoopHarness show tick={tick} />);
    rerender(<LoopHarness show tick={tick} />);
    expect(rafCallbacks.size).toBe(1);
    frame(16);
    expect(tick).toHaveBeenCalledTimes(1);
  });

  it('calls the latest tick closure without restarting the loop', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = render(<LoopHarness show tick={first} />);
    frame(16);
    rerender(<LoopHarness show tick={second} />);
    frame(32);
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('cancels the loop when the owner unmounts', () => {
    const tick = vi.fn();
    const { unmount } = render(<LoopHarness show tick={tick} />);
    expect(rafCallbacks.size).toBe(1);
    unmount();
    expect(rafCallbacks.size).toBe(0);
  });
});

describe('useCanvasResize', () => {
  it('observes the canvas once it appears and disconnects when it goes away', () => {
    const { rerender, container } = render(<ResizeHarness show={false} />);
    expect(observed).toHaveLength(0);

    rerender(<ResizeHarness show />);
    expect(observed).toEqual([container.querySelector('canvas')]);

    rerender(<ResizeHarness show={false} />);
    expect(disconnected).toBe(1);

    rerender(<ResizeHarness show />);
    expect(observed).toHaveLength(2);
  });
});
