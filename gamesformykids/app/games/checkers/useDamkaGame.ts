'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

// ─────────────────────── Types ───────────────────────────────
export type Side = 'player' | 'computer';
export type GamePhase = 'menu' | 'playing' | 'won' | 'lost';
export interface Cell { color: Side | null; isKing: boolean; }
export type Board = Cell[][];
export interface Pos { row: number; col: number; }
export interface DamkaMove { from: Pos; to: Pos; captures: Pos[]; }

// ─────────────────────── Board helpers ───────────────────────
const isDark = (r: number, c: number) => (r + c) % 2 === 1;
const inBounds = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
const empty = (): Cell => ({ color: null, isKing: false });

export function makeInitialBoard(): Board {
  const b: Board = Array.from({ length: 8 }, () => Array.from({ length: 8 }, empty));
  for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++)
    if (isDark(r, c)) b[r][c] = { color: 'computer', isKing: false };
  for (let r = 5; r < 8; r++) for (let c = 0; c < 8; c++)
    if (isDark(r, c)) b[r][c] = { color: 'player', isKing: false };
  return b;
}

function cloneBoard(b: Board): Board { return b.map(r => r.map(c => ({ ...c }))); }

// ─────────────────────── Move generation ─────────────────────
/**
 * Find all capture sequences starting from startPos using DFS.
 * Regular pieces can capture in all 4 diagonal directions (English draughts).
 */
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
      if (board[mr][mc].color !== opp) continue;
      if (board[tr][tc].color !== null) continue;
      if (captured.some(p => p.row === mr && p.col === mc)) continue;

      jumped = true;
      const nb = cloneBoard(board);
      const kingAfter = isKing
        || (side === 'player' && tr === 0)
        || (side === 'computer' && tr === 7);
      nb[tr][tc] = { color: side, isKing: kingAfter };
      nb[pos.row][pos.col] = empty();
      nb[mr][mc] = empty();
      dfs(nb, { row: tr, col: tc }, kingAfter, [...captured, { row: mr, col: mc }]);
    }
    if (!jumped && captured.length > 0) {
      results.push({ from: startPos, to: pos, captures: captured });
    }
  }

  dfs(b, startPos, b[startPos.row][startPos.col].isKing, []);
  return results;
}

function getNormals(b: Board, pos: Pos, side: Side): DamkaMove[] {
  const piece = b[pos.row][pos.col];
  const dirs: [number, number][] = piece.isKing
    ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    : side === 'player' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
  return dirs
    .map(([dr, dc]) => ({ row: pos.row + dr, col: pos.col + dc }))
    .filter(to => inBounds(to.row, to.col) && b[to.row][to.col].color === null)
    .map(to => ({ from: pos, to, captures: [] }));
}

export function getAllMoves(b: Board, side: Side): DamkaMove[] {
  const captures: DamkaMove[] = [];
  const normals: DamkaMove[] = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    if (b[r][c].color !== side) continue;
    const pos = { row: r, col: c };
    captures.push(...getCaptures(b, pos, side));
    normals.push(...getNormals(b, pos, side));
  }
  return captures.length > 0 ? captures : normals;
}

export function applyMove(b: Board, move: DamkaMove): Board {
  const nb = cloneBoard(b);
  const piece = nb[move.from.row][move.from.col];
  for (const cap of move.captures) nb[cap.row][cap.col] = empty();
  nb[move.to.row][move.to.col] = { ...piece };
  nb[move.from.row][move.from.col] = empty();
  if (piece.color === 'player' && move.to.row === 0) nb[move.to.row][move.to.col].isKing = true;
  if (piece.color === 'computer' && move.to.row === 7) nb[move.to.row][move.to.col].isKing = true;
  return nb;
}

// ─────────────────────── AI (minimax) ────────────────────────
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

function bestComputerMove(b: Board): DamkaMove | null {
  const moves = getAllMoves(b, 'computer');
  if (!moves.length) return null;
  let bestScore = -Infinity, best = moves[0];
  for (const m of moves) {
    const s = minimax(applyMove(b, m), 3, -Infinity, Infinity, false);
    if (s > bestScore) { bestScore = s; best = m; }
  }
  return best;
}

// ─────────────────────── Hook ────────────────────────────────
export interface DamkaState {
  phase: GamePhase;
  board: Board;
  selected: Pos | null;
  validMoves: DamkaMove[];
  currentTurn: Side;
  playerScore: number;
  computerScore: number;
  message: string;
  turnId: number;
}

const INIT: DamkaState = {
  phase: 'menu', board: makeInitialBoard(), selected: null, validMoves: [],
  currentTurn: 'player', playerScore: 0, computerScore: 0, message: '', turnId: 0,
};

export function useDamkaGame() {
  const [state, setState] = useState<DamkaState>(INIT);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startGame = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setState(prev => ({
      ...INIT,
      phase: 'playing',
      board: makeInitialBoard(),
      playerScore: prev.playerScore,
      computerScore: prev.computerScore,
      message: 'תורך! בחר אסימון אדום',
      turnId: 0,
    }));
  }, []);

  const selectCell = useCallback((pos: Pos) => {
    setState(prev => {
      if (prev.phase !== 'playing' || prev.currentTurn !== 'player') return prev;
      const cell = prev.board[pos.row][pos.col];

      // Execute move if clicking a valid destination
      const move = prev.validMoves.find(m => m.to.row === pos.row && m.to.col === pos.col);
      if (move) {
        const nb = applyMove(prev.board, move);
        const compMoves = getAllMoves(nb, 'computer');
        if (compMoves.length === 0) {
          return { ...prev, board: nb, selected: null, validMoves: [], phase: 'won', playerScore: prev.playerScore + 1, message: '🎉 ניצחת!' };
        }
        return { ...prev, board: nb, selected: null, validMoves: [], currentTurn: 'computer', message: 'תור המחשב...', turnId: prev.turnId + 1 };
      }

      // Select a player piece
      if (cell.color !== 'player') {
        return { ...prev, selected: null, validMoves: [], message: 'בחר אסימון אדום שלך!' };
      }
      const allMoves = getAllMoves(prev.board, 'player');
      const mustCapture = allMoves.some(m => m.captures.length > 0);
      const pieceMoves = allMoves.filter(m => m.from.row === pos.row && m.from.col === pos.col);

      if (pieceMoves.length === 0) {
        const msg = mustCapture ? 'חובה לקפוץ — בחר אסימון שיכול לקפוץ!' : 'אין מהלכים לאסימון זה';
        return { ...prev, selected: pos, validMoves: [], message: msg };
      }
      return { ...prev, selected: pos, validMoves: pieceMoves, message: 'לאן לזוז?' };
    });
  }, []);

  // Computer turn
  useEffect(() => {
    if (state.phase !== 'playing' || state.currentTurn !== 'computer') return;
    timer.current = setTimeout(() => {
      setState(prev => {
        if (prev.phase !== 'playing' || prev.currentTurn !== 'computer') return prev;
        const move = bestComputerMove(prev.board);
        if (!move) {
          return { ...prev, phase: 'won', playerScore: prev.playerScore + 1, message: '🎉 ניצחת! למחשב אין מהלכים!' };
        }
        const nb = applyMove(prev.board, move);
        const playerMoves = getAllMoves(nb, 'player');
        if (playerMoves.length === 0) {
          return { ...prev, board: nb, phase: 'lost', computerScore: prev.computerScore + 1, message: '😢 המחשב ניצח!' };
        }
        return { ...prev, board: nb, currentTurn: 'player', selected: null, validMoves: [], message: 'תורך!' };
      });
    }, 700);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [state.currentTurn, state.phase, state.turnId]);

  return { state, startGame, selectCell };
}
