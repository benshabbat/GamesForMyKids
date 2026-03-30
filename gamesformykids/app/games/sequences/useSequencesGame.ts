'use client';
import { useState, useCallback } from 'react';
import { SEQUENCE_QUESTIONS, SequenceQuestion, LEVELS, SequenceLevel, QUESTIONS_PER_GAME } from './data/sequences';

type Phase = 'menu' | 'playing' | 'result';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useSequencesGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [level, setLevel] = useState<SequenceLevel>(LEVELS[0]);
  const [questions, setQuestions] = useState<SequenceQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const startGame = useCallback((lv: SequenceLevel) => {
    const pool = SEQUENCE_QUESTIONS.filter(q => lv.ids.includes(q.id));
    const qs = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setLevel(lv);
    setQuestions(qs);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(false);
    setPhase('playing');
  }, []);

  const current = questions[index] ?? null;
  const choices: number[] = current
    ? shuffle([current.next, ...current.wrong])
    : [];

  const selectAnswer = useCallback((n: number) => {
    if (!current || selected !== null) return;
    const correct = n === current.next;
    setSelected(n);
    setIsCorrect(correct);
    if (correct) setScore(s => s + 10);
  }, [current, selected]);

  const next = useCallback(() => {
    if (index < questions.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
      setIsCorrect(false);
    } else {
      setPhase('result');
    }
  }, [index, questions.length]);

  const goMenu = useCallback(() => { setPhase('menu'); setSelected(null); }, []);
  const restart = useCallback(() => startGame(level), [startGame, level]);

  return {
    phase, level, index, score, selected, isCorrect, current, choices,
    total: questions.length, levels: LEVELS,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
