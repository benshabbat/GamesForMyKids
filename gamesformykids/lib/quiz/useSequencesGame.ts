'use client';
import { useState, useCallback, useMemo } from 'react';
import { SEQUENCE_QUESTIONS, LEVELS, type SequenceQuestion, type SequenceLevel, SEQ_QUESTIONS_PER_GAME } from '@/lib/quiz/data/sequences';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';

export function useSequencesGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<SequenceQuestion>('sequences');
  const initialLevel = LEVELS[0];
  if (!initialLevel) {
    throw new Error('Missing sequence levels');
  }
  const [level, setLevel] = useState<SequenceLevel>(initialLevel);

  const choices = useMemo<number[]>(
    () => (current ? shuffle([current.next, ...current.wrong]) : []),
    [current],
  );

  const startGame = useCallback((lv: SequenceLevel) => {
    const pool = SEQUENCE_QUESTIONS.filter(q => lv.ids.includes(q.id));
    setLevel(lv);
    begin(shuffle(pool).slice(0, SEQ_QUESTIONS_PER_GAME));
  }, [begin]);

  const selectAnswer = useCallback((n: number) => {
    answer(String(n), n === current?.next);
  }, [answer, current]);

  const restart = useCallback(() => {
    const pool = SEQUENCE_QUESTIONS.filter(q => level.ids.includes(q.id));
    reset(shuffle(pool).slice(0, SEQ_QUESTIONS_PER_GAME));
  }, [level, reset]);

  return { phase, level, levels: LEVELS, current, choices, startGame, selectAnswer, restart };
}
