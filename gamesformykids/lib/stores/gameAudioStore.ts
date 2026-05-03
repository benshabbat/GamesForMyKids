import { makeStore } from './createStore';

interface GameAudioState {
  audioContext: AudioContext | null;
  speechEnabled: boolean;
  setAudioContext: (ctx: AudioContext | null) => void;
  setSpeechEnabled: (enabled: boolean) => void;
}

export const useGameAudioStore = makeStore<GameAudioState>('GameAudioStore', (set) => ({
      audioContext: null,
      speechEnabled: false,
      setAudioContext: (ctx) => set({ audioContext: ctx }),
      setSpeechEnabled: (enabled) => set({ speechEnabled: enabled }),
    }));
