// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';

vi.mock('@/lib/utils/speech/enhancedSpeechUtils', () => ({ speakHebrew: vi.fn() }));
vi.mock('@/components/game/shared/GameResultCard', () => ({
  default: () => <div data-testid="result-card" />,
}));

import EscapeRoomClient from '@/app/games/escape-room/EscapeRoomClient';
import { useEscapeRoomStore } from '@/app/games/escape-room/escapeRoomStore';
import { ROOMS } from '@/app/games/escape-room/components/puzzleData';

const store = useEscapeRoomStore;
const bedroom = ROOMS.find(r => r.id === 'bedroom')!;
const puzzleIds = bedroom.hotspots.filter(h => h.puzzle !== null).map(h => h.id);

function openPuzzle(hotspotId: string) {
  act(() => store.getState().clickHotspot(hotspotId));
}

function clickChoice(text: string) {
  fireEvent.click(screen.getByRole('button', { name: text }));
}

function clickCorrectChoice() {
  clickChoice(store.getState().activePuzzle!.puzzle.answer);
}

// Solves a puzzle through the store alone (no overlay), as if the player finished it.
function solveViaStore(hotspotId: string) {
  act(() => {
    store.getState().clickHotspot(hotspotId);
    store.getState().submitAnswer(store.getState().activePuzzle!.puzzle.answer);
    store.getState().dismissOverlay();
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  store.getState().resetGame();
  store.getState().startGame('bedroom');
});

afterEach(() => {
  vi.useRealTimers();
});

describe('escape room puzzle feedback', () => {
  it('shows the success message after a correct answer, then closes the overlay', () => {
    render(<EscapeRoomClient />);
    openPuzzle('bookshelf');
    clickCorrectChoice();

    expect(screen.getByText(/ספרה ראשונה: 7/)).toBeTruthy();
    expect(store.getState().solvedIds.has('bookshelf')).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.queryByText(/ספרה ראשונה: 7/)).toBeNull();
    expect(store.getState().activePuzzle).toBeNull();
  });

  it('keeps the overlay open after a wrong answer', () => {
    render(<EscapeRoomClient />);
    openPuzzle('bookshelf');
    clickChoice(store.getState().activePuzzle!.puzzle.wrongOptions[0]);

    expect(screen.getByText(/לא נכון/)).toBeTruthy();
    expect(store.getState().activePuzzle).not.toBeNull();
    expect(store.getState().score).toBe(0);
  });

  it('lets the player close the success message early', () => {
    render(<EscapeRoomClient />);
    openPuzzle('bookshelf');
    clickCorrectChoice();

    fireEvent.click(screen.getByText('✕'));

    expect(screen.queryByText(/ספרה ראשונה: 7/)).toBeNull();
    expect(store.getState().activePuzzle).toBeNull();
    expect(store.getState().solvedIds.has('bookshelf')).toBe(true);
  });

  it('shows the last puzzle success message before the result screen', () => {
    render(<EscapeRoomClient />);
    puzzleIds.slice(0, -1).forEach(solveViaStore);

    const last = puzzleIds[puzzleIds.length - 1]!;
    openPuzzle(last);
    clickCorrectChoice();

    // All puzzles are solved, but the success message is still on screen.
    expect(store.getState().phase).toBe('result');
    expect(screen.getByText(/ספרה רביעית: 9/)).toBeTruthy();
    expect(screen.queryByTestId('result-card')).toBeNull();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByTestId('result-card')).toBeTruthy();
  });

  it('does not score the same puzzle twice while its success message is showing', () => {
    openPuzzle('bookshelf');
    const { answer } = store.getState().activePuzzle!.puzzle;

    expect(store.getState().submitAnswer(answer)).toBe(true);
    const scoreAfterFirst = store.getState().score;
    expect(store.getState().submitAnswer(answer)).toBe(false);

    expect(store.getState().score).toBe(scoreAfterFirst);
    expect(store.getState().revealedDigits).toHaveLength(1);
  });
});
