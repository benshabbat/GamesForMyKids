import type { StateCreator } from 'zustand';
import { speakHebrew, initSpeechAndAudio } from '@/lib/utils/speech/enhancedSpeechUtils';
import { playSuccessSound } from '@/lib/utils/game/gameUtils';
import type { PuzzleStore } from '../puzzleStore';

export interface FeedbackSlice {
  feedbackMessage: string;
  feedbackType: 'success' | 'error' | '';
  _audioContext: AudioContext | null;
  _speechEnabled: boolean;
  initAudio: () => void;
  showFeedback: (message: string, type: 'success' | 'error') => void;
  speak: (message: string) => Promise<void>;
}

export const createFeedbackSlice: StateCreator<PuzzleStore, [], [], FeedbackSlice> = (set, get) => ({
  feedbackMessage: '',
  feedbackType: '',
  _audioContext: null,
  _speechEnabled: false,

  initAudio: () => {
    initSpeechAndAudio(
      (enabled) => set({ _speechEnabled: enabled }),
      (ctx) => set({ _audioContext: ctx }),
    );
  },

  showFeedback: (message, type) => {
    set({ feedbackMessage: message, feedbackType: type });
    const { _audioContext } = get();
    if (type === 'success') playSuccessSound(_audioContext);
    setTimeout(() => {
      set({ feedbackMessage: '', feedbackType: '' });
    }, type === 'success' ? 2000 : 1500);
  },

  speak: async (message) => {
    if (get()._speechEnabled) {
      await speakHebrew(message);
    }
  },
});
