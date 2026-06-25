'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { speakHebrew } from '@/lib/utils/speech/speaker';

const WORDS = [
  { word: 'כלב',    color: '#3b82f6' }, { word: 'חתול',   color: '#ef4444' },
  { word: 'דג',     color: '#22c55e' }, { word: 'ציפור',  color: '#f97316' },
  { word: 'פרח',    color: '#a855f7' }, { word: 'תפוח',   color: '#14b8a6' },
  { word: 'ספר',    color: '#f59e0b' }, { word: 'בית',    color: '#ec4899' },
  { word: 'כוכב',   color: '#6366f1' }, { word: 'ירח',    color: '#84cc16' },
  { word: 'שמש',    color: '#eab308' }, { word: 'עץ',     color: '#16a34a' },
  { word: 'אוטו',   color: '#0ea5e9' }, { word: 'ספינה',  color: '#8b5cf6' },
  { word: 'עוגה',   color: '#fb7185' },
];

const R = 40;
const MAX_BUBBLES = 7;
export const HEARTS_MAX = 3;
const GRAVITY = 0.10;

const SPEED_MAP = { slow: 0.65, medium: 1.0, fast: 1.5 } as const;
export type Difficulty = keyof typeof SPEED_MAP;

interface Bubble { id: number; word: string; color: string; x: number; y: number; vx: number; vy: number; }
interface Pop { x: number; y: number; color: string; t: number; }
type Phase = 'menu' | 'playing' | 'result';
let _nextId = 0;

export function useLetterSlicerGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(HEARTS_MAX);
  const [target, setTarget] = useState('');
  const [diff, setDiff] = useState<Difficulty>('medium');

  const bubblesRef = useRef<Bubble[]>([]);
  const popsRef = useRef<Pop[]>([]);
  const targetRef = useRef('');
  const heartsRef = useRef(HEARTS_MAX);
  const scoreRef = useRef(0);
  const phaseRef = useRef<Phase>('menu');
  const diffRef = useRef<Difficulty>('medium');
  const spawnTimer = useRef(0);
  const targetTimer = useRef(0);
  const flashTimer = useRef(0);
  const successTimer = useRef(0);

  const pickTarget = useCallback(() => {
    const pool = bubblesRef.current;
    if (!pool.length) return;
    const t = pool[Math.floor(Math.random() * pool.length)]!.word;
    targetRef.current = t;
    setTarget(t);
    speakHebrew(`חתוך את: ${t}`);
  }, []);

  const startGame = useCallback((d: Difficulty) => {
    bubblesRef.current = []; popsRef.current = []; targetRef.current = '';
    heartsRef.current = HEARTS_MAX; scoreRef.current = 0;
    spawnTimer.current = 0; targetTimer.current = 0;
    flashTimer.current = 0; successTimer.current = 0;
    phaseRef.current = 'playing'; diffRef.current = d;
    setPhase('playing'); setHearts(HEARTS_MAX); setScore(0); setTarget(''); setDiff(d);
  }, []);

  const endGame = useCallback(() => {
    phaseRef.current = 'result';
    setPhase('result');
    setTimeout(() => speakHebrew(`כל הכבוד! קיבלת ${scoreRef.current} נקודות!`), 300);
  }, []);

  const canvasRef = useCanvasLoop(useCallback((ctx: CanvasRenderingContext2D, dt: number) => {
    if (phaseRef.current !== 'playing') return;
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;
    const spd = SPEED_MAP[diffRef.current];

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0f172a'); bg.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    for (let i = 0; i < 40; i++) {
      const sx = ((i * 137 + W * 0.3) % W); const sy = ((i * 97 + H * 0.2) % (H * 0.7));
      ctx.fillRect(sx, sy, 1.5, 1.5);
    }

    if (flashTimer.current > 0) {
      ctx.fillStyle = `rgba(239,68,68,${Math.min(flashTimer.current / 300, 0.45)})`;
      ctx.fillRect(0, 0, W, H);
      flashTimer.current = Math.max(0, flashTimer.current - dt);
    }
    if (successTimer.current > 0) {
      ctx.fillStyle = `rgba(34,197,94,${Math.min(successTimer.current / 300, 0.30)})`;
      ctx.fillRect(0, 0, W, H);
      successTimer.current = Math.max(0, successTimer.current - dt);
    }

    spawnTimer.current -= dt;
    if (spawnTimer.current <= 0 && bubblesRef.current.length < MAX_BUBBLES) {
      const item = WORDS[Math.floor(Math.random() * WORDS.length)]!;
      const fromLeft = Math.random() < 0.5;
      const x = fromLeft ? -R : W + R;
      const y = H * (0.45 + Math.random() * 0.35);
      const vx = (fromLeft ? 1 : -1) * (2.5 + Math.random() * 2) * spd;
      const vy = -(3.5 + Math.random() * 2.5) * spd;
      bubblesRef.current.push({ id: ++_nextId, word: item.word, color: item.color, x, y, vx, vy });
      spawnTimer.current = (900 + Math.random() * 600) / spd;
    }

    const targetOnScreen = bubblesRef.current.some(b => b.word === targetRef.current);
    targetTimer.current -= dt;
    if (!targetOnScreen || targetTimer.current <= 0) {
      if (bubblesRef.current.length > 0) { pickTarget(); targetTimer.current = 6000 / spd; }
    }

    bubblesRef.current = bubblesRef.current.filter(b => {
      b.vy += GRAVITY; b.x += b.vx; b.y += b.vy;
      if (b.y > H + R * 2 || b.x < -R * 4 || b.x > W + R * 4) return false;
      const isTarget = b.word === targetRef.current;
      ctx.save();
      if (isTarget) { ctx.shadowColor = '#fbbf24'; ctx.shadowBlur = 24; }
      else { ctx.shadowColor = 'rgba(0,0,0,0.4)'; ctx.shadowBlur = 8; }
      ctx.beginPath(); ctx.arc(b.x, b.y, R, 0, Math.PI * 2);
      ctx.fillStyle = b.color; ctx.fill();
      if (isTarget) { ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3; ctx.stroke(); }
      ctx.restore();
      const fontSize = b.word.length > 4 ? 16 : b.word.length > 3 ? 19 : 22;
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(b.word, b.x, b.y);
      return true;
    });

    popsRef.current = popsRef.current.filter(p => {
      p.t += dt / 450;
      if (p.t >= 1) return false;
      const alpha = 1 - p.t;
      ctx.beginPath();
      ctx.arc(p.x, p.y, R * (1 + p.t * 1.8), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.8})`; ctx.lineWidth = 3; ctx.stroke();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const pr = R * 2 * p.t;
        const px = p.x + Math.cos(angle) * pr; const py = p.y + Math.sin(angle) * pr;
        const pr2 = 5 * (1 - p.t);
        if (pr2 < 0.5) continue;
        ctx.beginPath(); ctx.arc(px, py, pr2, 0, Math.PI * 2);
        const hex = Math.round(alpha * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = `${p.color}${hex}`; ctx.fill();
      }
      return true;
    });
  }, [pickTarget]));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obs = new ResizeObserver(entries => {
      const e = entries[0]; if (!e) return;
      canvas.width = e.contentRect.width; canvas.height = e.contentRect.height;
    });
    obs.observe(canvas);
    return () => obs.disconnect();
  }, [canvasRef]);

  const handlePointer = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (phaseRef.current !== 'playing') return;
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width; const sy = canvas.height / rect.height;
    const tx = (e.clientX - rect.left) * sx; const ty = (e.clientY - rect.top) * sy;
    for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
      const b = bubblesRef.current[i]!;
      if (Math.hypot(b.x - tx, b.y - ty) > R + 10) continue;
      if (b.word === targetRef.current) {
        popsRef.current.push({ x: b.x, y: b.y, color: b.color, t: 0 });
        bubblesRef.current.splice(i, 1);
        scoreRef.current += 10; setScore(scoreRef.current);
        successTimer.current = 350;
        speakHebrew(`כן! ${b.word}!`);
        targetRef.current = ''; setTarget('');
      } else {
        flashTimer.current = 400;
        heartsRef.current -= 1; setHearts(heartsRef.current);
        speakHebrew('לא נכון!');
        if (heartsRef.current <= 0) setTimeout(endGame, 500);
      }
      break;
    }
  }, [canvasRef, endGame]);

  return {
    phase, score, hearts, target, diff,
    setDiff, canvasRef, startGame, handlePointer,
  };
}
