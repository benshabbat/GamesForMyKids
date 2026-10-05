// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

vi.mock('@/lib/utils/speech/enhancedSpeechUtils', () => ({ speakHebrew: vi.fn() }));

import { useWordMaze } from '@/app/games/word-maze/useWordMaze';
import { MAZE_WORDS } from '@/lib/constants/wordMazeWords';

const wordsOf = (level: keyof typeof MAZE_WORDS): readonly string[] => MAZE_WORDS[level];

describe('useWordMaze level memory', () => {
  it('starts on easy before any level is picked', () => {
    const { result } = renderHook(() => useWordMaze());
    expect(result.current.level).toBe('easy');
  });

  it('remembers the level picked from the menu', () => {
    const { result } = renderHook(() => useWordMaze());
    act(() => result.current.startGame('hard'));

    expect(result.current.level).toBe('hard');
    expect(wordsOf('hard')).toContain(result.current.targetWord);
  });

  it('restart ("שוב!") replays the same level', () => {
    const { result } = renderHook(() => useWordMaze());
    act(() => result.current.startGame('hard'));

    // Several restarts so a wrong-level word would be caught despite the random pick.
    Array.from({ length: 10 }).forEach(() => {
      act(() => result.current.restart());
      expect(result.current.level).toBe('hard');
      expect(wordsOf('hard')).toContain(result.current.targetWord);
    });
  });

  it('nextLevel ("הבא!") advances from the chosen level: medium -> hard -> easy', () => {
    const { result } = renderHook(() => useWordMaze());
    act(() => result.current.startGame('medium'));

    act(() => result.current.nextLevel());
    expect(result.current.level).toBe('hard');
    expect(wordsOf('hard')).toContain(result.current.targetWord);

    act(() => result.current.nextLevel());
    expect(result.current.level).toBe('easy');
    expect(wordsOf('easy')).toContain(result.current.targetWord);
  });

  it('keeps the chosen level after returning to the menu and starting without one', () => {
    const { result } = renderHook(() => useWordMaze());
    act(() => result.current.startGame('medium'));
    act(() => result.current.backToMenu());
    act(() => result.current.startGame());

    expect(result.current.level).toBe('medium');
    expect(wordsOf('medium')).toContain(result.current.targetWord);
  });
});
