// ספורט לילדים
export type SportsQuestion = {
  id: number;
  question: string;
  answers: [string, string, string, string];
  correctIndex: number;
  emoji: string;
  sport: string;
};

export const SPORTS_QUESTIONS: SportsQuestion[] = [
  { id: 1,  sport: 'כדורגל',   emoji: '⚽', question: 'כמה שחקנים יש לכל קבוצה בכדורגל?',         answers: ['9', '11', '10', '7'],             correctIndex: 1 },
  { id: 2,  sport: 'כדורסל',   emoji: '🏀', question: 'כמה נקודות שווה זריקת תלת נקודתית בכדורסל?', answers: ['1', '2', '3', '4'],               correctIndex: 2 },
  { id: 3,  sport: 'שחייה',    emoji: '🏊', question: 'איך קוראים לסגנון השחייה שנראה כמו גלישה?',   answers: ['חזה', 'גב', 'פרפר', 'חוף'],      correctIndex: 2 },
  { id: 4,  sport: 'טניס',     emoji: '🎾', question: 'כמה שחקנים יש בטניס יחיד?',                  answers: ['4', '3', '2', '1'],               correctIndex: 2 },
  { id: 5,  sport: 'כדורגל',   emoji: '⚽', question: 'כמה דקות משחק רגיל בכדורגל?',               answers: ['60', '80', '90', '100'],          correctIndex: 2 },
  { id: 6,  sport: 'בייסבול',  emoji: '⚾', question: 'מה השחקן שזורק את הכדור בבייסבול?',          answers: ['סוחר', 'מגרש', 'מגיש', 'תופס'], correctIndex: 2 },
  { id: 7,  sport: 'אולימפיאדה', emoji: '🏅', question: 'כמה צבעים יש בסמל האולימפי?',            answers: ['3', '4', '5', '6'],               correctIndex: 2 },
  { id: 8,  sport: 'גימנסטיקה', emoji: '🤸', question: 'באיזה ענף ספורט עושים "גשר" ו"פיקוד"?',    answers: ['שחייה', 'כדורגל', 'גימנסטיקה', 'כדורסל'], correctIndex: 2 },
  { id: 9,  sport: 'כדורעף',   emoji: '🏐', question: 'כמה שחקנים בקבוצת כדורעף?',                  answers: ['5', '6', '7', '8'],               correctIndex: 1 },
  { id: 10, sport: 'ריצה',     emoji: '🏃', question: 'כמה מטר הריצה הקצרה ביותר בתחרות?',         answers: ['50', '100', '200', '400'],        correctIndex: 1 },
  { id: 11, sport: 'כדורגל',   emoji: '⚽', question: 'מה קורה אם כדורגלן מקבל כרטיס אדום?',       answers: ['פנדל', 'מנוחה', 'גירוש', 'פרס'],  correctIndex: 2 },
  { id: 12, sport: 'טניס שולחן', emoji: '🏓', question: 'עד כמה נקודות משחקים סט בטניס שולחן?',   answers: ['7', '9', '11', '15'],             correctIndex: 2 },
  { id: 13, sport: 'גלישה',    emoji: '🏄', question: 'באיזה ספורט גולשים על גלי הים?',              answers: ['קיאק', 'גלישה', 'שחייה', 'חתירה'], correctIndex: 1 },
  { id: 14, sport: 'בוקסינג',  emoji: '🥊', question: 'כמה דקות כל סיבוב בבוקסינג?',               answers: ['2', '3', '4', '5'],               correctIndex: 1 },
  { id: 15, sport: 'אתלטיקה',  emoji: '🏋️', question: 'מה ענף הספורט "הרמת משקולות"?',              answers: ['ג\'ודו', 'היאבקות', 'אתלטיקה', 'פאוורליפטינג'], correctIndex: 3 },
  { id: 16, sport: 'כדורסל',   emoji: '🏀', question: 'כמה שחקנים מכל קבוצה במגרש בכדורסל?',      answers: ['4', '5', '6', '7'],               correctIndex: 1 },
  { id: 17, sport: 'כדורגל',   emoji: '⚽', question: 'מה עושים עם כרטיס צהוב שני?',                answers: ['ממשיכים', 'פנדל', 'כרטיס אדום', 'החלפה'], correctIndex: 2 },
  { id: 18, sport: 'שחייה',    emoji: '🏊', question: 'כמה מטר בריכה סטנדרטית בתחרות?',            answers: ['25', '50', '100', '75'],          correctIndex: 1 },
];

export const QUESTIONS_PER_GAME = 10;
export const SPORTS_TOPICS = ['הכל', 'כדורגל', 'כדורסל', 'שחייה'] as const;
