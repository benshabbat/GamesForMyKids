/**
 * ===============================================
 * Balloon Pop Store — Zustand
 * ===============================================
 * מנהל את כל הסטייט של משחק פוצץ בלונים:
 * - phase / score / best / lives / timeLeft / balloons
 * - לוגיקת ה-animation loop וה-spawn timer
 *
 * טיימרים ו-animation refs מנוהלים ברמת המודול
 * (בדומה ל-arithmeticGameStore) כדי למנוע re-render.
 * ממדי המשחק (W/H) מעודכנים דרך setDimensions מ-BalloonGameArea.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { PhaseResult as Phase } from '@/lib/types';

// ── Constants ──────────────────────────────────────────────
export const GAME_DURATION = 40;
export const BALLOON_COLORS: [string, string][] = [
  ['#EF4444', '#B91C1C'],
  ['#F97316', '#C2410C'],
  ['#EAB308', '#A16207'],
  ['#22C55E', '#15803D'],
  ['#3B82F6', '#1D4ED8'],
  ['#EC4899', '#BE185D'],
  ['#8B5CF6', '#6D28D9'],
  ['#14B8A6', '#0F766E'],
];
const BOMB_CHANCE = 0.12;

// ── Types ──────────────────────────────────────────────────
export interface Balloon {
  id: number;
  x: number;
  y: number;
  r: number;
  vy: number;
  color: [string, string];
  isBomb: boolean;
  popped: boolean;
  popAnim: number;
}

// ── Module-level refs (safe on client — all consumers are 'use client') ──
let uid = 0;
let timerRef: ReturnType<typeof setInterval> | null = null;
let spawnRef: ReturnType<typeof setTimeout> | null = null;
let animRef = 0;
let frameCount = 0;
let W = 350;
let H = 560;

// Sync refs — avoids stale closures in rAF
const sync = { phase: 'menu' as Phase, score: 0, lives: 5, balloons: [] as Balloon[] };

function clearTimers() {
  if (timerRef) { clearInterval(timerRef); timerRef = null; }
  if (spawnRef) { clearTimeout(spawnRef); spawnRef = null; }
  cancelAnimationFrame(animRef);
}

function makeBalloon(): Balloon {
  const isBomb = Math.random() < BOMB_CHANCE;
  const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)] ?? BALLOON_COLORS[0] ?? ['#EF4444', '#B91C1C'];
  return {
    id: uid++,
    x: 30 + Math.random() * (W - 60),
    y: H + 40,
    r: 22 + Math.random() * 18,
    vy: -(0.8 + Math.random() * 1.2),
    color,
    isBomb,
    popped: false,
    popAnim: 0,
  };
}

// ── State ──────────────────────────────────────────────────
export interface BalloonPopState {
  phase: Phase;
  score: number;
  best: number;
  lives: number;
  timeLeft: number;
  balloons: Balloon[];
}

// ── Actions ────────────────────────────────────────────────
export interface BalloonPopActions {
  startGame: () => void;
  pop: (id: number) => void;
  /** BalloonGameArea קורא לזה כשנטען כדי לעדכן ממדים */
  setDimensions: (w: number, h: number) => void;
}

// ── Store ──────────────────────────────────────────────────
export const useBalloonPopStore = create<BalloonPopState & BalloonPopActions>()(
  devtools(
    (set, get) => {
      function endGame() {
        clearTimers();
        const { score, best } = get();
        sync.phase = 'result';
        set({ phase: 'result', best: Math.max(best, score) }, false, 'balloon/endGame');
      }

      function spawnBalloon() {
        if (sync.phase !== 'playing') return;
        const b = makeBalloon();
        sync.balloons = [...sync.balloons, b];
        set({ balloons: [...sync.balloons] }, false, 'balloon/spawn');
        const delay = Math.max(500, 1200 - frameCount * 2);
        spawnRef = setTimeout(spawnBalloon, delay);
      }

      function animate() {
        if (sync.phase !== 'playing') return;
        frameCount++;
        let needsUpdate = false;
        const escaped: number[] = [];

        sync.balloons = sync.balloons.map(b => {
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
          sync.lives = Math.max(0, sync.lives - escaped.length);
          if (sync.lives <= 0) { set({ balloons: [...sync.balloons], lives: 0 }, false, 'balloon/escaped'); endGame(); return; }
          set({ lives: sync.lives }, false, 'balloon/lostLife');
        }

        if (needsUpdate) set({ balloons: [...sync.balloons] }, false, 'balloon/animate');
        animRef = requestAnimationFrame(animate);
      }

      return {
        phase: 'menu',
        score: 0,
        best: 0,
        lives: 5,
        timeLeft: GAME_DURATION,
        balloons: [],

        setDimensions: (w, h) => { W = w; H = h; },

        startGame: () => {
          clearTimers();
          sync.phase = 'playing';
          sync.score = 0;
          sync.lives = 5;
          sync.balloons = [];
          frameCount = 0;

          set(
            { phase: 'playing', score: 0, lives: 5, timeLeft: GAME_DURATION, balloons: [] },
            false,
            'balloon/startGame',
          );

          let t = GAME_DURATION;
          timerRef = setInterval(() => {
            t--;
            set({ timeLeft: t }, false, 'balloon/tick');
            if (t <= 0) endGame();
          }, 1000);

          spawnRef = setTimeout(spawnBalloon, 600);
          animRef = requestAnimationFrame(animate);
        },

        pop: (id) => {
          if (sync.phase !== 'playing') return;
          const b = sync.balloons.find(b => b.id === id);
          if (!b || b.popped) return;

          if (b.isBomb) {
            sync.lives = Math.max(0, sync.lives - 2);
            sync.balloons = sync.balloons.map(x => x.id === id ? { ...x, popped: true } : x);
            set({ balloons: [...sync.balloons], lives: sync.lives }, false, 'balloon/bomb');
            if (sync.lives <= 0) endGame();
          } else {
            sync.score += 10;
            sync.balloons = sync.balloons.map(x => x.id === id ? { ...x, popped: true } : x);
            set({ balloons: [...sync.balloons], score: sync.score }, false, 'balloon/pop');
          }
        },
      };
    },
    { name: 'BalloonPopStore' },
  ),
);

/** קרא לזה ב-useEffect cleanup כדי לנקות טיימרים אם המשתמש עוזב */
export { clearTimers as stopBalloonPopGame };
