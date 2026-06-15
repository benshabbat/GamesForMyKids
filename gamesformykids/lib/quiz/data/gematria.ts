// גמטריה — ערכי אותיות עברית
export type GematriaQuestion = {
  id: number;
  type: 'letter' | 'word' | 'reverse';
  question: string;
  answer: string;
  emoji: string;
  hint: string;
  wrongOptions: [string, string, string];
};

// Level 1 — single-letter value questions (22 letters)
const LETTER_QUESTIONS: GematriaQuestion[] = [
  { id: 1,  type: 'letter',  question: 'מה ערך האות א?',  answer: '1',   emoji: 'א', hint: 'א = 1 — הראשונה באלפבית!',          wrongOptions: ['2', '3', '10'] },
  { id: 2,  type: 'letter',  question: 'מה ערך האות ב?',  answer: '2',   emoji: 'ב', hint: 'ב = 2 — השנייה!',                    wrongOptions: ['1', '3', '20'] },
  { id: 3,  type: 'letter',  question: 'מה ערך האות ג?',  answer: '3',   emoji: 'ג', hint: 'ג = 3 — כמו גמל שלוש רגליים לצד!',  wrongOptions: ['2', '4', '30'] },
  { id: 4,  type: 'letter',  question: 'מה ערך האות ד?',  answer: '4',   emoji: 'ד', hint: 'ד = 4 — דלת עם 4 פינות!',            wrongOptions: ['3', '5', '40'] },
  { id: 5,  type: 'letter',  question: 'מה ערך האות ה?',  answer: '5',   emoji: 'ה', hint: 'ה = 5 — ה-ה-ה-ה-ה — 5 הבלים!',      wrongOptions: ['4', '6', '50'] },
  { id: 6,  type: 'letter',  question: 'מה ערך האות ו?',  answer: '6',   emoji: 'ו', hint: 'ו = 6 — כמו וו אחד בעמוד!',          wrongOptions: ['5', '7', '60'] },
  { id: 7,  type: 'letter',  question: 'מה ערך האות ז?',  answer: '7',   emoji: 'ז', hint: 'ז = 7 — שבעה ימי השבוע!',            wrongOptions: ['6', '8', '70'] },
  { id: 8,  type: 'letter',  question: 'מה ערך האות ח?',  answer: '8',   emoji: 'ח', hint: 'ח = 8 — חנוכה 8 ימים!',              wrongOptions: ['7', '9', '80'] },
  { id: 9,  type: 'letter',  question: 'מה ערך האות ט?',  answer: '9',   emoji: 'ט', hint: 'ט = 9 — טבלת ה-9!',                 wrongOptions: ['8', '10', '90'] },
  { id: 10, type: 'letter',  question: 'מה ערך האות י?',  answer: '10',  emoji: 'י', hint: 'י = 10 — יד עם 10 אצבעות!',          wrongOptions: ['9', '20', '1'] },
  { id: 11, type: 'letter',  question: 'מה ערך האות כ?',  answer: '20',  emoji: 'כ', hint: 'כ = 20 — כסף של 20!',                wrongOptions: ['10', '30', '2'] },
  { id: 12, type: 'letter',  question: 'מה ערך האות ל?',  answer: '30',  emoji: 'ל', hint: 'ל = 30 — לא 3, לא 3 עשרות = 30!',   wrongOptions: ['20', '40', '3'] },
  { id: 13, type: 'letter',  question: 'מה ערך האות מ?',  answer: '40',  emoji: 'מ', hint: 'מ = 40 — 40 שנה במדבר!',             wrongOptions: ['30', '50', '4'] },
  { id: 14, type: 'letter',  question: 'מה ערך האות נ?',  answer: '50',  emoji: 'נ', hint: 'נ = 50 — 50 שנה יובל!',              wrongOptions: ['40', '60', '5'] },
  { id: 15, type: 'letter',  question: 'מה ערך האות ס?',  answer: '60',  emoji: 'ס', hint: 'ס = 60 — סיבוב של 60 שניות!',        wrongOptions: ['50', '70', '6'] },
  { id: 16, type: 'letter',  question: 'מה ערך האות ע?',  answer: '70',  emoji: 'ע', hint: 'ע = 70 — עין רואה 70!',              wrongOptions: ['60', '80', '7'] },
  { id: 17, type: 'letter',  question: 'מה ערך האות פ?',  answer: '80',  emoji: 'פ', hint: 'פ = 80 — פה מדבר 80!',               wrongOptions: ['70', '90', '8'] },
  { id: 18, type: 'letter',  question: 'מה ערך האות צ?',  answer: '90',  emoji: 'צ', hint: 'צ = 90 — 90 = 100 פחות 10!',         wrongOptions: ['80', '100', '9'] },
  { id: 19, type: 'letter',  question: 'מה ערך האות ק?',  answer: '100', emoji: 'ק', hint: 'ק = 100 — קרוב ל-100!',              wrongOptions: ['90', '200', '10'] },
  { id: 20, type: 'letter',  question: 'מה ערך האות ר?',  answer: '200', emoji: 'ר', hint: 'ר = 200 — ריבועי 200!',              wrongOptions: ['100', '300', '20'] },
  { id: 21, type: 'letter',  question: 'מה ערך האות ש?',  answer: '300', emoji: 'ש', hint: 'ש = 300 — שלוש מאות!',              wrongOptions: ['200', '400', '30'] },
  { id: 22, type: 'letter',  question: 'מה ערך האות ת?',  answer: '400', emoji: 'ת', hint: 'ת = 400 — תכלית! 400!',              wrongOptions: ['300', '100', '40'] },
];

// Level 2 — word gematria sum
// מים = מ(40)+י(10)+מ(40) = 90
// אהבה = א(1)+ה(5)+ב(2)+ה(5) = 13
// שלום = ש(300)+ל(30)+ו(6)+מ(40) = 376
const WORD_QUESTIONS: GematriaQuestion[] = [
  { id: 23, type: 'word', question: 'מה גמטריה של אב?',      answer: '3',   emoji: '👨', hint: 'אב = א(1)+ב(2) = 3',               wrongOptions: ['12', '21', '41'] },
  { id: 24, type: 'word', question: 'מה גמטריה של אם?',      answer: '41',  emoji: '👩', hint: 'אם = א(1)+מ(40) = 41',              wrongOptions: ['3', '14', '51'] },
  { id: 25, type: 'word', question: 'מה גמטריה של בן?',      answer: '52',  emoji: '👦', hint: 'בן = ב(2)+נ(50) = 52',              wrongOptions: ['25', '62', '42'] },
  { id: 26, type: 'word', question: 'מה גמטריה של בת?',      answer: '402', emoji: '👧', hint: 'בת = ב(2)+ת(400) = 402',            wrongOptions: ['204', '302', '502'] },
  { id: 27, type: 'word', question: 'מה גמטריה של מים?',     answer: '90',  emoji: '💧', hint: 'מים = מ(40)+י(10)+מ(40) = 90',      wrongOptions: ['60', '120', '80'] },
  { id: 28, type: 'word', question: 'מה גמטריה של אור?',     answer: '207', emoji: '💡', hint: 'אור = א(1)+ו(6)+ר(200) = 207',      wrongOptions: ['270', '107', '217'] },
  { id: 29, type: 'word', question: 'מה גמטריה של אהבה?',    answer: '13',  emoji: '❤️', hint: 'אהבה = א(1)+ה(5)+ב(2)+ה(5) = 13',  wrongOptions: ['31', '14', '23'] },
  { id: 30, type: 'word', question: 'מה גמטריה של שלום?',    answer: '376', emoji: '🕊️', hint: 'שלום = ש(300)+ל(30)+ו(6)+מ(40) = 376', wrongOptions: ['463', '263', '476'] },
  { id: 31, type: 'word', question: 'מה גמטריה של ספר?',     answer: '340', emoji: '📖', hint: 'ספר = ס(60)+פ(80)+ר(200) = 340',    wrongOptions: ['430', '240', '360'] },
  { id: 32, type: 'word', question: 'מה גמטריה של בית?',     answer: '412', emoji: '🏠', hint: 'בית = ב(2)+י(10)+ת(400) = 412',     wrongOptions: ['214', '312', '422'] },
  { id: 33, type: 'word', question: 'מה גמטריה של כלב?',     answer: '52',  emoji: '🐕', hint: 'כלב = כ(20)+ל(30)+ב(2) = 52',       wrongOptions: ['62', '42', '32'] },
  { id: 34, type: 'word', question: 'מה גמטריה של ילד?',     answer: '44',  emoji: '🧒', hint: 'ילד = י(10)+ל(30)+ד(4) = 44',       wrongOptions: ['34', '54', '74'] },
  { id: 35, type: 'word', question: 'מה גמטריה של חיים?',    answer: '68',  emoji: '🌱', hint: 'חיים = ח(8)+י(10)+י(10)+מ(40) = 68', wrongOptions: ['86', '58', '78'] },
  { id: 36, type: 'word', question: 'מה גמטריה של שמים?',    answer: '390', emoji: '☁️', hint: 'שמים = ש(300)+מ(40)+י(10)+מ(40) = 390', wrongOptions: ['380', '400', '350'] },
  { id: 37, type: 'word', question: 'מה גמטריה של ארץ?',     answer: '291', emoji: '🌍', hint: 'ארץ = א(1)+ר(200)+צ(90) = 291',     wrongOptions: ['219', '391', '281'] },
  { id: 38, type: 'word', question: 'מה גמטריה של יד?',      answer: '14',  emoji: '✋', hint: 'יד = י(10)+ד(4) = 14',              wrongOptions: ['41', '4', '24'] },
  { id: 39, type: 'word', question: 'מה גמטריה של לב?',      answer: '32',  emoji: '❤️', hint: 'לב = ל(30)+ב(2) = 32',              wrongOptions: ['23', '42', '12'] },
];

// Level 3 — reverse: given a value, pick the letter
const REVERSE_QUESTIONS: GematriaQuestion[] = [
  { id: 40, type: 'reverse', question: 'איזו אות שווה 1?',   answer: 'א', emoji: '1️⃣',  hint: 'א = 1 — הראשונה!',  wrongOptions: ['ב', 'ג', 'י'] },
  { id: 41, type: 'reverse', question: 'איזו אות שווה 5?',   answer: 'ה', emoji: '5️⃣',  hint: 'ה = 5!',             wrongOptions: ['ו', 'ד', 'נ'] },
  { id: 42, type: 'reverse', question: 'איזו אות שווה 8?',   answer: 'ח', emoji: '8️⃣',  hint: 'ח = 8 — חנוכה!',    wrongOptions: ['כ', 'מ', 'ה'] },
  { id: 43, type: 'reverse', question: 'איזו אות שווה 10?',  answer: 'י', emoji: '🔟',  hint: 'י = 10 — יד!',       wrongOptions: ['א', 'כ', 'ק'] },
  { id: 44, type: 'reverse', question: 'איזו אות שווה 20?',  answer: 'כ', emoji: '✌️',  hint: 'כ = 20 — כסף!',      wrongOptions: ['י', 'ב', 'ל'] },
  { id: 45, type: 'reverse', question: 'איזו אות שווה 30?',  answer: 'ל', emoji: '🥉',  hint: 'ל = 30!',             wrongOptions: ['כ', 'מ', 'ג'] },
  { id: 46, type: 'reverse', question: 'איזו אות שווה 40?',  answer: 'מ', emoji: '4️⃣',  hint: 'מ = 40 — מדבר!',    wrongOptions: ['נ', 'ל', 'ד'] },
  { id: 47, type: 'reverse', question: 'איזו אות שווה 50?',  answer: 'נ', emoji: '5️⃣',  hint: 'נ = 50 — יובל!',     wrongOptions: ['מ', 'ס', 'ה'] },
  { id: 48, type: 'reverse', question: 'איזו אות שווה 70?',  answer: 'ע', emoji: '👁️',  hint: 'ע = 70 — עין!',      wrongOptions: ['ו', 'ז', 'ס'] },
  { id: 49, type: 'reverse', question: 'איזו אות שווה 80?',  answer: 'פ', emoji: '8️⃣',  hint: 'פ = 80 — פה!',       wrongOptions: ['ע', 'צ', 'ח'] },
  { id: 50, type: 'reverse', question: 'איזו אות שווה 100?', answer: 'ק', emoji: '💯',  hint: 'ק = 100 — קרן!',     wrongOptions: ['כ', 'ר', 'צ'] },
  { id: 51, type: 'reverse', question: 'איזו אות שווה 200?', answer: 'ר', emoji: '2️⃣',  hint: 'ר = 200 — ראש!',     wrongOptions: ['ק', 'ש', 'כ'] },
  { id: 52, type: 'reverse', question: 'איזו אות שווה 300?', answer: 'ש', emoji: '3️⃣',  hint: 'ש = 300 — שמש!',     wrongOptions: ['ת', 'ר', 'ס'] },
  { id: 53, type: 'reverse', question: 'איזו אות שווה 400?', answer: 'ת', emoji: '🏆',  hint: 'ת = 400 — תכלית!',   wrongOptions: ['ש', 'ק', 'ד'] },
  { id: 54, type: 'reverse', question: 'איזו אות שווה 7?',   answer: 'ז', emoji: '7️⃣',  hint: 'ז = 7 — שבעה!',      wrongOptions: ['ה', 'ח', 'ב'] },
  { id: 55, type: 'reverse', question: 'איזו אות שווה 60?',  answer: 'ס', emoji: '6️⃣',  hint: 'ס = 60 — ששים!',     wrongOptions: ['ע', 'נ', 'ו'] },
];

export const GEMATRIA_QUESTIONS: GematriaQuestion[] = [
  ...LETTER_QUESTIONS,
  ...WORD_QUESTIONS,
  ...REVERSE_QUESTIONS,
];
