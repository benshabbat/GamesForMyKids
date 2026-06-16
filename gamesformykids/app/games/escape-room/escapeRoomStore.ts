'use client';
import { create } from 'zustand';
import { ROOMS, type Room, type Hotspot, type Puzzle } from './components/puzzleData';

type Phase = 'menu' | 'playing' | 'result';

interface State {
  phase: Phase;
  room: Room | null;
  solvedIds: Set<string>;
  revealedDigits: string[]; // digits in order revealed
  activePuzzle: { hotspot: Hotspot; puzzle: Puzzle } | null;
  funMessage: string | null;
  score: number;
  hintsUsed: number;
}

interface Actions {
  startGame: (roomId: string) => void;
  clickHotspot: (hotspotId: string) => void;
  submitAnswer: (answer: string) => boolean; // returns isCorrect
  dismissOverlay: () => void;
  applyHint: () => string | null; // returns hint text or null if none left
  resetGame: () => void;
}

const INITIAL: State = {
  phase: 'menu',
  room: null,
  solvedIds: new Set(),
  revealedDigits: [],
  activePuzzle: null,
  funMessage: null,
  score: 0,
  hintsUsed: 0,
};

export const useEscapeRoomStore = create<State & Actions>((set, get) => ({
  ...INITIAL,

  startGame: (roomId) => {
    const room = ROOMS.find(r => r.id === roomId) ?? ROOMS[0]!;
    set({ phase: 'playing', room, solvedIds: new Set(), revealedDigits: [], activePuzzle: null, funMessage: null, score: 0, hintsUsed: 0 });
  },

  clickHotspot: (hotspotId) => {
    const { room, solvedIds } = get();
    if (!room) return;
    const hotspot = room.hotspots.find(h => h.id === hotspotId);
    if (!hotspot) return;
    if (solvedIds.has(hotspotId)) return;

    if (hotspot.puzzle) {
      set({ activePuzzle: { hotspot, puzzle: hotspot.puzzle }, funMessage: null });
    } else if (hotspot.funMessage) {
      set({ funMessage: hotspot.funMessage, activePuzzle: null });
    }
  },

  submitAnswer: (answer) => {
    const { activePuzzle, solvedIds, revealedDigits, room, score } = get();
    if (!activePuzzle || !room) return false;

    const isCorrect = answer === activePuzzle.puzzle.answer;
    if (isCorrect) {
      const newSolved = new Set(solvedIds);
      newSolved.add(activePuzzle.hotspot.id);
      const newDigits = [...revealedDigits, activePuzzle.puzzle.digit];
      const puzzleHotspots = room.hotspots.filter(h => h.puzzle !== null);
      const allSolved = newSolved.size >= puzzleHotspots.length;
      set({
        solvedIds: newSolved,
        revealedDigits: newDigits,
        activePuzzle: null,
        score: score + (100 - get().hintsUsed * 5),
        phase: allSolved ? 'result' : 'playing',
      });
    }
    return isCorrect;
  },

  dismissOverlay: () => {
    set({ activePuzzle: null, funMessage: null });
  },

  applyHint: () => {
    const { activePuzzle, hintsUsed } = get();
    if (!activePuzzle || hintsUsed >= 3) return null;
    set({ hintsUsed: hintsUsed + 1 });
    const wrong = activePuzzle.puzzle.wrongOptions;
    const eliminated = wrong[Math.floor(Math.random() * wrong.length)]!;
    return `הרמז: "${eliminated}" היא תשובה שגויה.`;
  },

  resetGame: () => {
    set({ ...INITIAL, solvedIds: new Set() });
  },
}));
