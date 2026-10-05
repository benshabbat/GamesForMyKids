// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render } from '@testing-library/react';

const { saveMock, soundMock } = vi.hoisted(() => ({ saveMock: vi.fn(), soundMock: vi.fn() }));

vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResultRef: { current: saveMock } }),
}));
vi.mock('@/hooks/shared/auth/useAuth', () => ({
  useAuth: () => ({ user: { id: 'test-user' } }),
}));
vi.mock('@/components/game/universal/navigation/useUniversalGameNavigation', () => ({
  useUniversalGameNavigation: () => ({ navigation: { next: null, prev: null } }),
}));
vi.mock('@/lib/utils/game/gameUtils', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/utils/game/gameUtils')>()),
  playMemorySuccessSound: soundMock,
}));

import { useMemoryStore } from '@/app/games/memory/stores/useMemoryStore';
import { initialState } from '@/app/games/memory/stores/memoryStoreTypes';
import { useMemoryGameContent } from '@/app/games/memory/useMemoryGameContent';
import GameWinMessage from '@/app/games/memory/components/GameWinMessage';
import { MEMORY_GAME_CONSTANTS } from '@/lib/constants';

const store = useMemoryStore;

// Mirrors MemoryClient: the side-effects hook is always mounted, the win screen
// appears once the phase flips to 'won'.
function Harness() {
  useMemoryGameContent();
  const phase = useMemoryStore(s => s.phase);
  return phase === 'won' ? <GameWinMessage /> : null;
}

function settleFlip() {
  act(() => {
    vi.advanceTimersByTime(MEMORY_GAME_CONSTANTS.FLIP_DURATION);
  });
}

function flipMatchingPair() {
  const { cards } = store.getState();
  const unmatched = cards.map((card, index) => ({ card, index })).filter(({ card }) => !card.isMatched);
  const first = unmatched[0]!;
  const second = unmatched.find(
    ({ card, index }) => index !== first.index && card.animal.name === first.card.animal.name,
  )!;
  act(() => {
    store.getState().handleCardClick(first.index);
    store.getState().handleCardClick(second.index);
  });
  settleFlip();
}

function flipMismatchedPair() {
  const { cards } = store.getState();
  const unmatched = cards.map((card, index) => ({ card, index })).filter(({ card }) => !card.isMatched);
  const first = unmatched[0]!;
  const second = unmatched.find(({ card }) => card.animal.name !== first.card.animal.name)!;
  act(() => {
    store.getState().handleCardClick(first.index);
    store.getState().handleCardClick(second.index);
  });
  settleFlip();
}

beforeEach(() => {
  vi.useFakeTimers();
  saveMock.mockClear();
  soundMock.mockClear();
  store.setState({ ...initialState });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('memory success sound', () => {
  it('plays on every match, including back-to-back matches', () => {
    render(<Harness />);
    act(() => store.getState().initializeGame('hard'));

    flipMatchingPair();
    expect(soundMock).toHaveBeenCalledTimes(1);

    flipMatchingPair();
    expect(soundMock).toHaveBeenCalledTimes(2);

    flipMatchingPair();
    expect(soundMock).toHaveBeenCalledTimes(3);
  });

  it('stays silent on a mismatch', () => {
    render(<Harness />);
    act(() => store.getState().initializeGame('hard'));

    flipMismatchedPair();
    expect(soundMock).not.toHaveBeenCalled();
  });

  it('does not play when a new game starts, and plays on its first match', () => {
    render(<Harness />);
    act(() => store.getState().initializeGame('easy'));
    flipMatchingPair();
    expect(soundMock).toHaveBeenCalledTimes(1);

    act(() => store.getState().initializeGame('easy'));
    expect(soundMock).toHaveBeenCalledTimes(1);

    flipMatchingPair();
    expect(soundMock).toHaveBeenCalledTimes(2);
  });
});

describe('memory win result', () => {
  it('saves the result exactly once per win', () => {
    render(<Harness />);
    act(() => store.getState().initializeGame('easy'));

    Array.from({ length: 4 }).forEach(() => flipMatchingPair());
    expect(store.getState().phase).toBe('won');

    // Let any further effects/timers run, a second save would show up here.
    settleFlip();
    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledWith(expect.objectContaining({ score: 1000, level: 1 }));
  });

  it.each([
    ['easy', 1, 4],
    ['medium', 2, 6],
    ['hard', 3, 8],
  ] as const)('reports level for %s as %i', (difficulty, level, pairs) => {
    render(<Harness />);
    act(() => store.getState().initializeGame(difficulty));

    Array.from({ length: pairs }).forEach(() => flipMatchingPair());

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledWith(expect.objectContaining({ level }));
  });
});
