'use client';

/**
 * useBalloonPopLoop — manages the balloon-pop animation lifecycle.
 *
 * Extracted from balloonPopStore so that React owns the timer / rAF
 * cleanup (via useEffect return), preventing double-loop on Strict Mode
 * double-invoke and ensuring cleanup on component unmount.
 *
 * The store's startGame action signals intent (phase → 'playing');
 * this hook detects that transition and starts:
 *   - requestAnimationFrame(animate) — moves balloons, detects escapes
 *   - setInterval countdown — ticks timeLeft every second
 *   - setTimeout chain — spawns new balloons at increasing pace
 */

import { useEffect, useRef } from 'react';
import {
  useBalloonPopStore,
  GAME_DURATION,
  BALLOON_COLORS,
  BOMB_CHANCE,
  type Balloon,
} from './balloonPopStore';

export function useBalloonPopLoop() {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnRef  = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const animRef   = useRef<number>(0);
  const frameRef  = useRef<number>(0);
  const uidRef    = useRef<number>(0);

  // Stale-closure-safe mirror of mutable loop state.
  // Written by the RAF/timer callbacks; read by the same callbacks.
  const st = useRef({ phase: 'menu', score: 0, lives: 5, balloons: [] as Balloon[] });

  useEffect(() => {
    function clearTimers() {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      if (spawnRef.current)  { clearTimeout(spawnRef.current);  spawnRef.current  = null; }
      cancelAnimationFrame(animRef.current);
    }

    function makeBalloon(): Balloon {
      const { W, H } = useBalloonPopStore.getState();
      const isBomb = Math.random() < BOMB_CHANCE;
      return {
        id: uidRef.current++,
        x:  30 + Math.random() * (W - 60),
        y:  H + 40,
        r:  22 + Math.random() * 18,
        vy: -(0.8 + Math.random() * 1.2),
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)]!,
        isBomb,
        popped:   false,
        popAnim:  0,
      };
    }

    function endGame() {
      clearTimers();
      useBalloonPopStore.getState().endGame();
    }

    function spawnBalloon() {
      if (st.current.phase !== 'playing') return;
      const b = makeBalloon();
      st.current.balloons = [...st.current.balloons, b];
      useBalloonPopStore.setState({ balloons: [...st.current.balloons] });
      const delay = Math.max(500, 1200 - frameRef.current * 2);
      spawnRef.current = setTimeout(spawnBalloon, delay);
    }

    function animate() {
      if (st.current.phase !== 'playing') return;
      frameRef.current++;
      let needsUpdate = false;
      const escaped: number[] = [];

      st.current.balloons = st.current.balloons.map(b => {
        if (b.popped) {
          if (b.popAnim < 1) { needsUpdate = true; return { ...b, popAnim: b.popAnim + 0.1 }; }
          return b;
        }
        const ny = b.y + b.vy;
        if (ny + b.r < 0 && !b.isBomb) { escaped.push(b.id); needsUpdate = true; }
        needsUpdate = true;
        return { ...b, y: ny };
      }).filter(b => {
        if (b.popped && b.popAnim >= 1) return false;
        if (escaped.includes(b.id)) return false;
        return true;
      });

      if (escaped.length > 0) {
        st.current.lives = Math.max(0, st.current.lives - escaped.length);
        if (st.current.lives <= 0) {
          useBalloonPopStore.setState({ balloons: [...st.current.balloons], lives: 0 });
          endGame();
          return;
        }
        useBalloonPopStore.setState({ lives: st.current.lives });
      }

      if (needsUpdate) useBalloonPopStore.setState({ balloons: [...st.current.balloons] });
      animRef.current = requestAnimationFrame(animate);
    }

    function startLoop() {
      clearTimers();
      st.current = { phase: 'playing', score: 0, lives: 5, balloons: [] };
      frameRef.current = 0;

      let t = GAME_DURATION;
      timerRef.current = setInterval(() => {
        t--;
        useBalloonPopStore.setState({ timeLeft: t });
        if (t <= 0) endGame();
      }, 1000);

      spawnRef.current = setTimeout(spawnBalloon, 600);
      animRef.current  = requestAnimationFrame(animate);
    }

    // Subscribe to phase changes — start the loop when game starts.
    const unsubscribe = useBalloonPopStore.subscribe((state, prev) => {
      if (state.phase === 'playing' && prev.phase !== 'playing') {
        startLoop();
      } else if (state.phase !== 'playing') {
        st.current.phase = state.phase;
      }
    });

    // Sync lives/score written by the store's pop action back into st.
    // This prevents the RAF from using a stale lives value after a pop.
    const unsubPop = useBalloonPopStore.subscribe((state) => {
      if (state.phase === 'playing') {
        st.current.lives  = state.lives;
        st.current.score  = state.score;
        st.current.balloons = state.balloons;
      }
    });

    return () => {
      unsubscribe();
      unsubPop();
      clearTimers();
    };
  }, []);
}
