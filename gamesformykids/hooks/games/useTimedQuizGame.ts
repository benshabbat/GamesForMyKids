'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { PhaseDead as Phase } from '@/lib/types';

interface TimedQuizOptions {
  /** Seconds per question countdown */
  timePerQ: number;
  /** Initial lives count (default: 3) */
  initialLives?: number;
  /** Milliseconds to show feedback before next question (default: 750) */
  feedbackDelay?: number;
  /** Called after feedback delay to advance to the next question */
  onNextQuestion: () => void;
}

/**
 * Shared hook for timer-based quiz games.
 *
 * Manages the common pattern shared by color-tap, emoji-math, and true-false:
 * - Phase (menu → playing → dead), score, best, lives, timeLeft, feedback
 * - Per-question countdown that deducts a life on timeout
 * - Feedback → next-question delay
 *
 * Game-specific logic (question generation, answer checking, streaks, etc.)
 * stays in each game's own hook which calls this one.
 */
export function useTimedQuizGame({
  timePerQ,
  initialLives = 3,
  feedbackDelay = 750,
  onNextQuestion,
}: TimedQuizOptions) {
  const [phase, setPhase]       = useState<Phase>('menu');
  const [score, setScore]       = useState(0);
  const [best, setBest]         = useState(0);
  const [lives, setLives]       = useState(initialLives);
  const [timeLeft, setTimeLeft] = useState(timePerQ);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const phaseRef = useRef<Phase>('menu');
  const scoreRef = useRef(0);
  const livesRef = useRef(initialLives);

  // Keep the callback ref up-to-date without re-subscribing effects
  const onNextQRef = useRef(onNextQuestion);
  useEffect(() => { onNextQRef.current = onNextQuestion; });

  // --- Countdown timer -------------------------------------------------------
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
          return timePerQ;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, feedback, timePerQ]);

  // --- Feedback → next question ----------------------------------------------
  useEffect(() => {
    if (!feedback || phaseRef.current !== 'playing') return;
    const t = setTimeout(() => {
      setTimeLeft(timePerQ);
      setFeedback(null);
      onNextQRef.current();
    }, feedbackDelay);
    return () => clearTimeout(t);
  }, [feedback, feedbackDelay, timePerQ]);

  // --- Public API ------------------------------------------------------------

  /**
   * Resets all base state and starts a new game.
   * Pass `onStart` to reset game-specific state (question, level, streak, etc.)
   * synchronously in the same call.
   */
  const startGame = useCallback(
    (onStart?: () => void) => {
      scoreRef.current = 0;
      livesRef.current = initialLives;
      phaseRef.current = 'playing';
      setScore(0);
      setLives(initialLives);
      setPhase('playing');
      setTimeLeft(timePerQ);
      setFeedback(null);
      onStart?.();
    },
    [initialLives, timePerQ],
  );

  /** Award points for a correct answer and trigger the feedback animation. */
  const handleCorrect = useCallback(
    (points: number = 10) => {
      if (phaseRef.current !== 'playing' || feedback) return;
      scoreRef.current += points;
      setScore(scoreRef.current);
      setFeedback('correct');
    },
    [feedback],
  );

  /** Deduct a life for a wrong answer; ends the game when lives reach 0. */
  const handleWrong = useCallback(() => {
    if (phaseRef.current !== 'playing' || feedback) return;
    const newLives = livesRef.current - 1;
    livesRef.current = newLives;
    setLives(newLives);
    setFeedback('wrong');
    if (newLives <= 0) {
      phaseRef.current = 'dead';
      setPhase('dead');
      setBest(b => Math.max(b, scoreRef.current));
    }
  }, [feedback]);

  return {
    // State
    phase,
    score,
    best,
    lives,
    timeLeft,
    feedback,
    // Refs (needed by game hooks to avoid stale closures in callbacks)
    phaseRef,
    scoreRef,
    livesRef,
    // Actions
    startGame,
    handleCorrect,
    handleWrong,
  };
}
