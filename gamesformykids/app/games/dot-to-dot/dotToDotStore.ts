'use client';
import { create } from 'zustand';
import { getPictureById } from './data/pictures';

export type DotToDotPhase = 'menu' | 'playing' | 'complete';

interface DotToDotState {
  phase: DotToDotPhase;
  pictureId: string | null;
  connected: number;
}

interface DotToDotActions {
  selectPicture: (id: string) => void;
  clickDot: (index: number) => void;
  backToMenu: () => void;
  reset: () => void;
}

export const useDotToDotStore = create<DotToDotState & DotToDotActions>((set, get) => ({
  phase: 'menu',
  pictureId: null,
  connected: 0,

  selectPicture: (id) => {
    set({ pictureId: id, connected: 0, phase: 'playing' });
  },

  clickDot: (index) => {
    const { pictureId, connected, phase } = get();
    if (phase !== 'playing' || !pictureId) return;
    if (index !== connected) return;

    const picture = getPictureById(pictureId);
    if (!picture) return;

    const nextConnected = connected + 1;
    set({
      connected: nextConnected,
      phase: nextConnected === picture.points.length ? 'complete' : 'playing',
    });
  },

  backToMenu: () => {
    set({ phase: 'menu', pictureId: null, connected: 0 });
  },

  reset: () => {
    set({ connected: 0, phase: 'playing' });
  },
}));
