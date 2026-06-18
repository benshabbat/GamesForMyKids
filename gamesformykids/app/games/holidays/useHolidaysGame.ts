'use client';

import { useState } from 'react';
import { HOLIDAYS, Holiday } from './data/holidays';
import { useQuizQuestionState } from '@/lib/quiz/useQuizQuestionState';

export type HolidayPhase = 'menu' | 'quiz' | 'result' | 'complete';

export function useHolidaysGame() {
  const [phase, setPhase] = useState<HolidayPhase>('menu');
  const [holidayIndex, setHolidayIndex] = useState(0);
  const [score, setScore] = useState(0);

  const current: Holiday = HOLIDAYS[holidayIndex]!;
  const totalHolidays = HOLIDAYS.length;
  const maxScore = HOLIDAYS.reduce((s, h) => s + h.questions.length, 0);

  const {
    questionIndex,
    selected,
    isCorrect,
    currentQuestion,
    totalQuestions,
    selectAnswer,
    nextQuestion: next,
    resetQuestionState,
  } = useQuizQuestionState({
    questions: current.questions,
    onCorrect: () => setScore(s => s + 1),
    onComplete: () => setPhase('result'),
  });

  const startHoliday = (index: number) => {
    setHolidayIndex(index);
    resetQuestionState();
    setPhase('quiz');
  };

  const nextHoliday = () => {
    if (holidayIndex < totalHolidays - 1) {
      setHolidayIndex(h => h + 1);
      resetQuestionState();
      setPhase('quiz');
    } else {
      setPhase('complete');
    }
  };

  const restart = () => {
    setPhase('menu');
    setHolidayIndex(0);
    setScore(0);
    resetQuestionState();
  };

  return {
    phase, holidayIndex, questionIndex, score, maxScore,
    selected, isCorrect, current, currentQuestion,
    totalHolidays, totalQuestions, holidays: HOLIDAYS,
    startHoliday, selectAnswer, next, nextHoliday, restart,
  };
}
