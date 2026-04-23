'use client';
import { useState, useCallback, useMemo } from 'react';
import { LANGUAGE_QUESTIONS, LanguageQuestion, QUESTIONS_PER_GAME } from './data/languages';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


export function useWorldLanguagesGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, restartQuiz } = useQuizGameStore();

  // ── Local state ───────────────────────────────────────────
  const [questions, setQuestions] = useState<LanguageQuestion[]>([]);

  const current = questions[index] ?? null;
  const choices = useMemo<string[]>(
    () => (current ? shuffle([current.language, ...current.wrongOptions]) : []),
    [current],
  );

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback(() => {
    const qs = shuffle(LANGUAGE_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    startQuiz('world-languages', qs.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((lang: string) => {
    if (!current || selected !== null) return;
    storeSelectAnswer(lang, lang === current.language);
  }, [current, selected, storeSelectAnswer]);

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const restart = useCallback(() => {
    const qs = shuffle(LANGUAGE_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    restartQuiz();
  }, [restartQuiz]);

  return {
    phase, index, score: score * 10, selected, isCorrect: isCorrect ?? false, current, choices,
    total: questions.length,
    startGame, selectAnswer, next, restart,
  };
}
