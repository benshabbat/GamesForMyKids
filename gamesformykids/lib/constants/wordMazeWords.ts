/** Letters in every word of each level — the menu labels are built from this, so they cannot drift. */
export const MAZE_WORD_LENGTH = { easy: 3, medium: 4, hard: 5 } as const;

export const MAZE_WORDS = {
  easy:   ['כלב', 'שמש', 'ספר', 'דגל', 'שקל', 'פיל', 'דוב', 'גמל', 'ענן', 'קוף'],
  medium: ['ילדה', 'חתול', 'כוכב', 'תפוח', 'כדור', 'עוגה', 'אריה', 'ארנב'],
  hard:   ['ספריה', 'ילדים', 'כלבים', 'ציפור', 'שולחן', 'דבורה', 'גלידה'],
} as const;

export type MazeDifficulty = keyof typeof MAZE_WORDS;
