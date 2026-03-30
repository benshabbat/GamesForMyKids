'use client';
import { useState, useCallback } from 'react';
import { COLOR_MIXES, QUESTIONS_PER_GAME, ColorMix } from './data/mixes';

export type ColorMixPhase = 'menu' | 'playing' | 'result';

interface ColorMixQuestion {
  mix: ColorMix;
  choices: string[]; // result labels
}

function buildQuestion(mix: ColorMix): ColorMixQuestion {
  const pool = [mix.resultLabel, ...mix.wrongOptions.slice(0, 3)];
  const choices = pool.sort(() => Math.random() - 0.5);
  return { mix, choices };
}

export function useColorMixGame() {
  const [phase, setPhase] = useState<ColorMixPhase>('menu');
  const [questions, setQuestions] = useState<ColorMixQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startGame = useCallback(() => {
    const shuffled = [...COLOR_MIXES].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_GAME);
    setQuestions(shuffled.map(buildQuestion));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(null);
    setPhase('playing');
  }, []);

  const current = questions[index] ?? null;

  const selectAnswer = useCallback((label: string) => {
    if (selected || !current) return;
    const ok = label === current.mix.resultLabel;
    setSelected(label);
    setIsCorrect(ok);
    if (ok) setScore(s => s + 1);
  }, [selected, current]);

  const next = useCallback(() => {
    const n = index + 1;
    if (n >= questions.length) setPhase('result');
    else { setIndex(n); setSelected(null); setIsCorrect(null); }
  }, [index, questions.length]);

  const goMenu = useCallback(() => setPhase('menu'), []);
  const restart = useCallback(() => startGame(), [startGame]);

  return {
    phase, index, score, selected, isCorrect, current,
    total: QUESTIONS_PER_GAME,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
