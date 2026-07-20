'use client';
import { useState, useRef, useCallback } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { useCanvasResize } from '@/hooks/canvas/useCanvasResize';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import { shuffle as shuffled } from '@/lib/utils/game/cardUtils';
import { LEVELS, LEVELS_PER_GAME, type Level } from './slingshotLevels';
import {
  GRAVITY, POWER, MAX_DRAG, BOX_W, BOX_H, BALL_R, SLING_X_FRAC, SLING_Y_FRAC,
} from './slingshotConstants';
import type { Phase, Box, Ball, DragState } from './slingshotConstants';
import { drawSlingshotFrame } from './drawSlingshotFrame';

export type { Phase };

export function useSlingshotGame() {
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
  }, []);

  const canvasRef = useCanvasLoop(useCallback((ctx: CanvasRenderingContext2D, dt: number) => {
    const phase = phaseRef.current;
    if (phase === 'menu' || phase === 'result') return;

    const W = ctx.canvas.width;
    const H = ctx.canvas.height;
    const sx = W * SLING_X_FRAC;
    const sy = H * SLING_Y_FRAC;
    slingPosRef.current = { x: sx, y: sy };

    if (boxesRef.current.length === 0 && gameLevelsRef.current.length > 0) {
      loadLevel(levelIdxRef.current, W, H);
      ballRef.current = { x: sx, y: sy, vx: 0, vy: 0 };
      return;
    }

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

    if (phase === 'flying') {
      const b = ballRef.current;
      b.vy += GRAVITY * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;

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

      if (b.x > W + 50 || b.y > H + 50) {
        setFeedbackText('❌ פספסת!');
        setFeedbackOk(false);
        feedbackTimerRef.current = 1200;
        phaseRef.current = 'feedback';
        setPhase('feedback');
      }
    }

    drawSlingshotFrame(ctx, {
      W, H, phase, sx, sy,
      drag: dragRef.current,
      ball: ballRef.current,
      boxes: boxesRef.current,
      currentLetter: gameLevelsRef.current[levelIdxRef.current]?.letter,
    });
  }, [loadLevel]));

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
    ballRef.current = { x: sx, y: sy, vx: -clampedDx * POWER, vy: -clampedDy * POWER };
    dragRef.current = { active: false, dx: 0, dy: 0 };
    phaseRef.current = 'flying';
    setPhase('flying');
  }, []);

  useCanvasResize(canvasRef);

  const currentLevel = gameLevelsRef.current[levelIdx];

  return {
    phase, score, levelIdx, feedbackText, feedbackOk, currentLevel,
    canvasRef, startGame, handlePointerDown, handlePointerMove, handlePointerUp,
  };
}
