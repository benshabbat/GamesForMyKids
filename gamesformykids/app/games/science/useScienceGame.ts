'use client';
import { useState, useCallback } from 'react';
import {
  SCIENCE_QUESTIONS, QUESTIONS_PER_GAME, ScienceQuestion, ScienceTopic,
} from './data/questions';
import { useQuizGameStore } from '@/lib/stores';

export function useScienceGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, goToMenu } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [questions, setQuestions] = useState<ScienceQuestion[]>([]);
  const [topic, setTopic]         = useState<ScienceTopic | 'all'>('all');

  const current = questions[index] ?? null;

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback((t: ScienceTopic | 'all' = 'all') => {
    setTopic(t);
    const pool = t === 'all'
      ? SCIENCE_QUESTIONS
      : SCIENCE_QUESTIONS.filter(q => q.topic === t);
    const qs = [...pool].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    startQuiz('science', qs.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((i: number) => {
    if (selected !== null || !current) return;
    storeSelectAnswer(String(i), i === current.correctIndex);
  }, [selected, current, storeSelectAnswer]);

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const goMenu  = useCallback(() => goToMenu(), [goToMenu]);
  const restart = useCallback(() => startGame(topic), [startGame, topic]);

  return {
    phase, index, score,
    selected: selected !== null ? Number(selected) : null,
    isCorrect, current, topic,
    total: questions.length || QUESTIONS_PER_GAME,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
