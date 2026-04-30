'use client';
import { useState, useCallback, useRef } from 'react';
import { useTimedQuizGame } from '@/hooks/games/useTimedQuizGame';

const EMOJIS = ['🍎','🍊','🍋','🍇','🍓','🫐','🍒','🍑','🥝','🍉','🍍','🥭'];

export type Op = '+' | '-';
import { randInt as rnd } from '@/lib/utils';

export interface Question {
  a: number; b: number; op: Op; answer: number;
  choices: number[]; emojiA: string; emojiB: string;
}

function pickEmoji() { return EMOJIS[Math.floor(Math.random() * EMOJIS.length)] ?? EMOJIS[0] ?? '🍎'; }

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
  const [q, setQ]           = useState<Question>(() => makeQuestion(1));
  const [level, setLevel]   = useState(1);
  const [streak, setStreak] = useState(0);

  const levelRef  = useRef(1);
  const streakRef = useRef(0);

  const {
    phase, score, best, lives, timeLeft, feedback,
    phaseRef, scoreRef, startGame: startBase, handleCorrect, handleWrong,
  } = useTimedQuizGame({
    timePerQ: TIME_PER_Q,
    feedbackDelay: 900,
    onNextQuestion: () => setQ(makeQuestion(levelRef.current)),
  });

  const startGame = useCallback(() => {
    levelRef.current = 1;
    streakRef.current = 0;
    startBase(() => {
      setLevel(1);
      setStreak(0);
      setQ(makeQuestion(1));
    });
  }, [startBase]);

  const tap = useCallback((choice: number) => {
    if (phaseRef.current !== 'playing' || feedback) return;
    if (choice === q.answer) {
      const ns = streakRef.current + 1;
      streakRef.current = ns;
      setStreak(ns);
      const bonus = ns >= 3 ? 20 : 10;
      handleCorrect(bonus);
      if (scoreRef.current > 0 && scoreRef.current % 50 === 0) {
        levelRef.current++;
        setLevel(levelRef.current);
      }
    } else {
      streakRef.current = 0;
      setStreak(0);
      handleWrong();
    }
  }, [feedback, q.answer, phaseRef, scoreRef, handleCorrect, handleWrong]);

  return { phase, q, score, best, lives, level, timeLeft, feedback, streak, startGame, tap };
}