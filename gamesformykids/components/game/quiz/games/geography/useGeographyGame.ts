'use client';
import { useState, useCallback } from 'react';
import { COUNTRIES, QUESTIONS_PER_GAME, type Country, type QuestionMode } from './data/countries';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';

export interface GeoQuestion {
  country: Country;
  mode: QuestionMode;
  choices: Country[];
}

function buildQuestion(pool: Country[], mode: QuestionMode): GeoQuestion {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const country = shuffled[0];
  const distractors = shuffled.slice(1, 4);
  const choices = [country, ...distractors].sort(() => Math.random() - 0.5);
  return { country, mode, choices };
}

export function useGeographyGame() {
  // ── Shared quiz session state (Zustand) ───────────────────
  const phase    = useQuizGameStore(s => s.phase);
  const index    = useQuizGameStore(s => s.index);
  const selected = useQuizGameStore(s => s.selected);
  const { startQuiz, selectAnswer: storeSelectAnswer } = useQuizGameStore();

  // ── Local state ───────────────────────────────────────────
  const [questions, setQuestions] = useState<GeoQuestion[]>([]);
  const [mode, setMode] = useState<QuestionMode>('capital');
  const current = questions[index] ?? null;

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback((m: QuestionMode = 'capital') => {
    const pool = [...COUNTRIES].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_GAME + 4);
    const qs: GeoQuestion[] = [];
    for (let i = 0; i < QUESTIONS_PER_GAME; i++) {
      const slice = pool.slice(i);
      if (slice.length < 4) break;
      qs.push(buildQuestion(slice, m));
    }
    setMode(m);
    setQuestions(qs);
    startQuiz('geography', qs.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((id: string) => {
    if (selected || !current) return;
    storeSelectAnswer(id, id === current.country.id);
  }, [selected, current, storeSelectAnswer]);

  const restart = useCallback(() => startGame(mode), [mode, startGame]);

  return { phase, current, startGame, selectAnswer, restart };
}
