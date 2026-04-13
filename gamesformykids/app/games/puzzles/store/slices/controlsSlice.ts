import type { StateCreator } from 'zustand';
import type { PuzzleAction } from '../../types/puzzle';
import { MENU_RESET } from '../puzzleStoreConstants';
import type { PuzzleStore } from '../puzzleStore';

export interface ControlsSlice {
  toggleHints: () => void;
  toggleDebug: () => void;
  toggleHelp: () => void;
  changeDifficulty: (newDifficulty: number) => void;
  dispatch: (action: PuzzleAction) => void;
}

export const createControlsSlice: StateCreator<PuzzleStore, [], [], ControlsSlice> = (set, get) => ({
  toggleHints: () => {
    const { showHints, speak } = get();
    set({ showHints: !showHints });
    speak(!showHints ? 'רמזים מוצגים' : 'רמזים הוסתרו');
  },

  toggleDebug: () => {
    const { showDebug, speak } = get();
    set({ showDebug: !showDebug });
    speak(!showDebug ? 'מצב דיבוג פועל' : 'מצב דיבוג כבוי');
  },

  toggleHelp: () => set(s => ({ showHelp: !s.showHelp })),

  changeDifficulty: (newDifficulty) => {
    const { speak, image, initializeGame } = get();
    const name = newDifficulty === 4 ? 'קל' : newDifficulty === 9 ? 'בינוני' : newDifficulty === 16 ? 'קשה' : 'מומחה';
    speak(`רמה חדשה נבחרה: ${name} עם ${newDifficulty} חלקים`);
    set({ difficulty: newDifficulty });
    if (image) {
      initializeGame(image, newDifficulty);
      speak(`המשחק התחיל מחדש ברמת ${name}`);
    }
  },

  dispatch: (action) => {
    const s = get();
    switch (action.type) {
      case 'SET_GAME_STARTED':    set({ gameStarted: action.payload }); break;
      case 'SET_COMPLETED':       set({ isCompleted: action.payload }); break;
      case 'SET_TIMER':           set({ timer: action.payload }); break;
      case 'INCREMENT_TIMER':     set(st => ({ timer: st.timer + 1 })); break;
      case 'SET_DIFFICULTY':      set({ difficulty: action.payload }); break;
      case 'SET_SCORE':           set({ score: action.payload }); break;
      case 'TOGGLE_HINTS':        s.toggleHints(); break;
      case 'TOGGLE_DEBUG':        s.toggleDebug(); break;
      case 'TOGGLE_HELP':         s.toggleHelp(); break;
      case 'SET_PIECES':          set({ pieces: action.payload }); break;
      case 'SET_PLACED_PIECES':   set({ placedPieces: action.payload }); break;
      case 'SET_IMAGE':           set({ image: action.payload }); break;
      case 'SET_IMAGE_LOADED':    set({ imageLoaded: action.payload }); break;
      case 'SET_DRAGGED_PIECE':   set({ draggedPiece: action.payload }); break;
      case 'SET_TOUCH_STATE':     set({ touchState: action.payload }); break;
      case 'SET_SELECTED_PUZZLE': set({ selectedPuzzle: action.payload }); break;
      case 'RESET_GAME':          set({ ...MENU_RESET }); break;
      case 'RESET_TO_MENU':       s.goToMenu(); break;
    }
  },
});
