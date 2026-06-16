'use client';
import { create } from 'zustand';
import type { SongData } from './data/songs';

export type Phase = 'menu' | 'lyrics' | 'quiz' | 'result';

interface State {
  phase: Phase;
  currentSong: SongData | null;
  currentQuestionIdx: number;
  answers: (number | null)[];
  score: number;
}

interface Actions {
  selectSong: (song: SongData) => void;
  startQuiz: () => void;
  answerQuestion: (optIdx: number) => void;
  nextQuestion: () => void;
  resetGame: () => void;
}

export const useKidsSongsStore = create<State & Actions>((set, get) => ({
  phase: 'menu',
  currentSong: null,
  currentQuestionIdx: 0,
  answers: [null, null],
  score: 0,

  selectSong: (song) =>
    set({ currentSong: song, phase: 'lyrics', currentQuestionIdx: 0, answers: [null, null], score: 0 }),

  startQuiz: () => set({ phase: 'quiz', currentQuestionIdx: 0 }),

  answerQuestion: (optIdx) => {
    const { currentSong, currentQuestionIdx, score } = get();
    if (!currentSong) return;
    const q = currentSong.questions[currentQuestionIdx as 0 | 1];
    const isCorrect = q !== undefined && optIdx === q.correctIndex;
    const newAnswers = [null, null] as (number | null)[];
    newAnswers[currentQuestionIdx] = optIdx;
    set({ answers: newAnswers, score: isCorrect ? score + 1 : score });
  },

  nextQuestion: () => {
    const { currentQuestionIdx } = get();
    if (currentQuestionIdx < 1) {
      set({ currentQuestionIdx: 1 });
    } else {
      set({ phase: 'result' });
    }
  },

  resetGame: () =>
    set({ phase: 'menu', currentSong: null, currentQuestionIdx: 0, answers: [null, null], score: 0 }),
}));
