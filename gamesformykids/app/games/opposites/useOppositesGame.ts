'use client';
import { useState, useCallback } from 'react';
import { OPPOSITE_WORDS, OppositeWord, QUESTIONS_PER_GAME } from './data/words';

type Phase = 'menu' | 'playing' | 'result';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useOppositesGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [questions, setQuestions] = useState<OppositeWord[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const startGame = useCallback(() => {
    const qs = shuffle(OPPOSITE_WORDS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(false);
    setPhase('playing');
  }, []);

  const current = questions[index] ?? null;
  const choices: string[] = current
    ? shuffle([current.opposite, ...current.wrongOptions])
    : [];

  const selectAnswer = useCallback((word: string) => {
    if (!current || selected !== null) return;
    const correct = word === current.opposite;
    setSelected(word);
    setIsCorrect(correct);
    if (correct) setScore(s => s + 10);
  }, [current, selected]);

  const next = useCallback(() => {
    if (index < questions.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
      setIsCorrect(false);
    } else {
      setPhase('result');
    }
  }, [index, questions.length]);

  const goMenu = useCallback(() => { setPhase('menu'); setSelected(null); }, []);
  const restart = useCallback(() => startGame(), [startGame]);

  return {
    phase, index, score, selected, isCorrect, current, choices,
    total: questions.length, correctCount: Math.round(score / 10),
    startGame, selectAnswer, next, goMenu, restart,
  };
}
