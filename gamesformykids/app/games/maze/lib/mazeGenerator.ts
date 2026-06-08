export type Wall = { N: boolean; E: boolean; S: boolean; W: boolean };

/** Generate a perfect maze with the recursive-backtracker algorithm. */
export function generateMaze(rows: number, cols: number): Wall[][] {
  const grid: Wall[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ N: true, E: true, S: true, W: true })),
  );
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

  function backtrack(r: number, c: number): void {
    visited[r]![c] = true;
    const dirs: Array<[number, number, keyof Wall, keyof Wall]> = [
      [-1, 0, 'N', 'S'], [0, 1, 'E', 'W'], [1, 0, 'S', 'N'], [0, -1, 'W', 'E'],
    ];
    for (let i = dirs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [dirs[i], dirs[j]] = [dirs[j]!, dirs[i]!];
    }
    for (const [dr, dc, from, to] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr]![nc]) {
        grid[r]![c]![from] = false;
        grid[nr]![nc]![to] = false;
        backtrack(nr, nc);
      }
    }
  }

  backtrack(0, 0);
  return grid;
}

export function placeStars(rows: number, cols: number, count: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  const taken = new Set<string>(['0,0', `${rows - 1},${cols - 1}`]);
  let tries = 0;
  while (out.length < count && tries < 1000) {
    tries++;
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    const key = `${r},${c}`;
    if (!taken.has(key)) { taken.add(key); out.push([r, c]); }
  }
  return out;
}
