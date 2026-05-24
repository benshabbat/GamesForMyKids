import { makeStore } from '@/lib/stores/createStore';
import type { SimpleMove } from './types';
import type { SheshState, SheshActions } from './sheshBeshTypes';
import { INIT } from './sheshBeshTypes';
import { createTimer } from './sheshBeshTimer';
import { runComputerTurn } from './sheshBeshAI';
import { executePlayerMove } from './sheshBeshPlayerMove';
import {
  rollDie, expandDice, makeInitialPoints,
  computeValidMoves,
} from './gameLogic';

// Re-export types consumed by components
export type { GamePhase, Die, PointState } from './types';

// ─────────────────────── Store ───────────────────────────────
export const useSheshBeshStore = makeStore<SheshState & SheshActions>(
  'SheshBeshStore',
  (set, get) => {
    // One timer instance per store — no module-level mutable globals
    const timer = createTimer();

    function scheduleComputerTurn() {
      runComputerTurn(
        get,
        (partial) => set(partial as Partial<SheshState & SheshActions>),
        timer.schedule,
      );
    }

    function execPlayerMove(move: SimpleMove) {
      const result = executePlayerMove(get(), move);
      set(result.next as Partial<SheshState & SheshActions>);
      if (result.kind === 'computer-turn') {
        scheduleComputerTurn();
      }
    }

    return {
      // ── Initial state (points populated at startGame) ─────────
      ...INIT,
      points: makeInitialPoints(),

      // ── Public actions ─────────────────────────────────────────
      startGame() {
        timer.clear();
        const { playerScore, computerScore } = get();
        set({
          ...INIT,
          phase: 'rolling',
          points: makeInitialPoints(),
          playerScore,
          computerScore,
          message: 'לחץ "הטל קוביות" להתחיל!',
        } as Partial<SheshState & SheshActions>);
      },

      rollDice() {
        const s = get();
        if (s.phase !== 'rolling' || s.currentTurn !== 'player') return;
        const d1 = rollDie(), d2 = rollDie();
        const dice = expandDice(d1, d2);
        const moves = computeValidMoves(s.points, s.barPlayer, s.barComputer, dice, 'player');
        if (moves.length === 0) {
          set({
            dice, rolledDice: [d1, d2],
            message: `הטלת ${d1}-${d2}. אין מהלכים זמינים! תור המחשב...`,
            currentTurn: 'computer', phase: 'rolling',
          } as Partial<SheshState & SheshActions>);
          scheduleComputerTurn();
          return;
        }
        const uniqueFroms = new Set(moves.map(m => m.from));
        const uniqueTos   = new Set(moves.map(m => m.to));
        // Only one possible move — execute automatically after a brief visual pause
        if (uniqueFroms.size === 1 && uniqueTos.size === 1) {
          set({
            dice, rolledDice: [d1, d2], phase: 'moving', turnHistory: [],
            message: `הטלת ${d1}-${d2}. מהלך יחיד — מבצע אוטומטית...`,
          } as Partial<SheshState & SheshActions>);
          timer.schedule(() => execPlayerMove(moves[0]), 700);
          return;
        }
        set({
          dice, rolledDice: [d1, d2], phase: 'moving', turnHistory: [],
          message: `הטלת ${d1}-${d2}. בחר אסימון`,
        } as Partial<SheshState & SheshActions>);
      },

      selectPoint(pointIdx: number) {
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
            set({ selected: null, validMoves: [], message: 'בחר אסימון' } as Partial<SheshState & SheshActions>);
            return;
          }
          // Bar constraint
          if (s.barPlayer > 0 && !isBar) {
            set({ selected: null, validMoves: [], message: 'יש לך אסימון על הבר — חובה להכניסו קודם!' } as Partial<SheshState & SheshActions>);
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
            set({ selected: pointIdx, validMoves: fromHere, message: 'לאיזו נקודה לזוז?' } as Partial<SheshState & SheshActions>);
            return;
          }
          set({ selected: pointIdx, validMoves: [], message: 'אין מהלכים אפשריים מנקודה זו' } as Partial<SheshState & SheshActions>);
          return;
        }

        // ── Empty / opponent-only point with no selection ─────────────────────
        set({ selected: null, validMoves: [], message: 'בחר אסימון שלך!' } as Partial<SheshState & SheshActions>);
      },

      undoMove() {
        const s = get();
        if (s.phase !== 'moving' || s.currentTurn !== 'player' || s.turnHistory.length === 0) return;
        const newHistory = [...s.turnHistory];
        const prev = newHistory.pop();
        if (!prev) return;
        set({
          points: prev.points, barPlayer: prev.barPlayer,
          barComputer: prev.barComputer, dice: prev.dice,
          selected: null, validMoves: [],
          turnHistory: newHistory,
          message: 'המהלך בוטל. בחר אסימון',
        } as Partial<SheshState & SheshActions>);
      },
    };
  },
);
