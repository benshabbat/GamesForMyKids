/**
 * Shared timer infrastructure for lives-based quiz games
 * (color-tap, emoji-math, true-false, and future games with the same pattern).
 *
 * Call inside a makeStore creator to get startGame / correct / wrong helpers
 * that handle countdown, feedback delay, and game-over logic.
 */

import type { LivesGameState } from '@/lib/types';

type LivesSet = (partial: Record<string, unknown>, replace?: false, name?: string) => void;
type LivesGet = () => LivesGameState;

/** A fixed value, or a function resolved each time it is needed (e.g. to follow the difficulty setting). */
type MaybeLazy<T> = T | (() => T);

function resolve<T>(value: MaybeLazy<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export interface LivesTimerConfig {
  /** DevTools store name prefix used in action labels */
  name:         string;
  /**
   * Seconds allowed per question. Pass a function when it depends on something that can
   * change between games (difficulty): it is re-read for every question, so the time is
   * the same on question 2+ as on question 1.
   */
  timePerQ:     MaybeLazy<number>;
  feedbackMs:   number;
  /** Lives at the start of a game. May be a function, like `timePerQ`. */
  initialLives: MaybeLazy<number>;
  set:          LivesSet;
  get:          LivesGet;
  /**
   * Returns the state updates needed to show the next question.
   * Called when the feedback delay expires. May return any store keys
   * (e.g. `{ q }` for emoji-math, `{ question }` for color-tap, `{ idx }` for true-false).
   */
  getNextUpdates: () => Record<string, unknown>;
}

export function setupLivesTimer(cfg: LivesTimerConfig) {
  const { name, timePerQ, feedbackMs, initialLives, set, get, getNextUpdates } = cfg;

  let countdownId: ReturnType<typeof setInterval> | null = null;
  let feedbackId:  ReturnType<typeof setTimeout>  | null = null;

  function clearCountdown()     { if (countdownId) { clearInterval(countdownId); countdownId = null; } }
  function clearFeedbackTimer() { if (feedbackId)  { clearTimeout(feedbackId);   feedbackId  = null; } }

  function advanceAfterFeedback() {
    clearFeedbackTimer();
    feedbackId = setTimeout(() => {
      if (get().phase !== 'playing') return;
      set({ feedback: null, timeLeft: resolve(timePerQ), ...getNextUpdates() }, false, `${name}/nextQuestion`);
      startCountdown();
    }, feedbackMs);
  }

  function startCountdown() {
    clearCountdown();
    if (typeof window === 'undefined') return;
    countdownId = setInterval(() => {
      const { phase, feedback, timeLeft, lives, score, best } = get();
      if (phase !== 'playing' || feedback !== null) { clearCountdown(); return; }
      if (timeLeft <= 1) {
        clearCountdown();
        const newLives = lives - 1;
        const isDead   = newLives <= 0;
        set(
          isDead
            ? { lives: newLives, feedback: 'wrong', timeLeft: resolve(timePerQ), phase: 'dead', best: Math.max(best, score) }
            : { lives: newLives, feedback: 'wrong', timeLeft: resolve(timePerQ) },
          false,
          `${name}/timeout`,
        );
        if (!isDead) advanceAfterFeedback();
      } else {
        set({ timeLeft: timeLeft - 1 }, false, `${name}/tick`);
      }
    }, 1000);
  }

  return {
    /**
     * Resets shared state to initial values and starts the countdown.
     * Pass `getInitialUpdates` to also reset game-specific state
     * (e.g. `{ q, level: 1, streak: 0 }` for emoji-math).
     */
    startGame(getInitialUpdates: () => Record<string, unknown>) {
      clearCountdown();
      clearFeedbackTimer();
      const { best } = get();
      set(
        { phase: 'playing', score: 0, lives: resolve(initialLives), timeLeft: resolve(timePerQ), feedback: null, best, ...getInitialUpdates() },
        false,
        `${name}/startGame`,
      );
      startCountdown();
    },

    /**
     * Cancels the countdown and any pending feedback timer. The timers are module-level, so
     * without this they keep running (and draining lives) after the player leaves the page.
     */
    stop() {
      clearCountdown();
      clearFeedbackTimer();
    },

    /** Mark a correct answer: add points, set feedback, schedule next question. */
    correct(points = 10, extra: Record<string, unknown> = {}) {
      clearCountdown();
      const { score } = get();
      set({ score: score + points, feedback: 'correct', ...extra }, false, `${name}/correct`);
      advanceAfterFeedback();
    },

    /** Mark a wrong answer: deduct a life, set feedback, end or schedule next question. */
    wrong(extra: Record<string, unknown> = {}) {
      clearCountdown();
      const { lives, score, best } = get();
      const newLives = lives - 1;
      const isDead   = newLives <= 0;
      set(
        isDead
          ? { lives: newLives, feedback: 'wrong', phase: 'dead', best: Math.max(best, score), ...extra }
          : { lives: newLives, feedback: 'wrong', ...extra },
        false,
        `${name}/wrong`,
      );
      if (!isDead) advanceAfterFeedback();
    },
  };
}
