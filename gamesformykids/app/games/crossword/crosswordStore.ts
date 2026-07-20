'use client';

import { create } from 'zustand';
import { CROSSWORD_PUZZLES } from './data/puzzles';
import type { CrosswordState, CrosswordActions } from './crosswordTypes';
import { buildGrid, getCell } from './crosswordLogic';

export const useCrosswordStore = create<CrosswordState & CrosswordActions>((set, get) => ({
  phase: 'menu',
  puzzle: null,
  puzzleIndex: 0,
  grid: [],
  selectedClue: null,
  selectedCell: null,
  score: 0,
  completedClues: new Set(),

  startGame: (puzzleIndex = 0) => {
    const puzzle = CROSSWORD_PUZZLES[puzzleIndex] ?? CROSSWORD_PUZZLES[0];
    if (!puzzle) return;
    const firstClue = puzzle.clues[0] ?? null;
    set({
      phase: 'playing',
      puzzle,
      puzzleIndex,
      grid: buildGrid(puzzle),
      selectedClue: firstClue,
      selectedCell: firstClue ? { row: firstClue.row, col: firstClue.col } : null,
      score: 0,
      completedClues: new Set(),
    });
  },

  selectClue: (clue) => {
    set({
      selectedClue: clue,
      selectedCell: { row: clue.row, col: clue.col },
    });
  },

  selectCell: (row, col) => {
    const { puzzle, selectedClue } = get();
    if (!puzzle) return;

    const matchingClue =
      puzzle.clues.find(
        (c) =>
          c.direction === selectedClue?.direction &&
          ((c.direction === 'across' && c.row === row && col >= c.col && col < c.col + c.answer.length) ||
            (c.direction === 'down' && c.col === col && row >= c.row && row < c.row + c.answer.length))
      ) ??
      puzzle.clues.find(
        (c) =>
          (c.direction === 'across' && c.row === row && col >= c.col && col < c.col + c.answer.length) ||
          (c.direction === 'down' && c.col === col && row >= c.row && row < c.row + c.answer.length)
      ) ??
      null;

    if (matchingClue) {
      set({ selectedClue: matchingClue, selectedCell: { row, col } });
    }
  },

  typeLetter: (letter) => {
    const { selectedClue, selectedCell, grid, puzzle, completedClues } = get();
    if (!selectedClue || !selectedCell || !puzzle) return;

    const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
    const { row, col } = selectedCell;

    const pos =
      selectedClue.direction === 'across'
        ? col - selectedClue.col
        : row - selectedClue.row;

    if (pos < 0 || pos >= selectedClue.answer.length) return;

    const targetCell = getCell(newGrid, row, col);
    if (!targetCell) return;
    targetCell.letter = letter;

    // Advance cursor to next cell in word
    let nextRow = row;
    let nextCol = col;
    for (let i = pos + 1; i < selectedClue.answer.length; i++) {
      const nr = selectedClue.direction === 'down' ? selectedClue.row + i : selectedClue.row;
      const nc = selectedClue.direction === 'across' ? selectedClue.col + i : selectedClue.col;
      const nc2 = getCell(newGrid, nr, nc);
      if (nc2 && !nc2.letter) {
        nextRow = nr;
        nextCol = nc;
        break;
      }
    }

    // Check if word is complete and correct
    let wordComplete = true;
    let wordCorrect = true;
    for (let i = 0; i < selectedClue.answer.length; i++) {
      const r = selectedClue.direction === 'down' ? selectedClue.row + i : selectedClue.row;
      const c = selectedClue.direction === 'across' ? selectedClue.col + i : selectedClue.col;
      const cell = getCell(newGrid, r, c);
      if (!cell || !cell.letter) { wordComplete = false; break; }
      if (cell.letter !== selectedClue.answer[i]) wordCorrect = false;
    }

    const newCompleted = new Set(completedClues);
    if (wordComplete && wordCorrect) {
      for (let i = 0; i < selectedClue.answer.length; i++) {
        const r = selectedClue.direction === 'down' ? selectedClue.row + i : selectedClue.row;
        const c = selectedClue.direction === 'across' ? selectedClue.col + i : selectedClue.col;
        const cell = getCell(newGrid, r, c);
        if (cell) cell.correct = true;
      }
      newCompleted.add(selectedClue.number);
    }

    const allDone = puzzle.clues.every((c) => newCompleted.has(c.number));

    set({
      grid: newGrid,
      selectedCell: { row: nextRow, col: nextCol },
      completedClues: newCompleted,
      score: newCompleted.size,
      phase: allDone ? 'result' : 'playing',
    });
  },

  deleteLastLetter: () => {
    const { selectedClue, selectedCell, grid } = get();
    if (!selectedClue || !selectedCell) return;

    const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
    const { row, col } = selectedCell;
    const cell = getCell(newGrid, row, col);

    if (cell?.letter) {
      cell.letter = '';
      set({ grid: newGrid });
      return;
    }

    const pos =
      selectedClue.direction === 'across'
        ? col - selectedClue.col
        : row - selectedClue.row;

    if (pos > 0) {
      const prevRow = selectedClue.direction === 'down' ? selectedClue.row + pos - 1 : row;
      const prevCol = selectedClue.direction === 'across' ? selectedClue.col + pos - 1 : col;
      const prevCell = getCell(newGrid, prevRow, prevCol);
      if (prevCell) prevCell.letter = '';
      set({ grid: newGrid, selectedCell: { row: prevRow, col: prevCol } });
    }
  },

  checkWord: () => {
    const { selectedClue, grid, completedClues, puzzle } = get();
    if (!selectedClue || !puzzle) return;

    const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
    let wordComplete = true;
    let wordCorrect = true;

    for (let i = 0; i < selectedClue.answer.length; i++) {
      const r = selectedClue.direction === 'down' ? selectedClue.row + i : selectedClue.row;
      const c = selectedClue.direction === 'across' ? selectedClue.col + i : selectedClue.col;
      const cell = getCell(newGrid, r, c);
      if (!cell || !cell.letter) { wordComplete = false; break; }
      const correct = cell.letter === selectedClue.answer[i];
      cell.correct = correct ? true : false;
      if (!correct) wordCorrect = false;
    }

    const newCompleted = new Set(completedClues);
    if (wordComplete && wordCorrect) {
      newCompleted.add(selectedClue.number);
    }

    const allDone = puzzle.clues.every((c) => newCompleted.has(c.number));

    set({
      grid: newGrid,
      completedClues: newCompleted,
      score: newCompleted.size,
      phase: allDone ? 'result' : 'playing',
    });
  },

  nextPuzzle: () => {
    const { puzzleIndex } = get();
    const next = (puzzleIndex + 1) % CROSSWORD_PUZZLES.length;
    get().startGame(next);
  },

  restart: () =>
    set({
      phase: 'menu',
      puzzle: null,
      grid: [],
      selectedClue: null,
      selectedCell: null,
      score: 0,
      completedClues: new Set(),
    }),
}));
