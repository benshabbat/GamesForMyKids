import { useState, useCallback, useMemo } from 'react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { shuffle } from '@/lib/utils';

export interface QuizHookConfig<Q> {
  /** Game type identifier passed to the shared quiz store. */
  gameType: string;
  /** Full question bank to shuffle and slice from. */
  allQuestions: Q[];
  /** How many questions to pick per game session. */
  questionsPerGame: number;
  /**
   * Returns the shuffled choice strings for a given question.
   * Called once per question (via `useMemo`).
   */
  getChoices: (q: Q) => string[];
  /** Returns `true` when `choice` is the correct answer for `q`. */
  isCorrect: (choice: string, q: Q) => boolean;
  /** Returns the display label for the correct answer (shown in feedback). */
  getCorrectLabel: (q: Q) => string;
}

/**
 * Factory that creates a typed quiz hook using the shared `quizGameStore`.
 * Eliminates the per-game Zustand store boilerplate for standard multiple-choice games.
 *
 * @example
 * ```ts
 * export const useRiddlesGame = createQuizHook<Riddle>({
 *   gameType: 'riddles',
 *   allQuestions: RIDDLES,
 *   questionsPerGame: QUESTIONS_PER_GAME,
 *   getChoices: (q) => shuffle([q.answer, ...q.wrongOptions]),
 *   isCorrect: (choice, q) => choice === q.answer,
 *   getCorrectLabel: (q) => q.answer,
 * });
 * ```
 */
export function createQuizHook<Q>(config: QuizHookConfig<Q>) {
  return function useQuizGame() {
    // ── Shared quiz session state (Zustand) ───────────────────
    const phase     = useQuizGameStore(s => s.phase);
    const index     = useQuizGameStore(s => s.index);
    const score     = useQuizGameStore(s => s.score);
    const selected  = useQuizGameStore(s => s.selected);
    const isCorrect = useQuizGameStore(s => s.isCorrect);
    const {
      startQuiz,
      selectAnswer: storeSelectAnswer,
      nextQuestion,
      restartQuiz,
    } = useQuizGameStore();

    // ── Local state – game-specific question data ─────────────
    const [questions, setQuestions] = useState<Q[]>([]);
    const current = questions[index] ?? null;

    // Choices are shuffled once per question (memoised by current question identity)
    const choices = useMemo(
      () => (current ? config.getChoices(current) : []),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [current],
    );

    // ── Actions ───────────────────────────────────────────────
    const startGame = useCallback(() => {
      const q = shuffle([...config.allQuestions]).slice(0, config.questionsPerGame);
      setQuestions(q);
      startQuiz(config.gameType, q.length);
    }, [startQuiz]);

    const selectAnswer = useCallback(
      (choice: string) => {
        if (selected !== null || !current) return;
        storeSelectAnswer(choice, config.isCorrect(choice, current));
      },
      [selected, current, storeSelectAnswer],
    );

    const next = useCallback(() => nextQuestion(), [nextQuestion]);

    const restart = useCallback(() => {
      const q = shuffle([...config.allQuestions]).slice(0, config.questionsPerGame);
      setQuestions(q);
      restartQuiz();
    }, [restartQuiz]);

    return {
      phase,
      index,
      /** Score multiplied by 10 for display (e.g. 7 correct → 70 pts). */
      score: score * 10,
      selected,
      isCorrect,
      current,
      choices,
      total: questions.length,
      /** Raw correct-answer count (not multiplied). */
      correctCount: score,
      /** Display label for the correct answer — useful for feedback messages. */
      correctLabel: current ? config.getCorrectLabel(current) : '',
      startGame,
      selectAnswer,
      next,
      restart,
    };
  };
}
