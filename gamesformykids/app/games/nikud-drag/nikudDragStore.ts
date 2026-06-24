'use client';
import { create } from 'zustand';
import { NIKUD_QUESTIONS, NIKUD_OPTIONS, type NikudQuestion, type NikudOption } from './nikudDragData';

interface NikudDragState {
  phase: 'idle' | 'playing' | 'result';
  questions: NikudQuestion[];
  questionIndex: number;
  score: number;
  feedback: 'correct' | 'wrong' | null;
  shuffledOptions: NikudOption[];
}

interface NikudDragActions {
  startGame: () => void;
  selectNikud: (nikudId: string) => void;
  nextQuestion: () => void;
  reset: () => void;
}

function shuffleOptions(): NikudOption[] {
  return [...NIKUD_OPTIONS].sort(() => Math.random() - 0.5);
}

export const useNikudDragStore = create<NikudDragState & NikudDragActions>((set, get) => ({
  phase: 'idle',
  questions: [],
  questionIndex: 0,
  score: 0,
  feedback: null,
  shuffledOptions: shuffleOptions(),

  startGame: () => {
    const questions = [...NIKUD_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    set({
      phase: 'playing',
      questions,
      questionIndex: 0,
      score: 0,
      feedback: null,
      shuffledOptions: shuffleOptions(),
    });
  },

  selectNikud: (nikudId: string) => {
    const { questions, questionIndex, score, feedback } = get();
    if (feedback) return;
    const question = questions[questionIndex];
    if (!question) return;

    const isCorrect = nikudId === question.targetNikudId;
    set({ feedback: isCorrect ? 'correct' : 'wrong', score: isCorrect ? score + 1 : score });

    setTimeout(() => {
      if (isCorrect) {
        get().nextQuestion();
      } else {
        set({ feedback: null });
      }
    }, 1000);
  },

  nextQuestion: () => {
    const { questions, questionIndex } = get();
    const next = questionIndex + 1;
    if (next >= questions.length) {
      set({ phase: 'result', feedback: null });
      return;
    }
    set({ questionIndex: next, feedback: null, shuffledOptions: shuffleOptions() });
  },

  reset: () => set({
    phase: 'idle',
    questions: [],
    questionIndex: 0,
    score: 0,
    feedback: null,
    shuffledOptions: shuffleOptions(),
  }),
}));
