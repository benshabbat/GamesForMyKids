'use client';

import { useState, useCallback } from 'react';
import { RIDDLES, QUESTIONS_PER_GAME, type Riddle } from './data/riddles';

type Phase = 'menu' | 'playing' | 'result';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeChoices(correct: Riddle): string[] {
  return shuffle([correct.answer, ...correct.wrongOptions]);
}

export function useRiddlesGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [questions, setQuestions] = useState<Riddle[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const current = questions[index] ?? null;
  const choices = current ? makeChoices(current) : [];
  const total = questions.length;
  const correctCount = Math.round(score / 10);

  const startGame = useCallback(() => {
    const q = shuffle(RIDDLES).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(null);
    setPhase('playing');
  }, []);

  const selectAnswer = useCallback((answer: string) => {
    if (selected !== null || !current) return;
    const correct = answer === current.answer;
    setSelected(answer);
    setIsCorrect(correct);
    if (correct) setScore(s => s + 10);
  }, [selected, current]);

  const next = useCallback(() => {
    if (index + 1 >= total) {
      setPhase('result');
    } else {
      setIndex(i => i + 1);
      setSelected(null);
      setIsCorrect(null);
    }
  }, [index, total]);

  const goMenu = useCallback(() => setPhase('menu'), []);
  const restart = useCallback(() => { goMenu(); startGame(); }, [goMenu, startGame]);

  return { phase, index, score, selected, isCorrect, current, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart };
}
