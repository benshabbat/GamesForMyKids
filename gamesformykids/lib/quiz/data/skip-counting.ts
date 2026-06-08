export type SkipCountingQuestion = {
  id: number;
  question: string;
  answer: string;
  emoji: string;
  wrongOptions: [string, string, string];
};

export const SKIP_COUNTING_QUESTIONS: SkipCountingQuestion[] = [
  // ×2 forward
  { id: 1,  question: '2, 4, 6, ___',           answer: '8',   emoji: '🐾', wrongOptions: ['7','9','10'] },
  { id: 2,  question: '4, 6, 8, ___',            answer: '10',  emoji: '🐾', wrongOptions: ['9','11','12'] },
  { id: 3,  question: '6, 8, 10, ___',           answer: '12',  emoji: '🐾', wrongOptions: ['11','13','14'] },
  { id: 4,  question: '10, 12, 14, ___',         answer: '16',  emoji: '🐾', wrongOptions: ['15','17','18'] },
  { id: 5,  question: '16, 18, 20, ___',         answer: '22',  emoji: '🐾', wrongOptions: ['21','23','24'] },
  // ×2 with blank in middle
  { id: 6,  question: '2, 4, ___, 8',            answer: '6',   emoji: '🦘', wrongOptions: ['5','7','9'] },
  { id: 7,  question: '8, ___, 12, 14',          answer: '10',  emoji: '🦘', wrongOptions: ['9','11','13'] },
  // ×5 forward
  { id: 8,  question: '5, 10, 15, ___',          answer: '20',  emoji: '⭐', wrongOptions: ['16','18','25'] },
  { id: 9,  question: '10, 15, 20, ___',         answer: '25',  emoji: '⭐', wrongOptions: ['22','24','30'] },
  { id: 10, question: '25, 30, 35, ___',         answer: '40',  emoji: '⭐', wrongOptions: ['36','38','45'] },
  { id: 11, question: '40, 45, 50, ___',         answer: '55',  emoji: '⭐', wrongOptions: ['52','53','60'] },
  { id: 12, question: '55, 60, 65, ___',         answer: '70',  emoji: '⭐', wrongOptions: ['68','69','75'] },
  // ×5 with blank in middle
  { id: 13, question: '5, 10, ___, 20',          answer: '15',  emoji: '🌟', wrongOptions: ['12','14','16'] },
  { id: 14, question: '20, ___, 30, 35',         answer: '25',  emoji: '🌟', wrongOptions: ['22','24','28'] },
  // ×10 forward
  { id: 15, question: '10, 20, 30, ___',         answer: '40',  emoji: '🔢', wrongOptions: ['35','38','50'] },
  { id: 16, question: '30, 40, 50, ___',         answer: '60',  emoji: '🔢', wrongOptions: ['55','58','70'] },
  { id: 17, question: '60, 70, 80, ___',         answer: '90',  emoji: '🔢', wrongOptions: ['85','88','100'] },
  { id: 18, question: '70, 80, 90, ___',         answer: '100', emoji: '🔢', wrongOptions: ['95','98','110'] },
  // ×10 with blank in middle
  { id: 19, question: '10, ___, 30, 40',         answer: '20',  emoji: '💯', wrongOptions: ['15','22','25'] },
  { id: 20, question: '40, ___, 60, 70',         answer: '50',  emoji: '💯', wrongOptions: ['45','48','55'] },
  // Backwards ×2
  { id: 21, question: '10, 8, 6, ___',           answer: '4',   emoji: '⬇️', wrongOptions: ['3','5','2'] },
  { id: 22, question: '20, 18, 16, ___',         answer: '14',  emoji: '⬇️', wrongOptions: ['12','15','13'] },
  // Backwards ×5
  { id: 23, question: '25, 20, 15, ___',         answer: '10',  emoji: '⬇️', wrongOptions: ['8','12','5'] },
  { id: 24, question: '50, 45, 40, ___',         answer: '35',  emoji: '⬇️', wrongOptions: ['30','36','34'] },
  // Mixed
  { id: 25, question: '2, ___, 6, 8, 10',        answer: '4',   emoji: '🎯', wrongOptions: ['3','5','1'] },
];
