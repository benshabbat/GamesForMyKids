'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { speakHebrew } from '@/lib/utils/speech/speaker';

const LETTER_WORDS = [
  { letter: 'א', word: 'אריה', emoji: '🦁' },
  { letter: 'ב', word: 'בית', emoji: '🏠' },
  { letter: 'ג', word: 'גמל', emoji: '🐪' },
  { letter: 'ד', word: 'דג', emoji: '🐟' },
  { letter: 'ה', word: 'הר', emoji: '⛰️' },
  { letter: 'ו', word: 'ורד', emoji: '🌹' },
  { letter: 'ז', word: 'זאב', emoji: '🐺' },
  { letter: 'ח', word: 'חתול', emoji: '🐱' },
  { letter: 'ט', word: 'טלה', emoji: '🐑' },
  { letter: 'י', word: 'ירח', emoji: '🌙' },
  { letter: 'כ', word: 'כלב', emoji: '🐶' },
  { letter: 'ל', word: 'לב', emoji: '❤️' },
  { letter: 'מ', word: 'מכונית', emoji: '🚗' },
  { letter: 'נ', word: 'נחש', emoji: '🐍' },
  { letter: 'ס', word: 'סוס', emoji: '🐴' },
  { letter: 'ע', word: 'עץ', emoji: '🌳' },
  { letter: 'פ', word: 'פיל', emoji: '🐘' },
  { letter: 'צ', word: 'צב', emoji: '🐢' },
  { letter: 'ק', word: 'קוף', emoji: '🐒' },
  { letter: 'ר', word: 'רכבת', emoji: '🚂' },
  { letter: 'ש', word: 'שמש', emoji: '☀️' },
  { letter: 'ת', word: 'תפוח', emoji: '🍎' },
];

const ROUNDS_PER_GAME = 5;
const CATCHES_TO_EVOLVE = 5;
const MAX_LIVES = 3;
const BUCKET_W = 90;
const BUCKET_H = 26;
const LETTER_RADIUS = 30;
const SPAWN_INTERVAL = 1000; // ms
const FALL_SPEED_MIN = 0.14; // px/ms
const FALL_SPEED_MAX = 0.22;

const LETTER_COLORS = [
  '#f43f5e', '#f97316', '#eab308', '#22c55e',
  '#0ea5e9', '#8b5cf6', '#ec4899', '#06b6d4',
];

type FallingLetter = {
  id: number;
  x: number;
  y: number;
  vy: number;
  letter: string;
  isTarget: boolean;
};

type LetterWord = typeof LETTER_WORDS[number];

let _nextId = 0;

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

export default function LetterGrowClient() {
  const [phase, setPhase] = useState<'menu' | 'playing' | 'evolving' | 'result'>('menu');
  const [lives, setLives] = useState(MAX_LIVES);
  const [catchCount, setCatchCount] = useState(0);
  const [score, setScore] = useState(0);
  const [roundIdx, setRoundIdx] = useState(0);
  const [evolveInfo, setEvolveInfo] = useState<LetterWord | null>(null);
  const [hurtFlash, setHurtFlash] = useState(false);

  const phaseRef = useRef<'menu' | 'playing' | 'evolving' | 'result'>('menu');
  const livesRef = useRef(MAX_LIVES);
  const catchCountRef = useRef(0);
  const scoreRef = useRef(0);
  const roundIdxRef = useRef(0);
  const roundLettersRef = useRef<LetterWord[]>([]);
  const fallingRef = useRef<FallingLetter[]>([]);
  const bucketXRef = useRef(0.5); // fraction 0-1
  const spawnTimerRef = useRef(0);

  const currentTarget = () => roundLettersRef.current[roundIdxRef.current];

  const spawnLetter = useCallback((W: number) => {
    const target = currentTarget();
    if (!target) return;
    const isTarget = Math.random() < 0.55;
    let letter: string;
    if (isTarget) {
      letter = target.letter;
    } else {
      const others = LETTER_WORDS.filter(lw => lw.letter !== target.letter);
      letter = (others[Math.floor(Math.random() * others.length)] ?? LETTER_WORDS[0]!).letter;
    }
    fallingRef.current.push({
      id: _nextId++,
      x: LETTER_RADIUS + Math.random() * (W - LETTER_RADIUS * 2),
      y: -LETTER_RADIUS,
      vy: FALL_SPEED_MIN + Math.random() * (FALL_SPEED_MAX - FALL_SPEED_MIN),
      letter,
      isTarget,
    });
  }, []);

  const advanceRound = useCallback(() => {
    const next = roundIdxRef.current + 1;
    scoreRef.current = next;
    setScore(next);
    if (next >= ROUNDS_PER_GAME) {
      phaseRef.current = 'result';
      setPhase('result');
    } else {
      roundIdxRef.current = next;
      setRoundIdx(next);
      catchCountRef.current = 0;
      setCatchCount(0);
      fallingRef.current = [];
      spawnTimerRef.current = 0;
      phaseRef.current = 'playing';
      setPhase('playing');
      const nextTarget = roundLettersRef.current[next];
      if (nextTarget) speakHebrew(nextTarget.letter);
    }
  }, []);

  const triggerEvolution = useCallback(() => {
    const target = currentTarget();
    if (!target) return;
    phaseRef.current = 'evolving';
    setPhase('evolving');
    setEvolveInfo(target);
    fallingRef.current = [];
    speakHebrew(target.word);
    setTimeout(() => advanceRound(), 2800);
  }, [advanceRound]);

  const startGame = useCallback(() => {
    const chosen = shuffled(LETTER_WORDS).slice(0, ROUNDS_PER_GAME);
    roundLettersRef.current = chosen;
    roundIdxRef.current = 0;
    livesRef.current = MAX_LIVES;
    catchCountRef.current = 0;
    scoreRef.current = 0;
    fallingRef.current = [];
    spawnTimerRef.current = 0;
    bucketXRef.current = 0.5;
    setLives(MAX_LIVES);
    setCatchCount(0);
    setScore(0);
    setRoundIdx(0);
    setEvolveInfo(null);
    phaseRef.current = 'playing';
    setPhase('playing');
    speakHebrew(chosen[0]?.letter ?? '');
  }, []);

  const canvasRef = useCanvasLoop(useCallback((ctx: CanvasRenderingContext2D, dt: number) => {
    if (phaseRef.current !== 'playing') return;

    const W = ctx.canvas.width;
    const H = ctx.canvas.height;

    spawnTimerRef.current -= dt;
    if (spawnTimerRef.current <= 0) {
      spawnLetter(W);
      spawnTimerRef.current = SPAWN_INTERVAL;
    }

    const bucketX = bucketXRef.current * W;
    const bucketY = H - BUCKET_H - 12;

    // Update falling letters & check collisions
    const survived: FallingLetter[] = [];
    let caught: FallingLetter | null = null;
    for (const fl of fallingRef.current) {
      fl.y += fl.vy * dt;
      if (fl.y - LETTER_RADIUS > H) continue; // gone off screen
      // Collision: letter center near bucket
      if (!caught && fl.y + LETTER_RADIUS >= bucketY && fl.y - LETTER_RADIUS <= bucketY + BUCKET_H) {
        const dx = Math.abs(fl.x - bucketX);
        if (dx < BUCKET_W / 2 + LETTER_RADIUS * 0.4) {
          caught = fl;
          continue; // remove from survived
        }
      }
      survived.push(fl);
    }
    fallingRef.current = survived;

    if (caught) {
      if (caught.isTarget) {
        catchCountRef.current += 1;
        setCatchCount(catchCountRef.current);
        if (catchCountRef.current >= CATCHES_TO_EVOLVE) {
          triggerEvolution();
          return;
        }
      } else {
        livesRef.current -= 1;
        setLives(livesRef.current);
        setHurtFlash(true);
        setTimeout(() => setHurtFlash(false), 300);
        if (livesRef.current <= 0) {
          phaseRef.current = 'result';
          setPhase('result');
          return;
        }
      }
    }

    // ── Draw ────────────────────────────────────────────────────────────────
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#1e1b4b');
    sky.addColorStop(0.6, '#312e81');
    sky.addColorStop(1, '#1e3a5f');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    for (let i = 0; i < 30; i++) {
      const sx = ((i * 137 + 23) % W);
      const sy = ((i * 89 + 11) % (H * 0.7));
      ctx.fillRect(sx, sy, 2, 2);
    }

    // Ground
    ctx.fillStyle = '#4c1d95';
    ctx.fillRect(0, H - 8, W, 8);

    // Target letter indicator (left column)
    const target = roundLettersRef.current[roundIdxRef.current];

    // Falling letters
    for (const fl of fallingRef.current) {
      const colorIdx = fl.letter.codePointAt(0)! % LETTER_COLORS.length;
      const color = LETTER_COLORS[colorIdx] ?? '#f43f5e';
      const isT = fl.isTarget;

      ctx.save();
      ctx.translate(fl.x, fl.y);

      // Glow for target letter
      if (isT) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 18;
      }

      // Circle
      ctx.beginPath();
      ctx.arc(0, 0, LETTER_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = isT ? color : 'rgba(100,100,120,0.7)';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Border
      ctx.strokeStyle = isT ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Letter text
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${LETTER_RADIUS}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(fl.letter, 0, 2);

      ctx.restore();
    }

    // Bucket
    ctx.save();
    ctx.translate(bucketX, bucketY);
    const bw2 = BUCKET_W / 2;
    // Bucket body
    ctx.beginPath();
    ctx.roundRect(-bw2, 0, BUCKET_W, BUCKET_H, 8);
    ctx.fillStyle = '#fbbf24';
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.stroke();
    // Handle
    ctx.beginPath();
    ctx.arc(0, -6, bw2 - 8, Math.PI, 0);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.stroke();
    // Target letter inside bucket
    if (target) {
      ctx.fillStyle = '#1e1b4b';
      ctx.font = `bold ${BUCKET_H - 6}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(target.letter, 0, BUCKET_H / 2);
    }
    ctx.restore();
  }, [spawnLetter, triggerEvolution]));

  // Pointer/touch for bucket movement
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    bucketXRef.current = Math.max(0.05, Math.min(0.95, (e.clientX - rect.left) / rect.width));
  }, []);

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

  const target = roundLettersRef.current[roundIdx];
  const heartStr = '❤️'.repeat(lives) + '🖤'.repeat(MAX_LIVES - lives);

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-purple-900 p-6 text-white" dir="rtl">
        <div className="text-7xl mb-4">🌱</div>
        <h1 className="text-4xl font-bold mb-2">לצמוח למילה</h1>
        <p className="text-xl mb-2 text-purple-200">תפוס אותיות ותגדל למילה!</p>
        <p className="text-sm text-purple-300 mb-8">זז עם העכבר / אצבע כדי להזיז את הדלי</p>
        <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-sm w-full">
          <div className="flex gap-4 text-sm text-center">
            <div className="flex-1"><div className="text-2xl mb-1">👁️</div><div>ראה איזו אות מחפשים</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🪣</div><div>תפוס 5 אותיות</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🌟</div><div>האות תצמח למילה!</div></div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🚀 בואו נשחק!
        </button>
      </div>
    );
  }

  if (phase === 'evolving' && evolveInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-purple-900 p-6 text-white" dir="rtl">
        <div className="animate-bounce text-8xl mb-6">{evolveInfo.emoji}</div>
        <div className="text-6xl font-bold mb-2 text-yellow-300">{evolveInfo.letter}</div>
        <div className="text-4xl mb-2">→</div>
        <div className="text-5xl font-bold text-green-300 mb-4">{evolveInfo.word}!</div>
        <p className="text-lg text-purple-200">האות {evolveInfo.letter} גדלה למילה!</p>
        <div className="mt-6 flex gap-3">
          {Array.from({ length: ROUNDS_PER_GAME }).map((_, i) => (
            <div key={i} className={`w-8 h-8 rounded-full border-2 ${i < score ? 'bg-yellow-400 border-yellow-300' : 'bg-white/10 border-white/30'}`} />
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / ROUNDS_PER_GAME) * 100);
    const medal = pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : '🥉';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-purple-900 p-6 text-white" dir="rtl">
        <div className="text-6xl mb-4">{medal}</div>
        <h1 className="text-3xl font-bold mb-2">כל הכבוד!</h1>
        <p className="text-xl mb-6 text-purple-200">גידלת {score} מתוך {ROUNDS_PER_GAME} מילים!</p>
        <div className="flex gap-8 mb-8">
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-yellow-400">{score}</div>
            <div className="text-sm text-purple-200">מילים שגדלו</div>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-green-400">{pct}%</div>
            <div className="text-sm text-purple-200">דיוק</div>
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

  // Playing
  return (
    <div className={`min-h-screen bg-indigo-950 flex flex-col transition-colors ${hurtFlash ? 'bg-red-900' : ''}`} dir="rtl">
      {/* HUD */}
      <div className="flex items-center justify-between px-4 py-2 bg-indigo-950/80 text-white z-10">
        <div className="text-lg">{heartStr}</div>
        <div className="flex flex-col items-center">
          {target && (
            <div className="text-2xl font-bold text-yellow-300">{target.letter}</div>
          )}
          <div className="text-xs text-purple-300">תפוס {catchCount}/{CATCHES_TO_EVOLVE}</div>
        </div>
        <div className="text-sm text-purple-300">
          שלב {roundIdx + 1}/{ROUNDS_PER_GAME}
        </div>
      </div>
      {/* Progress bar */}
      <div className="h-2 bg-indigo-900">
        <div
          className="h-full bg-yellow-400 transition-all"
          style={{ width: `${(catchCount / CATCHES_TO_EVOLVE) * 100}%` }}
        />
      </div>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="flex-1 w-full touch-none cursor-none"
        style={{ touchAction: 'none' }}
        onPointerMove={handlePointerMove}
      />
    </div>
  );
}
