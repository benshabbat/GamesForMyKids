'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

import type { ArithOp as Op, PhaseDead as GamePhase } from '@/lib/types';
import { randInt as rnd } from '@/lib/utils';

export interface Question { text: string; answer: number; choices: number[]; }

export const GAME_TIME = 30;


export function makeQ(score: number): Question {
  const level = Math.floor(score / 30);
  let a: number, b: number, op: Op, answer: number;
  if (level < 3) {
    op = '+'; a = rnd(1, 10 + level * 5); b = rnd(1, 10 + level * 3);
    answer = a + b;
  } else if (level < 6) {
    op = Math.random() < 0.5 ? '+' : '-';
    a = rnd(5, 20); b = rnd(1, op === '-' ? a : 15);
    answer = op === '+' ? a + b : a - b;
  } else {
    op = Math.random() < 0.4 ? '×' : (Math.random() < 0.5 ? '+' : '-');
    if (op === '×') { a = rnd(2, 9); b = rnd(2, 9); answer = a * b; }
    else if (op === '+') { a = rnd(10, 50); b = rnd(10, 50); answer = a + b; }
    else { a = rnd(20, 60); b = rnd(1, a); answer = a - b; }
  }
  const text = `${a} ${op} ${b} = ?`;
  const wrong = new Set<number>();
  while (wrong.size < 3) {
    const w = answer + rnd(-5, 5) * (level < 3 ? 1 : 2);
    if (w !== answer && w >= 0) wrong.add(w);
  }
  return { text, answer, choices: [...wrong, answer].sort(() => Math.random() - 0.5) };
}

export function useMathRaceGame() {
  const [phase,    setPhase]    = useState<GamePhase>('menu');
  const [q,        setQ]        = useState<Question>(makeQ(0));
  const [score,    setScore]    = useState(0);
  const [best,     setBest]     = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [streak,   setStreak]   = useState(0);
  const [total,    setTotal]    = useState(0);
  const [correct,  setCorrect]  = useState(0);

  const phaseRef   = useRef<GamePhase>('menu');
  const scoreRef   = useRef(0);
  const streakRef  = useRef(0);
  const totalRef   = useRef(0);
  const correctRef = useRef(0);

  const nextQ = useCallback(() => {
    setQ(makeQ(scoreRef.current));
    setFeedback(null);
  }, []);

  const startGame = useCallback(() => {
    phaseRef.current = 'playing'; scoreRef.current = 0; streakRef.current = 0;
    totalRef.current = 0; correctRef.current = 0;
    setPhase('playing'); setScore(0); setStreak(0); setTotal(0); setCorrect(0);
    setTimeLeft(GAME_TIME); setFeedback(null); setQ(makeQ(0));
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          phaseRef.current = 'dead';
          setPhase('dead');
          setBest(b => Math.max(b, scoreRef.current));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(nextQ, 500);
    return () => clearTimeout(t);
  }, [feedback, nextQ]);

  const tap = useCallback((choice: number) => {
    if (phaseRef.current !== 'playing' || feedback) return;
    totalRef.current++; setTotal(totalRef.current);
    if (choice === q.answer) {
      correctRef.current++; setCorrect(correctRef.current);
      streakRef.current++; setStreak(streakRef.current);
      const pts = streakRef.current >= 3 ? 20 : 10;
      scoreRef.current += pts; setScore(scoreRef.current);
      setFeedback('correct');
    } else {
      streakRef.current = 0; setStreak(0);
      setFeedback('wrong');
    }
  }, [feedback, q.answer]);

  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return { phase, q, score, best, timeLeft, feedback, streak, total, correct, accuracy, startGame, tap };
}
