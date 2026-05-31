export type PatternType = 'AB' | 'AAB' | 'ABC' | 'AABB';
export type PatternDifficulty = 'easy' | 'medium' | 'hard';

export interface PatternQuestion {
  id: number;
  sequence: string[];
  answer: string;
  wrongOptions: [string, string, string];
  patternType: PatternType;
  difficulty: PatternDifficulty;
}

export const PATTERN_QUESTIONS: PatternQuestion[] = [
  // AB — easy
  { id: 1,  sequence: ['🔴', '🔵', '🔴', '🔵', '🔴', '❓'], answer: '🔵', wrongOptions: ['🔴', '🟡', '🟢'],  patternType: 'AB',   difficulty: 'easy' },
  { id: 2,  sequence: ['🐱', '🐶', '🐱', '🐶', '🐱', '❓'], answer: '🐶', wrongOptions: ['🐱', '🐰', '🐟'],  patternType: 'AB',   difficulty: 'easy' },
  { id: 3,  sequence: ['⭐', '🌙', '⭐', '🌙', '⭐', '❓'], answer: '🌙', wrongOptions: ['⭐', '☀️', '🌟'],  patternType: 'AB',   difficulty: 'easy' },
  { id: 4,  sequence: ['🍎', '🍌', '🍎', '🍌', '🍎', '❓'], answer: '🍌', wrongOptions: ['🍎', '🍊', '🍇'],  patternType: 'AB',   difficulty: 'easy' },
  { id: 5,  sequence: ['🌸', '🌼', '🌸', '🌼', '🌸', '❓'], answer: '🌼', wrongOptions: ['🌸', '🌺', '🌻'],  patternType: 'AB',   difficulty: 'easy' },
  { id: 6,  sequence: ['🚂', '🚗', '🚂', '🚗', '🚂', '❓'], answer: '🚗', wrongOptions: ['🚂', '✈️', '🚢'],  patternType: 'AB',   difficulty: 'easy' },
  { id: 17, sequence: ['🔶', '🔷', '🔶', '🔷', '🔶', '❓'], answer: '🔷', wrongOptions: ['🔶', '🔸', '🔹'],  patternType: 'AB',   difficulty: 'easy' },
  { id: 18, sequence: ['🌈', '⚡', '🌈', '⚡', '🌈', '❓'], answer: '⚡', wrongOptions: ['🌈', '🌀', '💨'],  patternType: 'AB',   difficulty: 'easy' },
  { id: 19, sequence: ['🎸', '🥁', '🎸', '🥁', '🎸', '❓'], answer: '🥁', wrongOptions: ['🎸', '🎹', '🎷'],  patternType: 'AB',   difficulty: 'easy' },
  { id: 20, sequence: ['🌊', '🔥', '🌊', '🔥', '🌊', '❓'], answer: '🔥', wrongOptions: ['🌊', '💨', '⛰️'],  patternType: 'AB',   difficulty: 'easy' },
  // AAB — medium
  { id: 7,  sequence: ['🟡', '🟡', '🔵', '🟡', '🟡', '❓'], answer: '🔵', wrongOptions: ['🟡', '🔴', '🟢'],  patternType: 'AAB',  difficulty: 'medium' },
  { id: 8,  sequence: ['🐻', '🐻', '🦁', '🐻', '🐻', '❓'], answer: '🦁', wrongOptions: ['🐻', '🐯', '🦊'],  patternType: 'AAB',  difficulty: 'medium' },
  { id: 9,  sequence: ['🎈', '🎈', '🎁', '🎈', '🎈', '❓'], answer: '🎁', wrongOptions: ['🎈', '🎀', '🎊'],  patternType: 'AAB',  difficulty: 'medium' },
  { id: 10, sequence: ['☀️', '☀️', '🌧️', '☀️', '☀️', '❓'], answer: '🌧️', wrongOptions: ['☀️', '❄️', '⛅'], patternType: 'AAB',  difficulty: 'medium' },
  { id: 21, sequence: ['🏀', '🏀', '⚽', '🏀', '🏀', '❓'], answer: '⚽', wrongOptions: ['🏀', '🎾', '🏈'],  patternType: 'AAB',  difficulty: 'medium' },
  { id: 22, sequence: ['🌺', '🌺', '🌿', '🌺', '🌺', '❓'], answer: '🌿', wrongOptions: ['🌺', '🌸', '🌻'],  patternType: 'AAB',  difficulty: 'medium' },
  // ABC — medium
  { id: 11, sequence: ['🔴', '🟡', '🟢', '🔴', '🟡', '❓'], answer: '🟢', wrongOptions: ['🔴', '🟡', '🔵'],  patternType: 'ABC',  difficulty: 'medium' },
  { id: 12, sequence: ['🐱', '🐶', '🐰', '🐱', '🐶', '❓'], answer: '🐰', wrongOptions: ['🐱', '🐶', '🐟'],  patternType: 'ABC',  difficulty: 'medium' },
  { id: 13, sequence: ['🍎', '🍌', '🍊', '🍎', '🍌', '❓'], answer: '🍊', wrongOptions: ['🍎', '🍌', '🍇'],  patternType: 'ABC',  difficulty: 'medium' },
  // AABB — hard
  { id: 14, sequence: ['⬛', '⬛', '🔴', '🔴', '⬛', '❓'], answer: '⬛', wrongOptions: ['🔴', '🟡', '🟢'],  patternType: 'AABB', difficulty: 'hard' },
  { id: 15, sequence: ['🌙', '🌙', '⭐', '⭐', '🌙', '❓'], answer: '🌙', wrongOptions: ['⭐', '☀️', '🌟'],  patternType: 'AABB', difficulty: 'hard' },
  { id: 16, sequence: ['🐸', '🐸', '🐙', '🐙', '🐸', '❓'], answer: '🐸', wrongOptions: ['🐙', '🐢', '🦀'],  patternType: 'AABB', difficulty: 'hard' },
];
