'use client';
import { useState, useCallback, useMemo } from 'react';
import { SEQUENCE_QUESTIONS, SequenceQuestion, LEVELS, SequenceLevel, QUESTIONS_PER_GAME } from './data/sequences';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


export function useSequencesGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase    = useQuizGameStore(s => s.phase);
  const index    = useQuizGameStore(s => s.index);
  const selected = useQuizGameStore(s => s.selected);
  const { startQuiz, selectAnswer: storeSelectAnswer, restartQuiz } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [level, setLevel]         = useState<SequenceLevel>(LEVELS[0]);
  const [questions, setQuestions] = useState<SequenceQuestion[]>([]);

  const current = questions[index] ?? null;
  const choices = useMemo<number[]>(
    () => (current ? shuffle([current.next, ...current.wrong]) : []),
    [current],
  );

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback((lv: SequenceLevel) => {
    const pool = SEQUENCE_QUESTIONS.filter(q => lv.ids.includes(q.id));
    const qs = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setLevel(lv);
    setQuestions(qs);
    startQuiz('sequences', qs.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((n: number) => {
    if (!current || selected !== null) return;
    storeSelectAnswer(String(n), n === current.next);
  }, [current, selected, storeSelectAnswer]);

  const restart = useCallback(() => {
    const pool = SEQUENCE_QUESTIONS.filter(q => level.ids.includes(q.id));
    const qs = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    restartQuiz();
  }, [level, restartQuiz]);

  return { phase, level, levels: LEVELS, current, choices, startGame, selectAnswer, restart };
}
