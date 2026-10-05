// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import KidsSongsClient from '@/app/games/kids-songs/KidsSongsClient';
import { useKidsSongsStore } from '@/app/games/kids-songs/kidsSongsStore';
import { SONGS } from '@/app/games/kids-songs/data/songs';

// The result card pulls in celebration/speech effects that jsdom cannot run.
vi.mock('@/components/game/shared/GameResultCard', () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));

const song = SONGS[0]!;

function answer(optionText: string) {
  fireEvent.click(screen.getByRole('button', { name: optionText }));
  fireEvent.click(screen.getByRole('button', { name: 'אישור' }));
  act(() => { vi.advanceTimersByTime(1600); });
}

describe('kids-songs quiz', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useKidsSongsStore.setState({
      phase: 'quiz', currentSong: song, currentQuestionIdx: 0, answers: [null, null], score: 0,
    });
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('shows question 2 as a fresh, answerable question after answering question 1', () => {
    render(<KidsSongsClient />);
    answer(song.questions[0].options[0]);

    expect(screen.getByText(song.questions[1].question)).toBeTruthy();
    const confirm = screen.getByRole('button', { name: 'אישור' }) as HTMLButtonElement;
    expect(confirm.disabled).toBe(true); // nothing selected yet, so it is not stuck in the submitted state

    answer(song.questions[1].options[0]);
    expect(useKidsSongsStore.getState().phase).toBe('result');
  });

  it('scores by the option text even though the buttons are shuffled', () => {
    render(<KidsSongsClient />);
    answer(song.questions[0].options[0]); // correct answer of question 1
    answer(song.questions[1].options[1]); // a wrong answer of question 2
    expect(useKidsSongsStore.getState().score).toBe(1);
  });

  it('does not always put the correct answer first', () => {
    const firstButtons = new Set<string | null>();
    for (let i = 0; i < 40; i++) {
      const { unmount } = render(<KidsSongsClient />);
      const options = new Set<string>(song.questions[0].options);
      const first = screen.getAllByRole('button').find((b) => options.has(b.textContent ?? ''));
      firstButtons.add(first?.textContent ?? null);
      unmount();
    }
    expect(firstButtons.size).toBeGreaterThan(1);
  });
});
