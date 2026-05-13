import { makeStore } from '@/lib/stores/createStore';
import type { Board, DamkaMove, GamePhase, Pos, Side } from './damkaTypes';
export type { Side, GamePhase, Cell, Board, Pos, DamkaMove } from './damkaTypes';
export { makeInitialBoard, getAllMoves, applyMove } from './damkaLogic';
import { makeInitialBoard, getAllMoves, applyMove, bestComputerMove } from './damkaLogic';

// ── Store ──────────────────────────────────────────────────────────────────

interface DamkaState {
  phase:         GamePhase;
  board:         Board;
  selected:      Pos | null;
  validMoves:    DamkaMove[];
  currentTurn:   Side;
  playerScore:   number;
  computerScore: number;
  message:       string;
}

interface DamkaActions {
  startGame:  () => void;
  selectCell: (pos: Pos) => void;
}

const INITIAL: DamkaState = {
  phase: 'menu', board: makeInitialBoard(), selected: null, validMoves: [],
  currentTurn: 'player', playerScore: 0, computerScore: 0, message: '',
};

export const useDamkaStore = makeStore<DamkaState & DamkaActions>(
  'DamkaStore',
  (set, get) => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    function scheduleComputerMove() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const { phase, currentTurn, board, playerScore, computerScore } = get();
        if (phase !== 'playing' || currentTurn !== 'computer') return;

        const move = bestComputerMove(board);
        if (!move) {
          set(
            { phase: 'won', playerScore: playerScore + 1, message: '🎉 ניצחת! למחשב אין מהלכים!' },
            false, 'damka/computerNoMoves',
          );
          return;
        }
        const nb = applyMove(board, move);
        const playerMoves = getAllMoves(nb, 'player');
        if (playerMoves.length === 0) {
          set(
            { board: nb, phase: 'lost', computerScore: computerScore + 1, message: '😢 המחשב ניצח!' },
            false, 'damka/computerWon',
          );
        } else {
          set(
            { board: nb, currentTurn: 'player', selected: null, validMoves: [], message: 'תורך!' },
            false, 'damka/computerMove',
          );
        }
      }, 700);
    }

    return {
      ...INITIAL,

      startGame: () => {
        if (timer) clearTimeout(timer);
        const { playerScore, computerScore } = get();
        set(
          { ...INITIAL, phase: 'playing', board: makeInitialBoard(), playerScore, computerScore, message: 'תורך! בחר אסימון אדום' },
          false, 'damka/startGame',
        );
      },

      selectCell: (pos: Pos) => {
        const { phase, currentTurn, board, selected, validMoves, playerScore } = get();
        if (phase !== 'playing' || currentTurn !== 'player') return;

        const cell = board[pos.row][pos.col];

        const move = validMoves.find(m => m.to.row === pos.row && m.to.col === pos.col);
        if (move) {
          const nb = applyMove(board, move);
          const compMoves = getAllMoves(nb, 'computer');
          if (compMoves.length === 0) {
            set(
              { board: nb, selected: null, validMoves: [], phase: 'won', playerScore: playerScore + 1, message: '🎉 ניצחת!' },
              false, 'damka/playerWon',
            );
            return;
          }
          set(
            { board: nb, selected: null, validMoves: [], currentTurn: 'computer', message: 'תור המחשב...' },
            false, 'damka/playerMove',
          );
          scheduleComputerMove();
          return;
        }

        if (cell.color !== 'player') {
          set({ selected: null, validMoves: [], message: 'בחר אסימון אדום שלך!' }, false, 'damka/wrongPiece');
          return;
        }

        const allMoves = getAllMoves(board, 'player');
        const mustCapture = allMoves.some(m => m.captures.length > 0);
        const pieceMoves  = allMoves.filter(m => m.from.row === pos.row && m.from.col === pos.col);

        if (pieceMoves.length === 0) {
          const msg = mustCapture ? 'חובה לקפוץ — בחר אסימון שיכול לקפוץ!' : 'אין מהלכים לאסימון זה';
          set({ selected: pos, validMoves: [], message: msg }, false, 'damka/noMoves');
          return;
        }

        // Deselect if clicking the already-selected piece
        if (selected && selected.row === pos.row && selected.col === pos.col) {
          set({ selected: null, validMoves: [], message: '' }, false, 'damka/deselect');
          return;
        }

        set({ selected: pos, validMoves: pieceMoves, message: 'לאן לזוז?' }, false, 'damka/selectPiece');
      },
    };
  },
);
