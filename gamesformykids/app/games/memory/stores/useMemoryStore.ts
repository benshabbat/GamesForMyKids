'use client';

import { makeStore } from '@/lib/stores/createStore';
import {
  createShuffledMemoryCards,
} from '@/lib/utils/game/gameUtils';
import { MEMORY_GAME_ANIMALS } from '@/lib/constants/gameData/natureData/animals';
import { MEMORY_GAME_CONSTANTS } from '@/lib/constants/gameData/special';
import { MemoryCard } from '../types/memory';
import { getDifficultyOptions, getPerformanceLevel, getWinAchievements } from './memoryDisplayHelpers';
import {
  MemoryStoreState,
  MemoryStoreActions,
  initialState,
  initialGameStats,
  type MemoryPhase,
  type MemoryMode,
  type DuoPlayer,
} from './memoryStoreTypes';
import { formatTime, getTimeColor, getGridCols, getAnimationDelay } from './memoryPureHelpers';
import { resolveCardMatch } from './memoryMatchLogic';

export type { MemoryStoreState, MemoryStoreActions, MemoryMode, DuoPlayer } from './memoryStoreTypes';
export type { DifficultyOption, PerformanceLevel, WinAchievement } from '../types/memoryDisplay';

// ─── Store ────────────────────────────────────────────────────────────────────

export const useMemoryStore = makeStore<MemoryStoreState & MemoryStoreActions>(
  'MemoryStore',
  (set, get) => ({
    ...initialState,

    // ─── Computed helpers ────────────────────────────────────────────────────

    getDifficultyConfig: () =>
      MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[get().difficulty],

    getDifficultyOptions: () => getDifficultyOptions(get().difficulty),

    getGridCols: () => getGridCols(get().cards.length),

    getCardDisplayData: (index) => {
      const card = get().cards[index];
      if (!card) return { id: index, emoji: '', isFlipped: false, isMatched: false };
      return {
        id: index,
        emoji: card.animal.emoji,
        isFlipped: card.isFlipped,
        isMatched: card.isMatched,
      };
    },

    getAnimationDelay: (index) => getAnimationDelay(index),

    getGameProgress: () => {
      const { matchedPairs, getDifficultyConfig } = get();
      const totalPairs = getDifficultyConfig().pairs;
      const completedPairs = matchedPairs.length;
      return {
        totalPairs,
        completedPairs,
        remainingPairs: totalPairs - completedPairs,
        progressPercentage: totalPairs > 0 ? Math.round((completedPairs / totalPairs) * 100) : 0,
      };
    },

    canClickCard: (cardIndex) => {
      const { isGamePaused, phase, timeLeft, cards, flippedCards } = get();
      if (isGamePaused || phase !== 'playing' || timeLeft <= 0) return false;
      const card = cards[cardIndex];
      if (!card || card.isFlipped || card.isMatched) return false;
      if (flippedCards.includes(cardIndex)) return false;
      if (flippedCards.length >= 2) return false;
      return true;
    },

    getGameStateDescription: () => {
      const { phase, isGamePaused, timeLeft } = get();
      if (phase === 'menu') return 'לא התחיל';
      if (isGamePaused) return 'מושהה';
      if (phase === 'won') return 'ניצחת!';
      if (phase === 'timeout' || timeLeft <= 0) return 'נגמר הזמן';
      return 'פעיל';
    },

    formatTime: (seconds) => formatTime(seconds),

    getFormattedTimeLeft: () => formatTime(get().timeLeft),

    getTimeColor: () => getTimeColor(get().timeLeft),

    getPerformanceLevel: () => {
      const { gameStats, timeLeft } = get();
      return getPerformanceLevel(gameStats.score, gameStats.moves, timeLeft, formatTime);
    },

    getWinAchievements: () => {
      const { gameStats, timeLeft, getGameProgress } = get();
      const { totalPairs } = getGameProgress();
      return getWinAchievements(gameStats.score, gameStats.moves, gameStats.streak, gameStats.perfectMatches, timeLeft, totalPairs);
    },

    // ─── Timer actions ───────────────────────────────────────────────────────

    incrementTimer: () =>
      set(
        (s) => ({ timer: s.timer + 1 }),
        false,
        'memory/incrementTimer',
      ),

    decrementTimeLeft: () =>
      set(
        (s) => ({ timeLeft: Math.max(0, s.timeLeft - 1) }),
        false,
        'memory/decrementTimeLeft',
      ),

    setPhase: (p: MemoryPhase) => set({ phase: p }, false, 'memory/setPhase'),

    // ─── Game lifecycle ──────────────────────────────────────────────────────

    initializeGame: (targetDifficulty) => {
      const state = get();
      const currentDifficulty = targetDifficulty ?? state.difficulty;
      const config = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[currentDifficulty];

      const shuffled = [...MEMORY_GAME_ANIMALS].sort(() => Math.random() - 0.5);
      const animals = shuffled.slice(0, config.pairs);
      const genericCards = createShuffledMemoryCards(animals);
      const cards: MemoryCard[] = genericCards.map((card) => ({
        id: card.id,
        animal: card.item,
        isFlipped: card.isFlipped,
        isMatched: card.isMatched,
      }));

      const { players } = get();
      set(
        {
          ...(targetDifficulty ? { difficulty: currentDifficulty } : {}),
          animals,
          cards,
          timeLeft: config.timeLimit,
          phase: 'playing' as MemoryPhase,
          timer: 0,
          flippedCards: [],
          matchedPairs: [],
          gameStats: initialGameStats,
          currentPlayer: 0,
          players: [{ ...players[0], score: 0 }, { ...players[1], score: 0 }],
        },
        false,
        'memory/initializeGame',
      );
    },

    handleCardClick: (cardIndex) => {
      const { canClickCard, cards, flippedCards, gameStats } = get();
      if (!canClickCard(cardIndex)) return;

      const card = cards[cardIndex];

      const updatedStats =
        flippedCards.length === 0
          ? { ...gameStats, moves: gameStats.moves + 1 }
          : gameStats;

      const updatedCards = [...cards];
      updatedCards[cardIndex] = { ...card!, isFlipped: true };

      set(
        { flippedCards: [...flippedCards, cardIndex], cards: updatedCards, gameStats: updatedStats },
        false,
        'memory/flipCard',
      );

    },

    resolveMatch: (firstCardIndex, secondCardIndex) => {
      const s = get();
      const config = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[s.difficulty];
      const outcome = resolveCardMatch(s, firstCardIndex, secondCardIndex, config.pairs);

      // Duo mode: award pair to current player on match; switch on miss
      let updatedPlayers = s.players;
      let nextPlayer = s.currentPlayer;
      if (s.mode === 'duo') {
        if (outcome.isMatch) {
          updatedPlayers = s.players.map((p, i) =>
            i === s.currentPlayer ? { ...p, score: p.score + 1 } : p
          ) as [DuoPlayer, DuoPlayer];
        } else {
          nextPlayer = (1 - s.currentPlayer) as 0 | 1;
        }
      }

      set(
        {
          cards: outcome.cards,
          matchedPairs: outcome.matchedPairs,
          flippedCards: outcome.flippedCards,
          gameStats: outcome.gameStats,
          lastMatchWasSuccess: outcome.isMatch,
          players: updatedPlayers,
          currentPlayer: nextPlayer,
        },
        false,
        outcome.isMatch ? 'memory/successMatch' : 'memory/failedMatch',
      );

      if (outcome.isMatch && outcome.isWon) {
        set({ phase: 'won' as MemoryPhase }, false, 'memory/gameWon');
      }
    },

    setMode: (mode: MemoryMode) => set({ mode }, false, 'memory/setMode'),

    setPlayerNames: (p1: string, p2: string) =>
      set(
        (s) => ({
          players: [
            { ...s.players[0], name: p1 || 'שחקן 1' },
            { ...s.players[1], name: p2 || 'שחקן 2' },
          ] as [DuoPlayer, DuoPlayer],
        }),
        false,
        'memory/setPlayerNames',
      ),

    pauseGame: () => set({ isGamePaused: true }, false, 'memory/pause'),
    resumeGame: () => set({ isGamePaused: false }, false, 'memory/resume'),

    resetGame: () =>
      set(
        {
          phase: 'menu' as MemoryPhase,
          timer: 0,
          timeLeft: 0,
          isGamePaused: false,
          gameStats: initialGameStats,
          cards: [],
          flippedCards: [],
          matchedPairs: [],
          showHints: false,
          showDebug: false,
        },
        false,
        'memory/resetGame',
      ),

    resetToMenu: () => set({ ...initialState }, false, 'memory/resetToMenu'),

    setDifficulty: (difficulty) => {
      if (get().difficulty === difficulty) return;
      set({ difficulty }, false, 'memory/setDifficulty');
      get().initializeGame(difficulty);
    },
  }),
);
