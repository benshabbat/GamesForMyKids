'use client';
import { useState, useCallback } from 'react';
import {
  SCIENCE_QUESTIONS, QUESTIONS_PER_GAME, ScienceQuestion, ScienceTopic,
} from './data/questions';

export type SciencePhase = 'menu' | 'playing' | 'result';

export function useScienceGame() {
  const [phase, setPhase] = useState<SciencePhase>('menu');
  const [questions, setQuestions] = useState<ScienceQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [topic, setTopic] = useState<ScienceTopic | 'all'>('all');

  const startGame = useCallback((t: ScienceTopic | 'all' = 'all') => {
    setTopic(t);
    const pool = t === 'all'
      ? SCIENCE_QUESTIONS
      : SCIENCE_QUESTIONS.filter(q => q.topic === t);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_GAME);
    setQuestions(shuffled);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(null);
    setPhase('playing');
  }, []);

  const current = questions[index] ?? null;

  const selectAnswer = useCallback((i: number) => {
    if (selected !== null || !current) return;
    const ok = i === current.correctIndex;
    setSelected(i);
    setIsCorrect(ok);
    if (ok) setScore(s => s + 1);
  }, [selected, current]);

  const next = useCallback(() => {
    const n = index + 1;
    if (n >= questions.length) setPhase('result');
    else { setIndex(n); setSelected(null); setIsCorrect(null); }
  }, [index, questions.length]);

  const goMenu = useCallback(() => setPhase('menu'), []);
  const restart = useCallback(() => startGame(topic), [startGame, topic]);

  return {
    phase, index, score, selected, isCorrect, current, topic,
    total: questions.length || QUESTIONS_PER_GAME,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
