'use client';

/**
 * Memory Game Store — Zustand
 *
 * מחליף את ה-MemoryContext. מכיל את כל ה-state, פעולות
 * ופונקציות-עזר של משחק הזיכרון.
 * Side-effects (timer) נמצאים ב-useMemoryGameContent.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AnimalData } from '@/lib/types/games';
import {
  playMemorySuccessSound,
  createShuffledMemoryCards,
} from '@/lib/utils/game/gameUtils';
import { MEMORY_GAME_ANIMALS, MEMORY_GAME_CONSTANTS } from '@/lib/constants';
import { DifficultyLevel, MemoryCard, GameStats } from '../types/memory';

// ─── Initial values ───────────────────────────────────────────────────────────

const initialGameStats: GameStats = {
  moves: 0,
  matches: 0,
  score: 0,
  timeElapsed: 0,
  perfectMatches: 0,
  streak: 0,
};

// ─── State shape ──────────────────────────────────────────────────────────────

export interface MemoryStoreState {
  // Game flow
  gameStarted: boolean;
  isCompleted: boolean;
  isGameWon: boolean;
  timer: number;
  timeLeft: number;
  isGamePaused: boolean;
  difficulty: DifficultyLevel;
  gameStats: GameStats;

  // Cards
  cards: MemoryCard[];
  animals: AnimalData[];
  flippedCards: number[];
  matchedPairs: string[];

  // Audio
  audioContext: AudioContext | null;

  // UI
  showHints: boolean;
  showDebug: boolean;
}

// ─── Actions shape ────────────────────────────────────────────────────────────

export interface MemoryStoreActions {
  initializeGame: (targetDifficulty?: DifficultyLevel) => void;
  handleCardClick: (cardIndex: number) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  resetToMenu: () => void;
  setDifficulty: (difficulty: DifficultyLevel) => void;

  // Called from timer useEffect in useMemoryGameContent
  incrementTimer: () => void;
  decrementTimeLeft: () => void;
  setCompleted: (value: boolean) => void;
  setGameWon: (value: boolean) => void;

  // Computed helpers
  getDifficultyConfig: () => { pairs: number; name: string; emoji: string; timeLimit: number };
  getGridCols: () => string;
  getCardDisplayData: (index: number) => {
    id: number;
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
  };
  getAnimationDelay: (index: number) => string;
  getGameProgress: () => {
    totalPairs: number;
    completedPairs: number;
    remainingPairs: number;
    progressPercentage: number;
  };
  canClickCard: (cardIndex: number) => boolean;
  getGameStateDescription: () => string;
}

const initialState: MemoryStoreState = {
  gameStarted: false,
  isCompleted: false,
  isGameWon: false,
  timer: 0,
  timeLeft: 0,
  isGamePaused: false,
  difficulty: 'MEDIUM',
  gameStats: initialGameStats,
  cards: [],
  animals: MEMORY_GAME_ANIMALS.slice(0, MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS.MEDIUM.pairs),
  flippedCards: [],
  matchedPairs: [],
  audioContext: null,
  showHints: false,
  showDebug: false,
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useMemoryStore = create<MemoryStoreState & MemoryStoreActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // ─── Computed helpers ──────────────────────────────────────────────────

      getDifficultyConfig: () =>
        MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[get().difficulty],

      getGridCols: () => {
        const count = get().cards.length;
        if (count === 8) return 'grid-cols-2 md:grid-cols-4';
        if (count === 12) return 'grid-cols-3 md:grid-cols-4';
        if (count === 16) return 'grid-cols-4 md:grid-cols-4';
        return 'grid-cols-3 md:grid-cols-4';
      },

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

      getAnimationDelay: (index) => `${index * 0.1}s`,

      getGameProgress: () => {
        const { gameStats, getDifficultyConfig } = get();
        const totalPairs = getDifficultyConfig().pairs;
        const completedPairs = gameStats.matches;
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

      // ─── Timer actions (driven by useEffect in useMemoryGameContent) ───────

      incrementTimer: () =>
        set(
          (s) => ({
            timer: s.timer + 1,
            gameStats: { ...s.gameStats, timeElapsed: s.timer + 1 },
          }),
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

      // ─── Game lifecycle ───────────────────────────────────────────────────

      initializeGame: (targetDifficulty) => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }

        const state = get();
        const currentDifficulty = targetDifficulty ?? state.difficulty;
        const config = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[currentDifficulty];

        // Init audio on first interaction
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

        // Count move when first card of a pair is flipped
        const updatedStats =
          flippedCards.length === 0
            ? { ...gameStats, moves: gameStats.moves + 1 }
            : gameStats;

        const updatedCards = [...cards];
        updatedCards[cardIndex] = { ...card, isFlipped: true };

        set(
          { flippedCards: [...flippedCards, cardIndex], cards: updatedCards, gameStats: updatedStats },
          false,
          'memory/flipCard',
        );

        if (flippedCards.length === 1) {
          const firstCardIndex = flippedCards[0];
          const firstCard = cards[firstCardIndex];

          setTimeout(() => {
            const s = get();
            if (firstCard.animal.name === card.animal.name) {
              // ── Match ──
              const matched = [...s.cards];
              matched[firstCardIndex] = { ...matched[firstCardIndex], isMatched: true };
              matched[cardIndex] = { ...matched[cardIndex], isMatched: true };

              const newMatches = s.gameStats.matches + 1;
              const newStreak = s.gameStats.streak + 1;
              const newScore = s.gameStats.score + 100 * newStreak;

              set(
                {
                  cards: matched,
                  matchedPairs: [...s.matchedPairs, card.animal.name],
                  flippedCards: [],
                  gameStats: { ...s.gameStats, matches: newMatches, streak: newStreak, score: newScore },
                },
                false,
                'memory/successMatch',
              );

              playMemorySuccessSound(s.audioContext);

              const config = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[s.difficulty];
              if (newMatches === config.pairs) {
                set({ isGameWon: true, isCompleted: true }, false, 'memory/gameWon');
              }
            } else {
              // ── No match ──
              const reset = [...s.cards];
              reset[firstCardIndex] = { ...reset[firstCardIndex], isFlipped: false };
              reset[cardIndex] = { ...reset[cardIndex], isFlipped: false };

              set(
                { cards: reset, flippedCards: [], gameStats: { ...s.gameStats, streak: 0 } },
                false,
                'memory/failedMatch',
              );
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
        set({ difficulty }, false, 'memory/setDifficulty');
        get().initializeGame(difficulty);
      },
    }),
    { name: 'MemoryStore' },
  ),
);
