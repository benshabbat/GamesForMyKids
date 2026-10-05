// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';

// The PostCSS/Tailwind pipeline is not available under Vitest; class names are irrelevant here.
vi.mock('@/app/games/drawing/drawing.module.css', () => ({ default: {} }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ back: vi.fn(), push: vi.fn() }) }));

import DrawingGameClient from '@/app/games/drawing/components/DrawingGameClient';
import { useDrawingStore } from '@/app/games/drawing/store/drawingStore';

const store = useDrawingStore;
const INITIAL = store.getState();

beforeEach(() => {
  vi.useFakeTimers();
  // jsdom has no canvas implementation; the drawing hook only needs getContext not to throw.
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
  store.setState(INITIAL, true);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('DrawingGameClient countdown', () => {
  it('counts down one second per second, however many components are on screen', () => {
    render(<DrawingGameClient />);
    act(() => { store.getState().startGame(300); });

    act(() => { vi.advanceTimersByTime(5000); });

    expect(store.getState().timeRemaining).toBe(295);
  });

  it('keeps a single countdown interval running while drawing', () => {
    render(<DrawingGameClient />);
    act(() => { store.getState().startGame(300); });

    expect(vi.getTimerCount()).toBe(1);
  });

  it('shares the touch layout flag with the canvas through the store', () => {
    Object.defineProperty(window, 'innerWidth', { value: 500, configurable: true });
    const { container } = render(<DrawingGameClient />);
    act(() => { store.getState().startGame(300); });

    expect(store.getState().isMobileDevice).toBe(true);
    const canvas = container.querySelector('canvas')!;
    expect(canvas.getAttribute('width')).toBe('600');
    expect(canvas.getAttribute('height')).toBe('400');
  });
});
