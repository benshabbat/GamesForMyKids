'use client';

import { useState, useCallback } from 'react';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';

interface Config<Category extends string, Q extends { correctIndex: number; answers: unknown[] }> {
  questions: Q[];
  gameType: string;
  questionsPerGame: number;
  categories: readonly Category[];
  allCategory: Category;
  getCategoryOf: (q: Q) => string;
  /** Multiplied into the returned score (default: 10) */
  scoreMultiplier?: number;
}

export function createCategoryIndexQuizHook<
  Category extends string,
  Q extends { correctIndex: number; answers: unknown[] }
>(config: Config<Category, Q>) {
  return function useHook() {
    const phase    = useQuizGameStore(s => s.phase);
    const index    = useQuizGameStore(s => s.index);
    const selected = useQuizGameStore(s => s.selected);
    const { startQuiz, selectAnswer: storeSelectAnswer, restartQuiz } = useQuizGameStore();

    const [questions, setQuestions] = useState<Q[]>([]);
    const [category, setCategory]   = useState<Category>(config.allCategory);

    const current      = questions[index] ?? null;
    const choices      = current ? current.answers.map((_, i) => String(i)) : [];
    const correctLabel = current ? String(current.correctIndex) : '';

    const startGame = useCallback((cat: Category = config.allCategory) => {
      const pool = cat === config.allCategory
        ? config.questions
        : config.questions.filter(q => config.getCategoryOf(q) === cat);
      const q = shuffle(pool).slice(0, config.questionsPerGame);
      setCategory(cat);
      setQuestions(q);
      startQuiz(config.gameType, q.length);
    }, [startQuiz]);

    const selectAnswer = useCallback((idxStr: string) => {
      const idx = Number(idxStr);
      if (selected !== null || !current) return;
      storeSelectAnswer(idxStr, idx === current.correctIndex);
    }, [selected, current, storeSelectAnswer]);

    const restart = useCallback(() => {
      const pool = category === config.allCategory
        ? config.questions
        : config.questions.filter(q => config.getCategoryOf(q) === category);
      const q = shuffle(pool).slice(0, config.questionsPerGame);
      setQuestions(q);
      restartQuiz();
    }, [category, restartQuiz]);

    return {
      phase,
      category,
      categories: config.categories,
      current,
      choices,
      correctLabel,
      startGame,
      selectAnswer,
      restart,
    };
  };
}
