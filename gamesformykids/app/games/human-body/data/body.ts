// גוף האדם
export type BodyQuestion = {
  id: number;
  part: string;
  emoji: string;
  category: 'ראש' | 'גוף' | 'גפיים' | 'איברים פנימיים';
  function: string;
  wrongOptions: [string, string, string];
};

export const BODY_QUESTIONS: BodyQuestion[] = [
  { id: 1,  part: 'לב',       emoji: '❤️', category: 'איברים פנימיים', function: 'משאב דם בכל הגוף',                    wrongOptions: ['ריאות', 'כליות', 'קיבה'] },
  { id: 2,  part: 'ריאות',    emoji: '🫁', category: 'איברים פנימיים', function: 'אחראיות על הנשימה',                   wrongOptions: ['לב', 'כבד', 'מוח'] },
  { id: 3,  part: 'מוח',      emoji: '🧠', category: 'ראש',            function: 'מרכז השליטה של הגוף',                 wrongOptions: ['לב', 'ריאות', 'קיבה'] },
  { id: 4,  part: 'קיבה',     emoji: '🫃', category: 'איברים פנימיים', function: 'מעכלת את האוכל שאכלנו',              wrongOptions: ['לב', 'כליות', 'ריאות'] },
  { id: 5,  part: 'עיניים',   emoji: '👁️', category: 'ראש',            function: 'קולטות אור ומאפשרות ראייה',           wrongOptions: ['אוזניים', 'אף', 'פה'] },
  { id: 6,  part: 'אוזניים',  emoji: '👂', category: 'ראש',            function: 'קולטות קולות ומאפשרות שמיעה',         wrongOptions: ['עיניים', 'אף', 'לשון'] },
  { id: 7,  part: 'אף',       emoji: '👃', category: 'ראש',            function: 'מריח ומסנן אוויר',                    wrongOptions: ['אוזן', 'עין', 'פה'] },
  { id: 8,  part: 'ידיים',    emoji: '🙌', category: 'גפיים',          function: 'אוחזות, מרגישות ועושות פעולות',       wrongOptions: ['רגליים', 'כתפיים', 'אצבעות'] },
  { id: 9,  part: 'רגליים',   emoji: '🦵', category: 'גפיים',          function: 'תומכות בגוף ומאפשרות הליכה',          wrongOptions: ['ידיים', 'גב', 'ירכיים'] },
  { id: 10, part: 'עצמות',    emoji: '🦴', category: 'גוף',            function: 'מסגרת הגוף ותמיכה באיברים',           wrongOptions: ['שרירים', 'עור', 'דם'] },
  { id: 11, part: 'שרירים',   emoji: '💪', category: 'גוף',            function: 'מאפשרים תנועה ומחזיקים את הגוף',      wrongOptions: ['עצמות', 'עור', 'כלי דם'] },
  { id: 12, part: 'עור',      emoji: '🫲', category: 'גוף',            function: 'מכסה ומגן על הגוף מבחוץ',             wrongOptions: ['שרירים', 'עצמות', 'כבד'] },
  { id: 13, part: 'כבד',      emoji: '🫀', category: 'איברים פנימיים', function: 'מסנן דם ומייצר נוזל עיכול',           wrongOptions: ['קיבה', 'כליות', 'ריאות'] },
  { id: 14, part: 'כליות',    emoji: '🫘', category: 'איברים פנימיים', function: 'מסננות נוזלים ומייצרות שתן',          wrongOptions: ['ריאות', 'כבד', 'לב'] },
  { id: 15, part: 'לשון',     emoji: '👅', category: 'ראש',            function: 'מסייעת בדיבור ומרגישה טעמים',         wrongOptions: ['אף', 'שיניים', 'שפתיים'] },
  { id: 16, part: 'שיניים',   emoji: '🦷', category: 'ראש',            function: 'לועסות אוכל ועוזרות בדיבור',          wrongOptions: ['לשון', 'שפתיים', 'חניכיים'] },
  { id: 17, part: 'אצבעות',   emoji: '🖐️', category: 'גפיים',          function: 'מאפשרות אחיזה עדינה ומגע',            wrongOptions: ['כפות ידיים', 'פרקים', 'ציפורניים'] },
  { id: 18, part: 'לב',       emoji: '❤️', category: 'איברים פנימיים', function: 'פועם בממוצע 100,000 פעמים ביום',       wrongOptions: ['ריאות', 'מוח', 'קיבה'] },
];

export const QUESTIONS_PER_GAME = 10;
export const BODY_CATEGORIES = ['הכל', 'ראש', 'גוף', 'גפיים', 'איברים פנימיים'] as const;
export type BodyCategory = typeof BODY_CATEGORIES[number];
