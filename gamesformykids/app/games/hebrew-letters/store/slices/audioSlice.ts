import type { StateCreator } from 'zustand';
import type { HebrewLettersStore } from '../types';
import { makeToggle, makeSetter } from '@/lib/stores/utils/sliceUtils';
import { speak } from '@/lib/utils/speech/enhancedSpeechUtils';
import {
  ENCOURAGEMENT_MESSAGES,
  STEP_MESSAGES,
} from '../../constants/hebrewLettersConstants';
import { getRandomItem } from '@/lib/utils';

export type AudioSlice = {
  isAudioEnabled: boolean;
  setIsAudioEnabled: (enabled: boolean) => void;
  toggleAudio: () => void;
  speakText: (text: string, settings?: { rate?: number; pitch?: number; volume?: number; lang?: string }) => void;
  playLetterSound: (letter?: string) => void;
  playEncouragementSound: () => void;
  playStepCompletionSound: () => void;
};

export const createAudioSlice: StateCreator<HebrewLettersStore, [['zustand/devtools', never]], [], AudioSlice> = (set, get) => ({
  isAudioEnabled: true,

  setIsAudioEnabled: makeSetter(set, 'isAudioEnabled'),

  toggleAudio: makeToggle(set, 'isAudioEnabled'),

  speakText: (text, settings) => {
    const { isAudioEnabled } = get();
    if (!isAudioEnabled) return;
    speak(text, settings);
  },

  playLetterSound: (letter) => {
    const { isAudioEnabled, currentLetter, speakText } = get();
    if (!isAudioEnabled) return;
    const letterToSpeak = letter ?? currentLetter?.letter ?? '';
    const pronunciation = currentLetter?.pronunciation ?? letter ?? '';
    speakText(`הָאוֹת ${letterToSpeak}, ${pronunciation}`);
  },

  playEncouragementSound: () => {
    const { isAudioEnabled, speakText } = get();
    if (!isAudioEnabled) return;
    const msg = getRandomItem([...ENCOURAGEMENT_MESSAGES]);
    speakText(msg);
  },

  playStepCompletionSound: () => {
    const { isAudioEnabled, practiceState, speakText } = get();
    if (!isAudioEnabled) return;
    const msg = STEP_MESSAGES[practiceState.currentStep as keyof typeof STEP_MESSAGES];
    if (msg) speakText(msg);
  },
});
