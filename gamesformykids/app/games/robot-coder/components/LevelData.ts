export type Dir = '→' | '←' | '↑' | '↓';

export type LetterTile = {
  row: number;
  col: number;
  letter: string;
};

export type Level = {
  id: number;
  gridSize: number;
  start: { row: number; col: number };
  letters: LetterTile[];
  targetWord: string;
  maxCommands: number;
  hint: string;
};

export const LEVELS: Level[] = [
  // Level 1-3: straight paths
  {
    id: 1, gridSize: 4, start: { row: 3, col: 0 },
    letters: [{ row: 3, col: 1, letter: 'א' }, { row: 3, col: 2, letter: 'ב' }],
    targetWord: 'אב', maxCommands: 4,
    hint: 'לך ימינה פעמיים',
  },
  {
    id: 2, gridSize: 4, start: { row: 0, col: 0 },
    letters: [{ row: 0, col: 2, letter: 'ג' }, { row: 2, col: 2, letter: 'ד' }],
    targetWord: 'גד', maxCommands: 6,
    hint: 'לך ימינה ואז למטה',
  },
  {
    id: 3, gridSize: 4, start: { row: 2, col: 0 },
    letters: [
      { row: 2, col: 1, letter: 'י' },
      { row: 2, col: 2, letter: 'ל' },
      { row: 2, col: 3, letter: 'ד' },
    ],
    targetWord: 'ילד', maxCommands: 4,
    hint: 'לך ימינה שלוש פעמים',
  },
  // Level 4-6: L-shapes
  {
    id: 4, gridSize: 4, start: { row: 3, col: 0 },
    letters: [
      { row: 3, col: 2, letter: 'ש' },
      { row: 1, col: 2, letter: 'מ' },
      { row: 1, col: 3, letter: 'ש' },
    ],
    targetWord: 'שמש', maxCommands: 6,
    hint: 'ימינה, למעלה, ימינה שוב',
  },
  {
    id: 5, gridSize: 4, start: { row: 0, col: 3 },
    letters: [
      { row: 0, col: 1, letter: 'א' },
      { row: 2, col: 1, letter: 'ר' },
      { row: 2, col: 3, letter: 'י' },
    ],
    targetWord: 'ארי', maxCommands: 8,
    hint: 'שמאלה, למטה, ימינה',
  },
  {
    id: 6, gridSize: 5, start: { row: 4, col: 0 },
    letters: [
      { row: 4, col: 2, letter: 'ד' },
      { row: 2, col: 2, letter: 'ב' },
      { row: 2, col: 4, letter: 'ש' },
    ],
    targetWord: 'דבש', maxCommands: 8,
    hint: 'ימינה, למעלה, ימינה שוב',
  },
  // Level 7-9: zigzag
  {
    id: 7, gridSize: 5, start: { row: 0, col: 4 },
    letters: [
      { row: 0, col: 2, letter: 'כ' },
      { row: 2, col: 2, letter: 'ל' },
      { row: 2, col: 0, letter: 'ב' },
    ],
    targetWord: 'כלב', maxCommands: 8,
    hint: 'שמאלה, למטה, שמאלה',
  },
  {
    id: 8, gridSize: 5, start: { row: 4, col: 4 },
    letters: [
      { row: 4, col: 1, letter: 'ס' },
      { row: 1, col: 1, letter: 'פ' },
      { row: 1, col: 4, letter: 'ר' },
    ],
    targetWord: 'ספר', maxCommands: 10,
    hint: 'שמאלה, למעלה, ימינה',
  },
  {
    id: 9, gridSize: 6, start: { row: 5, col: 0 },
    letters: [
      { row: 5, col: 3, letter: 'ח' },
      { row: 2, col: 3, letter: 'ר' },
      { row: 2, col: 5, letter: 'ב' },
    ],
    targetWord: 'חרב', maxCommands: 10,
    hint: 'ימינה, למעלה, ימינה',
  },
  // Level 10: 4-letter word
  {
    id: 10, gridSize: 6, start: { row: 5, col: 0 },
    letters: [
      { row: 5, col: 2, letter: 'א' },
      { row: 3, col: 2, letter: 'ה' },
      { row: 3, col: 4, letter: 'ב' },
      { row: 1, col: 4, letter: 'ה' },
    ],
    targetWord: 'אהבה', maxCommands: 10,
    hint: 'ימינה, למעלה, ימינה, למעלה',
  },
];
