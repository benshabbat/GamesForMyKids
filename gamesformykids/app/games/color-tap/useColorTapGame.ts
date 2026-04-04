'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export const COLORS = [
  { name: 'אדום',  bg: 'bg-red-500',    hex: '#ef4444', emoji: '🔴' },
  { name: 'כחול',  bg: 'bg-blue-500',   hex: '#3b82f6', emoji: '🔵' },
  { name: 'ירוק',  bg: 'bg-green-500',  hex: '#22c55e', emoji: '🟢' },
  { name: 'צהוב',  bg: 'bg-yellow-400', hex: '#facc15', emoji: '🟡' },
  { name: 'סגול',  bg: 'bg-purple-500', hex: '#a855f7', emoji: '🟣' },
  { name: 'כתום',  bg: 'bg-orange-500', hex: '#f97316', emoji: '🟠' },
  { name: 'ורוד',  bg: 'bg-pink-400',   hex: '#f472b6', emoji: '🩷' },
  { name: 'תכלת',  bg: 'bg-cyan-400',   hex: '#22d3ee', emoji: '🩵' },
];

export type Phase = 'menu' | 'playing' | 'dead';
export type ColorItem = typeof COLORS[0];

export const TIME_PER_Q = 5;

function makeQuestion() {
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
  const target = shuffled[0];
  const options = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);
  return { target, options };
}

export function useColorTapGame() {
  const [phase, setPhase]       = useState<Phase>('menu');
  const [score, setScore]       = useState(0);
  const [best, setBest]         = useState(0);
  const [lives, setLives]       = useState(3);
  const [question, setQuestion] = useState(makeQuestion);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const phaseRef = useRef<Phase>('menu');

  const nextQuestion = useCallback(() => {
    setQuestion(makeQuestion());
    setTimeLeft(TIME_PER_Q);
    setFeedback(null);
  }, []);

  const startGame = useCallback(() => {
    scoreRef.current = 0;
    livesRef.current = 3;
    phaseRef.current = 'playing';
    setScore(0);
    setLives(3);
    setPhase('playing');
    setTimeLeft(TIME_PER_Q);
    setFeedback(null);
    setQuestion(makeQuestion());
  }, []);

  useEffect(() => {
    if (phase !== 'playing' || feedback) return;
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          const newLives = livesRef.current - 1;
          livesRef.current = newLives;
          setLives(newLives);
          setFeedback('wrong');
          if (newLives <= 0) {
            phaseRef.current = 'dead';
            setPhase('dead');
            setBest(b => Math.max(b, scoreRef.current));
          }
          return TIME_PER_Q;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, feedback]);

  useEffect(() => {
    if (!feedback || phaseRef.current !== 'playing') return;
    const t = setTimeout(nextQuestion, 700);
    return () => clearTimeout(t);
  }, [feedback, nextQuestion]);

  const handleTap = useCallback((color: ColorItem) => {
    if (phaseRef.current !== 'playing' || feedback) return;
    if (color === question.target) {
      const newScore = scoreRef.current + 10;
      scoreRef.current = newScore;
      setScore(newScore);
      setFeedback('correct');
    } else {
      const newLives = livesRef.current - 1;
      livesRef.current = newLives;
      setLives(newLives);
      setFeedback('wrong');
      if (newLives <= 0) {
        phaseRef.current = 'dead';
        setPhase('dead');
        setBest(b => Math.max(b, scoreRef.current));
      }
    }
  }, [feedback, question]);

  return { phase, score, best, lives, question, timeLeft, feedback, startGame, handleTap };
}
