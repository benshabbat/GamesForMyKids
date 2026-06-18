'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';
import {
  TRIVIA_CAT_QUESTIONS,
  type TriviaCatCategory,
  type TriviaCatDifficulty,
  type TriviaCatQuestion,
} from './data/trivia-categories';

const QUESTIONS_PER_GAME = 10;

export function useTriviaCategoriesGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<TriviaCatQuestion>('trivia-categories');
  const [category, setCategory] = useState<TriviaCatCategory | null>(null);
  const [difficulty, setDifficulty] = useState<TriviaCatDifficulty>('בינוני');
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const spokenIdRef = useRef<string | null>(null);

  const choices = current ? current.answers.map((_, i) => String(i)) : [];
  const correctLabel = current ? String(current.correctIndex) : '';

  const startGame = useCallback((cat: TriviaCatCategory, diff: TriviaCatDifficulty) => {
    setCategory(cat);
    setDifficulty(diff);
    setStreak(0);
    setMaxStreak(0);
    const pool = TRIVIA_CAT_QUESTIONS.filter(q => q.category === cat && q.difficulty === diff);
    begin(shuffle(pool).slice(0, QUESTIONS_PER_GAME));
  }, [begin]);

  const selectAnswer = useCallback((idxStr: string) => {
    if (!current) return;
    const correct = Number(idxStr) === current.correctIndex;
    answer(idxStr, correct);
    if (correct) {
      setStreak(s => {
        const next = s + 1;
        setMaxStreak(m => Math.max(m, next));
        return next;
      });
    } else {
      setStreak(0);
    }
  }, [current, answer]);

  const restart = useCallback(() => {
    if (!category) return;
    setStreak(0);
    setMaxStreak(0);
    const pool = TRIVIA_CAT_QUESTIONS.filter(q => q.category === category && q.difficulty === difficulty);
    reset(shuffle(pool).slice(0, QUESTIONS_PER_GAME));
  }, [category, difficulty, reset]);

  // TTS: speak question when it changes
  useEffect(() => {
    if (phase === 'playing' && current && current.id !== spokenIdRef.current) {
      spokenIdRef.current = current.id;
      speakHebrew(current.question);
    }
  }, [phase, current]);

  return {
    phase,
    current,
    choices,
    correctLabel,
    category,
    difficulty,
    streak,
    maxStreak,
    startGame,
    selectAnswer,
    restart,
  };
}
