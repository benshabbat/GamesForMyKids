'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { generateQuestion, TIME_PER_QUESTION, QUESTIONS_PER_LEVEL, MultiplicationQuestion } from './data/tables';

export type MultiPhase = 'menu' | 'playing' | 'result';

export function useMultiplicationGame() {
  const [phase, setPhase] = useState<MultiPhase>('menu');
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState<MultiplicationQuestion | null>(null);
  const [questionNum, setQuestionNum] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const nextQuestion = useCallback((lv: number) => {
    setQuestion(generateQuestion(lv));
    setSelected(null);
    setIsCorrect(null);
    setTimeLeft(TIME_PER_QUESTION);
  }, []);

  const startGame = useCallback((lv: number) => {
    setLevel(lv);
    setScore(0);
    setCorrect(0);
    setQuestionNum(0);
    setPhase('playing');
    setQuestion(generateQuestion(lv));
    setSelected(null);
    setIsCorrect(null);
    setTimeLeft(TIME_PER_QUESTION);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (phase !== 'playing' || selected !== null) return;
    clearTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearTimer();
          // Time's up — count as wrong
          setSelected(-1);
          setIsCorrect(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return clearTimer;
  }, [phase, question, selected]);

  const selectAnswer = useCallback((val: number) => {
    if (selected !== null || !question) return;
    clearTimer();
    setSelected(val);
    const ok = val === question.answer;
    setIsCorrect(ok);
    if (ok) { setScore(s => s + timeLeft); setCorrect(c => c + 1); }
  }, [selected, question, timeLeft]);

  const advance = useCallback(() => {
    const next = questionNum + 1;
    if (next >= QUESTIONS_PER_LEVEL) {
      setPhase('result');
    } else {
      setQuestionNum(next);
      nextQuestion(level);
    }
  }, [questionNum, level, nextQuestion]);

  const goMenu = useCallback(() => setPhase('menu'), []);

  return {
    phase, level, question, questionNum, score, correct,
    selected, isCorrect, timeLeft,
    totalQuestions: QUESTIONS_PER_LEVEL,
    startGame, selectAnswer, advance, goMenu,
  };
}
