import { makeStore } from './createStore';
import { trackEvent } from '@/lib/analytics/trackEvent';

export type QuizPhase = 'menu' | 'playing' | 'result';

export interface QuizGameState {
  phase: QuizPhase;
  gameType: string | null;
  index: number;
  total: number;
  score: number;
  streak: number;
  bestStreak: number;
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
  streak: 0,
  bestStreak: 0,
  selected: null,
  isCorrect: null,
};

export const useQuizGameStore = makeStore<QuizGameState & QuizGameActions>('QuizGameStore', (set, get) => ({
      ...INITIAL_STATE,

      startQuiz: (gameType, total) => {
        set(
          { phase: 'playing', gameType, index: 0, total, score: 0, streak: 0, bestStreak: 0, selected: null, isCorrect: null },
          false,
          'quiz/startQuiz',
        );
        trackEvent('game_start', { game_type: gameType });
      },

      selectAnswer: (id, isCorrect) => {
        const gameType = get().gameType ?? undefined;
        set(
          (s) => {
            const newStreak = isCorrect ? s.streak + 1 : 0;
            return {
              selected: id,
              isCorrect,
              score: isCorrect ? s.score + 1 : s.score,
              streak: newStreak,
              bestStreak: Math.max(s.bestStreak, newStreak),
            };
          },
          false,
          'quiz/selectAnswer',
        );
        if (gameType) trackEvent(isCorrect ? 'correct_answer' : 'wrong_answer', { game_type: gameType });
      },

      nextQuestion: () => {
        const { index, total, score, gameType } = get();
        if (index < total - 1) {
          set({ index: index + 1, selected: null, isCorrect: null }, false, 'quiz/nextQuestion');
        } else {
          set({ phase: 'result', selected: null, isCorrect: null }, false, 'quiz/endGame');
          if (gameType) trackEvent('game_complete', { game_type: gameType, score, total });
        }
      },

      goToMenu: () =>
        set({ phase: 'menu', selected: null, isCorrect: null }, false, 'quiz/goToMenu'),

      restartQuiz: () =>
        set(
          { phase: 'playing', index: 0, score: 0, streak: 0, bestStreak: 0, selected: null, isCorrect: null },
          false,
          'quiz/restartQuiz',
        ),
    }));
