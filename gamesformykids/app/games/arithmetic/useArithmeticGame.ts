'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  LEVELS, generateQuestion, QUESTIONS_PER_GAME, TIME_PER_QUESTION,
  ArithmeticLevel, ArithmeticQuestion,
} from './data/questions';

import type { PhaseResult as ArithmeticPhase } from '@/lib/types';

export function useArithmeticGame() {
  const [phase, setPhase] = useState<ArithmeticPhase>('menu');
  const [level, setLevel] = useState<ArithmeticLevel>(LEVELS[0]);
  const [question, setQuestion] = useState<ArithmeticQuestion | null>(null);
  const [questionNum, setQuestionNum] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const newQuestion = useCallback((lv: ArithmeticLevel) => {
    setQuestion(generateQuestion(lv));
    setSelected(null);
    setIsCorrect(null);
    setTimeLeft(TIME_PER_QUESTION);
  }, []);

  const startGame = useCallback((lv: ArithmeticLevel) => {
    stopTimer();
    setLevel(lv);
    setQuestionNum(0);
    setScore(0);
    setCorrect(0);
    setPhase('playing');
    newQuestion(lv);
  }, [stopTimer, newQuestion]);

  // Countdown timer
  useEffect(() => {
    if (phase !== 'playing' || selected !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          stopTimer();
          setSelected(-1); // timeout marker
          setIsCorrect(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return stopTimer;
  }, [phase, question, selected, stopTimer]);

  const selectAnswer = useCallback((val: number) => {
    if (selected !== null || !question) return;
    stopTimer();
    const ok = val === question.answer;
    setSelected(val);
    setIsCorrect(ok);
    if (ok) { setCorrect(c => c + 1); setScore(s => s + Math.max(1, timeLeft) * 10); }
  }, [selected, question, timeLeft, stopTimer]);

  const advance = useCallback(() => {
    const next = questionNum + 1;
    if (next >= QUESTIONS_PER_GAME) { setPhase('result'); }
    else { setQuestionNum(next); newQuestion(level); }
  }, [questionNum, level, newQuestion]);

  const goMenu = useCallback(() => { stopTimer(); setPhase('menu'); }, [stopTimer]);

  return {
    phase, level, question, questionNum, score, correct,
    selected, isCorrect, timeLeft,
    totalQuestions: QUESTIONS_PER_GAME,
    levels: LEVELS,
    startGame, selectAnswer, advance, goMenu,
  };
}
