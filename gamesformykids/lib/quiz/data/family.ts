// המשפחה — קשרים משפחתיים
export type FamilyQuestion = {
  id: number;
  question: string;
  answers: [string, string, string, string];
  correctIndex: number;
  emoji: string;
  relation: string;
};

export const FAMILY_QUESTIONS: FamilyQuestion[] = [
  { id: 1,  emoji: '👨', relation: 'אב',        question: 'מי הגבר שהוא הורה שלך?',                           answers: ['סבא', 'דוד', 'אבא', 'אח'],           correctIndex: 2 },
  { id: 2,  emoji: '👩', relation: 'אם',        question: 'מי האישה שהיא הורה שלך?',                          answers: ['סבתא', 'דודה', 'אחות', 'אמא'],       correctIndex: 3 },
  { id: 3,  emoji: '👴', relation: 'סב',        question: 'מי האבא של אבא שלך?',                              answers: ['דוד', 'אח', 'סבא', 'קרוב משפחה'],    correctIndex: 2 },
  { id: 4,  emoji: '👵', relation: 'סבתא',      question: 'מי האמא של אמא שלך?',                              answers: ['דודה', 'סבתא', 'אחות', 'שכנה'],      correctIndex: 1 },
  { id: 5,  emoji: '👦', relation: 'אח',        question: 'מי הילד ממשפחתך שיש לו את אותם הורים כמוך?',      answers: ['חבר', 'בן דוד', 'אח', 'שכן'],        correctIndex: 2 },
  { id: 6,  emoji: '👧', relation: 'אחות',      question: 'מי הילדה ממשפחתך עם אותם הורים?',                 answers: ['חברה', 'בת דודה', 'שכנה', 'אחות'],   correctIndex: 3 },
  { id: 7,  emoji: '🧑', relation: 'בן דוד',    question: 'ילד שהאבא או האמא שלו הם אח/אחות של ההורים שלך:', answers: ['אח', 'בן דוד', 'שכן', 'חבר'],        correctIndex: 1 },
  { id: 8,  emoji: '👩‍👦', relation: 'דודה',  question: 'מי האחות של אבא שלך?',                              answers: ['סבתא', 'דודה', 'אמא', 'שכנה'],       correctIndex: 1 },
  { id: 9,  emoji: '👨‍👦', relation: 'דוד',   question: 'מי האח של אמא שלך?',                                answers: ['דוד', 'סבא', 'אבא', 'עמית'],         correctIndex: 0 },
  { id: 10, emoji: '👶', relation: 'תינוק',     question: 'מה קוראים לילד שנולד לאחרונה במשפחה?',             answers: ['נין', 'תינוק', 'פעוט', 'נינה'],      correctIndex: 1 },
  { id: 11, emoji: '👨‍👩‍👧‍👦', relation: 'משפחה גרעינית', question: 'מה כולל ה"תא המשפחתי" הבסיסי?',  answers: ['רק ילדים', 'הורים בלבד', 'הורים וילדים', 'סבים ונכדים'], correctIndex: 2 },
  { id: 12, emoji: '🫂', relation: 'נכד',       question: 'מי הקרוי ה"נכד" של הסבים?',                       answers: ['בן הדוד', 'ילד הילדים', 'האח', 'הבן'], correctIndex: 1 },
  { id: 13, emoji: '👫', relation: 'הורים',     question: 'מה השם הכולל לאבא ולאמא יחד?',                     answers: ['אחים', 'קרובים', 'הורים', 'שומרים'], correctIndex: 2 },
  { id: 14, emoji: '👨‍👩‍👧', relation: 'משפחה', question: 'איך קוראים לאנשים הקרובים ביותר אלינו ושרים יחד?', answers: ['חברים', 'שכנים', 'עמיתים', 'משפחה'], correctIndex: 3 },
  { id: 15, emoji: '🧓', relation: 'דור',       question: 'כמה שנים בין דור אחד למשנהו בממוצע?',              answers: ['5', '15', '25-30', '50'],             correctIndex: 2 },
];

