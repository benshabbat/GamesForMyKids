'use client';
import { useState, useRef, useCallback } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { useCanvasResize } from '@/hooks/canvas/useCanvasResize';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import { shuffle as shuffled } from '@/lib/utils/game/cardUtils';
import {
  DRUM_WORDS,
  WORDS_PER_GAME,
  BEAT_INTERVAL_MS,
  FALL_DURATION_MS,
  HIT_FRAC,
  PERFECT_WINDOW,
  GOOD_WINDOW,
  CIRCLE_R,
  CIRCLE_COLORS,
  type BeatCircle,
  type BeatScore,
  type TapFeedback,
} from './drumsConstants';
import { drawDrumsScene } from './drumsDraw';

export { WORDS_PER_GAME } from './drumsConstants';
export type { BeatScore, TapFeedback } from './drumsConstants';

let _id = 0;

export function useDrumsGame() {
  const [phase, setPhase] = useState<'menu' | 'playing' | 'result'>('menu');
  const [currentWord, setCurrentWord] = useState('');
  const [currentLetters, setCurrentLetters] = useState<string[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [tapFeedback, setTapFeedback] = useState<TapFeedback | null>(null);
  const [beatScores, setBeatScores] = useState<BeatScore[]>([]);

  const phaseRef = useRef<'menu' | 'playing' | 'result'>('menu');
  const gameTimeRef = useRef(0);
  const wordIdxRef = useRef(0);
  const wordListRef = useRef<typeof DRUM_WORDS>([]);
  const circlesRef = useRef<BeatCircle[]>([]);
  const spawnQueueRef = useRef<Array<{ letter: string; spawnAt: number; colorIdx: number }>>([]);
  const spawnedCountRef = useRef(0);
  const resolvedCountRef = useRef(0);
  const scoreRef = useRef(0);
  const beatScoresRef = useRef<BeatScore[]>([]);
  const transitionTimerRef = useRef(0);
  const inTransitionRef = useRef(false);
  const feedbackTimerRef = useRef(0);
  const canvasH = useRef(600);

  const loadWord = useCallback((idx: number) => {
    const w = wordListRef.current[idx];
    if (!w) return;
    setCurrentWord(w.word);
    setCurrentLetters(w.letters);
    setWordIdx(idx);
    wordIdxRef.current = idx;
    circlesRef.current = [];
    beatScoresRef.current = [];
    setBeatScores([]);
    spawnedCountRef.current = 0;
    resolvedCountRef.current = 0;
    inTransitionRef.current = false;
    gameTimeRef.current = 0;
    spawnQueueRef.current = w.letters.map((l, i) => ({
      letter: l,
      spawnAt: 1100 + i * BEAT_INTERVAL_MS,
      colorIdx: i % CIRCLE_COLORS.length,
    }));
    speakHebrew(w.word);
  }, []);

  const finishWord = useCallback(() => {
    const bs = beatScoresRef.current;
    const perfects = bs.filter(s => s === 'perfect').length;
    const goods = bs.filter(s => s === 'good').length;
    const pts = perfects * 30 + goods * 15;
    scoreRef.current += pts;
    setScore(scoreRef.current);
    inTransitionRef.current = true;
    transitionTimerRef.current = 1200;
  }, []);

  const advanceWord = useCallback(() => {
    const next = wordIdxRef.current + 1;
    if (next >= wordListRef.current.length) {
      phaseRef.current = 'result';
      setPhase('result');
    } else {
      loadWord(next);
    }
  }, [loadWord]);

  const startGame = useCallback(() => {
    const chosen = shuffled(DRUM_WORDS).slice(0, WORDS_PER_GAME);
    wordListRef.current = chosen;
    scoreRef.current = 0;
    setScore(0);
    phaseRef.current = 'playing';
    setPhase('playing');
    loadWord(0);
  }, [loadWord]);

  const handleTap = useCallback(() => {
    if (phaseRef.current !== 'playing' || inTransitionRef.current) return;
    const now = gameTimeRef.current;
    let best: BeatCircle | null = null;
    let bestDiff = Infinity;
    for (const c of circlesRef.current) {
      if (c.tapped || c.missed) continue;
      const diff = Math.abs(now - c.perfectTimeMs);
      if (diff < bestDiff) { bestDiff = diff; best = c; }
    }
    let bScore: BeatScore = 'miss';
    let feedback: TapFeedback;
    if (best && bestDiff <= GOOD_WINDOW) {
      best.tapped = true;
      best.ripple = 400;
      best.rippleOk = true;
      if (bestDiff <= PERFECT_WINDOW) {
        bScore = 'perfect';
        feedback = { text: 'מושלם! 🎯', ok: true };
      } else {
        bScore = 'good';
        feedback = { text: 'טוב! 👍', ok: true };
      }
      resolvedCountRef.current += 1;
    } else {
      feedback = { text: 'מוקדם מדי ❌', ok: false };
    }
    beatScoresRef.current.push(bScore);
    setBeatScores([...beatScoresRef.current]);
    setTapFeedback(feedback);
    feedbackTimerRef.current = 700;

    const totalBeats = wordListRef.current[wordIdxRef.current]?.letters.length ?? 0;
    if (resolvedCountRef.current >= totalBeats && !inTransitionRef.current) {
      finishWord();
    }
  }, [finishWord]);

  const canvasRef = useCanvasLoop(useCallback((ctx: CanvasRenderingContext2D, dt: number) => {
    if (phaseRef.current !== 'playing') return;

    const W = ctx.canvas.width;
    const H = ctx.canvas.height;
    canvasH.current = H;
    const hitY = H * HIT_FRAC;
    const centerX = W / 2;

    gameTimeRef.current += dt;
    if (feedbackTimerRef.current > 0) feedbackTimerRef.current -= dt;

    if (inTransitionRef.current) {
      transitionTimerRef.current -= dt;
      if (transitionTimerRef.current <= 0) { advanceWord(); return; }
    }

    while (spawnQueueRef.current.length > 0 && (spawnQueueRef.current[0]?.spawnAt ?? Infinity) <= gameTimeRef.current) {
      const beat = spawnQueueRef.current.shift()!;
      const vy = (hitY + CIRCLE_R) / FALL_DURATION_MS;
      circlesRef.current.push({
        id: _id++, letter: beat.letter, y: -CIRCLE_R, vy,
        perfectTimeMs: beat.spawnAt + FALL_DURATION_MS,
        tapped: false, missed: false, ripple: 0, rippleOk: false,
      });
      spawnedCountRef.current += 1;
    }

    for (const c of circlesRef.current) {
      if (c.tapped) { if (c.ripple > 0) c.ripple -= dt; continue; }
      c.y += c.vy * dt;
      if (c.y > hitY + CIRCLE_R + 40 && !c.missed) {
        c.missed = true;
        c.ripple = 500;
        c.rippleOk = false;
        beatScoresRef.current.push('miss');
        setBeatScores([...beatScoresRef.current]);
        resolvedCountRef.current += 1;
        const totalBeats = wordListRef.current[wordIdxRef.current]?.letters.length ?? 0;
        if (resolvedCountRef.current >= totalBeats && !inTransitionRef.current) finishWord();
      }
    }

    circlesRef.current = circlesRef.current.filter(c => c.y < H + 60 || c.ripple > 0);

    drawDrumsScene(ctx, W, H, hitY, centerX, circlesRef.current);
  }, [advanceWord, finishWord]));

  useCanvasResize(canvasRef);

  const wordObj = wordListRef.current[wordIdx];
  const letters = wordObj?.letters ?? currentLetters;

  return {
    phase, currentWord, wordIdx, score, tapFeedback, beatScores, letters,
    feedbackTimerRef, canvasRef, startGame, handleTap,
  };
}
