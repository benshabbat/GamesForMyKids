'use client';

import { useState, useCallback, useMemo } from 'react';
import { INSTRUMENTS, QUESTIONS_PER_GAME, type InstrumentQuestion } from './data/instruments';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


function makeChoices(correct: InstrumentQuestion): string[] {
  return shuffle([correct.instrument, ...correct.wrongInstruments]);
}

export function useInstrumentsGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, restartQuiz } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [questions, setQuestions] = useState<InstrumentQuestion[]>([]);

  const current = questions[index] ?? null;
  const choices = useMemo(() => (current ? makeChoices(current) : []), [current]);
  const total = questions.length;

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback(() => {
    const q = shuffle(INSTRUMENTS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    startQuiz('instruments', q.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((name: string) => {
    if (selected !== null || !current) return;
    storeSelectAnswer(name, name === current.instrument);
  }, [selected, current, storeSelectAnswer]);

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const restart = useCallback(() => {
    const q = shuffle(INSTRUMENTS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    restartQuiz();
  }, [restartQuiz]);

  return {
    phase, index, score: score * 10, selected, isCorrect, current, choices, total,
    correctCount: score,
    startGame, selectAnswer, next, restart,
  };
}
