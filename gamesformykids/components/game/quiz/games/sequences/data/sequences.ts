// סדרות מספרים
export type SequenceQuestion = {
  id: number;
  sequence: number[];   // הסדרה המוצגת (ללא האיבר האחרון)
  next: number;         // האיבר הבא
  rule: string;         // הסבר הכלל
  wrong: [number, number, number];
};

export const SEQUENCE_QUESTIONS: SequenceQuestion[] = [
  // חיבור פשוט
  { id: 1,  sequence: [1, 2, 3, 4],       next: 5,   rule: '+1',      wrong: [6, 7, 3] },
  { id: 2,  sequence: [2, 4, 6, 8],       next: 10,  rule: '+2',      wrong: [9, 12, 11] },
  { id: 3,  sequence: [5, 10, 15, 20],    next: 25,  rule: '+5',      wrong: [24, 30, 22] },
  { id: 4,  sequence: [10, 20, 30, 40],   next: 50,  rule: '+10',     wrong: [45, 55, 60] },
  { id: 5,  sequence: [3, 6, 9, 12],      next: 15,  rule: '+3',      wrong: [14, 18, 16] },
  { id: 6,  sequence: [4, 8, 12, 16],     next: 20,  rule: '+4',      wrong: [19, 24, 18] },
  { id: 7,  sequence: [1, 3, 5, 7],       next: 9,   rule: '+2 (אי-זוגי)', wrong: [8, 10, 11] },
  // חיסור
  { id: 8,  sequence: [20, 18, 16, 14],   next: 12,  rule: '-2',      wrong: [13, 11, 10] },
  { id: 9,  sequence: [50, 40, 30, 20],   next: 10,  rule: '-10',     wrong: [15, 5, 0] },
  { id: 10, sequence: [100, 90, 80, 70],  next: 60,  rule: '-10',     wrong: [65, 55, 50] },
  // כפל
  { id: 11, sequence: [1, 2, 4, 8],       next: 16,  rule: '×2',      wrong: [10, 12, 15] },
  { id: 12, sequence: [1, 3, 9, 27],      next: 81,  rule: '×3',      wrong: [54, 63, 90] },
  { id: 13, sequence: [2, 6, 18, 54],     next: 162, rule: '×3',      wrong: [108, 150, 180] },
  // סדרות מספרים מיוחדות
  { id: 14, sequence: [0, 1, 1, 2, 3],    next: 5,   rule: 'פיבונאצ\'י', wrong: [4, 6, 7] },
  { id: 15, sequence: [1, 4, 9, 16],      next: 25,  rule: 'ריבועים', wrong: [20, 24, 30] },
  { id: 16, sequence: [2, 4, 8, 16, 32],  next: 64,  rule: '×2',      wrong: [48, 60, 56] },
  { id: 17, sequence: [10, 8, 6, 4],      next: 2,   rule: '-2',      wrong: [1, 3, 0] },
  { id: 18, sequence: [7, 14, 21, 28],    next: 35,  rule: '+7',      wrong: [32, 36, 34] },
  { id: 19, sequence: [11, 22, 33, 44],   next: 55,  rule: '+11',     wrong: [50, 54, 56] },
  { id: 20, sequence: [1, 10, 100, 1000], next: 10000, rule: '×10',   wrong: [5000, 9000, 2000] },
];

export type SequenceLevel = { id: number; label: string; ids: number[] };

export const LEVELS: SequenceLevel[] = [
  { id: 1, label: 'קל',   ids: [1,2,3,4,5,6,7,8,9,10] },
  { id: 2, label: 'בינוני', ids: [7,8,9,10,11,12,13,17,18,19] },
  { id: 3, label: 'קשה',  ids: [11,12,13,14,15,16,19,20] },
  { id: 4, label: 'הכל',  ids: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] },
];

export const QUESTIONS_PER_GAME = 8;
