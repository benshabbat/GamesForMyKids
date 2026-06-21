'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { FISHING_WAVES, type FishingWave } from './wordFishingData';

const MAX_LIVES = 3;
const FISH_RADIUS = 48;
const MIN_SPEED = 0.045;
const MAX_SPEED = 0.10;

type Fish = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  emoji: string;
  isTarget: boolean;
  wobble: number;
  wobbleDir: number;
  color: string;
};

const FISH_COLORS = ['#0ea5e9', '#8b5cf6', '#f97316', '#10b981', '#f43f5e'];

function rng(seed: number) {
  return ((seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i] as T;
    a[i] = a[j] as T;
    a[j] = tmp;
  }
  return a;
}

function spawnFish(wave: FishingWave, W: number, H: number): Fish[] {
  const items = shuffle([wave.target, ...wave.distractors]);
  return items.map((item, i) => {
    const angle = (i / items.length) * Math.PI * 2;
    const speed = MIN_SPEED + rng(i * 37 + 11) * (MAX_SPEED - MIN_SPEED);
    return {
      id: i,
      x: W * 0.1 + rng(i * 13) * W * 0.8,
      y: H * 0.1 + rng(i * 17) * H * 0.7,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      label: item.label,
      emoji: item.emoji,
      isTarget: item.label === wave.target.label,
      wobble: rng(i * 7) * Math.PI * 2,
      wobbleDir: rng(i * 3) > 0.5 ? 1 : -1,
      color: FISH_COLORS[i % FISH_COLORS.length] ?? '#0ea5e9',
    };
  });
}

export default function WordFishingClient() {
  const [phase, setPhase] = useState<'menu' | 'playing' | 'result'>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [question, setQuestion] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; ok: boolean } | null>(null);
  const [wave, setWave] = useState(0);

  const fishRef = useRef<Fish[]>([]);
  const phaseRef = useRef<'menu' | 'playing' | 'result'>('menu');
  const wavesRef = useRef<FishingWave[]>([]);
  const waveIdxRef = useRef(0);
  const livesRef = useRef(MAX_LIVES);
  const scoreRef = useRef(0);
  const feedbackTimerRef = useRef(0);
  const canvasSize = useRef({ w: 1, h: 1 });

  const startGame = useCallback(() => {
    const shuffled = shuffle(FISHING_WAVES);
    wavesRef.current = shuffled;
    waveIdxRef.current = 0;
    livesRef.current = MAX_LIVES;
    scoreRef.current = 0;
    setScore(0);
    setLives(MAX_LIVES);
    setWave(0);
    setQuestion(shuffled[0]?.question ?? '');
    phaseRef.current = 'playing';
    setPhase('playing');
  }, []);

  const loadWave = useCallback((idx: number, W: number, H: number) => {
    const w = wavesRef.current[idx];
    if (!w) return;
    fishRef.current = spawnFish(w, W, H);
    setQuestion(w.question);
    setWave(idx);
  }, []);

  const handleCatch = useCallback((fish: Fish) => {
    if (phaseRef.current !== 'playing') return;
    if (fish.isTarget) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      setFeedback({ text: `✅ כל הכבוד! ${fish.emoji} ${fish.label}!`, ok: true });
      feedbackTimerRef.current = 1200;
      const nextIdx = waveIdxRef.current + 1;
      if (nextIdx >= wavesRef.current.length) {
        phaseRef.current = 'result';
        setPhase('result');
        return;
      }
      waveIdxRef.current = nextIdx;
      const { w, h } = canvasSize.current;
      loadWave(nextIdx, w, h);
    } else {
      livesRef.current -= 1;
      setLives(livesRef.current);
      setFeedback({ text: `❌ ${fish.emoji} ${fish.label} — זה לא הנכון!`, ok: false });
      feedbackTimerRef.current = 1000;
      if (livesRef.current <= 0) {
        phaseRef.current = 'result';
        setPhase('result');
      }
    }
  }, [loadWave]);

  const canvasRef = useCanvasLoop(useCallback((ctx: CanvasRenderingContext2D, dt: number) => {
    if (phaseRef.current !== 'playing') return;

    const canvas = ctx.canvas;
    const W = canvas.width;
    const H = canvas.height;
    canvasSize.current = { w: W, h: H };

    if (fishRef.current.length === 0) {
      loadWave(waveIdxRef.current, W, H);
    }

    // Feedback timer
    if (feedbackTimerRef.current > 0) feedbackTimerRef.current -= dt;

    // Update fish
    for (const fish of fishRef.current) {
      fish.x += fish.vx * dt;
      fish.y += fish.vy * dt;
      fish.wobble += fish.wobbleDir * 0.002 * dt;
      if (fish.x < FISH_RADIUS) { fish.x = FISH_RADIUS; fish.vx = Math.abs(fish.vx); }
      if (fish.x > W - FISH_RADIUS) { fish.x = W - FISH_RADIUS; fish.vx = -Math.abs(fish.vx); }
      if (fish.y < FISH_RADIUS + 60) { fish.y = FISH_RADIUS + 60; fish.vy = Math.abs(fish.vy); }
      if (fish.y > H - FISH_RADIUS - 20) { fish.y = H - FISH_RADIUS - 20; fish.vy = -Math.abs(fish.vy); }
    }

    // ─── Draw ───────────────────────────────────────────────────────────────
    // Ocean background
    const ocean = ctx.createLinearGradient(0, 0, 0, H);
    ocean.addColorStop(0, '#0c4a6e');
    ocean.addColorStop(0.5, '#0369a1');
    ocean.addColorStop(1, '#075985');
    ctx.fillStyle = ocean;
    ctx.fillRect(0, 0, W, H);

    // Bubbles
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    for (let i = 0; i < 20; i++) {
      const bx = ((i * 97 + 50) % W);
      const by = ((i * 83 + 30) % H);
      ctx.beginPath();
      ctx.arc(bx, by, 3 + (i % 4), 0, Math.PI * 2);
      ctx.fill();
    }

    // Sandy bottom
    ctx.fillStyle = '#92400e';
    ctx.fillRect(0, H - 18, W, 18);
    ctx.fillStyle = '#a16207';
    ctx.fillRect(0, H - 22, W, 8);

    // Fish
    for (const fish of fishRef.current) {
      ctx.save();
      ctx.translate(fish.x, fish.y);
      ctx.rotate(Math.sin(fish.wobble) * 0.15);

      // Glow
      ctx.shadowColor = fish.color;
      ctx.shadowBlur = 15;

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, FISH_RADIUS, FISH_RADIUS * 0.7, 0, 0, Math.PI * 2);
      ctx.fillStyle = fish.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Fin (direction indicator)
      const tailX = fish.vx > 0 ? -FISH_RADIUS - 12 : FISH_RADIUS + 12;
      ctx.beginPath();
      ctx.moveTo(tailX, 0);
      ctx.lineTo(tailX + (fish.vx > 0 ? -14 : 14), -14);
      ctx.lineTo(tailX + (fish.vx > 0 ? -14 : 14), 14);
      ctx.closePath();
      ctx.fillStyle = fish.color;
      ctx.fill();

      // Border
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, FISH_RADIUS, FISH_RADIUS * 0.7, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Emoji
      ctx.font = `${24}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(fish.emoji, 0, -6);

      // Label
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${fish.label.length > 4 ? 11 : 13}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(fish.label, 0, FISH_RADIUS * 0.7 + 4);

      ctx.restore();
    }
  }, [loadWave]));

  // Handle taps/clicks
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = e.currentTarget.width / rect.width;
    const scaleY = e.currentTarget.height / rect.height;
    const px = (e.clientX - rect.left) * scaleX;
    const py = (e.clientY - rect.top) * scaleY;

    for (const fish of fishRef.current) {
      const dx = px - fish.x;
      const dy = py - fish.y;
      if (Math.sqrt(dx * dx + dy * dy) < FISH_RADIUS + 10) {
        handleCatch(fish);
        return;
      }
    }
  }, [handleCatch]);

  // Sync canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (phaseRef.current === 'playing') {
        loadWave(waveIdxRef.current, canvas.width, canvas.height);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [canvasRef, loadWave]);

  const heartStr = '❤️'.repeat(lives) + '🖤'.repeat(MAX_LIVES - lives);
  const totalWaves = FISHING_WAVES.length;

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 p-6 text-white">
        <div className="text-7xl mb-4">🎣</div>
        <h1 className="text-4xl font-bold mb-2">דיג מילים</h1>
        <p className="text-xl mb-2 text-blue-200">תפוס את הדג הנכון לפי השאלה!</p>
        <p className="text-sm text-blue-300 mb-8">לחץ על הדג הנכון כדי לדוג אותו</p>
        <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-sm w-full">
          <div className="flex gap-4 text-sm text-center">
            <div className="flex-1"><div className="text-2xl mb-1">👀</div><div>קרא את השאלה</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🔍</div><div>מצא את הדג</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🎣</div><div>לחץ לדוג!</div></div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🎮 בואו נדוג!
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / totalWaves) * 100);
    const medal = pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : '🥉';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 p-6 text-white">
        <div className="text-6xl mb-4">{medal}</div>
        <h1 className="text-3xl font-bold mb-2">כל הכבוד, דַּיָּג!</h1>
        <p className="text-xl mb-6 text-blue-200">תפסת {score} מתוך {totalWaves} דגים!</p>
        <div className="flex gap-8 mb-8">
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-yellow-400">{score}</div>
            <div className="text-sm text-blue-200">דגים שתפסת</div>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-green-400">{pct}%</div>
            <div className="text-sm text-blue-200">דיוק</div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🔄 שחק שוב
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col" dir="rtl">
      {/* HUD */}
      <div className="flex items-center justify-between px-4 py-2 bg-blue-950/70 text-white z-10">
        <div className="text-lg">{heartStr}</div>
        <div className="text-sm text-blue-300">גל {wave + 1}/{totalWaves}</div>
        <div className="text-lg font-bold bg-yellow-400/20 px-3 py-1 rounded-lg text-yellow-300">
          🎣 {score}
        </div>
      </div>
      {/* Question */}
      <div className="bg-white/10 text-white text-center py-3 px-4 text-xl font-bold z-10 min-h-[56px] flex items-center justify-center">
        {question}
      </div>
      {/* Feedback toast */}
      {feedback && feedbackTimerRef.current > 0 && (
        <div className={`absolute top-32 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full text-white font-bold text-lg shadow-lg whitespace-nowrap ${feedback.ok ? 'bg-green-500' : 'bg-red-500'}`}>
          {feedback.text}
        </div>
      )}
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="flex-1 w-full touch-none cursor-pointer"
        style={{ touchAction: 'none' }}
        onPointerDown={handlePointerDown}
      />
    </div>
  );
}
