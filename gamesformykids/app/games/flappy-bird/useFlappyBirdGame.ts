'use client';

import { useShallow } from 'zustand/react/shallow';
import { useFlappyBirdStore } from './flappyBirdStore';
import { createCanvasArcadeHook } from '@/hooks/canvas';
import {
  W, H, BIRD_X, BIRD_R, GRAVITY, FLAP_STRENGTH,
  PIPE_W, PIPE_GAP, PIPE_SPEED, PIPE_INTERVAL, GROUND_H,
  type FlappyBirdState,
} from './flappyBirdConstants';
import { drawFlappyBirdScene } from './flappyBirdDraw';

export { W, H } from './flappyBirdConstants';

const _useFlappyBird = createCanvasArcadeHook({
  gameType: 'flappy-bird',
  width: W,
  height: H,
  initialState: (): FlappyBirdState => ({
    phase: 'menu',
    birdY: H / 2,
    birdVY: 0,
    pipes: [],
    score: 0,
    frame: 0,
    bgOffset: 0,
    startTime: 0,
  }),
  draw: (ctx, s, _dt, saveRef) => {
    const st = s;
    if (st.phase === 'playing') {
      st.frame++;
      st.birdVY += GRAVITY;
      st.birdY += st.birdVY;

      if (st.frame % PIPE_INTERVAL === 0) {
        const gapY = 80 + Math.random() * (H - GROUND_H - 80 - PIPE_GAP - 80);
        st.pipes.push({ x: W + 10, gapY, scored: false });
      }

      for (const p of st.pipes) {
        p.x -= PIPE_SPEED;
        if (!p.scored && p.x + PIPE_W < BIRD_X - BIRD_R) {
          p.scored = true;
          st.score++;
          useFlappyBirdStore.getState().setScore(st.score);
        }
      }
      st.pipes = st.pipes.filter(p => p.x > -PIPE_W - 20);

      if (st.birdY + BIRD_R >= H - GROUND_H || st.birdY - BIRD_R <= 0) {
        if (st.phase === 'playing') {
          const elapsed = Math.round((Date.now() - st.startTime) / 1000);
          saveRef.current({ score: st.score, level: 1, durationSeconds: elapsed });
          st.phase = 'dead';
          useFlappyBirdStore.getState().endGame(st.score);
        }
      }

      for (const p of st.pipes) {
        const bL = BIRD_X - BIRD_R + 4;
        const bR = BIRD_X + BIRD_R - 4;
        const bT = st.birdY - BIRD_R + 4;
        const bB = st.birdY + BIRD_R - 4;
        if (bR > p.x && bL < p.x + PIPE_W) {
          if ((bT < p.gapY || bB > p.gapY + PIPE_GAP) && st.phase === 'playing') {
            const elapsed = Math.round((Date.now() - st.startTime) / 1000);
            saveRef.current({ score: st.score, level: 1, durationSeconds: elapsed });
            st.phase = 'dead';
            useFlappyBirdStore.getState().endGame(st.score);
          }
        }
      }
    }

    st.bgOffset = (st.bgOffset + 0.3) % W;

    drawFlappyBirdScene(ctx, st);
  },
});

export function useFlappyBirdGame() {
  const { st, canvasRef } = _useFlappyBird();


  const resetGame = () => {
    const s = st.current;
    s.phase = 'playing';
    s.birdY = H / 2;
    s.birdVY = FLAP_STRENGTH;
    s.pipes = [];
    s.score = 0;
    s.frame = 0;
    s.startTime = Date.now();
    useFlappyBirdStore.getState().setPhase('playing');
    useFlappyBirdStore.getState().setScore(0);
  };

  const flap = () => {
    const s = st.current;
    if (s.phase === 'playing') {
      s.birdVY = FLAP_STRENGTH;
    } else if (s.phase === 'menu') {
      resetGame();
    } else if (s.phase === 'dead') {
      s.phase = 'menu';
      useFlappyBirdStore.getState().setPhase('menu');
    }
  };


  const handleInput = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    flap();
  };

  const { phase, best, score } = useFlappyBirdStore(useShallow(s => ({ phase: s.phase, best: s.best, score: s.score })));

  return { canvasRef, flap, handleInput, phase, best, score };
}
