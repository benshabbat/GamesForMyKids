'use client';
import { create } from 'zustand';

// ─── Grid geometry ────────────────────────────────────────────────────────────
export const GRID_ROWS = 5;
export const GRID_COLS = 10;
export const CELL_PX   = 54; // pixels per cell

// S-curve path through the 10×5 grid (row, col)
export const PATH: [number, number][] = [
  [0,0],[0,1],[0,2],[0,3],[0,4],
  [1,4],[2,4],[3,4],
  [3,3],[3,2],[3,1],[3,0],
  [4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],
];
export const PATH_SET = new Set(PATH.map(([r, c]) => `${r},${c}`));
export function isOnPath(row: number, col: number) {
  return PATH_SET.has(`${row},${col}`);
}

// ─── Wave data ────────────────────────────────────────────────────────────────
export const WAVE_DATA = [
  { targetWord: 'בית',  enemyWords: ['בין','ביד','בות','דית','ביץ'] },
  { targetWord: 'שמש',  enemyWords: ['שמן','שמג','שמך','שמס','שמם'] },
  { targetWord: 'ילד',  enemyWords: ['ילם','ילב','ילג','ילן','ילה'] },
  { targetWord: 'כלב',  enemyWords: ['כלם','כלג','כלה','כמב','כלף'] },
  { targetWord: 'אמא',  enemyWords: ['אמה','אמב','אמן','אמג','אמם'] },
];

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Enemy {
  id: number;
  pathIndex: number;
  label: string;
  dying: boolean;
}
export interface Tower {
  row: number;
  col: number;
}

interface State {
  phase: 'idle' | 'playing' | 'gameOver';
  wave: number;
  lives: number;
  score: number;
  enemies: Enemy[];
  towers: Tower[];
  targetWord: string;
  enemiesToSpawn: string[];
  lastShotCount: number;
}
interface Actions {
  startGame: () => void;
  restartGame: () => void;
  toggleTower: (row: number, col: number) => void;
  spawnNext: () => void;
  tick: () => void;
  pruneDying: () => void;
  advanceWave: () => void;
}

let nextId = 0;

const INITIAL: State = {
  phase: 'idle',
  wave: 0,
  lives: 3,
  score: 0,
  enemies: [],
  towers: [],
  targetWord: WAVE_DATA[0]?.targetWord ?? '',
  enemiesToSpawn: [],
  lastShotCount: 0,
};

function buildInitialWave(waveIndex: number): Partial<State> {
  const data = WAVE_DATA[waveIndex];
  if (!data) return {};
  return {
    targetWord: data.targetWord,
    enemiesToSpawn: [...data.enemyWords],
    enemies: [],
  };
}

export const useLetterDefenderStore = create<State & Actions>((set, get) => ({
  ...INITIAL,

  startGame: () => {
    nextId = 0;
    set({
      ...INITIAL,
      phase: 'playing',
      ...buildInitialWave(0),
      wave: 0,
      towers: [],
    });
  },

  restartGame: () => {
    nextId = 0;
    set({
      ...INITIAL,
      phase: 'playing',
      ...buildInitialWave(0),
      wave: 0,
      towers: [],
    });
  },

  toggleTower: (row, col) => {
    if (isOnPath(row, col)) return;
    const towers = get().towers;
    const exists = towers.some(t => t.row === row && t.col === col);
    set({ towers: exists ? towers.filter(t => !(t.row === row && t.col === col)) : [...towers, { row, col }] });
  },

  spawnNext: () => {
    const { enemiesToSpawn, enemies } = get();
    if (enemiesToSpawn.length === 0) return;
    const [label, ...rest] = enemiesToSpawn;
    if (!label) return;
    set({
      enemies: [...enemies, { id: nextId++, pathIndex: 0, label, dying: false }],
      enemiesToSpawn: rest,
    });
  },

  tick: () => {
    const state = get();
    if (state.phase !== 'playing') return;

    const active = state.enemies.filter(e => !e.dying);
    const moved  = active.map(e => ({ ...e, pathIndex: e.pathIndex + 1 }));

    const reached  = moved.filter(e => e.pathIndex >= PATH.length);
    const still    = moved.filter(e => e.pathIndex < PATH.length);
    const lives    = state.lives - reached.length;
    let   score    = state.score;

    const shot = new Set<number>();
    for (const tower of state.towers) {
      for (const enemy of still) {
        if (shot.has(enemy.id)) continue;
        const pos = PATH[enemy.pathIndex];
        if (!pos) continue;
        const dist = Math.abs(pos[0] - tower.row) + Math.abs(pos[1] - tower.col);
        if (dist <= 2) { shot.add(enemy.id); score += 10; }
      }
    }

    const surviving = still.map(e => shot.has(e.id) ? { ...e, dying: true } : e);

    if (lives <= 0) {
      set({ phase: 'gameOver', lives: 0, score, enemies: surviving });
      return;
    }

    set({ lives, score, enemies: surviving, lastShotCount: shot.size });
  },

  pruneDying: () => {
    set(s => ({ enemies: s.enemies.filter(e => !e.dying), lastShotCount: 0 }));
  },

  advanceWave: () => {
    const { wave } = get();
    const next = wave + 1;
    if (next >= WAVE_DATA.length) {
      set({ phase: 'gameOver' });
      return;
    }
    set({ wave: next, ...buildInitialWave(next) });
  },
}));
