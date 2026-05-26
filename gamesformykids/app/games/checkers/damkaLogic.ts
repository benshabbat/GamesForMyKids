import type { Board, Cell, DamkaMove, Pos, Side } from './damkaTypes';

// ── Board helpers ──────────────────────────────────────────────────────────

const isDark   = (r: number, c: number) => (r + c) % 2 === 1;
const inBounds = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
const emptyCell = (): Cell => ({ color: null, isKing: false });

export function makeInitialBoard(): Board {
  const b: Board = Array.from({ length: 8 }, () => Array.from({ length: 8 }, emptyCell));
  for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++)
    if (isDark(r, c)) b[r]![c] = { color: 'computer', isKing: false };
  for (let r = 5; r < 8; r++) for (let c = 0; c < 8; c++)
    if (isDark(r, c)) b[r]![c] = { color: 'player', isKing: false };
  return b;
}

function cloneBoard(b: Board): Board { return b.map(r => r.map(c => ({ ...c }))); }

// ── Move generation ────────────────────────────────────────────────────────

function getCaptures(b: Board, startPos: Pos, side: Side): DamkaMove[] {
  const opp: Side = side === 'player' ? 'computer' : 'player';
  const results: DamkaMove[] = [];
  const DIRS: [number, number][] = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

  function dfs(board: Board, pos: Pos, isKing: boolean, captured: Pos[]) {
    let jumped = false;
    for (const [dr, dc] of DIRS) {
      const mr = pos.row + dr, mc = pos.col + dc;
      const tr = pos.row + 2 * dr, tc = pos.col + 2 * dc;
      if (!inBounds(mr, mc) || !inBounds(tr, tc)) continue;
      if (board[mr]![mc]!.color !== opp) continue;
      if (board[tr]![tc]!.color !== null) continue;
      if (captured.some(p => p.row === mr && p.col === mc)) continue;

      jumped = true;
      const nb = cloneBoard(board);
      const kingAfter = isKing
        || (side === 'player' && tr === 0)
        || (side === 'computer' && tr === 7);
      nb[tr]![tc] = { color: side, isKing: kingAfter };
      nb[pos.row]![pos.col] = emptyCell();
      nb[mr]![mc] = emptyCell();
      dfs(nb, { row: tr, col: tc }, kingAfter, [...captured, { row: mr, col: mc }]);
    }
    if (!jumped && captured.length > 0) {
      results.push({ from: startPos, to: pos, captures: captured });
    }
  }

  dfs(b, startPos, b[startPos.row]![startPos.col]!.isKing, []);
  return results;
}

function getNormals(b: Board, pos: Pos, side: Side): DamkaMove[] {
  const piece = b[pos.row]![pos.col]!;
  const dirs: [number, number][] = piece.isKing
    ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    : side === 'player' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
  return dirs
    .map(([dr, dc]) => ({ row: pos.row + dr, col: pos.col + dc }))
    .filter(to => inBounds(to.row, to.col) && b[to.row]![to.col]!.color === null)
    .map(to => ({ from: pos, to, captures: [] }));
}

export function getAllMoves(b: Board, side: Side): DamkaMove[] {
  const captures: DamkaMove[] = [];
  const normals: DamkaMove[] = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    if (b[r]![c]!.color !== side) continue;
    const pos = { row: r, col: c };
    captures.push(...getCaptures(b, pos, side));
    normals.push(...getNormals(b, pos, side));
  }
  return captures.length > 0 ? captures : normals;
}

export function applyMove(b: Board, move: DamkaMove): Board {
  const nb = cloneBoard(b);
  const piece = nb[move.from.row]![move.from.col]!;
  for (const cap of move.captures) nb[cap.row]![cap.col] = emptyCell();
  nb[move.to.row]![move.to.col] = { ...piece };
  nb[move.from.row]![move.from.col] = emptyCell();
  if (piece.color === 'player'   && move.to.row === 0) nb[move.to.row]![move.to.col]!.isKing = true;
  if (piece.color === 'computer' && move.to.row === 7) nb[move.to.row]![move.to.col]!.isKing = true;
  return nb;
}

// ── AI (minimax) ───────────────────────────────────────────────────────────

function evaluate(b: Board): number {
  let score = 0;
  for (const row of b) for (const cell of row) {
    if (!cell.color) continue;
    const v = cell.isKing ? 3 : 1;
    score += cell.color === 'computer' ? v : -v;
  }
  return score;
}

function minimax(b: Board, depth: number, alpha: number, beta: number, isMax: boolean): number {
  const side: Side = isMax ? 'computer' : 'player';
  const moves = getAllMoves(b, side);
  if (depth === 0 || moves.length === 0) return evaluate(b);
  if (isMax) {
    let best = -Infinity;
    for (const m of moves) {
      best = Math.max(best, minimax(applyMove(b, m), depth - 1, alpha, beta, false));
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const m of moves) {
      best = Math.min(best, minimax(applyMove(b, m), depth - 1, alpha, beta, true));
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

export function bestComputerMove(b: Board): DamkaMove | null {
  const moves = getAllMoves(b, 'computer');
  if (!moves.length) return null;
  let bestScore = -Infinity, best = moves[0]!;
  for (const m of moves) {
    const s = minimax(applyMove(b, m), 3, -Infinity, Infinity, false);
    if (s > bestScore) { bestScore = s; best = m; }
  }
  return best;
}
