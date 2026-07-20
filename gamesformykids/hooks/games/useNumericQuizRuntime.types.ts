import { BaseGameItem } from "@/lib/types/core/base";
import type { GameType } from "@/lib/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NumericQuizState<TChallenge> {
  currentChallenge: TChallenge | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: number[];
}

export interface NumericQuizCallbacks<TChallenge extends { answer: number }> {
  /** The GameType identifier used to persist the score to Supabase on unmount. */
  gameType: GameType;
  /** Generate a new challenge. Receives current level for difficulty scaling. */
  generateChallenge: (level: number) => TChallenge;
  /** Generate numeric answer options. Receives the correct answer and current level. */
  generateOptions: (correctAnswer: number, level: number) => number[];
  /** Speak the current challenge aloud. Should guard on speechEnabled internally. */
  speakQuestion: (challenge: TChallenge) => Promise<void>;
  /** Map a challenge to the universal BaseGameItem format for the session store. */
  toChallengeItem: (challenge: TChallenge) => BaseGameItem;
  /** Map a numeric option to the universal BaseGameItem format. */
  toOptionItem: (n: number) => BaseGameItem;
  /** Called each time a new challenge is applied (e.g. to update a per-game store). */
  onChallengeChange?: (challenge: TChallenge) => void;
}
