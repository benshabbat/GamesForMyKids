// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { useCanvasLoop, FIXED_STEP_MS } from '@/hooks/canvas/useCanvasLoop';
import { useCanvasResize } from '@/hooks/canvas/useCanvasResize';

// ── rAF / canvas / ResizeObserver stand-ins ───────────────────────────────────

let rafCallbacks: Map<number, FrameRequestCallback>;
let nextRafId: number;
let observed: Element[];
let disconnected: number;
let clock: number;

/** Fires every pending requestAnimationFrame callback with the given timestamp. */
function frame(now: number) {
  clock = now;
  const pending = [...rafCallbacks.values()];
  rafCallbacks.clear();
  pending.forEach(cb => cb(now));
}

beforeEach(() => {
  rafCallbacks = new Map();
  nextRafId = 1;
  observed = [];
  disconnected = 0;
  clock = 0;

  vi.spyOn(performance, 'now').mockImplementation(() => clock);
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

// ── Fixed 60 Hz timestep ──────────────────────────────────────────────────────

/** Runs `seconds` of animation frames at `hz` and returns the dt of every tick. */
function runDisplay(hz: number, seconds: number, jitterMs = 0): number[] {
  const dts: number[] = [];
  render(<LoopHarness show tick={(_ctx, dt) => { dts.push(dt); }} />);
  const frames = Math.round(hz * seconds);
  for (let i = 1; i <= frames; i++) {
    // Deterministic pseudo-jitter in [-jitterMs, +jitterMs]
    const jitter = jitterMs * Math.sin(i * 12.9898);
    frame((i * 1000) / hz + jitter);
  }
  return dts;
}

describe('useCanvasLoop fixed timestep', () => {
  it('ticks once per frame, with a fixed dt, on a 60 Hz display', () => {
    const dts = runDisplay(60, 10);
    expect(dts).toHaveLength(600);
    expect(dts.every(dt => dt === FIXED_STEP_MS)).toBe(true);
  });

  it('does not skip or double ticks on a 60 Hz display with frame-time jitter', () => {
    const dts = runDisplay(60, 10, 1.5);
    expect(dts).toHaveLength(600);
  });

  it.each([30, 75, 90, 120, 144, 240])('runs 60 ticks per second on a %i Hz display', (hz) => {
    const dts = runDisplay(hz, 10);
    expect(Math.abs(dts.length - 600)).toBeLessThanOrEqual(1);
    expect(dts.every(dt => dt === FIXED_STEP_MS)).toBe(true);
  });

  it('runs 60 ticks per second on a 120 Hz display with jitter', () => {
    const dts = runDisplay(120, 10, 1.5);
    expect(Math.abs(dts.length - 600)).toBeLessThanOrEqual(2);
  });

  it('never passes a negative dt when the first frame timestamp precedes the start time', () => {
    clock = 100;
    const dts: number[] = [];
    render(<LoopHarness show tick={(_ctx, dt) => { dts.push(dt); }} />);
    frame(95);
    frame(112);
    expect(dts.every(dt => dt >= 0)).toBe(true);
  });

  it('does not replay a long pause (hidden tab) as game time', () => {
    const dts: number[] = [];
    render(<LoopHarness show tick={(_ctx, dt) => { dts.push(dt); }} />);
    for (let i = 1; i <= 60; i++) frame(i * FIXED_STEP_MS);
    expect(dts).toHaveLength(60);

    frame(60 * FIXED_STEP_MS + 10_000);
    expect(dts.length - 60).toBeLessThanOrEqual(1);
  });

  it('caps catch-up after a slow frame and drops the remaining backlog', () => {
    const dts: number[] = [];
    render(<LoopHarness show tick={(_ctx, dt) => { dts.push(dt); }} />);
    let t = 0;
    for (let i = 0; i < 30; i++) { t += FIXED_STEP_MS; frame(t); }
    expect(dts).toHaveLength(30);

    t += 120; // ~7 steps behind
    frame(t);
    expect(dts).toHaveLength(34); // capped at 4 ticks for the frame

    t += FIXED_STEP_MS; // back to normal: the backlog is gone, exactly one tick
    frame(t);
    expect(dts).toHaveLength(35);
  });
});
