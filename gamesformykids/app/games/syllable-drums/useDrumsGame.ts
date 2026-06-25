'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { speakHebrew } from '@/lib/utils/speech/speaker';

type DrumWord = { word: string; letters: string[] };

const DRUM_WORDS: DrumWord[] = [
  { word: 'שלום', letters: ['ש', 'ל', 'ו', 'ם'] },
  { word: 'חתול', letters: ['ח', 'ת', 'ו', 'ל'] },
  { word: 'כלב', letters: ['כ', 'ל', 'ב'] },
  { word: 'ספר', letters: ['ס', 'פ', 'ר'] },
  { word: 'ילד', letters: ['י', 'ל', 'ד'] },
  { word: 'שמש', letters: ['ש', 'מ', 'ש'] },
  { word: 'ציפור', letters: ['צ', 'י', 'פ', 'ו', 'ר'] },
  { word: 'אריה', letters: ['א', 'ר', 'י', 'ה'] },
  { word: 'ארנב', letters: ['א', 'ר', 'נ', 'ב'] },
  { word: 'ירח', letters: ['י', 'ר', 'ח'] },
  { word: 'בית', letters: ['ב', 'י', 'ת'] },
  { word: 'כיסא', letters: ['כ', 'י', 'ס', 'א'] },
  { word: 'מים', letters: ['מ', 'י', 'מ'] },
  { word: 'אהבה', letters: ['א', 'ה', 'ב', 'ה'] },
];

export const WORDS_PER_GAME = 8;
const BEAT_INTERVAL_MS = 700;
const FALL_DURATION_MS = 1400;
const HIT_FRAC = 0.73;
const PERFECT_WINDOW = 160;
const GOOD_WINDOW = 340;
const CIRCLE_R = 30;

type BeatCircle = {
  id: number; letter: string; y: number; vy: number; perfectTimeMs: number;
  tapped: boolean; missed: boolean; ripple: number; rippleOk: boolean;
};
export type BeatScore = 'perfect' | 'good' | 'miss';
export type TapFeedback = { text: string; ok: boolean };

let _id = 0;

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i] as T; a[i] = a[j] as T; a[j] = tmp;
  }
  return a;
}

const CIRCLE_COLORS = ['#f43f5e', '#f97316', '#eab308', '#22c55e', '#0ea5e9', '#8b5cf6'];

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
  const wordListRef = useRef<DrumWord[]>([]);
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

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0f172a');
    bg.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(99,102,241,0.1)';
    ctx.lineWidth = 1;
    for (let y = 0; y < H; y += 60) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W * 0.1, hitY);
    ctx.lineTo(W * 0.9, hitY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.font = '32px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🥁', centerX, hitY + 28);

    for (const c of circlesRef.current) {
      const colorIdx = (c.letter.codePointAt(0) ?? 0) % CIRCLE_COLORS.length;
      const color = CIRCLE_COLORS[colorIdx] ?? '#f43f5e';
      const isClose = !c.tapped && !c.missed && Math.abs(c.y - hitY) < 60;

      ctx.save();
      ctx.translate(centerX, c.y);

      if (c.ripple > 0) {
        const prog = 1 - c.ripple / 500;
        const rippleR = CIRCLE_R + prog * 40;
        ctx.globalAlpha = 0.6 * (1 - prog);
        ctx.beginPath();
        ctx.arc(0, 0, rippleR, 0, Math.PI * 2);
        ctx.strokeStyle = c.rippleOk ? '#4ade80' : '#f87171';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      if (isClose) { ctx.shadowColor = color; ctx.shadowBlur = 20; }

      ctx.beginPath();
      ctx.arc(0, 0, CIRCLE_R, 0, Math.PI * 2);
      ctx.fillStyle = c.tapped ? '#4ade80' : c.missed ? '#6b7280' : color;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = `bold ${CIRCLE_R}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(c.letter, 0, 2);

      ctx.restore();
    }
  }, [advanceWord, finishWord]));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [canvasRef]);

  const wordObj = wordListRef.current[wordIdx];
  const letters = wordObj?.letters ?? currentLetters;

  return {
    phase, currentWord, wordIdx, score, tapFeedback, beatScores, letters,
    feedbackTimerRef, canvasRef, startGame, handleTap,
  };
}
