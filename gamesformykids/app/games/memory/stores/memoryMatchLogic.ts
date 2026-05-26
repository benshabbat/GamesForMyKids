import type { MemoryStoreState } from './memoryStoreTypes';
import type { MemoryCard, GameStats } from '../types/memory';

type MatchOutcome = {
  isMatch: boolean;
  cards: MemoryCard[];
  matchedPairs: string[];
  flippedCards: number[];
  gameStats: GameStats;
  isWon: boolean;
};

/**
 * Pure function — determines whether two flipped cards match and returns
 * the next state slice. No setTimeout, no Zustand set() calls.
 *
 * @param state  - snapshot of the store at resolution time (from get())
 * @param firstIdx  - index of the first flipped card
 * @param secondIdx - index of the second flipped card (just revealed)
 * @param totalPairs - total pairs required to win (from difficulty config)
 */
export function resolveCardMatch(
  state: MemoryStoreState,
  firstIdx: number,
  secondIdx: number,
  totalPairs: number,
): MatchOutcome {
  const firstCard = state.cards[firstIdx];
  const secondCard = state.cards[secondIdx];

  if (firstCard.animal.name === secondCard.animal.name) {
    // ── Match ──────────────────────────────────────────────────────────────
    const matched = [...state.cards];
    matched[firstIdx]  = { ...matched[firstIdx],  isMatched: true };
    matched[secondIdx] = { ...matched[secondIdx], isMatched: true };

    const newMatches = state.gameStats.matches + 1;
    const newStreak  = state.gameStats.streak  + 1;
    const newScore   = state.gameStats.score   + 100 * newStreak;

    return {
      isMatch: true,
      cards: matched,
      matchedPairs: [...state.matchedPairs, firstCard.animal.name],
      flippedCards: [],
      gameStats: { ...state.gameStats, matches: newMatches, streak: newStreak, score: newScore },
      isWon: newMatches === totalPairs,
    };
  }

  // ── No match ────────────────────────────────────────────────────────────
  const reset = [...state.cards];
  reset[firstIdx]  = { ...reset[firstIdx],  isFlipped: false };
  reset[secondIdx] = { ...reset[secondIdx], isFlipped: false };

  return {
    isMatch: false,
    cards: reset,
    matchedPairs: state.matchedPairs,
    flippedCards: [],
    gameStats: { ...state.gameStats, streak: 0 },
    isWon: false,
  };
}
