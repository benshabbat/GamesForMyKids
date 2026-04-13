'use client';
import { useState, useCallback } from 'react';
import { COLOR_MIXES, QUESTIONS_PER_GAME, ColorMix } from './data/mixes';
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
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, goToMenu, restartQuiz } = useQuizGameStore();

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

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const goMenu  = useCallback(() => goToMenu(), [goToMenu]);
  const restart = useCallback(() => {
    const shuffled = [...COLOR_MIXES].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_GAME);
    const q = shuffled.map(buildQuestion);
    setQuestions(q);
    restartQuiz();
  }, [restartQuiz]);

  return {
    phase, index, score, selected, isCorrect, current,
    total: QUESTIONS_PER_GAME,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
