'use client';
import { useState, useCallback } from 'react';
import { COLOR_MIXES, ColorMix } from './data/mixes';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizGameStore } from '@/lib/stores';

interface ColorMixQuestion {
  mix: ColorMix;
  choices: string[]; // result labels
}

function buildQuestion(mix: ColorMix): ColorMixQuestion {
  const pool = [mix.resultLabel, ...mix.wrongOptions.slice(0, 3)];
  const choices = pool.sort(() => Math.random() - 0.5);
  return { mix, choices };
}

export function useColorMixGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase    = useQuizGameStore(s => s.phase);
  const index    = useQuizGameStore(s => s.index);
  const selected = useQuizGameStore(s => s.selected);
  const { startQuiz, selectAnswer: storeSelectAnswer, restartQuiz } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [questions, setQuestions] = useState<ColorMixQuestion[]>([]);

  const current = questions[index] ?? null;

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback(() => {
    const shuffled = [...COLOR_MIXES].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_GAME);
    const q = shuffled.map(buildQuestion);
    setQuestions(q);
    startQuiz('color-mix', q.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((label: string) => {
    if (selected || !current) return;
    storeSelectAnswer(label, label === current.mix.resultLabel);
  }, [selected, current, storeSelectAnswer]);

  const restart = useCallback(() => {
    const shuffled = [...COLOR_MIXES].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_GAME);
    const q = shuffled.map(buildQuestion);
    setQuestions(q);
    restartQuiz();
  }, [restartQuiz]);

  return { phase, current, startGame, selectAnswer, restart };
}
