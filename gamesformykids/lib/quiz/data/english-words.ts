// אנגלית בסיסית לילדים - עברית → אנגלית
export type EnglishWord = {
  id: number;
  hebrew: string;
  english: string;
  emoji: string;
  category: 'חיות' | 'אוכל' | 'גוף' | 'בית' | 'צבעים' | 'מספרים';
  wrongOptions: [string, string, string];
};

export const ENGLISH_WORDS: EnglishWord[] = [
  { id: 1,  category: 'חיות',    emoji: '🐕', hebrew: 'כלב',      english: 'dog',      wrongOptions: ['cat', 'cow', 'pig'] },
  { id: 2,  category: 'חיות',    emoji: '🐈', hebrew: 'חתול',     english: 'cat',      wrongOptions: ['dog', 'rat', 'hat'] },
  { id: 3,  category: 'חיות',    emoji: '🐘', hebrew: 'פיל',      english: 'elephant', wrongOptions: ['lion', 'tiger', 'horse'] },
  { id: 4,  category: 'חיות',    emoji: '🦁', hebrew: 'אריה',     english: 'lion',     wrongOptions: ['tiger', 'bear', 'wolf'] },
  { id: 5,  category: 'חיות',    emoji: '🐟', hebrew: 'דג',       english: 'fish',     wrongOptions: ['bird', 'frog', 'duck'] },
  { id: 6,  category: 'אוכל',    emoji: '🍎', hebrew: 'תפוח',     english: 'apple',    wrongOptions: ['orange', 'grape', 'melon'] },
  { id: 7,  category: 'אוכל',    emoji: '🍌', hebrew: 'בננה',     english: 'banana',   wrongOptions: ['mango', 'lemon', 'peach'] },
  { id: 8,  category: 'אוכל',    emoji: '🍕', hebrew: 'פיצה',     english: 'pizza',    wrongOptions: ['pasta', 'rice', 'bread'] },
  { id: 9,  category: 'אוכל',    emoji: '🥛', hebrew: 'חלב',      english: 'milk',     wrongOptions: ['water', 'juice', 'cream'] },
  { id: 10, category: 'גוף',     emoji: '👁️', hebrew: 'עין',      english: 'eye',      wrongOptions: ['ear', 'nose', 'mouth'] },
  { id: 11, category: 'גוף',     emoji: '👂', hebrew: 'אוזן',     english: 'ear',      wrongOptions: ['eye', 'nose', 'hair'] },
  { id: 12, category: 'גוף',     emoji: '👃', hebrew: 'אף',       english: 'nose',     wrongOptions: ['mouth', 'chin', 'face'] },
  { id: 13, category: 'בית',     emoji: '🗄️', hebrew: 'שולחן',    english: 'table',    wrongOptions: ['chair', 'bed', 'door'] },
  { id: 14, category: 'בית',     emoji: '🚪', hebrew: 'דלת',      english: 'door',     wrongOptions: ['wall', 'window', 'floor'] },
  { id: 15, category: 'בית',     emoji: '🛏️', hebrew: 'מיטה',     english: 'bed',      wrongOptions: ['sofa', 'chair', 'desk'] },
  { id: 16, category: 'צבעים',   emoji: '🔴', hebrew: 'אדום',     english: 'red',      wrongOptions: ['blue', 'green', 'pink'] },
  { id: 17, category: 'צבעים',   emoji: '🔵', hebrew: 'כחול',     english: 'blue',     wrongOptions: ['red', 'green', 'grey'] },
  { id: 18, category: 'צבעים',   emoji: '🟡', hebrew: 'צהוב',     english: 'yellow',   wrongOptions: ['orange', 'white', 'gold'] },
  { id: 19, category: 'מספרים',  emoji: '1️⃣', hebrew: 'אחד',      english: 'one',      wrongOptions: ['two', 'four', 'ten'] },
  { id: 20, category: 'מספרים',  emoji: '⭐', hebrew: 'כוכב',     english: 'star',     wrongOptions: ['moon', 'sun', 'sky'] },
];

export const CATEGORIES = ['הכל', 'חיות', 'אוכל', 'גוף', 'בית', 'צבעים', 'מספרים'] as const;
export type EnglishCategory = typeof CATEGORIES[number];
