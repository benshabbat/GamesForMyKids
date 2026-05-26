'use client';

import { useState, useCallback } from 'react';

interface Config<Q extends { correctIndex: number }> {
  questions: Q[];
  onCorrect?: () => void;
  onComplete: () => void;
}

export function useQuizQuestionState<Q extends { correctIndex: number }>({
  questions,
  onCorrect,
  onComplete,
}: Config<Q>) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = questions[questionIndex];
  const totalQuestions = questions.length;

  const selectAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === currentQuestion.correctIndex;
    setIsCorrect(correct);
    if (correct) onCorrect?.();
  }, [selected, currentQuestion, onCorrect]);

  const nextQuestion = useCallback(() => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex(q => q + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      onComplete();
    }
  }, [questionIndex, totalQuestions, onComplete]);

  const resetQuestionState = useCallback(() => {
    setQuestionIndex(0);
    setSelected(null);
    setIsCorrect(null);
  }, []);

  return {
    questionIndex,
    selected,
    isCorrect,
    currentQuestion,
    totalQuestions,
    selectAnswer,
    nextQuestion,
    resetQuestionState,
  };
}
