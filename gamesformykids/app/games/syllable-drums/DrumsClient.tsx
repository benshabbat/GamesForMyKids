'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

const WORDS_PER_GAME = 8;
const BEAT_INTERVAL_MS = 700;
const FALL_DURATION_MS = 1400;
const HIT_FRAC = 0.73;
const PERFECT_WINDOW = 160;
const GOOD_WINDOW = 340;
const CIRCLE_R = 30;

type BeatCircle = {
  id: number;
  letter: string;
  y: number;
  vy: number;
  perfectTimeMs: number;
  tapped: boolean;
  missed: boolean;
  ripple: number;     // >0 = show ripple animation, counts down
  rippleOk: boolean;
};

type BeatScore = 'perfect' | 'good' | 'miss';
type TapFeedback = { text: string; ok: boolean };

let _id = 0;

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i] as T;
    a[i] = a[j] as T;
    a[j] = tmp;
  }
  return a;
}

const CIRCLE_COLORS = ['#f43f5e', '#f97316', '#eab308', '#22c55e', '#0ea5e9', '#8b5cf6'];

export default function DrumsClient() {
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
    // Queue all circles with spawn times (first one at 1100ms = after TTS intro)
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
    // Find the closest non-tapped, non-missed circle to the hit zone
    let best: BeatCircle | null = null;
    let bestDiff = Infinity;
    for (const c of circlesRef.current) {
      if (c.tapped || c.missed) continue;
      const diff = Math.abs(now - c.perfectTimeMs);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = c;
      }
    }
    let score: BeatScore = 'miss';
    let feedback: TapFeedback;
    if (best && bestDiff <= GOOD_WINDOW) {
      best.tapped = true;
      best.ripple = 400;
      best.rippleOk = true;
      if (bestDiff <= PERFECT_WINDOW) {
        score = 'perfect';
        feedback = { text: 'מושלם! 🎯', ok: true };
      } else {
        score = 'good';
        feedback = { text: 'טוב! 👍', ok: true };
      }
      resolvedCountRef.current += 1;
    } else {
      // Premature tap — add a miss entry
      feedback = { text: 'מוקדם מדי ❌', ok: false };
    }
    beatScoresRef.current.push(score);
    setBeatScores([...beatScoresRef.current]);
    setTapFeedback(feedback);
    feedbackTimerRef.current = 700;

    // Check if word complete
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

    // Handle transition timer
    if (inTransitionRef.current) {
      transitionTimerRef.current -= dt;
      if (transitionTimerRef.current <= 0) {
        advanceWord();
        return;
      }
    }

    // Spawn circles from queue
    while (spawnQueueRef.current.length > 0 && (spawnQueueRef.current[0]?.spawnAt ?? Infinity) <= gameTimeRef.current) {
      const beat = spawnQueueRef.current.shift()!;
      const vy = (hitY + CIRCLE_R) / FALL_DURATION_MS;
      circlesRef.current.push({
        id: _id++,
        letter: beat.letter,
        y: -CIRCLE_R,
        vy,
        perfectTimeMs: beat.spawnAt + FALL_DURATION_MS,
        tapped: false,
        missed: false,
        ripple: 0,
        rippleOk: false,
      });
      spawnedCountRef.current += 1;
    }

    // Update circles
    for (const c of circlesRef.current) {
      if (c.tapped) {
        if (c.ripple > 0) c.ripple -= dt;
        continue;
      }
      c.y += c.vy * dt;
      // Miss detection: circle passed hit zone
      if (c.y > hitY + CIRCLE_R + 40 && !c.missed) {
        c.missed = true;
        c.ripple = 500;
        c.rippleOk = false;
        beatScoresRef.current.push('miss');
        setBeatScores([...beatScoresRef.current]);
        resolvedCountRef.current += 1;
        const totalBeats = wordListRef.current[wordIdxRef.current]?.letters.length ?? 0;
        if (resolvedCountRef.current >= totalBeats && !inTransitionRef.current) {
          finishWord();
        }
      }
    }

    // Remove circles gone off screen
    circlesRef.current = circlesRef.current.filter(c => c.y < H + 60 || c.ripple > 0);

    // ── Draw ───────────────────────────────────────────────────────────────
    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0f172a');
    bg.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Grid lines (subtle)
    ctx.strokeStyle = 'rgba(99,102,241,0.1)';
    ctx.lineWidth = 1;
    for (let y = 0; y < H; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Hit zone line
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W * 0.1, hitY);
    ctx.lineTo(W * 0.9, hitY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Drum emoji at hit zone center
    ctx.font = '32px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🥁', centerX, hitY + 28);

    // Circles
    for (const c of circlesRef.current) {
      const colorIdx = (c.letter.codePointAt(0) ?? 0) % CIRCLE_COLORS.length;
      const color = CIRCLE_COLORS[colorIdx] ?? '#f43f5e';
      const isClose = !c.tapped && !c.missed && Math.abs(c.y - hitY) < 60;

      ctx.save();
      ctx.translate(centerX, c.y);

      if (c.ripple > 0) {
        // Ripple animation
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

      // Glow when near hit zone
      if (isClose) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
      }

      // Circle body
      ctx.beginPath();
      ctx.arc(0, 0, CIRCLE_R, 0, Math.PI * 2);
      ctx.fillStyle = c.tapped ? '#4ade80' : c.missed ? '#6b7280' : color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Border
      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Letter
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${CIRCLE_R}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(c.letter, 0, 2);

      ctx.restore();
    }

  }, [advanceWord, finishWord]));

  // Sync canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [canvasRef]);

  const wordObj = wordListRef.current[wordIdx];
  const letters = wordObj?.letters ?? currentLetters;

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-indigo-900 p-6 text-white" dir="rtl">
        <div className="text-7xl mb-4">🥁</div>
        <h1 className="text-4xl font-bold mb-2">תופים עבריים</h1>
        <p className="text-xl mb-2 text-indigo-200">הקש בזמן הנכון לכל אות!</p>
        <p className="text-sm text-indigo-300 mb-8">הקשב למילה ◉ הקש כשהעיגולים מגיעים לקו</p>
        <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-sm w-full">
          <div className="flex gap-4 text-sm text-center">
            <div className="flex-1"><div className="text-2xl mb-1">👂</div><div>שמע את המילה</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">⬇️</div><div>עיגולים יורדים</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">👆</div><div>הקש על הקו!</div></div>
          </div>
        </div>
        <div className="flex gap-6 mb-6 text-center text-sm">
          <div><div className="text-green-400 font-bold text-lg">30</div><div className="text-indigo-300">מושלם</div></div>
          <div><div className="text-yellow-400 font-bold text-lg">15</div><div className="text-indigo-300">טוב</div></div>
          <div><div className="text-gray-400 font-bold text-lg">0</div><div className="text-indigo-300">פספסת</div></div>
        </div>
        <button
          onClick={startGame}
          className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🎮 התחל לתפוף!
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / Math.max(1, WORDS_PER_GAME * 3.5 * 30)) * 100);
    const medal = pct >= 80 ? '🥇' : pct >= 50 ? '🥈' : '🥉';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-indigo-900 p-6 text-white" dir="rtl">
        <div className="text-6xl mb-4">{medal}</div>
        <h1 className="text-3xl font-bold mb-2">כל הכבוד, מתופף!</h1>
        <p className="text-xl mb-6 text-indigo-200">ניקוד סופי: {score} נקודות</p>
        <div className="flex gap-8 mb-8">
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-yellow-400">{score}</div>
            <div className="text-sm text-indigo-200">נקודות</div>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-green-400">{WORDS_PER_GAME}</div>
            <div className="text-sm text-indigo-200">מילים</div>
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
    <div className="min-h-screen bg-slate-900 flex flex-col" dir="rtl">
      {/* HUD */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 text-white z-10">
        <div className="text-sm text-indigo-300">מילה {wordIdx + 1}/{WORDS_PER_GAME}</div>
        <div className="text-2xl font-bold text-yellow-300">{currentWord}</div>
        <div className="text-lg font-bold text-yellow-400">{score}</div>
      </div>
      {/* Letter breakdown */}
      <div className="flex justify-center gap-2 px-4 py-2 bg-slate-800/50 z-10">
        {letters.map((l, i) => {
          const s = beatScores[i];
          return (
            <div
              key={i}
              className={`w-9 h-9 flex items-center justify-center rounded-lg font-bold text-lg border-2 transition-all
                ${s === 'perfect' ? 'bg-green-500 border-green-400 text-white' :
                  s === 'good' ? 'bg-yellow-500 border-yellow-400 text-white' :
                  s === 'miss' ? 'bg-gray-600 border-gray-500 text-gray-300' :
                  'bg-slate-700 border-slate-500 text-slate-300'}`}
            >
              {l}
            </div>
          );
        })}
      </div>
      {/* Feedback */}
      {tapFeedback && feedbackTimerRef.current > 0 && (
        <div className={`absolute top-32 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full font-bold text-lg shadow-lg whitespace-nowrap
          ${tapFeedback.ok ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {tapFeedback.text}
        </div>
      )}
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="flex-1 w-full touch-none cursor-pointer"
        style={{ touchAction: 'none' }}
        onPointerDown={handleTap}
      />
      {/* Tap instruction */}
      <div className="text-center py-2 text-sm text-indigo-400 bg-slate-900">
        הקש על המסך כשהעיגול מגיע לקו הזהב 🥁
      </div>
    </div>
  );
}
