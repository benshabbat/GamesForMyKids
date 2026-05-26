import { type Color, type PieceType, type Board, type Pos, type CastleRights, type ChessMove } from './chessTypes';
import { isInCheck, applyMove } from './chessBoardUtils';
import { getAllValidMoves } from './chessMoveGen';

// ─────────────────────── Evaluation ──────────────────────────
const PIECE_VALUES: Record<PieceType, number> = { K: 20000, Q: 900, R: 500, B: 330, N: 320, P: 100 };

const CENTER_BONUS: Record<string, number[][]> = {
  P: [[0,0,0,0,0,0,0,0],[5,5,5,5,5,5,5,5],[1,1,2,3,3,2,1,1],[0.5,0.5,1,2.5,2.5,1,.5,.5],[0,0,0,2,2,0,0,0],[.5,-.5,-1,0,0,-1,-.5,.5],[.5,1,1,-2,-2,1,1,.5],[0,0,0,0,0,0,0,0]],
  N: [[-5,-4,-3,-3,-3,-3,-4,-5],[-4,-2,0,0,0,0,-2,-4],[-3,0,1,1.5,1.5,1,0,-3],[-3,.5,1.5,2,2,1.5,.5,-3],[-3,0,1.5,2,2,1.5,0,-3],[-3,.5,1,1.5,1.5,1,.5,-3],[-4,-2,0,.5,.5,0,-2,-4],[-5,-4,-3,-3,-3,-3,-4,-5]],
};

function evaluate(b: Board): number {
  let score = 0;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const p = b[r][c];
    if (!p) continue;
    const pColor = p[0] as Color;
    const pType = p[1] as PieceType;
    const val = PIECE_VALUES[pType];
    const tableRow = pColor === 'b' ? r : 7 - r;
    const posBonus = CENTER_BONUS[pType]?.[tableRow]?.[c] ?? 0;
    score += pColor === 'b' ? (val + posBonus) : -(val + posBonus);
  }
  return score;
}

// ─────────────────────── Minimax (alpha-beta) ────────────────
function minimax(
  b: Board, depth: number, alpha: number, beta: number,
  isMax: boolean, castling: CastleRights, enPassant: Pos | null,
): number {
  const color: Color = isMax ? 'b' : 'w';
  const moves = getAllValidMoves(b, color, castling, enPassant);
  if (moves.length === 0) return isInCheck(b, color) ? (isMax ? -50000 : 50000) : 0;
  if (depth === 0) return evaluate(b);

  if (isMax) {
    let best = -Infinity;
    for (const m of moves) {
      const { board: nb, castling: nc, enPassant: nep } = applyMove(b, m, castling, enPassant);
      best = Math.max(best, minimax(nb, depth - 1, alpha, beta, false, nc, nep));
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const m of moves) {
      const { board: nb, castling: nc, enPassant: nep } = applyMove(b, m, castling, enPassant);
      best = Math.min(best, minimax(nb, depth - 1, alpha, beta, true, nc, nep));
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

// ─────────────────────── Public API ──────────────────────────
export function bestComputerMove(b: Board, castling: CastleRights, enPassant: Pos | null): ChessMove | null {
  const moves = getAllValidMoves(b, 'b', castling, enPassant);
  if (!moves.length) return null;
  let bestScore = -Infinity, best = moves[0];
  for (const m of moves) {
    const { board: nb, castling: nc, enPassant: nep } = applyMove(b, m, castling, enPassant);
    const s = minimax(nb, 2, -Infinity, Infinity, false, nc, nep);
    if (s > bestScore) { bestScore = s; best = m; }
  }
  return best;
}
