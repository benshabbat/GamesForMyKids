import type { StateCreator } from 'zustand';

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
    speak(!showHints ? 'רְמָזִים מוּצָגִים' : 'רְמָזִים הוּסְתְּרוּ');
  },

  toggleDebug: () => {
    const { showDebug, speak } = get();
    set({ showDebug: !showDebug });
    speak(!showDebug ? 'מַצַּב דִּיבּוּג פּוֹעֵל' : 'מַצַּב דִּיבּוּג כָּבוּי');
  },

  toggleHelp: () => set(s => ({ showHelp: !s.showHelp })),

  changeDifficulty: (newDifficulty) => {
    const { speak, image, initializeGame } = get();
    const name = newDifficulty === 4 ? 'קל' : newDifficulty === 9 ? 'בינוני' : newDifficulty === 16 ? 'קשה' : 'מומחה';
    speak(`רָמָה חֲדָשָׁה נִבְחֲרָה: ${name} עִם ${newDifficulty} חֲלָקִים`);
    set({ difficulty: newDifficulty });
    if (image) {
      initializeGame(image, newDifficulty);
      speak(`הַמִּשְׂחָק הִתְחִיל מֵחָדָשׁ בְּרָמַת ${name}`);
    }
  },
});
