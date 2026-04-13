'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

// ─────────────────────── Types ───────────────────────────────
export type Side = 'player' | 'computer';
export type GamePhase = 'menu' | 'rolling' | 'moving' | 'computer' | 'won' | 'lost';
export type Die = 1 | 2 | 3 | 4 | 5 | 6;

/** points[0] = off-board (player borne off), points[25] = off-board (computer borne off)
 *  points[1..24] = the 24 playing points
 *  Bar: barPlayer / barComputer
 */
export interface PointState {
  player: number;
  computer: number;
}

export interface SheshState {
  phase: GamePhase;
  points: PointState[];    // index 0..25  (0=player borne-off, 25=computer borne-off, 1..24 playing)
  barPlayer: number;
  barComputer: number;
  dice: Die[];             // dice remaining this turn
  rolledDice: Die[];       // original roll (for display)
  currentTurn: Side;
  playerScore: number;
  computerScore: number;
  message: string;
  selected: number | null; // selected point index (1..24 or -1 for bar)
  validMoves: { from: number; to: number; die: Die }[];
  turnId: number;
}

// ─────────────────────── Initial board ───────────────────────
/**
 * Standard backgammon initial setup (player moves 24→1, computer moves 1→24)
 * Player: 2@24, 5@13, 3@8, 5@6
 * Computer: 2@1,  5@12, 3@17, 5@19
 */
export function makeInitialPoints(): PointState[] {
  const pts: PointState[] = Array.from({ length: 26 }, () => ({ player: 0, computer: 0 }));
  // Player pieces
  pts[24].player = 2;
  pts[13].player = 5;
  pts[8].player  = 3;
  pts[6].player  = 5;
  // Computer pieces
  pts[1].computer  = 2;
  pts[12].computer = 5;
  pts[17].computer = 3;
  pts[19].computer = 5;
  return pts;
}

// ─────────────────────── Helpers ─────────────────────────────
function rollDie(): Die { return (Math.floor(Math.random() * 6) + 1) as Die; }

function expandDice(d1: Die, d2: Die): Die[] {
  return d1 === d2 ? [d1, d1, d1, d1] : [d1, d2];
}

function clonePoints(pts: PointState[]): PointState[] {
  return pts.map(p => ({ ...p }));
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

type SimpleMove = { from: number; to: number; die: Die };

/**
 * Compute all valid single-step moves for a side given remaining dice.
 * from=-1 means from bar, to=0 means player bearing off, to=25 means computer bearing off.
 */
export function computeValidMoves(
  pts: PointState[],
  barPlayer: number,
  barComputer: number,
  dice: Die[],
  side: Side,
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
      // Must re-enter from bar; player enters at 25-die, computer enters at die
      const entryPoint = side === 'player' ? 25 - die : die;
      if (entryPoint < 1 || entryPoint > 24) continue;
      const pt = pts[entryPoint];
      const opp = side === 'player' ? pt.computer : pt.player;
      if (opp <= 1) results.push({ from: -1, to: entryPoint, die });
    } else {
      for (let from = 1; from <= 24; from++) {
        const myCount = side === 'player' ? pts[from].player : pts[from].computer;
        if (myCount === 0) continue;

        const to = from + dir * die;

        if (to >= 1 && to <= 24) {
          const pt = pts[to];
          const opp = side === 'player' ? pt.computer : pt.player;
          if (opp <= 1) results.push({ from, to, die });
        } else if (inHome) {
          // Bearing off
          const homeRange = side === 'player'
            ? (from >= 1 && from <= 6)
            : (from >= 19 && from <= 24);
          if (!homeRange) continue;

          if ((side === 'player' && to <= 0) || (side === 'computer' && to >= 25)) {
            // Exact or overshoot - valid only if no piece is on a higher point
            const target = side === 'player' ? 0 : 25;
            if (to === target) {
              results.push({ from, to, die });
            } else {
              // Overshoot: only valid if no player piece on a higher-numbered home point
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

function applyMoveState(
  pts: PointState[], barP: number, barC: number, move: SimpleMove, side: Side
): { pts: PointState[]; barP: number; barC: number } {
  const np = clonePoints(pts);
  let nbP = barP, nbC = barC;
  const opp: Side = side === 'player' ? 'computer' : 'player';

  // Remove from source
  if (move.from === -1) {
    if (side === 'player') nbP--;
    else nbC--;
  } else {
    if (side === 'player') np[move.from].player--;
    else np[move.from].computer--;
  }

  // Bearing off
  if (move.to === 0 || move.to === 25) {
    // piece exits board — counted in pts[0] or pts[25]
    if (side === 'player') np[0].player++;
    else np[25].computer++;
    return { pts: np, barP: nbP, barC: nbC };
  }

  // Landing: check if opponent has a single piece (blot) — hit it
  const oppCount = side === 'player' ? np[move.to].computer : np[move.to].player;
  if (oppCount === 1) {
    if (opp === 'player') { np[move.to].player--; nbP++; }
    else { np[move.to].computer--; nbC++; }
  }

  // Place piece
  if (side === 'player') np[move.to].player++;
  else np[move.to].computer++;

  return { pts: np, barP: nbP, barC: nbC };
}

// ─────────────────────── Computer AI (greedy) ────────────────
function pipCount(pts: PointState[], barC: number): number {
  let pip = barC * 25; // bar pieces need to travel furthest
  for (let i = 1; i <= 24; i++) pip += pts[i].computer * i; // computer wants to minimize (go to 25)
  // Actually computer moves 1→25, so pip = distance to 25 = 25 - i... let me invert:
  // pip count for computer = sum of (25 - pointIndex) × count
  return pip;
}

function computerBestMove(
  pts: PointState[], barP: number, barC: number, dice: Die[]
): SimpleMove | null {
  const moves = computeValidMoves(pts, barP, barC, dice, 'computer');
  if (!moves.length) return null;

  let best = moves[0];
  let bestScore = -Infinity;

  for (const m of moves) {
    const { pts: np, barC: nbC } = applyMoveState(pts, barP, barC, m, 'computer');
    let score = 0;

    // Prefer bearing off
    if (m.to === 25) score += 200;

    // Prefer hitting player pieces
    if (m.to >= 1 && m.to <= 24 && pts[m.to].player === 1) score += 50;

    // Reduce pip count (advance pieces)
    const oldPip = pipCount(pts, barC);
    const newPip = pipCount(np, nbC);
    score += (oldPip - newPip) * 3;

    // Prefer making points (having 2+ pieces = safe)
    if (m.to >= 1 && m.to <= 24) {
      const afterCount = np[m.to].computer;
      if (afterCount >= 2) score += 10;
    }

    // Penalize leaving blots (exposed single pieces)
    if (m.from >= 1 && m.from <= 24 && np[m.from].computer === 1) score -= 5;

    if (score > bestScore) { bestScore = score; best = m; }
  }

  return best;
}

// ─────────────────────── Move execution helper (pure) ───────────────────────
function doPlayerMove(prev: SheshState, move: SimpleMove): SheshState {
  const { pts: np, barP: nbP, barC: nbC } = applyMoveState(
    prev.points, prev.barPlayer, prev.barComputer, move, 'player'
  );
  const diceIdx = prev.dice.indexOf(move.die);
  const newDice = prev.dice.filter((_, i) => i !== diceIdx);

  if (np[0].player === 15) {
    return {
      ...prev, points: np, barPlayer: nbP, barComputer: nbC,
      dice: [], selected: null, validMoves: [],
      phase: 'won', playerScore: prev.playerScore + 1,
      message: '🎉 ניצחת! ריקנת את כל האסימונים!',
    };
  }

  if (newDice.length === 0) {
    return {
      ...prev, points: np, barPlayer: nbP, barComputer: nbC,
      dice: [], rolledDice: [], selected: null, validMoves: [],
      currentTurn: 'computer', phase: 'rolling',
      message: 'תור המחשב...', turnId: prev.turnId + 1,
    };
  }

  const nextMoves = computeValidMoves(np, nbP, nbC, newDice, 'player');
  if (nextMoves.length === 0) {
    return {
      ...prev, points: np, barPlayer: nbP, barComputer: nbC,
      dice: newDice, rolledDice: prev.rolledDice,
      selected: null, validMoves: [],
      currentTurn: 'computer', phase: 'rolling',
      message: 'אין יותר מהלכים. תור המחשב...', turnId: prev.turnId + 1,
    };
  }

  return {
    ...prev, points: np, barPlayer: nbP, barComputer: nbC,
    dice: newDice, selected: null, validMoves: [],
    phase: 'moving',
    message: `נותרו ${newDice.length} קוביות. בחר אסימון להמשך`,
  };
}

// ─────────────────────── Hook ────────────────────────────────
const INIT_STATE: SheshState = {
  phase: 'menu',
  points: makeInitialPoints(),
  barPlayer: 0, barComputer: 0,
  dice: [], rolledDice: [],
  currentTurn: 'player',
  playerScore: 0, computerScore: 0,
  message: '',
  selected: null, validMoves: [],
  turnId: 0,
};

export function useSheshBeshGame() {
  const [state, setState] = useState<SheshState>(INIT_STATE);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startGame = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setState(prev => ({
      ...INIT_STATE,
      phase: 'rolling',
      points: makeInitialPoints(),
      currentTurn: 'player',
      playerScore: prev.playerScore,
      computerScore: prev.computerScore,
      message: 'לחץ "הטל קוביות" להתחיל!',
    }));
  }, []);

  const rollDice = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'rolling') return prev;
      const d1 = rollDie(), d2 = rollDie();
      const dice = expandDice(d1, d2);
      const moves = computeValidMoves(prev.points, prev.barPlayer, prev.barComputer, dice, 'player');
      if (moves.length === 0) {
        return {
          ...prev, dice, rolledDice: [d1, d2], phase: 'rolling',
          currentTurn: 'computer',
          message: `הטלת ${d1}-${d2}. אין מהלכים זמינים! תור המחשב...`,
          turnId: prev.turnId + 1,
        };
      }
      return { ...prev, dice, rolledDice: [d1, d2], phase: 'moving', message: `הטלת ${d1}-${d2}. בחר אסימון` };
    });
  }, []);

  const selectPoint = useCallback((pointIdx: number) => {
    setState(prev => {
      if (prev.phase !== 'moving' || prev.currentTurn !== 'player') return prev;

      // ── Clicking the bear-off zone (point 0): destination-only, never selectable ──
      if (pointIdx === 0) {
        if (prev.selected !== null) {
          const move = prev.validMoves.find(m => m.to === 0);
          if (move) return doPlayerMove(prev, move);
        }
        return prev;
      }

      // ── Does the clicked point have the player's own pieces? ────────────────
      const isBar = pointIdx === -1;
      const hasOwnPiece = isBar
        ? prev.barPlayer > 0
        : (pointIdx >= 1 && pointIdx <= 24 && (prev.points[pointIdx]?.player ?? 0) > 0);

      if (hasOwnPiece) {
        // Clicking the currently selected piece → deselect
        if (pointIdx === prev.selected) {
          return { ...prev, selected: null, validMoves: [], message: 'בחר אסימון' };
        }
        // If this point is a highlighted valid destination → execute stacking move
        if (prev.selected !== null) {
          const move = prev.validMoves.find(m => m.to === pointIdx);
          if (move) return doPlayerMove(prev, move);
        }
        // Otherwise → reselect this piece
        if (prev.barPlayer > 0 && !isBar) {
          return { ...prev, selected: null, validMoves: [], message: 'יש לך אסימון על הבר — חובה להכניסו קודם!' };
        }
        const allMoves = computeValidMoves(prev.points, prev.barPlayer, prev.barComputer, prev.dice, 'player');
        const fromHere = allMoves.filter(m => m.from === pointIdx);
        if (fromHere.length === 0) {
          return { ...prev, selected: pointIdx, validMoves: [], message: 'אין מהלכים אפשריים מנקודה זו' };
        }
        return { ...prev, selected: pointIdx, validMoves: fromHere, message: 'לאיזו נקודה לזוז?' };
      }

      // ── Empty / opponent-only point: execute move if possible ──────────────
      if (prev.selected !== null) {
        const move = prev.validMoves.find(m => m.to === pointIdx);
        if (move) return doPlayerMove(prev, move);
      }

      return { ...prev, selected: null, validMoves: [], message: 'בחר אסימון שלך!' };
    });
  }, []);

  // Computer turn
  useEffect(() => {
    if (state.phase !== 'rolling' || state.currentTurn !== 'computer') return;
    timer.current = setTimeout(() => {
      setState(prev => {
        if (prev.currentTurn !== 'computer' || prev.phase !== 'rolling') return prev;
        const d1 = rollDie(), d2 = rollDie();
        const dice = expandDice(d1, d2);
        return { ...prev, dice, rolledDice: [d1, d2], phase: 'computer', message: `המחשב הטיל ${d1}-${d2}`, turnId: prev.turnId + 1 };
      });
    }, 600);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [state.currentTurn, state.phase, state.turnId]);

  useEffect(() => {
    if (state.phase !== 'computer') return;
    let remaining = [...state.dice];
    let pts = clonePoints(state.points);
    let barP = state.barPlayer;
    let barC = state.barComputer;
    const msgParts: string[] = [];

    // Computer plays all moves sequentially
    while (remaining.length > 0) {
      const move = computerBestMove(pts, barP, barC, remaining);
      if (!move) break;
      const result = applyMoveState(pts, barP, barC, move, 'computer');
      pts = result.pts;
      barP = result.barP;
      barC = result.barC;
      msgParts.push(`${move.from < 0 ? 'בר' : move.from}→${move.to >= 25 ? 'סיים' : move.to}`);
      const dieIdx = remaining.indexOf(move.die);
      remaining = remaining.filter((_, i) => i !== dieIdx);
    }

    const msg = msgParts.length ? `המחשב: ${msgParts.join(', ')}. תורך!` : 'המחשב לא יכול לזוז. תורך!';

    // Check if computer won
    if (pts[25].computer === 15) {
      timer.current = setTimeout(() => {
        setState(prev => ({ ...prev, points: pts, barPlayer: barP, barComputer: barC, dice: [], phase: 'lost', computerScore: prev.computerScore + 1, message: '😢 המחשב ניצח!' }));
      }, 500);
      return;
    }

    timer.current = setTimeout(() => {
      setState(prev => ({
        ...prev, points: pts, barPlayer: barP, barComputer: barC,
        dice: [], rolledDice: [], currentTurn: 'player', phase: 'rolling',
        message: msg,
      }));
    }, 1000);

    return () => { if (timer.current) clearTimeout(timer.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase, state.turnId]);

  return { state, startGame, rollDice, selectPoint };
}
