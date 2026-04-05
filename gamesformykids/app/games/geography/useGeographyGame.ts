'use client';
import { useState, useCallback } from 'react';
import { COUNTRIES, QUESTIONS_PER_GAME, Country, QuestionMode } from './data/countries';

import type { PhaseResult as GeoPhase } from '@/lib/types';

interface GeoQuestion {
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
  const [phase, setPhase] = useState<GeoPhase>('menu');
  const [questions, setQuestions] = useState<GeoQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startGame = useCallback((mode: QuestionMode = 'capital') => {
    const pool = [...COUNTRIES].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_GAME + 4);
    const qs: GeoQuestion[] = [];
    for (let i = 0; i < QUESTIONS_PER_GAME; i++) {
      const slice = pool.slice(i);
      if (slice.length < 4) break;
      qs.push(buildQuestion(slice, mode));
    }
    setQuestions(qs);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(null);
    setPhase('playing');
  }, []);

  const current = questions[index] ?? null;

  const selectAnswer = useCallback((id: string) => {
    if (selected || !current) return;
    const ok = id === current.country.id;
    setSelected(id);
    setIsCorrect(ok);
    if (ok) setScore(s => s + 1);
  }, [selected, current]);

  const next = useCallback(() => {
    const n = index + 1;
    if (n >= questions.length) { setPhase('result'); }
    else { setIndex(n); setSelected(null); setIsCorrect(null); }
  }, [index, questions.length]);

  const goMenu = useCallback(() => setPhase('menu'), []);
  const restart = useCallback(() => startGame(current?.mode ?? 'capital'), [startGame, current]);

  return {
    phase, index, score, selected, isCorrect, current,
    total: QUESTIONS_PER_GAME,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
