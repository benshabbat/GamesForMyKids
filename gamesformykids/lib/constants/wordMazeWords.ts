export const MAZE_WORDS = {
  easy:   ['כלב', 'שמש', 'ספר', 'ימה', 'דגל', 'שקל', 'פיל', 'דוב', 'עץ', 'אש'],
  medium: ['ילדה', 'חתול', 'בית', 'ילד', 'כוכב', 'חבר', 'שדה', 'ציפור'],
  hard:   ['ספריה', 'שמחה', 'ילדים', 'חיוך', 'כובע', 'שוקו', 'כלבים'],
} as const;

export type MazeDifficulty = keyof typeof MAZE_WORDS;
