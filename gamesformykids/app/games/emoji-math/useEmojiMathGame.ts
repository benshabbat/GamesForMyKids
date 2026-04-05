'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

const EMOJIS = ['🍎','🌟','🐶','🎈','🍕','🚗','🌸','🦋','🍦','🎸','🐱','🏆','🍇','🦄','🎯'];

export type Op = '+' | '-';
import type { PhaseDead as GamePhase } from '@/lib/types';
import { randInt as rnd } from '@/lib/utils';

export interface Question {
  a: number; b: number; op: Op; answer: number;
  choices: number[]; emojiA: string; emojiB: string;
}

function pickEmoji() { return EMOJIS[Math.floor(Math.random() * EMOJIS.length)]; }

export function makeQuestion(level: number): Question {
  const maxNum = Math.min(5 + level * 2, 15);
  const op: Op = level < 3 ? '+' : (Math.random() < 0.6 ? '+' : '-');
  let a: number, b: number;
  if (op === '+') {
    a = rnd(1, maxNum); b = rnd(1, maxNum - a + 1);
  } else {
    a = rnd(2, maxNum); b = rnd(1, a);
  }
  const answer = op === '+' ? a + b : a - b;
  const wrong = new Set<number>();
  while (wrong.size < 3) {
    const w = answer + rnd(-3, 3);
    if (w !== answer && w >= 0 && w <= 20) wrong.add(w);
  }
  const choices = [...wrong, answer].sort(() => Math.random() - 0.5);
  const e1 = pickEmoji(), e2 = op === '+' ? pickEmoji() : e1;
  return { a, b, op, answer, choices, emojiA: e1, emojiB: e2 };
}

export const TIME_PER_Q = 8;

export function useEmojiMathGame() {
  const [phase,    setPhase]    = useState<GamePhase>('menu');
  const [q,        setQ]        = useState<Question>(makeQuestion(1));
  const [score,    setScore]    = useState(0);
  const [best,     setBest]     = useState(0);
  const [lives,    setLives]    = useState(3);
  const [level,    setLevel]    = useState(1);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [streak,   setStreak]   = useState(0);

  const phaseRef  = useRef<GamePhase>('menu');
  const scoreRef  = useRef(0);
  const livesRef  = useRef(3);
  const levelRef  = useRef(1);
  const streakRef = useRef(0);

  const nextQ = useCallback(() => {
    setQ(makeQuestion(levelRef.current));
    setTimeLeft(TIME_PER_Q);
    setFeedback(null);
  }, []);

  const startGame = useCallback(() => {
    phaseRef.current = 'playing'; scoreRef.current = 0; livesRef.current = 3;
    levelRef.current = 1; streakRef.current = 0;
    setPhase('playing'); setScore(0); setLives(3); setLevel(1); setStreak(0);
    setQ(makeQuestion(1)); setTimeLeft(TIME_PER_Q); setFeedback(null);
  }, []);

  useEffect(() => {
    if (phase !== 'playing' || feedback) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const nl = livesRef.current - 1; livesRef.current = nl; setLives(nl);
          streakRef.current = 0; setStreak(0);
          setFeedback('wrong');
          if (nl <= 0) { phaseRef.current = 'dead'; setPhase('dead'); setBest(b => Math.max(b, scoreRef.current)); }
          return TIME_PER_Q;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, feedback]);

  useEffect(() => {
    if (!feedback || phaseRef.current !== 'playing') return;
    const t = setTimeout(nextQ, 900);
    return () => clearTimeout(t);
  }, [feedback, nextQ]);

  const tap = useCallback((choice: number) => {
    if (phaseRef.current !== 'playing' || feedback) return;
    if (choice === q.answer) {
      const ns = streakRef.current + 1; streakRef.current = ns; setStreak(ns);
      const bonus = ns >= 3 ? 20 : 10;
      scoreRef.current += bonus; setScore(scoreRef.current);
      if (scoreRef.current > 0 && scoreRef.current % 50 === 0) {
        levelRef.current++; setLevel(levelRef.current);
      }
      setFeedback('correct');
    } else {
      const nl = livesRef.current - 1; livesRef.current = nl; setLives(nl);
      streakRef.current = 0; setStreak(0);
      setFeedback('wrong');
      if (nl <= 0) { phaseRef.current = 'dead'; setPhase('dead'); setBest(b => Math.max(b, scoreRef.current)); }
    }
  }, [feedback, q.answer]);

  return { phase, q, score, best, lives, level, timeLeft, feedback, streak, startGame, tap };
}
