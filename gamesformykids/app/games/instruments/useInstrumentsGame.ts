'use client';

import { useState, useCallback } from 'react';
import { INSTRUMENTS, QUESTIONS_PER_GAME, type InstrumentQuestion } from './data/instruments';

import type { PhaseResult as Phase } from '@/lib/types';
import { shuffle } from '@/lib/utils';


function makeChoices(correct: InstrumentQuestion): string[] {
  return shuffle([correct.instrument, ...correct.wrongInstruments]);
}

export function useInstrumentsGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [questions, setQuestions] = useState<InstrumentQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const current = questions[index] ?? null;
  const choices = current ? makeChoices(current) : [];
  const total = questions.length;
  const correctCount = Math.round(score / 10);

  const startGame = useCallback(() => {
    const q = shuffle(INSTRUMENTS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(null);
    setPhase('playing');
  }, []);

  const selectAnswer = useCallback((name: string) => {
    if (selected !== null || !current) return;
    const correct = name === current.instrument;
    setSelected(name);
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
