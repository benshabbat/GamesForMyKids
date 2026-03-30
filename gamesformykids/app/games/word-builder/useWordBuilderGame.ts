'use client';

import { useState, useCallback } from 'react';
import { WORD_PUZZLES, WordPuzzle, shuffleLetters } from './data/words';

export type WordPhase = 'menu' | 'playing' | 'result';

export function useWordBuilderGame() {
  const [phase, setPhase] = useState<WordPhase>('menu');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [typed, setTyped] = useState<string[]>([]);       // letters typed so far
  const [available, setAvailable] = useState<{ letter: string; used: boolean }[]>([]);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Shuffle the full list once per game
  const [puzzles] = useState<WordPuzzle[]>(() =>
    [...WORD_PUZZLES].sort(() => Math.random() - 0.5).slice(0, 10)
  );

  const current = puzzles[index];

  const loadPuzzle = useCallback((puzzle: WordPuzzle) => {
    const letters = shuffleLetters(puzzle.word);
    setAvailable(letters.map(l => ({ letter: l, used: false })));
    setTyped([]);
    setStatus('idle');
  }, []);

  const startGame = useCallback(() => {
    setIndex(0);
    setScore(0);
    setPhase('playing');
    loadPuzzle(puzzles[0]);
  }, [puzzles, loadPuzzle]);

  const pressLetter = useCallback((idx: number) => {
    if (status !== 'idle') return;
    const letter = available[idx];
    if (letter.used) return;

    const newTyped = [...typed, letter.letter];
    const newAvail = available.map((l, i) => i === idx ? { ...l, used: true } : l);
    setAvailable(newAvail);
    setTyped(newTyped);

    if (newTyped.length === current.word.length) {
      const word = newTyped.join('');
      if (word === current.word) {
        setStatus('correct');
        setScore(s => s + 1);
      } else {
        setStatus('wrong');
      }
    }
  }, [available, typed, current, status]);

  const clearTyped = useCallback(() => {
    setAvailable(available.map(l => ({ ...l, used: false })));
    setTyped([]);
    setStatus('idle');
  }, [available]);

  const next = useCallback(() => {
    if (index < puzzles.length - 1) {
      const next = index + 1;
      setIndex(next);
      loadPuzzle(puzzles[next]);
    } else {
      setPhase('result');
    }
  }, [index, puzzles, loadPuzzle]);

  const goMenu = useCallback(() => setPhase('menu'), []);
  const restart = useCallback(() => startGame(), [startGame]);

  return {
    phase, index, score, typed, available, status, current,
    total: puzzles.length,
    startGame, pressLetter, clearTyped, next, goMenu, restart,
  };
}
