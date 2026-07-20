'use client';
import { useState, useRef, useCallback } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { useCanvasResize } from '@/hooks/canvas/useCanvasResize';
import { CANNON_QUESTIONS, type CannonQuestion } from './cannonQuestions';
import { shuffle } from '@/lib/utils/game/cardUtils';
import {
  MAX_LIVES, BUBBLE_SPEED, BULLET_SPEED, BUBBLE_RADIUS,
  CANNON_X_RATIO, CANNON_Y_OFFSET, BARREL_LENGTH, BUBBLE_COLORS,
  type Bubble, type Bullet,
} from './cannonConstants';
import { drawCannonScene } from './cannonRenderer';

export function useCannonGame() {
  const [phase, setPhase] = useState<'menu' | 'playing' | 'result'>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [displayQuestion, setDisplayQuestion] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; ok: boolean } | null>(null);

  const bubblesRef = useRef<Bubble[]>([]);
  const bulletRef = useRef<Bullet | null>(null);
  const cannonAngleRef = useRef(-Math.PI / 2);
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

    if (bubblesRef.current.length === 0) {
      const q = questionsRef.current[qIndexRef.current];
      if (q) spawnBubbles(q, W, H);
    }

    bubblesRef.current.forEach(b => { b.x -= BUBBLE_SPEED * dt; });
    const wasAny = bubblesRef.current.length > 0;
    bubblesRef.current = bubblesRef.current.filter(b => b.x > -BUBBLE_RADIUS - 20);
    if (wasAny && bubblesRef.current.length === 0 && bulletRef.current === null) {
      setFeedback({ text: '❌ פספסת!', ok: false });
      feedbackTimerRef.current = 1200;
      advanceQuestion(false);
    }

    const bull = bulletRef.current;
    if (bull) {
      bull.x += bull.vx * dt;
      bull.y += bull.vy * dt;
      if (bull.x < 0 || bull.x > W || bull.y < 0 || bull.y > H) {
        bulletRef.current = null;
      } else {
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

    if (feedbackTimerRef.current > 0) {
      feedbackTimerRef.current -= dt;
      if (feedbackTimerRef.current <= 0) setFeedback(null);
    }

    drawCannonScene(ctx, {
      W, H, cannonX, cannonY,
      angle: cannonAngleRef.current,
      bubbles: bubblesRef.current,
      bullet: bulletRef.current,
    });
  }, [advanceQuestion, spawnBubbles]));

  const computeAimAngle = (e: React.PointerEvent<HTMLCanvasElement>, rect: DOMRect) => {
    const cannonX = rect.width * CANNON_X_RATIO;
    const cannonY = rect.height - CANNON_Y_OFFSET;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const ang = Math.atan2(my - cannonY, mx - cannonX);
    return Math.max(-Math.PI + 0.1, Math.min(-0.1, ang));
  };

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== 'playing') return;
    if (bulletRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    aimingRef.current = true;
    cannonAngleRef.current = computeAimAngle(e, e.currentTarget.getBoundingClientRect());
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!aimingRef.current || phaseRef.current !== 'playing') return;
    cannonAngleRef.current = computeAimAngle(e, e.currentTarget.getBoundingClientRect());
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

  useCanvasResize(canvasRef);

  return {
    phase, score, lives, displayQuestion, feedback,
    canvasRef, startGame, handlePointerDown, handlePointerMove, handlePointerUp,
    MAX_LIVES,
  };
}
