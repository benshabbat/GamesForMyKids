'use client';
import { useHangmanStore } from './hangmanStore';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

export function useHangman() {
  const state = useHangmanStore();

  const handleGuess = (letter: string) => {
    const { entry, guessed } = useHangmanStore.getState();
    if (guessed.has(letter)) return;
    state.guessLetter(letter);
    const correct = entry.word.includes(letter);
    if (correct) speakHebrew(letter);
  };

  const wordDisplay = state.entry.word.split('').map(ch =>
    state.guessed.has(ch) ? ch : '_'
  );

  return {
    ...state,
    wordDisplay,
    handleGuess,
    maxWrong: 6,
  };
}
