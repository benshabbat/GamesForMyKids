'use client';
import { create } from 'zustand';
import { getQuestionForSquare, type SNLQuestion } from './data/questions';

export const LADDERS: Record<number, number> = {
  4: 14, 9: 31, 20: 38, 28: 84, 40: 59, 51: 67, 63: 81, 71: 91,
};

export const SNAKES: Record<number, number> = {
  17: 7, 54: 34, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 99: 78,
};

export interface Player {
  name: string;
  emoji: string;
  position: number;
  isAI: boolean;
}

type Phase = 'menu' | 'rolling' | 'quiz' | 'result';

interface State {
  mode: 'solo' | 'two-player';
  phase: Phase;
  players: [Player, Player];
  currentPlayer: 0 | 1;
  diceValue: number;
  pendingQuestion: SNLQuestion | null;
  pendingSquare: number;
  pendingSpecialType: 'ladder' | 'snake' | null;
  winner: 0 | 1 | null;
  lastMessage: string;
}

interface Actions {
  startGame: (mode: 'solo' | 'two-player') => void;
  rollDice: () => void;
  answerQuestion: (answer: string) => void;
  resetGame: () => void;
}

const INITIAL_STATE: State = {
  mode: 'solo',
  phase: 'menu',
  players: [
    { name: 'שחקן 1', emoji: '🔵', position: 0, isAI: false },
    { name: 'שחקן 2', emoji: '🔴', position: 0, isAI: true },
  ],
  currentPlayer: 0,
  diceValue: 0,
  pendingQuestion: null,
  pendingSquare: 0,
  pendingSpecialType: null,
  winner: null,
  lastMessage: '',
};

export const useSnakesLaddersStore = create<State & Actions>((set, get) => ({
  ...INITIAL_STATE,

  startGame: (mode) => {
    set({
      ...INITIAL_STATE,
      mode,
      phase: 'rolling',
      players: [
        { name: 'שחקן 1', emoji: '🔵', position: 0, isAI: false },
        { name: mode === 'solo' ? 'מחשב' : 'שחקן 2', emoji: '🔴', position: 0, isAI: mode === 'solo' },
      ],
    });
  },

  rollDice: () => {
    const { players, currentPlayer } = get();
    const dice = Math.floor(Math.random() * 6) + 1;
    const player = players[currentPlayer];
    const newPos = Math.min(player.position + dice, 100);

    set({ diceValue: dice });

    if (newPos >= 100) {
      const updated = [...players] as [Player, Player];
      updated[currentPlayer] = { ...player, position: 100 };
      set({ players: updated, phase: 'result', winner: currentPlayer });
      return;
    }

    if (LADDERS[newPos] !== undefined || SNAKES[newPos] !== undefined) {
      const updated = [...players] as [Player, Player];
      updated[currentPlayer] = { ...player, position: newPos };
      const specialType = LADDERS[newPos] !== undefined ? 'ladder' : 'snake';
      set({
        players: updated,
        pendingSquare: newPos,
        pendingQuestion: getQuestionForSquare(newPos),
        pendingSpecialType: specialType,
        phase: 'quiz',
        lastMessage: '',
      });
    } else {
      const updated = [...players] as [Player, Player];
      updated[currentPlayer] = { ...player, position: newPos };
      set({
        players: updated,
        phase: 'rolling',
        currentPlayer: (currentPlayer === 0 ? 1 : 0) as 0 | 1,
        lastMessage: '',
      });
    }
  },

  answerQuestion: (answer) => {
    const { players, currentPlayer, pendingQuestion, pendingSquare, pendingSpecialType } = get();
    if (!pendingQuestion) return;

    const correct = answer === pendingQuestion.answer;
    const player = players[currentPlayer];
    let finalPos = pendingSquare;
    let msg = '';

    if (pendingSpecialType === 'ladder') {
      if (correct) {
        finalPos = LADDERS[pendingSquare] ?? pendingSquare;
        msg = `🎉 נכון! ${player.emoji} ${player.name} עולה בסולם!`;
      } else {
        finalPos = pendingSquare;
        msg = `😅 טעות... ${player.name} נשאר במקום!`;
      }
    } else {
      if (correct) {
        finalPos = pendingSquare;
        msg = `🎉 נכון! ${player.emoji} ${player.name} נמלט מהנחש!`;
      } else {
        finalPos = SNAKES[pendingSquare] ?? pendingSquare;
        msg = `🐍 טעות... ${player.name} יורד עם הנחש!`;
      }
    }

    const updated = [...players] as [Player, Player];
    updated[currentPlayer] = { ...player, position: finalPos };

    if (finalPos >= 100) {
      set({ players: updated, phase: 'result', winner: currentPlayer, lastMessage: msg });
      return;
    }

    set({
      players: updated,
      pendingQuestion: null,
      pendingSquare: 0,
      pendingSpecialType: null,
      phase: 'rolling',
      currentPlayer: (currentPlayer === 0 ? 1 : 0) as 0 | 1,
      lastMessage: msg,
    });
  },

  resetGame: () => set({ ...INITIAL_STATE }),
}));
