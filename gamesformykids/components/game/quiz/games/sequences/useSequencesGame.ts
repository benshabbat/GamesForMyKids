'use client';
import { useState, useCallback, useMemo } from 'react';
import { SEQUENCE_QUESTIONS, SequenceQuestion, LEVELS, SequenceLevel, QUESTIONS_PER_GAME } from './data/sequences';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';


export function useSequencesGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<SequenceQuestion>('sequences');
  const [level, setLevel] = useState<SequenceLevel>(LEVELS[0]);

  const choices = useMemo<number[]>(
    () => (current ? shuffle([current.next, ...current.wrong]) : []),
    [current],
  );

  const startGame = useCallback((lv: SequenceLevel) => {
    const pool = SEQUENCE_QUESTIONS.filter(q => lv.ids.includes(q.id));
    setLevel(lv);
    begin(shuffle(pool).slice(0, QUESTIONS_PER_GAME));
  }, [begin]);

  const selectAnswer = useCallback((n: number) => {
    answer(String(n), n === current?.next);
  }, [answer, current]);

  const restart = useCallback(() => {
    const pool = SEQUENCE_QUESTIONS.filter(q => level.ids.includes(q.id));
    reset(shuffle(pool).slice(0, QUESTIONS_PER_GAME));
  }, [level, reset]);

  return { phase, level, levels: LEVELS, current, choices, startGame, selectAnswer, restart };
}
