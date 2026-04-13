import { create } from 'zustand';

// ─────────────────────── Types ───────────────────────────────
export type Side = 'player' | 'computer';
export type GamePhase = 'menu' | 'rolling' | 'moving' | 'computer' | 'won' | 'lost';
export type Die = 1 | 2 | 3 | 4 | 5 | 6;

export interface PointState {
  player: number;
  computer: number;
}

interface SheshState {
  phase: GamePhase;
  points: PointState[];
  barPlayer: number;
  barComputer: number;
  dice: Die[];
  rolledDice: Die[];
  currentTurn: Side;
  playerScore: number;
  computerScore: number;
  message: string;
  selected: number | null;
  validMoves: SimpleMove[];
  turnHistory: TurnSnapshot[];
}

interface SheshActions {
  startGame: () => void;
  rollDice: () => void;
  selectPoint: (pointIdx: number) => void;
  undoMove: () => void;
}

type SimpleMove = { from: number; to: number; die: Die };
type TurnSnapshot = { points: PointState[]; barPlayer: number; barComputer: number; dice: Die[] };

// ─────────────────────── Pure helpers ────────────────────────
function rollDie(): Die { return (Math.floor(Math.random() * 6) + 1) as Die; }
function expandDice(d1: Die, d2: Die): Die[] { return d1 === d2 ? [d1, d1, d1, d1] : [d1, d2]; }
function clonePoints(pts: PointState[]): PointState[] { return pts.map(p => ({ ...p })); }

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
          const homeRange = side === 'player' ? (from >= 1 && from <= 6) : (from >= 19 && from <= 24);
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

function applyMove(
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

function pipCount(pts: PointState[], barC: number): number {
  let pip = barC * 25;
  for (let i = 1; i <= 24; i++) pip += pts[i].computer * i;
  return pip;
}

function computerBestMove(pts: PointState[], barP: number, barC: number, dice: Die[]): SimpleMove | null {
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

// ─────────────────────── Initial state ───────────────────────
const INIT: SheshState = {
  phase: 'menu',
  points: makeInitialPoints(),
  barPlayer: 0, barComputer: 0,
  dice: [], rolledDice: [],
  currentTurn: 'player',
  playerScore: 0, computerScore: 0,
  message: '',
  selected: null, validMoves: [],
  turnHistory: [],
};

// ─────────────────────── Module-level timer ───────────────────
let _timer: ReturnType<typeof setTimeout> | null = null;
function _clearTimer() { if (_timer) { clearTimeout(_timer); _timer = null; } }
function _after(fn: () => void, ms: number) { _clearTimer(); _timer = setTimeout(fn, ms); }

// ─────────────────────── Store ───────────────────────────────
export const useSheshBeshStore = create<SheshState & SheshActions>()((set, get) => {

  // ── Schedule computer turn (called whenever currentTurn flips to 'computer') ──
  function scheduleComputerTurn() {
    _after(() => {
      const s = get();
      if (s.currentTurn !== 'computer') return;

      // Roll computer dice
      const d1 = rollDie(), d2 = rollDie();
      const dice = expandDice(d1, d2);
      set({ dice, rolledDice: [d1, d2], phase: 'computer', message: `המחשב הטיל ${d1}-${d2}` });

      // Play all moves after a short visual pause
      _timer = setTimeout(() => {
        const cur = get();
        if (cur.phase !== 'computer') return;

        let remaining = [...cur.dice];
        let pts = clonePoints(cur.points);
        let barP = cur.barPlayer;
        let barC = cur.barComputer;
        const parts: string[] = [];

        while (remaining.length > 0) {
          const move = computerBestMove(pts, barP, barC, remaining);
          if (!move) break;
          const r = applyMove(pts, barP, barC, move, 'computer');
          pts = r.pts; barP = r.barP; barC = r.barC;
          parts.push(`${move.from < 0 ? 'בר' : move.from}→${move.to >= 25 ? 'סיים' : move.to}`);
          const dieIdx = remaining.indexOf(move.die);
          remaining = remaining.filter((_, i) => i !== dieIdx);
        }

        const msg = parts.length ? `המחשב: ${parts.join(', ')}. תורך!` : 'המחשב לא יכול לזוז. תורך!';

        if (pts[25].computer === 15) {
          set({ points: pts, barPlayer: barP, barComputer: barC, dice: [], phase: 'lost',
            computerScore: cur.computerScore + 1, message: '😢 המחשב ניצח!' });
          return;
        }

        set({ points: pts, barPlayer: barP, barComputer: barC,
          dice: [], rolledDice: [], currentTurn: 'player', phase: 'rolling', message: msg });
      }, 1000);
    }, 600);
  }

  // ── Execute a validated player move ──────────────────────────────────────
  function execPlayerMove(move: SimpleMove) {
    const s = get();
    // Save snapshot before applying move (for undo)
    const snapshot: TurnSnapshot = {
      points: clonePoints(s.points), barPlayer: s.barPlayer,
      barComputer: s.barComputer, dice: [...s.dice],
    };
    const { pts: np, barP: nbP, barC: nbC } = applyMove(
      s.points, s.barPlayer, s.barComputer, move, 'player'
    );
    const diceIdx = s.dice.indexOf(move.die);
    const newDice = s.dice.filter((_, i) => i !== diceIdx);

    // Win
    if (np[0].player === 15) {
      set({ points: np, barPlayer: nbP, barComputer: nbC,
        dice: [], selected: null, validMoves: [], turnHistory: [],
        phase: 'won', playerScore: s.playerScore + 1,
        message: '🎉 ניצחת! ריקנת את כל האסימונים!' });
      return;
    }

    const newHistory = [...s.turnHistory, snapshot];

    // Dice exhausted → computer turn
    if (newDice.length === 0) {
      set({ points: np, barPlayer: nbP, barComputer: nbC,
        dice: [], rolledDice: [], selected: null, validMoves: [], turnHistory: [],
        currentTurn: 'computer', phase: 'rolling', message: 'תור המחשב...' });
      scheduleComputerTurn();
      return;
    }

    // No more legal moves with remaining dice → computer turn
    const nextMoves = computeValidMoves(np, nbP, nbC, newDice, 'player');
    if (nextMoves.length === 0) {
      set({ points: np, barPlayer: nbP, barComputer: nbC,
        dice: newDice, selected: null, validMoves: [], turnHistory: [],
        currentTurn: 'computer', phase: 'rolling', message: 'אין יותר מהלכים. תור המחשב...' });
      scheduleComputerTurn();
      return;
    }

    // Continue player's turn
    set({ points: np, barPlayer: nbP, barComputer: nbC,
      dice: newDice, selected: null, validMoves: [], turnHistory: newHistory, phase: 'moving',
      message: `נותרו ${newDice.length} קוביות. בחר אסימון להמשך` });
  }

  // ── Public actions ────────────────────────────────────────────────────────
  return {
    ...INIT,

    startGame() {
      _clearTimer();
      const { playerScore, computerScore } = get();
      set({ ...INIT, phase: 'rolling', points: makeInitialPoints(),
        playerScore, computerScore, message: 'לחץ "הטל קוביות" להתחיל!' });
    },

    rollDice() {
      const s = get();
      if (s.phase !== 'rolling' || s.currentTurn !== 'player') return;
      const d1 = rollDie(), d2 = rollDie();
      const dice = expandDice(d1, d2);
      const moves = computeValidMoves(s.points, s.barPlayer, s.barComputer, dice, 'player');
      if (moves.length === 0) {
        set({ dice, rolledDice: [d1, d2],
          message: `הטלת ${d1}-${d2}. אין מהלכים זמינים! תור המחשב...`,
          currentTurn: 'computer', phase: 'rolling' });
        scheduleComputerTurn();
        return;
      }
      const uniqueFroms = new Set(moves.map(m => m.from));
      const uniqueTos   = new Set(moves.map(m => m.to));
      // Only one possible move — execute automatically after a brief visual pause
      if (uniqueFroms.size === 1 && uniqueTos.size === 1) {
        set({ dice, rolledDice: [d1, d2], phase: 'moving', turnHistory: [],
          message: `הטלת ${d1}-${d2}. מהלך יחיד — מבצע אוטומטית...` });
        _after(() => execPlayerMove(moves[0]), 700);
        return;
      }
      set({ dice, rolledDice: [d1, d2], phase: 'moving', turnHistory: [],
        message: `הטלת ${d1}-${d2}. בחר אסימון` });
    },

    selectPoint(pointIdx) {
      const s = get();
      if (s.phase !== 'moving' || s.currentTurn !== 'player') return;

      // ── Bear-off zone (0): destination only ───────────────────────────────
      if (pointIdx === 0) {
        if (s.selected !== null) {
          const move = s.validMoves.find(m => m.to === 0);
          if (move) execPlayerMove(move);
        }
        return;
      }

      // ── Execute move if pointIdx is a valid destination for the selected piece ──
      // This must come BEFORE hasOwnPiece so stacking onto own pieces works correctly
      if (s.selected !== null) {
        const move = s.validMoves.find(m => m.to === pointIdx);
        if (move) { execPlayerMove(move); return; }
      }

      // ── Does this point have the player's own pieces? ─────────────────────
      const isBar = pointIdx === -1;
      const hasOwnPiece = isBar
        ? s.barPlayer > 0
        : (pointIdx >= 1 && pointIdx <= 24 && (s.points[pointIdx]?.player ?? 0) > 0);

      if (hasOwnPiece) {
        // Deselect if same piece clicked again
        if (pointIdx === s.selected) {
          set({ selected: null, validMoves: [], message: 'בחר אסימון' });
          return;
        }
        // Bar constraint
        if (s.barPlayer > 0 && !isBar) {
          set({ selected: null, validMoves: [], message: 'יש לך אסימון על הבר — חובה להכניסו קודם!' });
          return;
        }
        // Select this piece and show its valid destinations
        const allMoves = computeValidMoves(s.points, s.barPlayer, s.barComputer, s.dice, 'player');
        const fromHere = allMoves.filter(m => m.from === pointIdx);
        if (fromHere.length > 0) {
          // Only one destination — execute automatically
          const uniqueDests = new Set(fromHere.map(m => m.to));
          if (uniqueDests.size === 1) {
            execPlayerMove(fromHere[0]);
            return;
          }
          set({ selected: pointIdx, validMoves: fromHere, message: 'לאיזו נקודה לזוז?' });
          return;
        }
        set({ selected: pointIdx, validMoves: [], message: 'אין מהלכים אפשריים מנקודה זו' });
        return;
      }

      // ── Empty / opponent-only point with no selection ─────────────────────
      set({ selected: null, validMoves: [], message: 'בחר אסימון שלך!' });
    },

    undoMove() {
      const s = get();
      if (s.phase !== 'moving' || s.currentTurn !== 'player' || s.turnHistory.length === 0) return;
      const newHistory = [...s.turnHistory];
      const prev = newHistory.pop()!;
      set({
        points: prev.points, barPlayer: prev.barPlayer,
        barComputer: prev.barComputer, dice: prev.dice,
        selected: null, validMoves: [],
        turnHistory: newHistory,
        message: 'המהלך בוטל. בחר אסימון',
      });
    },
  };
});
