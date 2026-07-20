'use client';

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useJumperStore } from './jumperStore';
import { createCanvasArcadeHook } from '@/hooks/canvas';
import {
  W, H, GRAVITY, JUMP_VY, PLAT_H, PLAYER_R, PLAT_GAP, INIT_PLATS,
  type JumperState,
} from './jumperConstants';
import { makePlatform, generateInitial, drawJumperScene } from './jumperDraw';

export { W, H } from './jumperConstants';

const _useJumper = createCanvasArcadeHook({
  gameType: 'jumper',
  width: W,
  height: H,
  initialState: (): JumperState => ({
    phase: 'menu',
    px: W / 2, py: H - 100,
    pvx: 0, pvy: 0,
    camY: 0,
    maxCamY: 0,
    platforms: generateInitial(),
    score: 0, best: 0,
    frame: 0,
    leftDown: false, rightDown: false,
    nextPlatY: H - 60 - INIT_PLATS * (PLAT_GAP * 0.75),
    startTime: 0,
  }),
  draw: (ctx, s, _dt, saveRef) => {    s.frame++;

    if (s.phase === 'playing') {
      const HSPEED = 4.5;
      if (s.leftDown)  s.pvx = Math.max(s.pvx - 0.8, -HSPEED);
      if (s.rightDown) s.pvx = Math.min(s.pvx + 0.8, HSPEED);
      if (!s.leftDown && !s.rightDown) s.pvx *= 0.85;

      s.pvy += GRAVITY;
      s.py += s.pvy;
      s.px += s.pvx;

      if (s.px < -PLAYER_R)    s.px = W + PLAYER_R;
      if (s.px > W + PLAYER_R) s.px = -PLAYER_R;

      if (s.pvy > 0) {
        for (const p of s.platforms) {
          const screenY = p.y + s.camY;
          if (
            s.py + PLAYER_R >= screenY &&
            s.py + PLAYER_R <= screenY + PLAT_H + Math.abs(s.pvy) + 2 &&
            s.px + PLAYER_R * 0.7 > p.x &&
            s.px - PLAYER_R * 0.7 < p.x + p.w
          ) {
            s.pvy = JUMP_VY;
            s.py = screenY - PLAYER_R;
          }
        }
      }

      const playerScreenY = s.py;
      if (playerScreenY < H * 0.45) {
        const shift = H * 0.45 - playerScreenY;
        s.camY += shift;
        s.py += shift;
      }

      s.score = Math.floor(s.camY / 10);
      if (s.camY > s.maxCamY) {
        s.maxCamY = s.camY;
        if (s.frame % 10 === 0) useJumperStore.getState().setScore(s.score);
      }

      while (s.nextPlatY > -(s.camY) - H) {
        s.platforms.push(makePlatform(s.nextPlatY));
        s.nextPlatY -= PLAT_GAP * (0.6 + Math.random() * 0.5);
      }
      s.platforms = s.platforms.filter(p => p.y + s.camY < H + 50);

      if (s.py > H + 60) {
        s.phase = 'dead';
        const elapsed = Math.round((Date.now() - s.startTime) / 1000);
        saveRef.current({ score: s.score, level: 1, durationSeconds: elapsed });
        useJumperStore.getState().endGame(s.score);
      }
    }

    drawJumperScene(ctx, s);
  },
});

export function useJumperGame() {
  const { st, canvasRef } = _useJumper();


  const startGame = () => {
    const s = st.current;
    s.phase = 'playing';
    s.px = W / 2; s.py = H - 100;
    s.pvx = 0; s.pvy = JUMP_VY;
    s.camY = 0; s.maxCamY = 0;
    s.score = 0; s.frame = 0;
    s.platforms = generateInitial();
    s.nextPlatY = H - 60 - INIT_PLATS * (PLAT_GAP * 0.75);
    s.startTime = Date.now();
    useJumperStore.getState().startPlaying();
  };

  const handleCanvasClick = () => {
    if (st.current.phase === 'menu') startGame();
  };

  const pressLeft = () => { st.current.leftDown = true; };
  const releaseLeft = () => { st.current.leftDown = false; };
  const pressRight = () => { st.current.rightDown = true; };
  const releaseRight = () => { st.current.rightDown = false; };


  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft'  || e.key === 'a') st.current.leftDown  = true;
      if (e.key === 'ArrowRight' || e.key === 'd') st.current.rightDown = true;
    };
    const ku = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft'  || e.key === 'a') st.current.leftDown  = false;
      if (e.key === 'ArrowRight' || e.key === 'd') st.current.rightDown = false;
    };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, [st]);

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const tx = (e.touches[0]!.clientX - rect.left) * (W / rect.width);
    const s = st.current;
    if (s.phase !== 'playing') return;
    if (tx < W / 2) { s.leftDown = true; s.rightDown = false; }
    else             { s.rightDown = true; s.leftDown = false; }
  };

  const handleTouchEnd = () => {
    st.current.leftDown = false;
    st.current.rightDown = false;
  };

  const { phase, score, best } = useJumperStore(useShallow(s => ({ phase: s.phase, score: s.score, best: s.best })));

  return { canvasRef, startGame, handleTouchMove, handleTouchEnd, handleCanvasClick, pressLeft, releaseLeft, pressRight, releaseRight, phase, score, best };
}
