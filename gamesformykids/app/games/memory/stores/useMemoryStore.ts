'use client';

import { makeStore } from '@/lib/stores/createStore';
import {
  playMemorySuccessSound,
  createShuffledMemoryCards,
} from '@/lib/utils/game/gameUtils';
import { MEMORY_GAME_ANIMALS, MEMORY_GAME_CONSTANTS } from '@/lib/constants';
import { MemoryCard } from '../types/memory';
import { getDifficultyOptions, getPerformanceLevel, getWinAchievements } from './memoryDisplayHelpers';
import {
  MemoryStoreState,
  MemoryStoreActions,
  initialState,
  initialGameStats,
} from './memoryStoreTypes';
import { formatTime, getTimeColor, getGridCols, getAnimationDelay } from './memoryPureHelpers';
import { resolveCardMatch } from './memoryMatchLogic';

export type { MemoryStoreState, MemoryStoreActions } from './memoryStoreTypes';
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
      const { isGamePaused, isCompleted, timeLeft, cards, flippedCards } = get();
      if (isGamePaused || isCompleted || timeLeft <= 0) return false;
      const card = cards[cardIndex];
      if (!card || card.isFlipped || card.isMatched) return false;
      if (flippedCards.includes(cardIndex)) return false;
      if (flippedCards.length >= 2) return false;
      return true;
    },

    getGameStateDescription: () => {
      const { gameStarted, isGamePaused, isGameWon, isCompleted, timeLeft } = get();
      if (!gameStarted) return 'לא התחיל';
      if (isGamePaused) return 'מושהה';
      if (isGameWon) return 'ניצחת!';
      if (isCompleted || timeLeft <= 0) return 'נגמר הזמן';
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

    setCompleted: (value) => set({ isCompleted: value }, false, 'memory/setCompleted'),
    setGameWon: (value) => set({ isGameWon: value }, false, 'memory/setGameWon'),

    // ─── Game lifecycle ──────────────────────────────────────────────────────

    initializeGame: (targetDifficulty) => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      const state = get();
      const currentDifficulty = targetDifficulty ?? state.difficulty;
      const config = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[currentDifficulty];

      let audioContext = state.audioContext;
      if (!audioContext && typeof window !== 'undefined') {
        try {
          const AudioContextClass =
            window.AudioContext ||
            (window as typeof window & { webkitAudioContext?: typeof AudioContext })
              .webkitAudioContext;
          if (AudioContextClass) {
            audioContext = new AudioContextClass();
          }
        } catch (error) {
          console.warn('Failed to initialize audio context:', error);
        }
      }

      const shuffled = [...MEMORY_GAME_ANIMALS].sort(() => Math.random() - 0.5);
      const animals = shuffled.slice(0, config.pairs);
      const genericCards = createShuffledMemoryCards(animals);
      const cards: MemoryCard[] = genericCards.map((card) => ({
        id: card.id,
        animal: card.item,
        isFlipped: card.isFlipped,
        isMatched: card.isMatched,
      }));

      set(
        {
          ...(targetDifficulty ? { difficulty: currentDifficulty } : {}),
          animals,
          cards,
          timeLeft: config.timeLimit,
          gameStarted: true,
          isCompleted: false,
          isGameWon: false,
          timer: 0,
          flippedCards: [],
          matchedPairs: [],
          gameStats: initialGameStats,
          ...(audioContext !== state.audioContext ? { audioContext } : {}),
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

      if (flippedCards.length === 1) {
        const firstCardIndex = flippedCards[0]!;

        setTimeout(() => {
          const s = get();
          const config = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[s.difficulty];
          const outcome = resolveCardMatch(s, firstCardIndex, cardIndex, config.pairs);

          set(
            {
              cards: outcome.cards,
              matchedPairs: outcome.matchedPairs,
              flippedCards: outcome.flippedCards,
              gameStats: outcome.gameStats,
            },
            false,
            outcome.isMatch ? 'memory/successMatch' : 'memory/failedMatch',
          );

          if (outcome.isMatch) {
            playMemorySuccessSound(s.audioContext);
            if (outcome.isWon) {
              set({ isGameWon: true, isCompleted: true }, false, 'memory/gameWon');
            }
          }
        }, MEMORY_GAME_CONSTANTS.FLIP_DURATION * 0.6);
      }
    },

    pauseGame: () => set({ isGamePaused: true }, false, 'memory/pause'),
    resumeGame: () => set({ isGamePaused: false }, false, 'memory/resume'),

    resetGame: () =>
      set(
        {
          gameStarted: false,
          isCompleted: false,
          isGameWon: false,
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
