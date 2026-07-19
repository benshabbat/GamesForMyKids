import { makePersistStore } from '@/lib/stores/createStore';

export type Phase = 'menu' | 'playing' | 'result';

export const GRID_SIZE = 7;
export const CANDIES = ['🍬', '🍭', '🍫', '🍩', '🍪', '🧁'] as const;
const CANDY_COUNT = CANDIES.length;
const START_MOVES = 20;
const POP_MS = 260;
const SETTLE_MS = 180;

export interface Cell {
  id: number;
  type: number;
}

interface CandyMatchState {
  phase: Phase;
  grid: Cell[];
  selected: number | null;
  clearing: number[];
  invalidSwap: [number, number] | null;
  busy: boolean;
  score: number;
  best: number;
  movesLeft: number;
  combo: number;
}

interface CandyMatchActions {
  startGame: () => void;
  selectCell: (index: number) => void;
}

let nextId = 1;

function randomType(): number {
  return Math.floor(Math.random() * CANDY_COUNT);
}

function makeCell(): Cell {
  return { id: nextId++, type: randomType() };
}

function toRC(index: number): [number, number] {
  return [Math.floor(index / GRID_SIZE), index % GRID_SIZE];
}

function isAdjacent(a: number, b: number): boolean {
  const [ar, ac] = toRC(a);
  const [br, bc] = toRC(b);
  return Math.abs(ar - br) + Math.abs(ac - bc) === 1;
}

function swapCells(grid: Cell[], a: number, b: number): Cell[] {
  const next = [...grid];
  [next[a]!, next[b]!] = [next[b]!, next[a]!];
  return next;
}

function findMatches(grid: Cell[]): Set<number> {
  const matched = new Set<number>();

  for (let r = 0; r < GRID_SIZE; r++) {
    let runStart = 0;
    for (let c = 1; c <= GRID_SIZE; c++) {
      const prevType = grid[r * GRID_SIZE + c - 1]!.type;
      const curType = c < GRID_SIZE ? grid[r * GRID_SIZE + c]!.type : -1;
      if (curType !== prevType) {
        if (c - runStart >= 3) for (let k = runStart; k < c; k++) matched.add(r * GRID_SIZE + k);
        runStart = c;
      }
    }
  }

  for (let c = 0; c < GRID_SIZE; c++) {
    let runStart = 0;
    for (let r = 1; r <= GRID_SIZE; r++) {
      const prevType = grid[(r - 1) * GRID_SIZE + c]!.type;
      const curType = r < GRID_SIZE ? grid[r * GRID_SIZE + c]!.type : -1;
      if (curType !== prevType) {
        if (r - runStart >= 3) for (let k = runStart; k < r; k++) matched.add(k * GRID_SIZE + c);
        runStart = r;
      }
    }
  }

  return matched;
}

function collapseAndRefill(grid: Cell[], matched: Set<number>): Cell[] {
  const next = [...grid];
  for (let c = 0; c < GRID_SIZE; c++) {
    const surviving: Cell[] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      const idx = r * GRID_SIZE + c;
      if (!matched.has(idx)) surviving.push(grid[idx]!);
    }
    const missing = GRID_SIZE - surviving.length;
    const filled: Cell[] = [];
    for (let i = 0; i < missing; i++) filled.push(makeCell());
    const column = [...filled, ...surviving];
    for (let r = 0; r < GRID_SIZE; r++) next[r * GRID_SIZE + c] = column[r]!;
  }
  return next;
}

function hasAnyValidMove(grid: Cell[]): boolean {
  for (let i = 0; i < grid.length; i++) {
    const [r, c] = toRC(i);
    if (c < GRID_SIZE - 1 && findMatches(swapCells(grid, i, i + 1)).size > 0) return true;
    if (r < GRID_SIZE - 1 && findMatches(swapCells(grid, i, i + GRID_SIZE)).size > 0) return true;
  }
  return false;
}

function makeInitialGrid(): Cell[] {
  let grid: Cell[];
  let tries = 0;
  do {
    grid = new Array(GRID_SIZE * GRID_SIZE);
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        let type: number;
        do {
          type = randomType();
        } while (
          (c >= 2 && grid[r * GRID_SIZE + c - 1]!.type === type && grid[r * GRID_SIZE + c - 2]!.type === type) ||
          (r >= 2 && grid[(r - 1) * GRID_SIZE + c]!.type === type && grid[(r - 2) * GRID_SIZE + c]!.type === type)
        );
        grid[r * GRID_SIZE + c] = { id: nextId++, type };
      }
    }
    tries++;
  } while (!hasAnyValidMove(grid) && tries < 20);
  return grid;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function resolveCascades(
  get: () => CandyMatchState & CandyMatchActions,
  set: (partial: Partial<CandyMatchState>) => void,
): Promise<void> {
  let chain = 0;

  for (;;) {
    const matches = findMatches(get().grid);
    if (matches.size === 0) break;

    chain++;
    set({ clearing: [...matches], score: get().score + matches.size * 10 * chain, combo: chain });
    await sleep(POP_MS);

    let grid = collapseAndRefill(get().grid, matches);
    if (!hasAnyValidMove(grid)) grid = makeInitialGrid();
    set({ grid, clearing: [] });
    await sleep(SETTLE_MS);
  }

  const { score, best, movesLeft } = get();
  if (movesLeft <= 0) {
    set({ phase: 'result', busy: false, best: Math.max(score, best) });
  } else {
    set({ busy: false, combo: 0 });
  }
}

export const useCandyMatchStore = makePersistStore<CandyMatchState & CandyMatchActions>(
  'CandyMatchStore',
  'candy-match-best',
  (set, get) => ({
    phase: 'menu',
    grid: makeInitialGrid(),
    selected: null,
    clearing: [],
    invalidSwap: null,
    busy: false,
    score: 0,
    best: 0,
    movesLeft: START_MOVES,
    combo: 0,

    startGame: () => {
      set({
        phase: 'playing',
        grid: makeInitialGrid(),
        selected: null,
        clearing: [],
        invalidSwap: null,
        busy: false,
        score: 0,
        movesLeft: START_MOVES,
        combo: 0,
      });
    },

    selectCell: (index) => {
      const { phase, busy, selected, grid } = get();
      if (phase !== 'playing' || busy) return;

      if (selected === null) {
        set({ selected: index });
        return;
      }
      if (selected === index) {
        set({ selected: null });
        return;
      }
      if (!isAdjacent(selected, index)) {
        set({ selected: index });
        return;
      }

      const swapped = swapCells(grid, selected, index);
      const matches = findMatches(swapped);
      set({ selected: null });

      if (matches.size === 0) {
        set({ invalidSwap: [selected, index] });
        setTimeout(() => set({ invalidSwap: null }), 400);
        return;
      }

      set({ grid: swapped, busy: true, movesLeft: get().movesLeft - 1 });
      void resolveCascades(get, set);
    },
  }),
  { partialize: (s) => ({ best: s.best }) },
);
