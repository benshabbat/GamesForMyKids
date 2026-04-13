import {
  type Color, type Piece, type Board, type Pos,
  type CastleRights, type ChessMove, type ChessState, type GamePhase,
} from './chessTypes';

// ─────────────────────── Board setup ─────────────────────────
export function makeInitialBoard(): Board {
  return [
    ['bR','bN','bB','bQ','bK','bB','bN','bR'],
    ['bP','bP','bP','bP','bP','bP','bP','bP'],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ['wP','wP','wP','wP','wP','wP','wP','wP'],
    ['wR','wN','wB','wQ','wK','wB','wN','wR'],
  ];
}

// ─────────────────────── Helpers ─────────────────────────────
export const inB = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
export const pieceColor = (p: Piece): Color | null => p ? p[0] as Color : null;
export const isOpp = (p: Piece, myColor: Color) => { const c = pieceColor(p); return c !== null && c !== myColor; };
export const isFriend = (p: Piece, myColor: Color) => pieceColor(p) === myColor;
export function cloneBoard(b: Board): Board { return b.map(r => [...r]); }

function findKing(b: Board, color: Color): Pos | null {
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (b[r][c] === `${color}K`) return { row: r, col: c };
  return null;
}

// ─────────────────────── Attack detection ────────────────────
export function isAttackedBy(b: Board, pos: Pos, attacker: Color): boolean {
  const { row: r, col: c } = pos;
  const pd = attacker === 'w' ? 1 : -1;
  const pr = r + pd;
  if (inB(pr, c - 1) && b[pr][c - 1] === `${attacker}P`) return true;
  if (inB(pr, c + 1) && b[pr][c + 1] === `${attacker}P`) return true;
  for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
    const nr = r+dr, nc = c+dc;
    if (inB(nr, nc) && b[nr][nc] === `${attacker}N`) return true;
  }
  for (const [dr, dc] of [[-1,-1],[-1,1],[1,-1],[1,1]]) {
    let nr = r+dr, nc = c+dc;
    while (inB(nr, nc)) {
      if (b[nr][nc]) { if (b[nr][nc] === `${attacker}B` || b[nr][nc] === `${attacker}Q`) return true; break; }
      nr += dr; nc += dc;
    }
  }
  for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
    let nr = r+dr, nc = c+dc;
    while (inB(nr, nc)) {
      if (b[nr][nc]) { if (b[nr][nc] === `${attacker}R` || b[nr][nc] === `${attacker}Q`) return true; break; }
      nr += dr; nc += dc;
    }
  }
  for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
    const nr = r+dr, nc = c+dc;
    if (inB(nr, nc) && b[nr][nc] === `${attacker}K`) return true;
  }
  return false;
}

export function isInCheck(b: Board, color: Color): boolean {
  const king = findKing(b, color);
  if (!king) return false;
  const opp: Color = color === 'w' ? 'b' : 'w';
  return isAttackedBy(b, king, opp);
}

// ─────────────────────── Apply move ──────────────────────────
export type MoveResult = { board: Board; castling: CastleRights; enPassant: Pos | null; captured: Piece };

export function applyMove(b: Board, move: ChessMove, castling: CastleRights, _enPassant: Pos | null): MoveResult {
  const nb = cloneBoard(b);
  const piece = nb[move.from.row][move.from.col]!;
  const color = pieceColor(piece)!;
  const nc: CastleRights = { ...castling };
  let nep: Pos | null = null;
  let captured: Piece = null;

  if (move.castle) {
    const row = move.from.row;
    nb[row][move.to.col] = piece;
    nb[row][move.from.col] = null;
    if (move.castle === 'K') { nb[row][5] = nb[row][7]; nb[row][7] = null; }
    else                     { nb[row][3] = nb[row][0]; nb[row][0] = null; }
  } else if (move.enPassant) {
    nb[move.to.row][move.to.col] = piece;
    nb[move.from.row][move.from.col] = null;
    const capturedRow = color === 'w' ? move.to.row + 1 : move.to.row - 1;
    captured = nb[capturedRow][move.to.col];
    nb[capturedRow][move.to.col] = null;
  } else {
    captured = nb[move.to.row][move.to.col];
    nb[move.to.row][move.to.col] = move.promotion ?? piece;
    nb[move.from.row][move.from.col] = null;
    if ((piece === 'wP' || piece === 'bP') && Math.abs(move.to.row - move.from.row) === 2)
      nep = { row: (move.from.row + move.to.row) / 2, col: move.from.col };
  }

  if (piece === 'wK') { nc.wK = false; nc.wQ = false; }
  if (piece === 'bK') { nc.bK = false; nc.bQ = false; }
  if (move.from.row === 7 && move.from.col === 0) nc.wQ = false;
  if (move.from.row === 7 && move.from.col === 7) nc.wK = false;
  if (move.from.row === 0 && move.from.col === 0) nc.bQ = false;
  if (move.from.row === 0 && move.from.col === 7) nc.bK = false;
  if (move.to.row === 7 && move.to.col === 0) nc.wQ = false;
  if (move.to.row === 7 && move.to.col === 7) nc.wK = false;
  if (move.to.row === 0 && move.to.col === 0) nc.bQ = false;
  if (move.to.row === 0 && move.to.col === 7) nc.bK = false;

  return { board: nb, castling: nc, enPassant: nep, captured };
}

// ─────────────────────── State constants ─────────────────────
export const INIT_CASTLING: CastleRights = { wK: true, wQ: true, bK: true, bQ: true };

export const INIT: ChessState = {
  phase: 'menu' as GamePhase,
  board: makeInitialBoard(),
  selected: null,
  validMoves: [],
  turn: 'w',
  castling: INIT_CASTLING,
  enPassant: null,
  lastMove: null,
  playerScore: 0,
  computerScore: 0,
  message: '',
  capturedByPlayer: [],
  capturedByComputer: [],
  moveHistory: [],
};
