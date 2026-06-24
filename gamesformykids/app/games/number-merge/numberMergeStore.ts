'use client';
import { create } from 'zustand';

export type Phase = 'menu' | 'playing' | 'result';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  value: number; // 1-10
  radius: number;
  merging: boolean;
  merged: boolean;
}

export interface NumberMergeState {
  phase: Phase;
  difficulty: Difficulty;
  balls: Ball[];
  nextId: number;
  dropX: number;        // current drop cursor X position
  nextValue: number;    // next ball value to drop (preview)
  score: number;
  highScore: number;
  targetScore: number;  // goal based on difficulty
  gameOver: boolean;
  mergeFlash: { x: number; y: number; value: number; id: number } | null;
}

export interface NumberMergeActions {
  startGame: (difficulty: Difficulty) => void;
  dropBall: () => void;
  setDropX: (x: number) => void;
  setBalls: (balls: Ball[]) => void;
  addScore: (points: number) => void;
  triggerMergeFlash: (x: number, y: number, value: number) => void;
  clearMergeFlash: () => void;
  endGame: () => void;
  restart: () => void;
}

const RADIUS_FOR_VALUE = (v: number) => 12 + v * 4;

const TARGET_SCORES: Record<Difficulty, number> = {
  easy: 200,
  medium: 500,
  hard: 1000,
};

let _nextFlashId = 0;

export const useNumberMergeStore = create<NumberMergeState & NumberMergeActions>((set, get) => ({
  phase: 'menu',
  difficulty: 'easy',
  balls: [],
  nextId: 1,
  dropX: 160,
  nextValue: 1,
  score: 0,
  highScore: 0,
  targetScore: TARGET_SCORES.easy,
  gameOver: false,
  mergeFlash: null,

  startGame: (difficulty) => {
    set({
      phase: 'playing',
      difficulty,
      balls: [],
      nextId: 1,
      dropX: 160,
      nextValue: randomValue(),
      score: 0,
      targetScore: TARGET_SCORES[difficulty],
      gameOver: false,
      mergeFlash: null,
    });
  },

  dropBall: () => {
    const { dropX, nextValue, nextId, balls } = get();
    const radius = RADIUS_FOR_VALUE(nextValue);
    const newBall: Ball = {
      id: nextId,
      x: dropX,
      y: radius + 2,
      vx: 0,
      vy: 0,
      value: nextValue,
      radius,
      merging: false,
      merged: false,
    };
    set({
      balls: [...balls, newBall],
      nextId: nextId + 1,
      nextValue: randomValue(),
    });
  },

  setDropX: (x) => set({ dropX: x }),

  setBalls: (balls) => set({ balls }),

  addScore: (points) => {
    const { score, targetScore, highScore } = get();
    const newScore = score + points;
    set({
      score: newScore,
      highScore: Math.max(highScore, newScore),
      phase: newScore >= targetScore ? 'result' : 'playing',
    });
  },

  triggerMergeFlash: (x, y, value) => {
    set({ mergeFlash: { x, y, value, id: ++_nextFlashId } });
  },

  clearMergeFlash: () => set({ mergeFlash: null }),

  endGame: () => {
    const { score, highScore } = get();
    set({ phase: 'result', gameOver: true, highScore: Math.max(score, highScore) });
  },

  restart: () => set({ phase: 'menu', balls: [], score: 0, gameOver: false }),
}));

function randomValue(): number {
  // Drop values 1-5 to keep game manageable
  return Math.ceil(Math.random() * 5);
}

export { RADIUS_FOR_VALUE };
