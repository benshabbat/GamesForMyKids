// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';

const { saveMock } = vi.hoisted(() => ({ saveMock: vi.fn() }));

vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResultRef: { current: saveMock } }),
}));
vi.mock('@/hooks/shared/audio/useGameAudio', () => ({ useGameAudio: () => {} }));

import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import { usePuzzleSetup } from '@/app/games/puzzles/usePuzzleSetup';
import PuzzleStats from '@/app/games/puzzles/shared/PuzzleStats';

// Mirrors CustomGameArea: the stats panel (and its completion banner) is mounted
// twice — once for the mobile layout and once for the desktop layout.
function CustomLayoutHarness() {
  usePuzzleSetup();
  return (
    <>
      <div className="xl:hidden"><PuzzleStats /></div>
      <div className="hidden xl:grid"><PuzzleStats /></div>
    </>
  );
}

const store = usePuzzleStore;

beforeEach(() => {
  saveMock.mockClear();
  store.setState({
    gameStarted: false,
    isCompleted: false,
    difficulty: 4,
    timer: 55,
    score: 321,
    placedPieces: [],
  } as unknown as Parameters<typeof store.setState>[0]);
});

afterEach(() => {
  store.setState({ isCompleted: false } as unknown as Parameters<typeof store.setState>[0]);
});

describe('puzzle completion save', () => {
  it('does not save while the puzzle is unsolved', () => {
    render(<CustomLayoutHarness />);
    expect(saveMock).not.toHaveBeenCalled();
  });

  it('saves the result exactly once even though the banner is mounted twice', () => {
    render(<CustomLayoutHarness />);

    act(() => {
      store.setState({ isCompleted: true } as unknown as Parameters<typeof store.setState>[0]);
    });

    expect(screen.getAllByText('הפאזל הושלם!')).toHaveLength(2);
    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledWith({ score: 321, level: 1, durationSeconds: 55 });
  });

  it('saves again when the next puzzle is solved', () => {
    render(<CustomLayoutHarness />);

    act(() => {
      store.setState({ isCompleted: true } as unknown as Parameters<typeof store.setState>[0]);
    });
    act(() => {
      store.setState({ isCompleted: false } as unknown as Parameters<typeof store.setState>[0]);
    });
    act(() => {
      store.setState({ isCompleted: true, score: 400, timer: 70 } as unknown as Parameters<typeof store.setState>[0]);
    });

    expect(saveMock).toHaveBeenCalledTimes(2);
    expect(saveMock).toHaveBeenLastCalledWith({ score: 400, level: 1, durationSeconds: 70 });
  });
});
