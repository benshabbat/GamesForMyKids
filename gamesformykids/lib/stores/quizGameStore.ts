import { makeStore } from './createStore';

export type QuizPhase = 'menu' | 'playing' | 'result';

export interface QuizGameState {
  phase: QuizPhase;
  gameType: string | null;
  index: number;
  total: number;
  score: number;
  selected: string | null;
  isCorrect: boolean | null;
}

export interface QuizGameActions {
  startQuiz: (gameType: string, total: number) => void;
  selectAnswer: (id: string, isCorrect: boolean) => void;
  nextQuestion: () => void;
  goToMenu: () => void;
  restartQuiz: () => void;
}

const INITIAL_STATE: QuizGameState = {
  phase: 'menu',
  gameType: null,
  index: 0,
  total: 0,
  score: 0,
  selected: null,
  isCorrect: null,
};

export const useQuizGameStore = makeStore<QuizGameState & QuizGameActions>('QuizGameStore', (set, get) => ({
      ...INITIAL_STATE,

      startQuiz: (gameType, total) =>
        set(
          { phase: 'playing', gameType, index: 0, total, score: 0, selected: null, isCorrect: null },
          false,
          'quiz/startQuiz',
        ),

      selectAnswer: (id, isCorrect) =>
        set(
          (s) => ({ selected: id, isCorrect, score: isCorrect ? s.score + 1 : s.score }),
          false,
          'quiz/selectAnswer',
        ),

      nextQuestion: () => {
        const { index, total } = get();
        if (index < total - 1) {
          set({ index: index + 1, selected: null, isCorrect: null }, false, 'quiz/nextQuestion');
        } else {
          set({ phase: 'result', selected: null, isCorrect: null }, false, 'quiz/endGame');
        }
      },

      goToMenu: () =>
        set({ phase: 'menu', selected: null, isCorrect: null }, false, 'quiz/goToMenu'),

      restartQuiz: () =>
        set(
          { phase: 'playing', index: 0, score: 0, selected: null, isCorrect: null },
          false,
          'quiz/restartQuiz',
        ),
    }));
