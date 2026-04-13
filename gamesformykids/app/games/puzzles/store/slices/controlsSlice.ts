import type { StateCreator } from 'zustand';
import { MENU_RESET } from '../puzzleStoreConstants';
import type { PuzzleStore } from '../puzzleStore';

export interface ControlsSlice {
  toggleHints: () => void;
  toggleDebug: () => void;
  toggleHelp: () => void;
  changeDifficulty: (newDifficulty: number) => void;
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
});
