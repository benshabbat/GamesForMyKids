'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

// ─────────────────────── Types ───────────────────────────────
export type Color = 'w' | 'b';
export type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P';
export type Piece = `${Color}${PieceType}` | null;
export type Board = Piece[][];
export interface Pos { row: number; col: number; }
export interface CastleRights { wK: boolean; wQ: boolean; bK: boolean; bQ: boolean; }
export interface ChessMove {
  from: Pos; to: Pos;
  promotion?: Piece;
  castle?: 'K' | 'Q';
  enPassant?: true;
}
export type GamePhase = 'menu' | 'playing' | 'check' | 'checkmate' | 'stalemate';

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
const inB = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
const pieceColor = (p: Piece): Color | null => p ? p[0] as Color : null;
const isOpp = (p: Piece, myColor: Color) => { const c = pieceColor(p); return c !== null && c !== myColor; };
const isFriend = (p: Piece, myColor: Color) => pieceColor(p) === myColor;
function cloneBoard(b: Board): Board { return b.map(r => [...r]); }

function findKing(b: Board, color: Color): Pos | null {
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (b[r][c] === `${color}K`) return { row: r, col: c };
  return null;
}

// ─────────────────────── Attack detection ────────────────────
function isAttackedBy(b: Board, pos: Pos, attacker: Color): boolean {
  const { row: r, col: c } = pos;
  // Pawns
  const pd = attacker === 'w' ? 1 : -1;
  const pr = r + pd;
  if (inB(pr, c - 1) && b[pr][c - 1] === `${attacker}P`) return true;
  if (inB(pr, c + 1) && b[pr][c + 1] === `${attacker}P`) return true;
  // Knights
  for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
    const nr = r+dr, nc = c+dc;
    if (inB(nr, nc) && b[nr][nc] === `${attacker}N`) return true;
  }
  // Bishops / Queens (diagonal)
  for (const [dr, dc] of [[-1,-1],[-1,1],[1,-1],[1,1]]) {
    let nr = r+dr, nc = c+dc;
    while (inB(nr, nc)) {
      if (b[nr][nc]) { if (b[nr][nc] === `${attacker}B` || b[nr][nc] === `${attacker}Q`) return true; break; }
      nr += dr; nc += dc;
    }
  }
  // Rooks / Queens (straight)
  for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
    let nr = r+dr, nc = c+dc;
    while (inB(nr, nc)) {
      if (b[nr][nc]) { if (b[nr][nc] === `${attacker}R` || b[nr][nc] === `${attacker}Q`) return true; break; }
      nr += dr; nc += dc;
    }
  }
  // King
  for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
    const nr = r+dr, nc = c+dc;
    if (inB(nr, nc) && b[nr][nc] === `${attacker}K`) return true;
  }
  return false;
}

function isInCheck(b: Board, color: Color): boolean {
  const king = findKing(b, color);
  if (!king) return false;
  const opp: Color = color === 'w' ? 'b' : 'w';
  return isAttackedBy(b, king, opp);
}

// ─────────────────────── Move generation ─────────────────────
function getRawMoves(b: Board, pos: Pos, castling: CastleRights, enPassant: Pos | null): ChessMove[] {
  const piece = b[pos.row][pos.col];
  if (!piece) return [];
  const color = pieceColor(piece)!;
  const pType = piece[1] as PieceType;
  const { row: r, col: c } = pos;
  const moves: ChessMove[] = [];

  if (pType === 'P') {
    const dir = color === 'w' ? -1 : 1;
    const startRow = color === 'w' ? 6 : 1;
    const promRow = color === 'w' ? 0 : 7;
    const addPawn = (to: Pos, extra?: Omit<ChessMove, 'from' | 'to'>) => {
      if (to.row === promRow) {
        for (const pt of ['Q', 'R', 'B', 'N'] as PieceType[])
          moves.push({ from: pos, to, promotion: `${color}${pt}` as Piece, ...extra });
      } else moves.push({ from: pos, to, ...extra });
    };
    // Forward
    if (inB(r + dir, c) && !b[r + dir][c]) {
      addPawn({ row: r + dir, col: c });
      if (r === startRow && !b[r + 2 * dir][c])
        moves.push({ from: pos, to: { row: r + 2 * dir, col: c } });
    }
    // Captures
    for (const dc of [-1, 1]) {
      const tr = r + dir, tc = c + dc;
      if (!inB(tr, tc)) continue;
      if (isOpp(b[tr][tc], color)) addPawn({ row: tr, col: tc });
      else if (enPassant && tr === enPassant.row && tc === enPassant.col)
        moves.push({ from: pos, to: { row: tr, col: tc }, enPassant: true });
    }
  }

  else if (pType === 'N') {
    for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
      const tr = r+dr, tc = c+dc;
      if (inB(tr, tc) && !isFriend(b[tr][tc], color)) moves.push({ from: pos, to: { row: tr, col: tc } });
    }
  }

  else if (pType === 'B' || pType === 'R' || pType === 'Q') {
    const dirs = pType === 'B' ? [[-1,-1],[-1,1],[1,-1],[1,1]]
      : pType === 'R' ? [[-1,0],[1,0],[0,-1],[0,1]]
      : [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]];
    for (const [dr, dc] of dirs) {
      let tr = r+dr, tc = c+dc;
      while (inB(tr, tc) && !isFriend(b[tr][tc], color)) {
        moves.push({ from: pos, to: { row: tr, col: tc } });
        if (b[tr][tc]) break;
        tr += dr; tc += dc;
      }
    }
  }

  else if (pType === 'K') {
    for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
      const tr = r+dr, tc = c+dc;
      if (inB(tr, tc) && !isFriend(b[tr][tc], color)) moves.push({ from: pos, to: { row: tr, col: tc } });
    }
    // Castling
    const crow = color === 'w' ? 7 : 0;
    const opp: Color = color === 'w' ? 'b' : 'w';
    if (r === crow && c === 4 && !isAttackedBy(b, pos, opp)) {
      const kingside = color === 'w' ? castling.wK : castling.bK;
      const queenside = color === 'w' ? castling.wQ : castling.bQ;
      if (kingside && !b[crow][5] && !b[crow][6]
        && !isAttackedBy(b, { row: crow, col: 5 }, opp)
        && !isAttackedBy(b, { row: crow, col: 6 }, opp))
        moves.push({ from: pos, to: { row: crow, col: 6 }, castle: 'K' });
      if (queenside && !b[crow][3] && !b[crow][2] && !b[crow][1]
        && !isAttackedBy(b, { row: crow, col: 3 }, opp)
        && !isAttackedBy(b, { row: crow, col: 2 }, opp))
        moves.push({ from: pos, to: { row: crow, col: 2 }, castle: 'Q' });
    }
  }

  return moves;
}

type MoveResult = { board: Board; castling: CastleRights; enPassant: Pos | null };

function applyMove(b: Board, move: ChessMove, castling: CastleRights, enPassant: Pos | null): MoveResult {
  const nb = cloneBoard(b);
  const piece = nb[move.from.row][move.from.col]!;
  const color = pieceColor(piece)!;
  const nc: CastleRights = { ...castling };
  let nep: Pos | null = null;

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
    nb[capturedRow][move.to.col] = null;
  } else {
    nb[move.to.row][move.to.col] = move.promotion ?? piece;
    nb[move.from.row][move.from.col] = null;
    if ((piece === 'wP' || piece === 'bP') && Math.abs(move.to.row - move.from.row) === 2)
      nep = { row: (move.from.row + move.to.row) / 2, col: move.from.col };
  }

  // Update castling rights
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

  return { board: nb, castling: nc, enPassant: nep };
}

function getValidMoves(b: Board, pos: Pos, castling: CastleRights, enPassant: Pos | null): ChessMove[] {
  const piece = b[pos.row][pos.col];
  if (!piece) return [];
  const color = pieceColor(piece)!;
  return getRawMoves(b, pos, castling, enPassant).filter(m => {
    const { board: nb } = applyMove(b, m, castling, enPassant);
    return !isInCheck(nb, color);
  });
}

function getAllValidMoves(b: Board, color: Color, castling: CastleRights, enPassant: Pos | null): ChessMove[] {
  const moves: ChessMove[] = [];
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (pieceColor(b[r][c]) === color)
        moves.push(...getValidMoves(b, { row: r, col: c }, castling, enPassant));
  return moves;
}

// ─────────────────────── AI ──────────────────────────────────
const PIECE_VALUES: Record<PieceType, number> = { K: 20000, Q: 900, R: 500, B: 330, N: 320, P: 100 };

// Simple positional bonuses for center control
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

function minimax(b: Board, depth: number, alpha: number, beta: number, isMax: boolean, castling: CastleRights, enPassant: Pos | null): number {
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

function bestComputerMove(b: Board, castling: CastleRights, enPassant: Pos | null): ChessMove | null {
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

// ─────────────────────── Hook ────────────────────────────────
export interface ChessState {
  phase: GamePhase;
  board: Board;
  selected: Pos | null;
  validMoves: ChessMove[];
  turn: Color;
  castling: CastleRights;
  enPassant: Pos | null;
  lastMove: ChessMove | null;
  playerScore: number;
  computerScore: number;
  message: string;
  turnId: number;
}

const INIT_CASTLING: CastleRights = { wK: true, wQ: true, bK: true, bQ: true };

const INIT: ChessState = {
  phase: 'menu', board: makeInitialBoard(), selected: null, validMoves: [],
  turn: 'w', castling: INIT_CASTLING, enPassant: null, lastMove: null,
  playerScore: 0, computerScore: 0, message: '', turnId: 0,
};

export const PIECE_SYMBOLS: Record<string, string> = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

export function useChessGame() {
  const [state, setState] = useState<ChessState>(INIT);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startGame = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setState(prev => ({
      ...INIT,
      phase: 'playing',
      board: makeInitialBoard(),
      playerScore: prev.playerScore,
      computerScore: prev.computerScore,
      castling: INIT_CASTLING,
      message: 'תורך! אתה משחק לבן (♙)',
    }));
  }, []);

  const selectSquare = useCallback((pos: Pos) => {
    setState(prev => {
      if (prev.phase !== 'playing' && prev.phase !== 'check') return prev;
      if (prev.turn !== 'w') return prev;

      // Execute move to this square
      const move = prev.validMoves.find(m => m.to.row === pos.row && m.to.col === pos.col);
      if (move) {
        const { board: nb, castling: nc, enPassant: nep } = applyMove(prev.board, move, prev.castling, prev.enPassant);
        const compMoves = getAllValidMoves(nb, 'b', nc, nep);
        if (compMoves.length === 0) {
          const phrase = isInCheck(nb, 'b') ? 'שחמט!' : 'פאט!';
          return {
            ...prev, board: nb, castling: nc, enPassant: nep, lastMove: move, selected: null, validMoves: [],
            phase: 'checkmate', playerScore: prev.playerScore + (isInCheck(nb, 'b') ? 1 : 0),
            message: `🏆 ${phrase} ניצחת!`,
          };
        }
        const phase: GamePhase = isInCheck(nb, 'b') ? 'check' : 'playing';
        return {
          ...prev, board: nb, castling: nc, enPassant: nep, lastMove: move,
          selected: null, validMoves: [], turn: 'b', phase,
          message: phase === 'check' ? '⚠️ שח! תור המחשב...' : 'תור המחשב...',
          turnId: prev.turnId + 1,
        };
      }

      // Select a white piece
      if (pieceColor(prev.board[pos.row][pos.col]) !== 'w') {
        return { ...prev, selected: null, validMoves: [], message: 'בחר כלי לבן שלך!' };
      }
      const vm = getValidMoves(prev.board, pos, prev.castling, prev.enPassant);
      return { ...prev, selected: pos, validMoves: vm, message: vm.length ? 'לאן לזוז?' : 'לכלי זה אין מהלכים חוקיים' };
    });
  }, []);

  // Computer turn
  useEffect(() => {
    if (state.phase !== 'playing' && state.phase !== 'check') return;
    if (state.turn !== 'b') return;
    timer.current = setTimeout(() => {
      setState(prev => {
        if (prev.turn !== 'b') return prev;
        const move = bestComputerMove(prev.board, prev.castling, prev.enPassant);
        if (!move) {
          const phrase = isInCheck(prev.board, 'b') ? 'שחמט! ניצחת!' : 'פאט!';
          return { ...prev, phase: 'checkmate', playerScore: prev.playerScore + (isInCheck(prev.board, 'b') ? 1 : 0), message: `🏆 ${phrase}` };
        }
        const { board: nb, castling: nc, enPassant: nep } = applyMove(prev.board, move, prev.castling, prev.enPassant);
        const playerMoves = getAllValidMoves(nb, 'w', nc, nep);
        if (playerMoves.length === 0) {
          const phrase = isInCheck(nb, 'w') ? 'שחמט' : 'פאט';
          return { ...prev, board: nb, castling: nc, enPassant: nep, lastMove: move, phase: 'checkmate', computerScore: prev.computerScore + (isInCheck(nb, 'w') ? 1 : 0), message: `😢 ${phrase}! המחשב ניצח.` };
        }
        const phase: GamePhase = isInCheck(nb, 'w') ? 'check' : 'playing';
        return {
          ...prev, board: nb, castling: nc, enPassant: nep, lastMove: move,
          selected: null, validMoves: [], turn: 'w', phase,
          message: phase === 'check' ? '⚠️ אתה בשח! תורך' : 'תורך!',
        };
      });
    }, 600);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [state.turn, state.phase, state.turnId]);

  return { state, startGame, selectSquare };
}
