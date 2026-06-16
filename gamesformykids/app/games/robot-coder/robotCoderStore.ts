'use client';
import { create } from 'zustand';
import { LEVELS, type Dir, type Level } from './components/LevelData';

type Phase = 'menu' | 'editing' | 'running' | 'success' | 'fail';

interface State {
  phase: Phase;
  levelIdx: number;
  level: Level;
  commands: Dir[];
  robotPos: { row: number; col: number };
  collectedLetters: string[];
  animStep: number;
}

interface Actions {
  startGame: () => void;
  nextLevel: () => void;
  addCommand: (dir: Dir) => void;
  removeCommand: (idx: number) => void;
  clearCommands: () => void;
  run: () => void;
  executeStep: () => void;
  resetLevel: () => void;
  resetGame: () => void;
}

const DELTA: Record<Dir, { dr: number; dc: number }> = {
  '↑': { dr: -1, dc: 0 },
  '↓': { dr: 1,  dc: 0 },
  '←': { dr: 0,  dc: -1 },
  '→': { dr: 0,  dc: 1 },
};

export const useRobotCoderStore = create<State & Actions>((set, get) => ({
  phase: 'menu',
  levelIdx: 0,
  level: LEVELS[0]!,
  commands: [],
  robotPos: { ...LEVELS[0]!.start },
  collectedLetters: [],
  animStep: 0,

  startGame: () => {
    const level = LEVELS[0]!;
    set({ phase: 'editing', levelIdx: 0, level, commands: [], robotPos: { ...level.start }, collectedLetters: [], animStep: 0 });
  },

  nextLevel: () => {
    const { levelIdx } = get();
    const nextIdx = levelIdx + 1;
    if (nextIdx >= LEVELS.length) {
      set({ phase: 'menu' });
      return;
    }
    const level = LEVELS[nextIdx]!;
    set({ phase: 'editing', levelIdx: nextIdx, level, commands: [], robotPos: { ...level.start }, collectedLetters: [], animStep: 0 });
  },

  addCommand: (dir) => {
    const { commands, level } = get();
    if (commands.length >= level.maxCommands) return;
    set({ commands: [...commands, dir] });
  },

  removeCommand: (idx) => {
    const { commands } = get();
    set({ commands: commands.filter((_, i) => i !== idx) });
  },

  clearCommands: () => set({ commands: [] }),

  run: () => {
    const { commands, level } = get();
    if (commands.length === 0) return;
    set({ phase: 'running', robotPos: { ...level.start }, collectedLetters: [], animStep: 0 });
  },

  executeStep: () => {
    const { animStep, commands, robotPos, collectedLetters, level } = get();
    const dir = commands[animStep];
    if (!dir) return;

    const { dr, dc } = DELTA[dir];
    const newRow = robotPos.row + dr;
    const newCol = robotPos.col + dc;

    if (newRow < 0 || newRow >= level.gridSize || newCol < 0 || newCol >= level.gridSize) {
      set({ phase: 'fail' });
      return;
    }

    const tile = level.letters.find(t => t.row === newRow && t.col === newCol);
    const newCollected = tile ? [...collectedLetters, tile.letter] : collectedLetters;
    const newStep = animStep + 1;

    const isDone = newStep >= commands.length;
    let newPhase: Phase = 'running';
    if (isDone) {
      newPhase = newCollected.join('') === level.targetWord ? 'success' : 'fail';
    }

    set({ robotPos: { row: newRow, col: newCol }, collectedLetters: newCollected, animStep: newStep, phase: newPhase });
  },

  resetLevel: () => {
    const { level } = get();
    set({ phase: 'editing', robotPos: { ...level.start }, collectedLetters: [], animStep: 0 });
  },

  resetGame: () => {
    const level = LEVELS[0]!;
    set({ phase: 'menu', levelIdx: 0, level, commands: [], robotPos: { ...level.start }, collectedLetters: [], animStep: 0 });
  },
}));
