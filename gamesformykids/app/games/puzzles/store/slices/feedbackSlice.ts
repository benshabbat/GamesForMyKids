import type { StateCreator } from 'zustand';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';
import { playSuccessSound } from '@/lib/utils/game/gameUtils';
import { useGameAudioStore } from '@/lib/stores/gameAudioStore';
import type { PuzzleStore } from '../puzzleStore';

export interface FeedbackSlice {
  feedbackMessage: string;
  feedbackType: 'success' | 'error' | '';
  showFeedback: (message: string, type: 'success' | 'error') => void;
  speak: (message: string) => Promise<void>;
}

export const createFeedbackSlice: StateCreator<PuzzleStore, [], [], FeedbackSlice> = (set) => ({
  feedbackMessage: '',
  feedbackType: '',

  showFeedback: (message, type) => {
    set({ feedbackMessage: message, feedbackType: type });
    const { audioContext } = useGameAudioStore.getState();
    if (type === 'success') playSuccessSound(audioContext);
    setTimeout(() => {
      set({ feedbackMessage: '', feedbackType: '' });
    }, type === 'success' ? 2000 : 1500);
  },

  speak: async (message) => {
    if (useGameAudioStore.getState().speechEnabled) {
      await speakHebrew(message);
    }
  },
});
