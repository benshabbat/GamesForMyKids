import { COLS, GRID_ROWS, R, DIA, LETTERS } from './bubbleShooterConstants';

export function bx(col: number, row: number, W: number): number {
  const offset = row % 2 === 1 ? R + 1 : 0;
  return R + col * DIA + offset + (W - (COLS * DIA + DIA / 2)) / 2;
}
export function by(row: number): number { return R + row * (DIA - 2); }
export function colsInRow(row: number): number { return row % 2 === 0 ? COLS : COLS - 1; }

export function mkGrid(): (string | null)[][] {
  return Array.from({ length: GRID_ROWS }, (_, row) =>
    Array.from({ length: COLS }, (_, col) =>
      col < colsInRow(row) && row < 5 ? LETTERS[Math.floor(Math.random() * LETTERS.length)]! : null
    )
  );
}

export function neighbors(row: number, col: number): [number, number][] {
  return row % 2 === 0
    ? [[row-1,col-1],[row-1,col],[row,col-1],[row,col+1],[row+1,col-1],[row+1,col]]
    : [[row-1,col],[row-1,col+1],[row,col-1],[row,col+1],[row+1,col],[row+1,col+1]];
}

export function flood(grid: (string|null)[][], row: number, col: number, letter: string): [number,number][] {
  const seen = new Set<string>(); const out: [number,number][] = [];
  function dfs(r: number, c: number) {
    const k = `${r},${c}`;
    if (seen.has(k)) return;
    if (r < 0 || r >= GRID_ROWS || c < 0 || c >= COLS) return;
    if (grid[r]?.[c] !== letter) return;
    seen.add(k); out.push([r, c]);
    for (const [nr, nc] of neighbors(r, c)) dfs(nr, nc);
  }
  dfs(row, col); return out;
}

export function snapToGrid(fx: number, fy: number, W: number, grid: (string|null)[][]): {row:number, col:number} | null {
  let bestR = 0, bestC = 0, bestD = Infinity;
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row]?.[col] !== null) continue;
      const dx = fx - bx(col, row, W); const dy = fy - by(row);
      const d = Math.hypot(dx, dy);
      if (d < bestD) { bestD = d; bestR = row; bestC = col; }
    }
  }
  return bestD < DIA * 1.2 ? { row: bestR, col: bestC } : null;
}

export function isGridClear(grid: (string|null)[][]): boolean { return grid.every(row => row.every(c => c === null)); }
export function gridTooLow(grid: (string|null)[][], threshold: number): boolean {
  for (let row = threshold; row < GRID_ROWS; row++) { if (grid[row]?.some(c => c !== null)) return true; }
  return false;
}
