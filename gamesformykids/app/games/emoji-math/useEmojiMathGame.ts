'use client';
import { useEffect, useCallback } from 'react';
import { useEmojiMathStore } from './emojiMathStore';

const EMOJIS = ['🍎','🍊','🍋','🍇','🍓','🫐','🍒','🍑','🥝','🍉','🍍','🥭'];

export type Op = '+' | '-';
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
const INITIAL_LIVES = 3;

export function useEmojiMathGame() {
  const phase    = useEmojiMathStore((s) => s.phase);
  const score    = useEmojiMathStore((s) => s.score);
  const best     = useEmojiMathStore((s) => s.best);
  const lives    = useEmojiMathStore((s) => s.lives);
  const timeLeft = useEmojiMathStore((s) => s.timeLeft);
  const feedback = useEmojiMathStore((s) => s.feedback);
  const q        = useEmojiMathStore((s) => s.q);
  const level    = useEmojiMathStore((s) => s.level);
  const streak   = useEmojiMathStore((s) => s.streak);

  // Countdown timer — runs while playing and no feedback showing
  useEffect(() => {
    if (phase !== 'playing' || feedback !== null) return;
    const interval = setInterval(() => {
      const store = useEmojiMathStore.getState();
      if (store.phase !== 'playing' || store.feedback !== null) return;
      if (store.timeLeft <= 1) {
        const newLives = store.lives - 1;
        store.setLives(newLives);
        store.setFeedback('wrong');
        store.setTimeLeft(TIME_PER_Q);
        if (newLives <= 0) {
          store.setPhase('dead');
          store.updateBest(store.score);
        }
      } else {
        store.setTimeLeft(store.timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, feedback]);

  // Advance to next question after feedback delay
  useEffect(() => {
    if (feedback === null || phase !== 'playing') return;
    const t = setTimeout(() => {
      const store = useEmojiMathStore.getState();
      if (store.phase !== 'playing') return;
      store.setFeedback(null);
      store.setTimeLeft(TIME_PER_Q);
      store.setQ(makeQuestion(store.level));
    }, 900);
    return () => clearTimeout(t);
  }, [feedback, phase]);

  const startGame = useCallback(() => {
    const store = useEmojiMathStore.getState();
    store.setPhase('playing');
    store.setScore(0);
    store.setLives(INITIAL_LIVES);
    store.setTimeLeft(TIME_PER_Q);
    store.setFeedback(null);
    store.setLevel(1);
    store.setStreak(0);
    store.setQ(makeQuestion(1));
  }, []);

  const tap = useCallback((choice: number) => {
    const store = useEmojiMathStore.getState();
    if (store.phase !== 'playing' || store.feedback !== null) return;

    if (choice === store.q.answer) {
      const newStreak = store.streak + 1;
      const bonus = newStreak >= 3 ? 20 : 10;
      const newScore = store.score + bonus;
      store.setStreak(newStreak);
      store.setScore(newScore);
      store.setFeedback('correct');
      if (newScore > 0 && newScore % 50 === 0) {
        store.setLevel(store.level + 1);
      }
    } else {
      const newLives = store.lives - 1;
      store.setStreak(0);
      store.setLives(newLives);
      store.setFeedback('wrong');
      if (newLives <= 0) {
        store.setPhase('dead');
        store.updateBest(store.score);
      }
    }
  }, []);

  return { phase, q, score, best, lives, level, timeLeft, feedback, streak, startGame, tap };
}
