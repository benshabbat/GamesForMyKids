'use client';

import { useState, useCallback } from 'react';
import { HOLIDAYS, Holiday } from './data/holidays';

export type HolidayPhase = 'menu' | 'quiz' | 'result' | 'complete';

export function useHolidaysGame() {
  const [phase, setPhase] = useState<HolidayPhase>('menu');
  const [holidayIndex, setHolidayIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const current: Holiday = HOLIDAYS[holidayIndex];
  const currentQuestion = current.questions[questionIndex];
  const totalHolidays = HOLIDAYS.length;
  const totalQuestions = current.questions.length;
  const maxScore = HOLIDAYS.reduce((s, h) => s + h.questions.length, 0);

  const startHoliday = useCallback((index: number) => {
    setHolidayIndex(index);
    setQuestionIndex(0);
    setSelected(null);
    setIsCorrect(null);
    setPhase('quiz');
  }, []);

  const selectAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === currentQuestion.correctIndex;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  }, [selected, currentQuestion]);

  const next = useCallback(() => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex(q => q + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      setPhase('result');
    }
  }, [questionIndex, totalQuestions]);

  const nextHoliday = useCallback(() => {
    if (holidayIndex < totalHolidays - 1) {
      setHolidayIndex(h => h + 1);
      setQuestionIndex(0);
      setSelected(null);
      setIsCorrect(null);
      setPhase('quiz');
    } else {
      setPhase('complete');
    }
  }, [holidayIndex, totalHolidays]);

  const restart = useCallback(() => {
    setPhase('menu');
    setHolidayIndex(0);
    setQuestionIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(null);
  }, []);

  return {
    phase, holidayIndex, questionIndex, score, maxScore,
    selected, isCorrect, current, currentQuestion,
    totalHolidays, totalQuestions, holidays: HOLIDAYS,
    startHoliday, selectAnswer, next, nextHoliday, restart,
  };
}
