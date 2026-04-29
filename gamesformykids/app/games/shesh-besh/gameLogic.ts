import type { Side, Die, PointState, SimpleMove } from './types';

const gp = (pts: PointState[], i: number): PointState => pts[i] ?? { player: 0, computer: 0 };

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
  function setp(i: number, key: 'player' | 'computer', v: number) { const p = pts[i]; if (p) p[key] = v; }
  setp(24, 'player', 2); setp(13, 'player', 5); setp(8, 'player', 3); setp(6, 'player', 5);
  setp(1, 'computer', 2); setp(12, 'computer', 5); setp(17, 'computer', 3); setp(19, 'computer', 5);
  return pts;
}

function allPlayerInHome(pts: PointState[], barPlayer: number): boolean {
  if (barPlayer > 0) return false;
  for (let i = 7; i <= 24; i++) if (gp(pts, i).player > 0) return false;
  return true;
}

function allComputerInHome(pts: PointState[], barComputer: number): boolean {
  if (barComputer > 0) return false;
  for (let i = 1; i <= 18; i++) if (gp(pts, i).computer > 0) return false;
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
      const opp = side === 'player' ? gp(pts, entryPoint).computer : gp(pts, entryPoint).player;
      if (opp <= 1) results.push({ from: -1, to: entryPoint, die });
    } else {
      for (let from = 1; from <= 24; from++) {
        const myCount = side === 'player' ? gp(pts, from).player : gp(pts, from).computer;
        if (myCount === 0) continue;
        const to = from + dir * die;
        if (to >= 1 && to <= 24) {
          const opp = side === 'player' ? gp(pts, to).computer : gp(pts, to).player;
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
                ? (() => { for (let p = from + 1; p <= 6; p++) if (gp(pts, p).player > 0) return true; return false; })()
                : (() => { for (let p = from - 1; p >= 19; p--) if (gp(pts, p).computer > 0) return true; return false; })();
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
  else { const fp = np[move.from]; if (fp) { if (side === 'player') fp.player--; else fp.computer--; } }

  if (move.to === 0 || move.to === 25) {
    const tp = np[move.to]; if (tp) { if (side === 'player') tp.player++; else tp.computer++; }
    return { pts: np, barP: nbP, barC: nbC };
  }

  const toPt = np[move.to];
  if (toPt) {
    const oppCount = side === 'player' ? toPt.computer : toPt.player;
    if (oppCount === 1) {
      if (opp === 'player') { toPt.player--; nbP++; }
      else { toPt.computer--; nbC++; }
    }
    if (side === 'player') toPt.player++; else toPt.computer++;
  }
  return { pts: np, barP: nbP, barC: nbC };
}

// ─── Computer AI ─────────────────────────────────────────────
function pipCount(pts: PointState[], barC: number): number {
  let pip = barC * 25;
  for (let i = 1; i <= 24; i++) pip += gp(pts, i).computer * i;
  return pip;
}

export function computerBestMove(
  pts: PointState[], barP: number, barC: number, dice: Die[],
): SimpleMove | null {
  const moves = computeValidMoves(pts, barP, barC, dice, 'computer');
  if (!moves.length) return null;
  let best: SimpleMove | null = moves[0] ?? null; if (!best) return null; let bestScore = -Infinity;
  for (const m of moves) {
    const { pts: np, barC: nbC } = applyMove(pts, barP, barC, m, 'computer');
    let score = 0;
    if (m.to === 25) score += 200;
    if (m.to >= 1 && m.to <= 24 && gp(pts, m.to).player === 1) score += 50;
    score += (pipCount(pts, barC) - pipCount(np, nbC)) * 3;
    if (m.to >= 1 && m.to <= 24 && gp(np, m.to).computer >= 2) score += 10;
    if (m.from >= 1 && m.from <= 24 && gp(np, m.from).computer === 1) score -= 5;
    if (score > bestScore) { bestScore = score; best = m; }
  }
  return best;
}
