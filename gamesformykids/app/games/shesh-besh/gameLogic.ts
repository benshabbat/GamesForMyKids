import type { Side, Die, PointState, SimpleMove } from './types';

// ─── Dice ────────────────────────────────────────────────────
export function rollDie(): Die { return (Math.floor(Math.random() * 6) + 1) as Die; }
export function expandDice(d1: Die, d2: Die): Die[] {
  return d1 === d2 ? [d1, d1, d1, d1] : [d1, d2];
}

// ─── Board helpers ───────────────────────────────────────────
export function clonePoints(pts: PointState[]): PointState[] {
  return pts.map(p => ({ ...p }));
}

export function makeInitialPoints(): PointState[] {
  const pts: PointState[] = Array.from({ length: 26 }, () => ({ player: 0, computer: 0 }));
  pts[24].player = 2; pts[13].player = 5; pts[8].player = 3; pts[6].player = 5;
  pts[1].computer = 2; pts[12].computer = 5; pts[17].computer = 3; pts[19].computer = 5;
  return pts;
}

function allPlayerInHome(pts: PointState[], barPlayer: number): boolean {
  if (barPlayer > 0) return false;
  for (let i = 7; i <= 24; i++) if (pts[i].player > 0) return false;
  return true;
}

function allComputerInHome(pts: PointState[], barComputer: number): boolean {
  if (barComputer > 0) return false;
  for (let i = 1; i <= 18; i++) if (pts[i].computer > 0) return false;
  return true;
}

// ─── Move computation ────────────────────────────────────────
export function computeValidMoves(
  pts: PointState[], barPlayer: number, barComputer: number, dice: Die[], side: Side,
): SimpleMove[] {
  const uniqueDice = [...new Set(dice)];
  const results: SimpleMove[] = [];
  const dir = side === 'player' ? -1 : 1;
  const isOnBar = side === 'player' ? barPlayer > 0 : barComputer > 0;
  const inHome = side === 'player'
    ? allPlayerInHome(pts, barPlayer)
    : allComputerInHome(pts, barComputer);

  for (const die of uniqueDice) {
    if (isOnBar) {
      const entryPoint = side === 'player' ? 25 - die : die;
      if (entryPoint < 1 || entryPoint > 24) continue;
      const opp = side === 'player' ? pts[entryPoint].computer : pts[entryPoint].player;
      if (opp <= 1) results.push({ from: -1, to: entryPoint, die });
    } else {
      for (let from = 1; from <= 24; from++) {
        const myCount = side === 'player' ? pts[from].player : pts[from].computer;
        if (myCount === 0) continue;
        const to = from + dir * die;
        if (to >= 1 && to <= 24) {
          const opp = side === 'player' ? pts[to].computer : pts[to].player;
          if (opp <= 1) results.push({ from, to, die });
        } else if (inHome) {
          const homeRange = side === 'player'
            ? (from >= 1 && from <= 6)
            : (from >= 19 && from <= 24);
          if (!homeRange) continue;
          if ((side === 'player' && to <= 0) || (side === 'computer' && to >= 25)) {
            const target = side === 'player' ? 0 : 25;
            if (to === target) {
              results.push({ from, to, die });
            } else {
              const higherExists = side === 'player'
                ? (() => { for (let p = from + 1; p <= 6; p++) if (pts[p].player > 0) return true; return false; })()
                : (() => { for (let p = from - 1; p >= 19; p--) if (pts[p].computer > 0) return true; return false; })();
              if (!higherExists) results.push({ from, to: target, die });
            }
          }
        }
      }
    }
  }
  return results;
}

// ─── Apply move ──────────────────────────────────────────────
export function applyMove(
  pts: PointState[], barP: number, barC: number, move: SimpleMove, side: Side,
): { pts: PointState[]; barP: number; barC: number } {
  const np = clonePoints(pts);
  let nbP = barP, nbC = barC;
  const opp: Side = side === 'player' ? 'computer' : 'player';

  if (move.from === -1) { if (side === 'player') nbP--; else nbC--; }
  else { if (side === 'player') np[move.from].player--; else np[move.from].computer--; }

  if (move.to === 0 || move.to === 25) {
    if (side === 'player') np[0].player++; else np[25].computer++;
    return { pts: np, barP: nbP, barC: nbC };
  }

  const oppCount = side === 'player' ? np[move.to].computer : np[move.to].player;
  if (oppCount === 1) {
    if (opp === 'player') { np[move.to].player--; nbP++; }
    else { np[move.to].computer--; nbC++; }
  }
  if (side === 'player') np[move.to].player++; else np[move.to].computer++;
  return { pts: np, barP: nbP, barC: nbC };
}

// ─── Computer AI ─────────────────────────────────────────────
function pipCount(pts: PointState[], barC: number): number {
  let pip = barC * 25;
  for (let i = 1; i <= 24; i++) pip += pts[i].computer * i;
  return pip;
}

export function computerBestMove(
  pts: PointState[], barP: number, barC: number, dice: Die[],
): SimpleMove | null {
  const moves = computeValidMoves(pts, barP, barC, dice, 'computer');
  if (!moves.length) return null;
  let best = moves[0], bestScore = -Infinity;
  for (const m of moves) {
    const { pts: np, barC: nbC } = applyMove(pts, barP, barC, m, 'computer');
    let score = 0;
    if (m.to === 25) score += 200;
    if (m.to >= 1 && m.to <= 24 && pts[m.to].player === 1) score += 50;
    score += (pipCount(pts, barC) - pipCount(np, nbC)) * 3;
    if (m.to >= 1 && m.to <= 24 && np[m.to].computer >= 2) score += 10;
    if (m.from >= 1 && m.from <= 24 && np[m.from].computer === 1) score -= 5;
    if (score > bestScore) { bestScore = score; best = m; }
  }
  return best;
}
