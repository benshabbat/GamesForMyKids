'use client';
import { useState, useCallback } from 'react';
import { CLOCK_QUESTIONS, ClockQuestion, QUESTIONS_PER_GAME } from './data/times';

type Phase = 'menu' | 'playing' | 'result';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeChoices(correct: ClockQuestion, all: ClockQuestion[]): ClockQuestion[] {
  const others = shuffle(all.filter(q => q.id !== correct.id)).slice(0, 3);
  return shuffle([correct, ...others]);
}

export function useClockGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [questions, setQuestions] = useState<ClockQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null); // selected question id
  const [isCorrect, setIsCorrect] = useState(false);

  const startGame = useCallback(() => {
    const qs = shuffle(CLOCK_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(false);
    setPhase('playing');
  }, []);

  const current = questions[index] ?? null;
  const choices = current ? makeChoices(current, CLOCK_QUESTIONS) : [];

  const selectAnswer = useCallback((qId: number) => {
    if (!current || selected !== null) return;
    const correct = qId === current.id;
    setSelected(qId);
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
    phase, index, score, selected, isCorrect, current,
    choices, total: questions.length,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
