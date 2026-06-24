'use client';

import { makePersistStore } from './createStore';

export type SoundTheme = 'default' | 'farm' | 'space' | 'jungle';

export interface SoundThemeState {
  theme: SoundTheme;
}

export interface SoundThemeActions {
  setTheme: (theme: SoundTheme) => void;
}

export const useSoundThemeStore = makePersistStore<SoundThemeState & SoundThemeActions>(
  'SoundThemeStore',
  'gfk-sound-theme',
  (set) => ({
    theme: 'default',
    setTheme: (theme) => set({ theme }, false, 'soundTheme/set'),
  }),
  { version: 1 },
);
