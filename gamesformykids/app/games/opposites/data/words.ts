// ניגודים (הפכים) בעברית
export type OppositeWord = {
  id: number;
  word: string;
  opposite: string;
  emoji: string;
  wrongOptions: [string, string, string];
};

export const OPPOSITE_WORDS: OppositeWord[] = [
  { id: 1,  word: 'גדול',   opposite: 'קטן',    emoji: '🐘🐭', wrongOptions: ['ארוך', 'כבד', 'גבוה'] },
  { id: 2,  word: 'חם',     opposite: 'קר',     emoji: '🔥❄️',  wrongOptions: ['חמים', 'רטוב', 'יבש'] },
  { id: 3,  word: 'מהיר',   opposite: 'איטי',   emoji: '🐇🐢', wrongOptions: ['עצלן', 'שקט', 'כבד'] },
  { id: 4,  word: 'גבוה',   opposite: 'נמוך',   emoji: '🏔️🌊',  wrongOptions: ['קצר', 'רחוק', 'שטוח'] },
  { id: 5,  word: 'יום',    opposite: 'לילה',   emoji: '☀️🌙',  wrongOptions: ['ערב', 'בוקר', 'שחר'] },
  { id: 6,  word: 'שמח',    opposite: 'עצוב',   emoji: '😊😢', wrongOptions: ['כועס', 'עייף', 'בכי'] },
  { id: 7,  word: 'ארוך',   opposite: 'קצר',    emoji: '📏✂️',  wrongOptions: ['גדול', 'רחב', 'עגול'] },
  { id: 8,  word: 'פתוח',   opposite: 'סגור',   emoji: '🔓🔒', wrongOptions: ['שבור', 'ישן', 'מלא'] },
  { id: 9,  word: 'חזק',    opposite: 'חלש',    emoji: '💪🤏', wrongOptions: ['רך', 'קטן', 'נמוך'] },
  { id: 10, word: 'יפה',    opposite: 'מכוער',  emoji: '💎🪨', wrongOptions: ['פשוט', 'זקן', 'ישן'] },
  { id: 11, word: 'חדש',    opposite: 'ישן',    emoji: '🆕📦️', wrongOptions: ['שבור', 'קטן', 'ריק'] },
  { id: 12, word: 'מלא',    opposite: 'ריק',    emoji: '🥛🫙', wrongOptions: ['קטן', 'פחות', 'אפס'] },
  { id: 13, word: 'עליה',   opposite: 'ירידה',  emoji: '⬆️⬇️', wrongOptions: ['שמאל', 'ימין', 'קדימה'] },
  { id: 14, word: 'לבן',    opposite: 'שחור',   emoji: '⬜⬛', wrongOptions: ['כחול', 'אדום', 'אפור'] },
  { id: 15, word: 'קלה',    opposite: 'כבדה',   emoji: '🪶🏋️', wrongOptions: ['מהירה', 'קשה', 'קטנה'] },
  { id: 16, word: 'רחוק',   opposite: 'קרוב',   emoji: '🔭🔬', wrongOptions: ['גבוה', 'ישר', 'נסתר'] },
  { id: 17, word: 'חכם',    opposite: 'טיפש',   emoji: '🧠🙈', wrongOptions: ['שוטה', 'פראי', 'עצלן'] },
  { id: 18, word: 'בוכה',   opposite: 'צוחקת',  emoji: '😭😂', wrongOptions: ['שרה', 'ישנה', 'אוכלת'] },
  { id: 19, word: 'ישר',    opposite: 'עקום',   emoji: '📐〰️',  wrongOptions: ['עגול', 'שטוח', 'חד'] },
  { id: 20, word: 'נקי',    opposite: 'מלוכלך', emoji: '🧼🗑️', wrongOptions: ['ריחני', 'ישן', 'רטוב'] },
];

export const CATEGORIES = ['הכל', 'גדלים', 'מצבורג', 'תחושות', 'מיקום'] as const;
export const QUESTIONS_PER_GAME = 10;
