'use client';
import { create } from 'zustand';
import { speakHebrew } from '@/lib/utils/speech/speaker';

export const ALEF_BET = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];
const LETTER_NAMES: Record<string, string> = {
  'א':'אָלֶף','ב':'בֵּית','ג':'גִּימֶל','ד':'דָּלֶת','ה':'הֵא','ו':'וָו','ז':'זַיִן','ח':'חֵית',
  'ט':'טֵית','י':'יוֹד','כ':'כַּף','ל':'לָמֶד','מ':'מֵם','נ':'נוּן','ס':'סָמֶך','ע':'עַיִן',
  'פ':'פֵּא','צ':'צָדִי','ק':'קוֹף','ר':'רֵישׁ','ש':'שִׁין','ת':'תָּו',
};
const MAX_COLS = 5;
const MAX_HEIGHT = 7;

function nextLetter(letter: string): string | null {
  const idx = ALEF_BET.indexOf(letter);
  if (idx === -1 || idx === ALEF_BET.length - 1) return null;
  return ALEF_BET[idx + 1] ?? null;
}

function randomStartLetter(): string {
  const poolSize = Math.min(4, ALEF_BET.length);
  return ALEF_BET[Math.floor(Math.random() * poolSize)] ?? 'א';
}

function mergeColumn(col: string[]): { col: string[]; merged: boolean; mergedLetter: string | null } {
  if (col.length < 2) return { col, merged: false, mergedLetter: null };
  const top = col[col.length - 1];
  const second = col[col.length - 2];
  if (top && second && top === second) {
    const next = nextLetter(top);
    const newCol = [...col.slice(0, col.length - 2)];
    if (next) newCol.push(next);
    return { col: newCol, merged: true, mergedLetter: next };
  }
  return { col, merged: false, mergedLetter: null };
}

interface LetterMergeState {
  phase: 'idle' | 'playing' | 'result';
  columns: string[][];
  nextLetterVal: string;
  score: number;
  maxLetterReached: string;
  won: boolean;
  lastMerged: string | null;
}
interface LetterMergeActions {
  startGame: () => void;
  dropLetter: (colIndex: number) => void;
  reset: () => void;
}

export const useLetterMergeStore = create<LetterMergeState & LetterMergeActions>((set, get) => ({
  phase: 'idle',
  columns: [[], [], [], [], []],
  nextLetterVal: randomStartLetter(),
  score: 0,
  maxLetterReached: 'א',
  won: false,
  lastMerged: null,

  startGame: () => set({
    phase: 'playing',
    columns: [[], [], [], [], []],
    nextLetterVal: randomStartLetter(),
    score: 0,
    maxLetterReached: 'א',
    won: false,
    lastMerged: null,
  }),

  dropLetter: (colIndex: number) => {
    const { columns, nextLetterVal, score, maxLetterReached } = get();
    const col = columns[colIndex];
    if (!col || col.length >= MAX_HEIGHT) return;

    let newColumns = columns.map((c, i) => i === colIndex ? [...c, nextLetterVal] : [...c]);
    let totalScore = score;
    let newMax = maxLetterReached;
    let lastMergedLetter: string | null = null;
    let won = false;

    // Cascade merge in the dropped column
    let merging = true;
    while (merging) {
      const result = mergeColumn(newColumns[colIndex] ?? []);
      merging = result.merged;
      if (merging) {
        newColumns = newColumns.map((c, i) => i === colIndex ? result.col : c);
        const merged = result.mergedLetter;
        if (merged) {
          lastMergedLetter = merged;
          const mergedIdx = ALEF_BET.indexOf(merged);
          totalScore += (mergedIdx + 1) * 10;
          if (mergedIdx > ALEF_BET.indexOf(newMax)) newMax = merged;
          if (merged === 'ת') { won = true; merging = false; }
          void speakHebrew(LETTER_NAMES[merged] ?? merged);
        }
      }
    }

    // Check game over: any column exceeds MAX_HEIGHT
    const gameOver = !won && newColumns.some(c => c.length >= MAX_HEIGHT);

    set({
      columns: newColumns,
      nextLetterVal: randomStartLetter(),
      score: totalScore,
      maxLetterReached: newMax,
      lastMerged: lastMergedLetter,
      ...(won || gameOver ? { phase: 'result', won } : {}),
    });
  },

  reset: () => set({
    phase: 'idle',
    columns: [[], [], [], [], []],
    nextLetterVal: randomStartLetter(),
    score: 0,
    maxLetterReached: 'א',
    won: false,
    lastMerged: null,
  }),
}));
