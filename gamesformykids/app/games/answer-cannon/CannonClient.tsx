'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { CANNON_QUESTIONS, type CannonQuestion } from './cannonQuestions';

const MAX_LIVES = 3;
const BUBBLE_SPEED = 0.06; // px per ms
const BULLET_SPEED = 0.55;
const BUBBLE_RADIUS = 46;
const CANNON_X_RATIO = 0.5;
const CANNON_Y_OFFSET = 80;
const BARREL_LENGTH = 60;
const BARREL_WIDTH = 14;

type Bubble = {
  id: number;
  x: number;
  y: number;
  label: string;
  isCorrect: boolean;
  color: string;
};

type Bullet = { x: number; y: number; vx: number; vy: number };

const BUBBLE_COLORS = ['#f97316', '#8b5cf6', '#0ea5e9', '#10b981'];

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

export default function CannonClient() {
  const [phase, setPhase] = useState<'menu' | 'playing' | 'result'>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [displayQuestion, setDisplayQuestion] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; ok: boolean } | null>(null);

  // Real-time game state in refs (no re-renders per frame)
  const bubblesRef = useRef<Bubble[]>([]);
  const bulletRef = useRef<Bullet | null>(null);
  const cannonAngleRef = useRef(-Math.PI / 2); // straight up
  const questionsRef = useRef<CannonQuestion[]>([]);
  const qIndexRef = useRef(0);
  const livesRef = useRef(MAX_LIVES);
  const scoreRef = useRef(0);
  const aimingRef = useRef(false);
  const nextBubbleIdRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const phaseRef = useRef<'menu' | 'playing' | 'result'>('menu');
  const feedbackTimerRef = useRef(0);
  const canvasSize = useRef({ w: 0, h: 0 });

  const startGame = useCallback(() => {
    const q = shuffle(CANNON_QUESTIONS);
    questionsRef.current = q;
    qIndexRef.current = 0;
    livesRef.current = MAX_LIVES;
    scoreRef.current = 0;
    bubblesRef.current = [];
    bulletRef.current = null;
    spawnTimerRef.current = 0;
    feedbackTimerRef.current = 0;
    setScore(0);
    setLives(MAX_LIVES);
    setDisplayQuestion(q[0]?.question ?? '');
    phaseRef.current = 'playing';
    setPhase('playing');
  }, []);

  const spawnBubbles = useCallback((q: CannonQuestion, canvasW: number, canvasH: number) => {
    const opts = shuffle([q.correct, ...q.wrong]);
    const ys: number[] = [canvasH * 0.2, canvasH * 0.38, canvasH * 0.55, canvasH * 0.72];
    bubblesRef.current = opts.map((label, i) => ({
      id: nextBubbleIdRef.current++,
      x: canvasW + BUBBLE_RADIUS + 20,
      y: ys[i] ?? canvasH * 0.4,
      label,
      isCorrect: label === q.correct,
      color: BUBBLE_COLORS[i % BUBBLE_COLORS.length] ?? '#f97316',
    }));
  }, []);

  const advanceQuestion = useCallback((wasCorrect: boolean) => {
    const w = canvasSize.current.w;
    const h = canvasSize.current.h;
    if (wasCorrect) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    } else {
      livesRef.current -= 1;
      setLives(livesRef.current);
      if (livesRef.current <= 0) {
        phaseRef.current = 'result';
        setPhase('result');
        return;
      }
    }
    bulletRef.current = null;
    qIndexRef.current = (qIndexRef.current + 1) % questionsRef.current.length;
    const q = questionsRef.current[qIndexRef.current];
    if (!q) return;
    setDisplayQuestion(q.question);
    spawnBubbles(q, w, h);
  }, [spawnBubbles]);

  const canvasRef = useCanvasLoop(useCallback((ctx: CanvasRenderingContext2D, dt: number) => {
    if (phaseRef.current !== 'playing') return;

    const canvas = ctx.canvas;
    const W = canvas.width;
    const H = canvas.height;
    canvasSize.current = { w: W, h: H };

    const cannonX = W * CANNON_X_RATIO;
    const cannonY = H - CANNON_Y_OFFSET;

    // Spawn bubbles if none exist
    if (bubblesRef.current.length === 0) {
      const q = questionsRef.current[qIndexRef.current];
      if (q) spawnBubbles(q, W, H);
    }

    // Move bubbles
    bubblesRef.current.forEach(b => { b.x -= BUBBLE_SPEED * dt; });
    // Remove off-screen bubbles
    const wasAny = bubblesRef.current.length > 0;
    bubblesRef.current = bubblesRef.current.filter(b => b.x > -BUBBLE_RADIUS - 20);
    if (wasAny && bubblesRef.current.length === 0 && bulletRef.current === null) {
      // All bubbles escaped — wrong answer
      setFeedback({ text: '❌ פספסת!', ok: false });
      feedbackTimerRef.current = 1200;
      advanceQuestion(false);
    }

    // Move bullet
    const bull = bulletRef.current;
    if (bull) {
      bull.x += bull.vx * dt;
      bull.y += bull.vy * dt;
      // Off screen
      if (bull.x < 0 || bull.x > W || bull.y < 0 || bull.y > H) {
        bulletRef.current = null;
      } else {
        // Collision detection
        for (const b of bubblesRef.current) {
          const dx = bull.x - b.x;
          const dy = bull.y - b.y;
          if (Math.sqrt(dx * dx + dy * dy) < BUBBLE_RADIUS + 8) {
            const ok = b.isCorrect;
            setFeedback({ text: ok ? `✅ ${b.label}!` : `❌ ${b.label}`, ok });
            feedbackTimerRef.current = 1000;
            bulletRef.current = null;
            bubblesRef.current = [];
            advanceQuestion(ok);
            break;
          }
        }
      }
    }

    // Feedback timer
    if (feedbackTimerRef.current > 0) {
      feedbackTimerRef.current -= dt;
      if (feedbackTimerRef.current <= 0) setFeedback(null);
    }

    // ─── Draw ─────────────────────────────────────────────────────────────────
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#1e3a5f');
    sky.addColorStop(0.7, '#2563eb');
    sky.addColorStop(1, '#1d4ed8');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Ground
    ctx.fillStyle = '#065f46';
    ctx.fillRect(0, H - 50, W, 50);
    ctx.fillStyle = '#059669';
    ctx.fillRect(0, H - 54, W, 10);

    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    for (let i = 0; i < 30; i++) {
      const sx = ((i * 137 + 50) % W);
      const sy = ((i * 89 + 20) % (H * 0.6));
      ctx.beginPath();
      ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bubbles
    ctx.save();
    ctx.direction = 'rtl';
    for (const b of bubblesRef.current) {
      // Shadow
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 10;
      // Circle
      ctx.beginPath();
      ctx.arc(b.x, b.y, BUBBLE_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.shadowBlur = 0;
      // Text
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${b.label.length > 3 ? '16' : '20'}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.label, b.x, b.y);
    }
    ctx.restore();

    // Cannon base
    ctx.fillStyle = '#374151';
    ctx.beginPath();
    ctx.arc(cannonX, cannonY, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Cannon barrel
    const angle = cannonAngleRef.current;
    ctx.save();
    ctx.translate(cannonX, cannonY);
    ctx.rotate(angle);
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.roundRect(-BARREL_WIDTH / 2, -BARREL_LENGTH, BARREL_WIDTH, BARREL_LENGTH, 4);
    ctx.fill();
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Bullet
    if (bulletRef.current) {
      const bul = bulletRef.current;
      ctx.beginPath();
      ctx.arc(bul.x, bul.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [advanceQuestion, spawnBubbles]));

  // Pointer events for aiming and shooting
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== 'playing') return;
    if (bulletRef.current) return; // bullet in flight
    e.currentTarget.setPointerCapture(e.pointerId);
    aimingRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const cannonX = rect.width * CANNON_X_RATIO;
    const cannonY = rect.height - CANNON_Y_OFFSET;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let ang = Math.atan2(my - cannonY, mx - cannonX);
    ang = Math.max(-Math.PI + 0.1, Math.min(-0.1, ang));
    cannonAngleRef.current = ang;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!aimingRef.current || phaseRef.current !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cannonX = rect.width * CANNON_X_RATIO;
    const cannonY = rect.height - CANNON_Y_OFFSET;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let ang = Math.atan2(my - cannonY, mx - cannonX);
    ang = Math.max(-Math.PI + 0.1, Math.min(-0.1, ang));
    cannonAngleRef.current = ang;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!aimingRef.current || phaseRef.current !== 'playing') return;
    aimingRef.current = false;
    if (bulletRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cannonX = rect.width * CANNON_X_RATIO;
    const cannonY = rect.height - CANNON_Y_OFFSET;
    const angle = cannonAngleRef.current;
    bulletRef.current = {
      x: cannonX + Math.cos(angle) * BARREL_LENGTH,
      y: cannonY + Math.sin(angle) * BARREL_LENGTH,
      vx: Math.cos(angle) * BULLET_SPEED,
      vy: Math.sin(angle) * BULLET_SPEED,
    };
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

  const heartStr = '❤️'.repeat(lives) + '🖤'.repeat(MAX_LIVES - lives);

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 p-6 text-white">
        <div className="text-7xl mb-4">🎯</div>
        <h1 className="text-4xl font-bold mb-2">תותחן תשובות</h1>
        <p className="text-xl mb-2 text-blue-200">כוון את התותח — ירה על התשובה הנכונה!</p>
        <p className="text-sm text-blue-300 mb-8">לחץ וגרור לכיוון, שחרר כדי לירות</p>
        <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-sm w-full">
          <div className="flex gap-4 text-sm text-center">
            <div className="flex-1"><div className="text-2xl mb-1">🎯</div><div>כוון</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">💥</div><div>ירה</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🏆</div><div>נצח</div></div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🎮 בואו נשחק!
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    const total = CANNON_QUESTIONS.length;
    const pct = Math.round((score / Math.min(total, 20)) * 100);
    const medal = pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : '🥉';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 p-6 text-white">
        <div className="text-6xl mb-4">{medal}</div>
        <h1 className="text-3xl font-bold mb-2">כל הכבוד!</h1>
        <p className="text-xl mb-6 text-blue-200">פגעת ב־{score} מטרות!</p>
        <div className="flex gap-8 mb-8">
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-yellow-400">{score}</div>
            <div className="text-sm text-blue-200">פגיעות</div>
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
        <div className="text-lg font-bold">{heartStr}</div>
        <div className="text-lg font-bold bg-yellow-400/20 px-3 py-1 rounded-lg text-yellow-300">
          🎯 {score}
        </div>
      </div>
      {/* Question */}
      <div className="bg-white/10 text-white text-center py-3 px-4 text-xl font-bold z-10 min-h-[56px] flex items-center justify-center">
        {displayQuestion}
      </div>
      {/* Feedback toast */}
      {feedback && (
        <div className={`absolute top-32 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full text-white font-bold text-lg shadow-lg ${feedback.ok ? 'bg-green-500' : 'bg-red-500'}`}>
          {feedback.text}
        </div>
      )}
      {/* Instruction */}
      <div className="text-center text-blue-300 text-xs py-1 z-10">
        לחץ, גרור וכוון — שחרר כדי לירות
      </div>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="flex-1 w-full touch-none cursor-crosshair"
        style={{ touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    </div>
  );
}
