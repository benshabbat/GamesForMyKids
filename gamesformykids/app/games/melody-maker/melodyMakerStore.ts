'use client';
import { create } from 'zustand';

export type GameMode = 'free' | 'learning';

interface State {
  mode: GameMode;
  recording: number[];
  isRecording: boolean;
  isPlayingBack: boolean;
  selectedSong: number | null;
  songProgress: number;
  songComplete: boolean;
  flashingKey: number | null;
}

interface Actions {
  setMode: (mode: GameMode) => void;
  startRecording: () => void;
  stopRecording: () => void;
  addToRecording: (noteIndex: number) => void;
  setPlayingBack: (v: boolean) => void;
  selectSong: (index: number) => void;
  clearSelectedSong: () => void;
  advanceSong: () => void;
  setSongComplete: (v: boolean) => void;
  setFlashingKey: (key: number | null) => void;
  resetSong: () => void;
}

export const useMelodyMakerStore = create<State & Actions>((set) => ({
  mode: 'free',
  recording: [],
  isRecording: false,
  isPlayingBack: false,
  selectedSong: null,
  songProgress: 0,
  songComplete: false,
  flashingKey: null,

  setMode: (mode) => set({ mode }),
  startRecording: () => set({ isRecording: true, recording: [] }),
  stopRecording: () => set({ isRecording: false }),
  addToRecording: (noteIndex) => set((s) => ({ recording: [...s.recording, noteIndex] })),
  setPlayingBack: (v) => set({ isPlayingBack: v }),
  selectSong: (index) => set({ selectedSong: index, songProgress: 0, songComplete: false, flashingKey: null }),
  advanceSong: () => set((s) => ({ songProgress: s.songProgress + 1 })),
  setSongComplete: (v) => set({ songComplete: v }),
  setFlashingKey: (key) => set({ flashingKey: key }),
  resetSong: () => set({ songProgress: 0, songComplete: false, flashingKey: null }),
  clearSelectedSong: () => set({ selectedSong: null, songProgress: 0, songComplete: false, flashingKey: null }),
}));
