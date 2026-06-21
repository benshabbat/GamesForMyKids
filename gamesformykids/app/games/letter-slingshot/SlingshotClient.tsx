'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { speakHebrew } from '@/lib/utils/speech/speaker';

type Level = { letter: string; correct: string; wrong: [string, string] };

const LEVELS: Level[] = [
  { letter: 'א', correct: 'אריה', wrong: ['כלב', 'ספר'] },
  { letter: 'ב', correct: 'בית', wrong: ['ילד', 'מכונית'] },
  { letter: 'ג', correct: 'גמל', wrong: ['פיל', 'כלב'] },
  { letter: 'ד', correct: 'דג', wrong: ['ירח', 'שמש'] },
  { letter: 'ה', correct: 'הר', wrong: ['ים', 'כלב'] },
  { letter: 'ו', correct: 'ורד', wrong: ['כלב', 'ספר'] },
  { letter: 'ז', correct: 'זאב', wrong: ['ארנב', 'חתול'] },
  { letter: 'ח', correct: 'חתול', wrong: ['כלב', 'ספר'] },
  { letter: 'ט', correct: 'טלה', wrong: ['פרה', 'ספר'] },
  { letter: 'י', correct: 'ירח', wrong: ['שמש', 'כוכב'] },
  { letter: 'כ', correct: 'כלב', wrong: ['חתול', 'ארנב'] },
  { letter: 'ל', correct: 'לב', wrong: ['ידיים', 'כלב'] },
  { letter: 'מ', correct: 'מכונית', wrong: ['אוטובוס', 'רכבת'] },
  { letter: 'נ', correct: 'נחש', wrong: ['חתול', 'כלב'] },
  { letter: 'ס', correct: 'סוס', wrong: ['חמור', 'פרה'] },
  { letter: 'ע', correct: 'עץ', wrong: ['פרח', 'שמש'] },
  { letter: 'פ', correct: 'פיל', wrong: ['גמל', 'ארנב'] },
  { letter: 'צ', correct: 'צב', wrong: ['נחש', 'כלב'] },
  { letter: 'ק', correct: 'קוף', wrong: ['פיל', 'כלב'] },
  { letter: 'ר', correct: 'רכבת', wrong: ['מכונית', 'אוטובוס'] },
  { letter: 'ש', correct: 'שמש', wrong: ['ירח', 'כוכב'] },
  { letter: 'ת', correct: 'תפוח', wrong: ['ספר', 'כלב'] },
];

const LEVELS_PER_GAME = 8;
const GRAVITY = 0.00055; // px/ms²
const POWER = 0.006;     // vx/vy per pixel of drag
const MAX_DRAG = 90;     // pixels
const BOX_W = 110;
const BOX_H = 50;
const BALL_R = 22;
const SLING_X_FRAC = 0.22;
const SLING_Y_FRAC = 0.55;

type Phase = 'menu' | 'aiming' | 'flying' | 'feedback' | 'result';
type Box = { x: number; y: number; word: string; isCorrect: boolean; popped: boolean };
type Ball = { x: number; y: number; vx: number; vy: number };
type DragState = { active: boolean; dx: number; dy: number };

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

export default function SlingshotClient() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [score, setScore] = useState(0);
  const [levelIdx, setLevelIdx] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackOk, setFeedbackOk] = useState(false);

  const phaseRef = useRef<Phase>('menu');
  const scoreRef = useRef(0);
  const levelIdxRef = useRef(0);
  const gameLevelsRef = useRef<Level[]>([]);
  const ballRef = useRef<Ball>({ x: 0, y: 0, vx: 0, vy: 0 });
  const dragRef = useRef<DragState>({ active: false, dx: 0, dy: 0 });
  const boxesRef = useRef<Box[]>([]);
  const slingPosRef = useRef({ x: 0, y: 0 });
  const feedbackTimerRef = useRef(0);

  const buildBoxes = useCallback((level: Level, W: number, H: number) => {
    const words = shuffled([level.correct, level.wrong[0], level.wrong[1]]);
    const ys = [H * 0.2, H * 0.5, H * 0.8];
    boxesRef.current = words.map((word, i) => ({
      x: W * 0.7,
      y: (ys[i] ?? H * 0.5) - BOX_H / 2,
      word,
      isCorrect: word === level.correct,
      popped: false,
    }));
  }, []);

  const loadLevel = useCallback((idx: number, W: number, H: number) => {
    const level = gameLevelsRef.current[idx];
    if (!level) return;
    buildBoxes(level, W, H);
    ballRef.current = { x: slingPosRef.current.x, y: slingPosRef.current.y, vx: 0, vy: 0 };
    dragRef.current = { active: false, dx: 0, dy: 0 };
    phaseRef.current = 'aiming';
    setPhase('aiming');
    setLevelIdx(idx);
    levelIdxRef.current = idx;
    speakHebrew(level.letter);
  }, [buildBoxes]);

  const startGame = useCallback(() => {
    const chosen = shuffled(LEVELS).slice(0, LEVELS_PER_GAME);
    gameLevelsRef.current = chosen;
    scoreRef.current = 0;
    setScore(0);
    phaseRef.current = 'aiming';
    setPhase('aiming');
    // Actual level loads after canvas ref is ready (first frame)
  }, []);

  const canvasRef = useCanvasLoop(useCallback((ctx: CanvasRenderingContext2D, dt: number) => {
    const phase = phaseRef.current;
    if (phase === 'menu' || phase === 'result') return;

    const W = ctx.canvas.width;
    const H = ctx.canvas.height;
    const sx = W * SLING_X_FRAC;
    const sy = H * SLING_Y_FRAC;
    slingPosRef.current = { x: sx, y: sy };

    // Initialize first level after canvas size is known
    if (boxesRef.current.length === 0 && gameLevelsRef.current.length > 0) {
      loadLevel(levelIdxRef.current, W, H);
      ballRef.current = { x: sx, y: sy, vx: 0, vy: 0 };
      return;
    }

    // Feedback timer
    if (feedbackTimerRef.current > 0) {
      feedbackTimerRef.current -= dt;
      if (feedbackTimerRef.current <= 0 && phase === 'feedback') {
        const next = levelIdxRef.current + 1;
        if (next >= gameLevelsRef.current.length) {
          phaseRef.current = 'result';
          setPhase('result');
        } else {
          loadLevel(next, W, H);
        }
      }
    }

    // Physics update
    if (phase === 'flying') {
      const b = ballRef.current;
      b.vy += GRAVITY * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      // Check box collisions
      for (const box of boxesRef.current) {
        if (box.popped) continue;
        if (b.x + BALL_R > box.x && b.x - BALL_R < box.x + BOX_W &&
            b.y + BALL_R > box.y && b.y - BALL_R < box.y + BOX_H) {
          box.popped = true;
          const ok = box.isCorrect;
          if (ok) {
            scoreRef.current += 10;
            setScore(scoreRef.current);
            setFeedbackText(`✅ ${box.word} מתחיל ב-${gameLevelsRef.current[levelIdxRef.current]?.letter}!`);
          } else {
            setFeedbackText(`❌ ${box.word} לא מתחיל ב-${gameLevelsRef.current[levelIdxRef.current]?.letter}`);
          }
          setFeedbackOk(ok);
          speakHebrew(box.word);
          feedbackTimerRef.current = 1800;
          phaseRef.current = 'feedback';
          setPhase('feedback');
          break;
        }
      }

      // Ball went off screen → miss
      if (b.x > W + 50 || b.y > H + 50) {
        setFeedbackText('❌ פספסת!');
        setFeedbackOk(false);
        feedbackTimerRef.current = 1200;
        phaseRef.current = 'feedback';
        setPhase('feedback');
      }
    }

    // ── Draw ────────────────────────────────────────────────────────────────
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#bfdbfe');
    sky.addColorStop(1, '#93c5fd');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Ground
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(0, H * 0.88, W, H * 0.12);
    ctx.fillStyle = '#15803d';
    ctx.fillRect(0, H * 0.88, W, 6);

    // Clouds (static)
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    for (let i = 0; i < 3; i++) {
      const cx = (W * 0.15 + i * W * 0.3) % W;
      ctx.beginPath();
      ctx.ellipse(cx, H * 0.12, 40, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + 28, H * 0.12 + 5, 30, 15, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Slingshot fork
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    // Base
    ctx.beginPath();
    ctx.moveTo(sx, sy + 30);
    ctx.lineTo(sx, sy + 70);
    ctx.stroke();
    // Left arm
    ctx.beginPath();
    ctx.moveTo(sx, sy + 30);
    ctx.lineTo(sx - 18, sy - 25);
    ctx.stroke();
    // Right arm
    ctx.beginPath();
    ctx.moveTo(sx, sy + 30);
    ctx.lineTo(sx + 18, sy - 25);
    ctx.stroke();

    // Slingshot rubber bands (to ball)
    const bx = phase === 'aiming'
      ? sx + Math.max(-MAX_DRAG, Math.min(MAX_DRAG, dragRef.current.dx))
      : ballRef.current.x;
    const by = phase === 'aiming'
      ? sy + Math.max(-MAX_DRAG, Math.min(MAX_DRAG, dragRef.current.dy))
      : ballRef.current.y;

    if (phase === 'aiming' || phase === 'feedback') {
      ctx.strokeStyle = '#c4b5fd';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(sx - 18, sy - 25);
      ctx.lineTo(bx, by);
      ctx.moveTo(sx + 18, sy - 25);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }

    // Trajectory dots (when aiming with drag active)
    if (phase === 'aiming' && dragRef.current.active && (dragRef.current.dx !== 0 || dragRef.current.dy !== 0)) {
      const clampedDx = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, dragRef.current.dx));
      const clampedDy = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, dragRef.current.dy));
      const tvx = -clampedDx * POWER;
      const tvy = -clampedDy * POWER;
      ctx.fillStyle = 'rgba(124,58,237,0.5)';
      for (let t = 50; t < 1500; t += 80) {
        const tx = sx + tvx * t;
        const ty = sy + tvy * t + 0.5 * GRAVITY * t * t;
        if (tx > W || ty > H) break;
        ctx.beginPath();
        ctx.arc(tx, ty, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Boxes
    for (const box of boxesRef.current) {
      if (box.popped) {
        // Popped effect
        ctx.fillStyle = box.isCorrect ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)';
        ctx.fillRect(box.x, box.y, BOX_W, BOX_H);
      } else {
        // Box body
        ctx.fillStyle = '#fef3c7';
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(box.x, box.y, BOX_W, BOX_H, 8);
        ctx.fill();
        ctx.stroke();

        // Box text
        ctx.fillStyle = '#1e1b4b';
        ctx.font = `bold 18px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(box.word, box.x + BOX_W / 2, box.y + BOX_H / 2);
      }
    }

    // Ball
    ctx.shadowColor = '#7c3aed';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(bx, by, BALL_R, 0, Math.PI * 2);
    ctx.fillStyle = '#7c3aed';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#c4b5fd';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Letter on ball
    const currentLevel = gameLevelsRef.current[levelIdxRef.current];
    if (currentLevel) {
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${BALL_R}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentLevel.letter, bx, by + 2);
    }
  }, [loadLevel]));

  // Pointer events for slingshot drag
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== 'aiming') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = e.currentTarget.width / rect.width;
    const scaleY = e.currentTarget.height / rect.height;
    const px = (e.clientX - rect.left) * scaleX;
    const py = (e.clientY - rect.top) * scaleY;
    const { x: sx, y: sy } = slingPosRef.current;
    const dist = Math.sqrt((px - sx) ** 2 + (py - sy) ** 2);
    if (dist < 60) {
      dragRef.current = { active: true, dx: px - sx, dy: py - sy };
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.active || phaseRef.current !== 'aiming') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = e.currentTarget.width / rect.width;
    const scaleY = e.currentTarget.height / rect.height;
    const px = (e.clientX - rect.left) * scaleX;
    const py = (e.clientY - rect.top) * scaleY;
    const { x: sx, y: sy } = slingPosRef.current;
    dragRef.current = { active: true, dx: px - sx, dy: py - sy };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!dragRef.current.active || phaseRef.current !== 'aiming') return;
    const { dx, dy } = dragRef.current;
    const clampedDx = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, dx));
    const clampedDy = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, dy));
    const { x: sx, y: sy } = slingPosRef.current;
    ballRef.current = {
      x: sx,
      y: sy,
      vx: -clampedDx * POWER,
      vy: -clampedDy * POWER,
    };
    dragRef.current = { active: false, dx: 0, dy: 0 };
    phaseRef.current = 'flying';
    setPhase('flying');
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

  const currentLevel = gameLevelsRef.current[levelIdx];

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-400 p-6 text-white" dir="rtl">
        <div className="text-7xl mb-4">🎯</div>
        <h1 className="text-4xl font-bold mb-2 text-blue-900">קלע אותיות</h1>
        <p className="text-xl mb-2 text-blue-800">קלע לקופסה עם המילה הנכונה!</p>
        <p className="text-sm text-blue-700 mb-8">גרור את הכדור אחורה ושחרר לכיוון המילה שמתחילה באות</p>
        <div className="bg-white/30 rounded-xl p-4 mb-8 max-w-sm w-full text-blue-900">
          <div className="flex gap-4 text-sm text-center">
            <div className="flex-1"><div className="text-2xl mb-1">👀</div><div>ראה את האות על הכדור</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🎯</div><div>גרור ושחרר</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🏆</div><div>פגע במילה הנכונה</div></div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🚀 יאללה, נשגר!
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / (LEVELS_PER_GAME * 10)) * 100);
    const medal = pct >= 80 ? '🥇' : pct >= 50 ? '🥈' : '🥉';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-400 p-6 text-white" dir="rtl">
        <div className="text-6xl mb-4">{medal}</div>
        <h1 className="text-3xl font-bold mb-2 text-blue-900">כל הכבוד, קלעי!</h1>
        <p className="text-xl mb-6 text-blue-800">ניקוד: {score} מתוך {LEVELS_PER_GAME * 10}</p>
        <div className="flex gap-8 mb-8">
          <div className="text-center bg-white/30 rounded-xl p-4 text-blue-900">
            <div className="text-3xl font-bold">{score}</div>
            <div className="text-sm">נקודות</div>
          </div>
          <div className="text-center bg-white/30 rounded-xl p-4 text-blue-900">
            <div className="text-3xl font-bold">{pct}%</div>
            <div className="text-sm">דיוק</div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🔄 שחק שוב
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-300 flex flex-col" dir="rtl">
      {/* HUD */}
      <div className="flex items-center justify-between px-4 py-2 bg-blue-900/80 text-white z-10">
        <div className="text-sm text-blue-200">שלב {levelIdx + 1}/{LEVELS_PER_GAME}</div>
        <div className="flex items-center gap-3">
          {currentLevel && (
            <div className="text-3xl font-bold text-yellow-300 bg-purple-700 rounded-full w-12 h-12 flex items-center justify-center">
              {currentLevel.letter}
            </div>
          )}
          <div className="text-sm text-blue-200">מצא מילה שמתחילה ב...</div>
        </div>
        <div className="text-lg font-bold text-yellow-300">{score} 🎯</div>
      </div>
      {/* Feedback toast */}
      {(phase === 'feedback') && (
        <div className={`absolute top-16 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full font-bold text-lg shadow-lg whitespace-nowrap
          ${feedbackOk ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {feedbackText}
        </div>
      )}
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="flex-1 w-full touch-none"
        style={{ touchAction: 'none', cursor: phase === 'aiming' ? 'crosshair' : 'default' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {phase === 'aiming' && (
        <div className="text-center py-2 text-sm text-blue-900 bg-blue-200">
          גרור את הכדור הסגול אחורה ושחרר 🎯
        </div>
      )}
    </div>
  );
}
