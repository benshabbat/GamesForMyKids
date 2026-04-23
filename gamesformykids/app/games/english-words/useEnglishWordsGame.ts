'use client';

import { useState, useCallback, useMemo } from 'react';
import { ENGLISH_WORDS, QUESTIONS_PER_GAME, CATEGORIES, type EnglishWord, type EnglishCategory } from './data/words';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


function makeChoices(correct: EnglishWord): string[] {
  return shuffle([correct.english, ...correct.wrongOptions]);
}

export function useEnglishWordsGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, restartQuiz } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [questions, setQuestions] = useState<EnglishWord[]>([]);
  const [category, setCategory]   = useState<EnglishCategory>('הכל');

  const current = questions[index] ?? null;
  const choices = useMemo(() => (current ? makeChoices(current) : []), [current]);
  const total = questions.length;

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback((cat: EnglishCategory = 'הכל') => {
    const pool = cat === 'הכל' ? ENGLISH_WORDS : ENGLISH_WORDS.filter(w => w.category === cat);
    const q = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setCategory(cat);
    setQuestions(q);
    startQuiz('english-words', q.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((word: string) => {
    if (selected !== null || !current) return;
    storeSelectAnswer(word, word === current.english);
  }, [selected, current, storeSelectAnswer]);

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const restart = useCallback(() => {
    const pool = category === 'הכל' ? ENGLISH_WORDS : ENGLISH_WORDS.filter(w => w.category === category);
    const q = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    restartQuiz();
  }, [category, restartQuiz]);

  return {
    phase, category, categories: CATEGORIES, index, score: score * 10, selected, isCorrect, current, choices, total,
    correctCount: score,
    startGame, selectAnswer, next, restart,
  };
}
