'use client';

import { useState, useCallback, useMemo } from 'react';
import { EMOTION_QUESTIONS, QUESTIONS_PER_GAME, type EmotionQuestion } from './data/emotions';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


function makeChoices(q: EmotionQuestion): string[] {
  return shuffle([q.emotion, ...q.wrongOptions]);
}

export function useEmotionsGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, goToMenu, restartQuiz } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [questions, setQuestions] = useState<EmotionQuestion[]>([]);

  const current = questions[index] ?? null;
  const choices = useMemo(() => (current ? makeChoices(current) : []), [current]);
  const total = questions.length;

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback(() => {
    const q = shuffle(EMOTION_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    startQuiz('emotions', q.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((emotion: string) => {
    if (selected !== null || !current) return;
    storeSelectAnswer(emotion, emotion === current.emotion);
  }, [selected, current, storeSelectAnswer]);

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const goMenu  = useCallback(() => goToMenu(), [goToMenu]);
  const restart = useCallback(() => {
    const q = shuffle(EMOTION_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    restartQuiz();
  }, [restartQuiz]);

  return {
    phase, index, score: score * 10, selected, isCorrect, current, choices, total,
    correctCount: score,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
