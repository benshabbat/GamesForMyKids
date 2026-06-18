'use client';

import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGameProgressStore, useGameStore } from '@/lib/stores';
import { useSnakeStore } from './stores/useSnakeStore';
import { useGameCompletion } from '@/hooks/shared/progress';
import {
  EMOJIS, SPEEDS,
  rnd, ptEq, placeFood,
  type SnakeRefs,
} from './snakeConstants';
import { useSnakeDraw } from './useSnakeDraw';
import { useSnakeInput } from './useSnakeInput';

export { W, H } from './snakeConstants';

export function useSnakeGame() {
  const { saveGameResultRef } = useGameCompletion('snake');

  const st = useRef<SnakeRefs>({
    phase: 'menu',
    snake: [{ x: 10, y: 10 }],
    dir: 'R',
    nextDir: 'R',
    food: { x: 15, y: 10 },
    foodEmoji: '🍎',
    score: 0,
    level: 1,
    startTime: 0,
    timer: 0,
    raf: 0,
    animFrame: 0,
  });

  // ─── Game step ──────────────────────────────────────────────────────────────

  function scheduleStep() {
    const s = st.current;
    const speed = SPEEDS[Math.min(s.level - 1, SPEEDS.length - 1)];
    s.timer = setTimeout(step, speed);
  }

  function die() {
    const s = st.current;
    s.phase = 'dead';
    const elapsed = Math.round((Date.now() - s.startTime) / 1000);
    saveGameResultRef.current({ score: s.score, level: s.level, durationSeconds: elapsed });
    useGameStore.getState().endGame();
    useGameProgressStore.getState().setGameActive(false);
    useSnakeStore.getState().setPhase('dead');
  }

  function step() {
    const s = st.current;
    if (s.phase !== 'playing') return;

    s.dir = s.nextDir;
    const head = s.snake[0]!;
    let nx = head.x, ny = head.y;
    if (s.dir === 'R') nx++;
    else if (s.dir === 'L') nx--;
    else if (s.dir === 'U') ny--;
    else ny++;

    if (nx < 0 || nx >= 20 || ny < 0 || ny >= 20) { die(); return; }
    if (s.snake.some(p => ptEq(p, { x: nx, y: ny }))) { die(); return; }

    const newHead = { x: nx, y: ny };
    const ate = ptEq(newHead, s.food);
    const newSnake = [newHead, ...s.snake];
    if (!ate) newSnake.pop();

    s.snake = newSnake;

    if (ate) {
      s.score += 10;
      s.level = Math.min(7, 1 + Math.floor(s.score / 50));
      s.food = placeFood(newSnake);
      s.foodEmoji = EMOJIS[rnd(EMOJIS.length)]!;
      useGameProgressStore.getState().updateProgress({ score: s.score, level: s.level });
    }

    scheduleStep();
  }

  // ─── Start ──────────────────────────────────────────────────────────────────

  const startGame = () => {
    const s = st.current;
    clearTimeout(s.timer as ReturnType<typeof setTimeout>);
    s.phase = 'playing';
    s.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    s.dir = 'R';
    s.nextDir = 'R';
    s.food = placeFood(s.snake);
    s.foodEmoji = EMOJIS[rnd(EMOJIS.length)]!;
    s.score = 0;
    s.level = 1;
    s.startTime = Date.now();
    useGameProgressStore.getState().resetProgress();
    useGameProgressStore.getState().setGameActive(true);
    useGameStore.getState().startGame('snake');
    useSnakeStore.getState().setPhase('playing');
    scheduleStep();
  };

  // ─── Sub-hooks ───────────────────────────────────────────────────────────────

  const canvasRef = useSnakeDraw(st);
  const { handleTouchStart, handleTouchEnd, controlDir } = useSnakeInput(st);

  // ─── Store selectors ─────────────────────────────────────────────────────────

  const phase = useSnakeStore((s) => s.phase);
  const { score, level } = useGameProgressStore(useShallow((s) => ({ score: s.score, level: s.level })));
  const best = useGameStore((s) => s.highScores['snake'] ?? 0);

  return { canvasRef, startGame, handleTouchStart, handleTouchEnd, controlDir, phase, score, level, best };
}
