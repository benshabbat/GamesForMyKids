'use client';

import { useState, useCallback } from 'react';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
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
    const { phase, current, begin, answer, reset } = useQuizSession<Q>(config.gameType);
    const [category, setCategory] = useState<Category>(config.allCategory);

    const choices      = current ? current.answers.map((_, i) => String(i)) : [];
    const correctLabel = current ? String(current.correctIndex) : '';

    const startGame = useCallback((cat: Category = config.allCategory) => {
      const pool = cat === config.allCategory
        ? config.questions
        : config.questions.filter(q => config.getCategoryOf(q) === cat);
      setCategory(cat);
      begin(shuffle(pool).slice(0, config.questionsPerGame));
    }, [begin]);

    const selectAnswer = useCallback((idxStr: string) => {
      if (!current) return;
      answer(idxStr, Number(idxStr) === current.correctIndex);
    }, [answer, current]);

    const restart = useCallback(() => {
      const pool = category === config.allCategory
        ? config.questions
        : config.questions.filter(q => config.getCategoryOf(q) === category);
      reset(shuffle(pool).slice(0, config.questionsPerGame));
    }, [category, reset]);

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
