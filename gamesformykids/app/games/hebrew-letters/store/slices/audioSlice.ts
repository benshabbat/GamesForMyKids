import type { StateCreator } from 'zustand';
import type { HebrewLettersStore } from '../types';
import {
  DEFAULT_AUDIO_STATE,
  ENCOURAGEMENT_MESSAGES,
  STEP_MESSAGES,
} from '../../constants/hebrewLettersConstants';

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

  setIsAudioEnabled: (enabled) =>
    set({ isAudioEnabled: enabled }, false, 'hebrewLetters/setAudio'),

  toggleAudio: () =>
    set((s) => ({ isAudioEnabled: !s.isAudioEnabled }), false, 'hebrewLetters/toggleAudio'),

  speakText: (text, settings) => {
    const { isAudioEnabled } = get();
    if (!isAudioEnabled || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = settings?.lang ?? 'he-IL';
    utterance.rate = settings?.rate ?? DEFAULT_AUDIO_STATE.speechRate;
    utterance.pitch = settings?.pitch ?? DEFAULT_AUDIO_STATE.speechPitch;
    utterance.volume = settings?.volume ?? DEFAULT_AUDIO_STATE.volume;
    speechSynthesis.speak(utterance);
  },

  playLetterSound: (letter) => {
    const { isAudioEnabled, currentLetter, speakText } = get();
    if (!isAudioEnabled) return;
    const letterToSpeak = letter ?? currentLetter?.letter ?? '';
    const pronunciation = currentLetter?.pronunciation ?? letter ?? '';
    speakText(`האות ${letterToSpeak}, ${pronunciation}`);
  },

  playEncouragementSound: () => {
    const { isAudioEnabled, speakText } = get();
    if (!isAudioEnabled) return;
    const msg = ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
    speakText(msg);
  },

  playStepCompletionSound: () => {
    const { isAudioEnabled, practiceState, speakText } = get();
    if (!isAudioEnabled) return;
    const msg = STEP_MESSAGES[practiceState.currentStep as keyof typeof STEP_MESSAGES];
    if (msg) speakText(msg);
  },
});
