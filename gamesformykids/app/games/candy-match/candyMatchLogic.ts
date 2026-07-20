import {
  GRID_SIZE,
  CANDY_COUNT,
  POP_MS,
  SETTLE_MS,
  type Cell,
  type CandyMatchState,
  type CandyMatchActions,
} from './candyMatchTypes';

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

export function isAdjacent(a: number, b: number): boolean {
  const [ar, ac] = toRC(a);
  const [br, bc] = toRC(b);
  return Math.abs(ar - br) + Math.abs(ac - bc) === 1;
}

export function swapCells(grid: Cell[], a: number, b: number): Cell[] {
  const next = [...grid];
  [next[a]!, next[b]!] = [next[b]!, next[a]!];
  return next;
}

export function findMatches(grid: Cell[]): Set<number> {
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

export function makeInitialGrid(): Cell[] {
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

export async function resolveCascades(
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
