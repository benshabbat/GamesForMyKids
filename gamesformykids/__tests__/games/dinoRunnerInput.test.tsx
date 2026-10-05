// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';

vi.mock('next/navigation', () => ({ useRouter: () => ({ back: vi.fn(), push: vi.fn() }) }));
vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResult: vi.fn(), saveGameResultRef: { current: vi.fn() } }),
}));

import DinoRunnerGame from '@/app/games/dino-runner/DinoRunnerGame';
import { useDinoRunnerStore } from '@/app/games/dino-runner/dinoRunnerStore';

const store = useDinoRunnerStore;
const INITIAL = store.getState();

beforeEach(() => {
  // jsdom has no canvas implementation; the loop only needs getContext to return nothing.
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
  store.setState(INITIAL, true);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('DinoRunnerGame canvas input', () => {
  it('starts the game on a primary pointer press', () => {
    const { container } = render(<DinoRunnerGame />);

    fireEvent.pointerDown(container.querySelector('canvas')!, { button: 0 });

    expect(store.getState().phase).toBe('playing');
  });

  it('does not react to touchstart or click, which a single tap would otherwise fire as a pair', () => {
    const { container } = render(<DinoRunnerGame />);
    const canvas = container.querySelector('canvas')!;

    fireEvent.touchStart(canvas);
    fireEvent.click(canvas);

    expect(store.getState().phase).toBe('menu');
  });

  it('ignores right and middle mouse buttons', () => {
    const { container } = render(<DinoRunnerGame />);
    const canvas = container.querySelector('canvas')!;

    fireEvent.pointerDown(canvas, { button: 2 });
    fireEvent.pointerDown(canvas, { button: 1 });

    expect(store.getState().phase).toBe('menu');
  });
});
