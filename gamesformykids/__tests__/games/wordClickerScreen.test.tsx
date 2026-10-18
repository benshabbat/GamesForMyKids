// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import WordClickerScreen from '@/app/games/word-clicker/components/WordClickerScreen';
import { useWordClickerStore, WORD_PRONUNCIATIONS } from '@/app/games/word-clicker/wordClickerStore';

const { speakHebrew } = vi.hoisted(() => ({ speakHebrew: vi.fn(async () => true) }));
vi.mock('@/lib/utils/speech/speaker', () => ({ speakHebrew }));

function tilesFor(word: string) {
  return word.split('').map((letter, i) => ({
    id: `w-${i}-${letter}`, letter, x: 0, y: 0, isCorrectNext: i === 0, shaking: false,
  }));
}

describe('WordClickerScreen', () => {
  beforeEach(() => {
    speakHebrew.mockClear();
    useWordClickerStore.getState().reset();
    useWordClickerStore.getState().startGame();
    // Make the first word deterministic.
    useWordClickerStore.setState({
      words: ['כלב'], wordIndex: 0, currentLetterIndex: 0, floatingLetters: tilesFor('כלב'),
    });
  });
  afterEach(cleanup);

  it('lays the built letters out in reading order for RTL (first letter on the right)', () => {
    const { container } = render(<WordClickerScreen />);
    const row = container.querySelector('span.w-8')!.parentElement!;
    // In an RTL flex row the first child is on the right, so DOM order is reading order and
    // flex-row-reverse would show the word as "בלכ".
    expect(Array.from(row.children).map((c) => c.textContent).join('')).toBe('כלב');
    expect(row.className).not.toContain('flex-row-reverse');
  });

  it('speaks the word (with niqqud) once it has been built, and only once', () => {
    render(<WordClickerScreen />);
    expect(speakHebrew).not.toHaveBeenCalled();

    for (const letter of ['כ', 'ל', 'ב']) {
      fireEvent.click(screen.getByRole('button', { name: letter }));
    }
    fireEvent.click(screen.getByRole('button', { name: 'ב' })); // impatient extra tap

    expect(useWordClickerStore.getState().score).toBe(1);
    expect(speakHebrew).toHaveBeenCalledTimes(1);
    expect(speakHebrew).toHaveBeenCalledWith(WORD_PRONUNCIATIONS['כלב']);
  });
});
