'use client';

import { useState, useCallback } from 'react';
import { ENGLISH_WORDS, QUESTIONS_PER_GAME, CATEGORIES, type EnglishWord, type EnglishCategory } from './data/words';

type Phase = 'menu' | 'playing' | 'result';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeChoices(correct: EnglishWord): string[] {
  return shuffle([correct.english, ...correct.wrongOptions]);
}

export function useEnglishWordsGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [questions, setQuestions] = useState<EnglishWord[]>([]);
  const [category, setCategory] = useState<EnglishCategory>('הכל');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const current = questions[index] ?? null;
  const choices = current ? makeChoices(current) : [];
  const total = questions.length;
  const correctCount = Math.round(score / 10);

  const startGame = useCallback((cat: EnglishCategory = 'הכל') => {
    const pool = cat === 'הכל' ? ENGLISH_WORDS : ENGLISH_WORDS.filter(w => w.category === cat);
    const q = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setCategory(cat);
    setQuestions(q);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(null);
    setPhase('playing');
  }, []);

  const selectAnswer = useCallback((word: string) => {
    if (selected !== null || !current) return;
    const correct = word === current.english;
    setSelected(word);
    setIsCorrect(correct);
    if (correct) setScore(s => s + 10);
  }, [selected, current]);

  const next = useCallback(() => {
    if (index + 1 >= total) {
      setPhase('result');
    } else {
      setIndex(i => i + 1);
      setSelected(null);
      setIsCorrect(null);
    }
  }, [index, total]);

  const goMenu = useCallback(() => setPhase('menu'), []);
  const restart = useCallback(() => startGame(category), [category, startGame]);

  return { phase, category, categories: CATEGORIES, index, score, selected, isCorrect, current, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart };
}
