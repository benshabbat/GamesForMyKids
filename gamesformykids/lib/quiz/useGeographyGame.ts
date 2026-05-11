'use client';
import { useState, useCallback } from 'react';
import { COUNTRIES, GEO_QUESTIONS_PER_GAME, type Country, type QuestionMode } from '@/lib/quiz/data/geography';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils/game/cardUtils';

export interface GeoQuestion {
  country: Country;
  mode: QuestionMode;
  choices: Country[];
}

function buildQuestion(pool: Country[], mode: QuestionMode): GeoQuestion {
  const shuffled = shuffle(pool);
  const country = shuffled[0];
  const choices = shuffle([country, ...shuffled.slice(1, 4)]);
  return { country, mode, choices };
}

export function useGeographyGame() {
  const { phase, current, begin, answer } = useQuizSession<GeoQuestion>('geography');
  const [mode, setMode] = useState<QuestionMode>('capital');

  const startGame = useCallback((m: QuestionMode = 'capital') => {
    const pool = shuffle([...COUNTRIES]).slice(0, GEO_QUESTIONS_PER_GAME + 4);
    const qs: GeoQuestion[] = [];
    for (let i = 0; i < GEO_QUESTIONS_PER_GAME; i++) {
      const slice = pool.slice(i);
      if (slice.length < 4) break;
      qs.push(buildQuestion(slice, m));
    }
    setMode(m);
    begin(qs);
  }, [begin]);

  const selectAnswer = useCallback((id: string) => {
    answer(id, id === current?.country.id);
  }, [answer, current]);

  const restart = useCallback(() => startGame(mode), [mode, startGame]);

  return { phase, current, startGame, selectAnswer, restart };
}
