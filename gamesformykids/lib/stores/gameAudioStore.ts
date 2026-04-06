import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GameAudioState {
  audioContext: AudioContext | null;
  speechEnabled: boolean;
  setAudioContext: (ctx: AudioContext | null) => void;
  setSpeechEnabled: (enabled: boolean) => void;
}

export const useGameAudioStore = create<GameAudioState>()(
  devtools(
    (set) => ({
      audioContext: null,
      speechEnabled: false,
      setAudioContext: (ctx) => set({ audioContext: ctx }),
      setSpeechEnabled: (enabled) => set({ speechEnabled: enabled }),
    }),
    { name: 'GameAudioStore' }
  )
);
