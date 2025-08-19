export interface HebrewLetter {
  letter: string;
  name: string;
  pronunciation: string;
  examples: string[];
  finalForm?: string;
  description: string;
  order: number;
}

export const hebrewLetters: HebrewLetter[] = [
  {
    letter: 'א',
    name: 'alef',
    pronunciation: 'אלף',
    examples: ['אבא', 'אמא', 'אריה', 'אוטובוס'],
    description: 'האות הראשונה באלפבית העברי. האות א היא אות שקטה.',
    order: 1
  },
  {
    letter: 'ב',
    name: 'bet',
    pronunciation: 'בית',
    examples: ['בית', 'בננה', 'ברווז', 'בובה'],
    description: 'האות השנייה באלפבית. יכולה להיות עם או בלי דגש.',
    order: 2
  },
  {
    letter: 'ג',
    name: 'gimel',
    pronunciation: 'גימל',
    examples: ['גמל', 'גיטרה', 'גלידה', 'גן'],
    description: 'האות השלישית באלפבית. נשמעת כמו G באנגלית.',
    order: 3
  },
  {
    letter: 'ד',
    name: 'dalet',
    pronunciation: 'דלת',
    examples: ['דלת', 'דג', 'דובי', 'דבש'],
    description: 'האות הרביעית באלפבית. נשמעת כמו D באנגלית.',
    order: 4
  },
  {
    letter: 'ה',
    name: 'he',
    pronunciation: 'הא',
    examples: ['הר', 'היפופוטם', 'המבורגר', 'הגה'],
    description: 'האות החמישית באלפבית. נשמעת כמו H באנגלית.',
    order: 5
  },
  {
    letter: 'ו',
    name: 'vav',
    pronunciation: 'וו',
    examples: ['ורד', 'וילון', 'ויטמין', 'ושב'],
    description: 'האות השישית באלפבית. יכולה להיות עיצור או תנועה.',
    order: 6
  },
  {
    letter: 'ז',
    name: 'zayin',
    pronunciation: 'זין',
    examples: ['זברה', 'זית', 'זהב', 'זכוכית'],
    description: 'האות השביעית באלפבית. נשמעת כמו Z באנגלית.',
    order: 7
  },
  {
    letter: 'ח',
    name: 'het',
    pronunciation: 'חית',
    examples: ['חתול', 'חלב', 'חם', 'חלון'],
    description: 'האות השמינית באלפבית. צליל גרוני ייחודי לעברית.',
    order: 8
  },
  {
    letter: 'ט',
    name: 'tet',
    pronunciation: 'טית',
    examples: ['טלפון', 'טבעת', 'טיגריס', 'טוב'],
    description: 'האות התשיעית באלפבית. נשמעת כמו T באנגלית.',
    order: 9
  },
  {
    letter: 'י',
    name: 'yud',
    pronunciation: 'יוד',
    examples: ['יד', 'ילד', 'יער', 'יפה'],
    description: 'האות העשירית באלפבית. האות הקטנה ביותר.',
    order: 10
  },
  {
    letter: 'כ',
    name: 'kaf',
    pronunciation: 'כף',
    examples: ['כלב', 'כוכב', 'כסא', 'כדור'],
    finalForm: 'ך',
    description: 'האות האחת עשרה באלפבית. יש לה צורה סופית.',
    order: 11
  },
  {
    letter: 'ל',
    name: 'lamed',
    pronunciation: 'למד',
    examples: ['לב', 'לחם', 'ליצן', 'לבנה'],
    description: 'האות השתיים עשרה באלפבית. האות הגבוהה ביותר.',
    order: 12
  },
  {
    letter: 'מ',
    name: 'mem',
    pronunciation: 'מם',
    examples: ['מים', 'מכונית', 'מוזיקה', 'מתנה'],
    finalForm: 'ם',
    description: 'האות השלוש עשרה באלפבית. יש לה צורה סופית.',
    order: 13
  },
  {
    letter: 'נ',
    name: 'nun',
    pronunciation: 'נון',
    examples: ['נחש', 'נר', 'נעל', 'נהר'],
    finalForm: 'ן',
    description: 'האות הארבע עשרה באלפבית. יש לה צורה סופית.',
    order: 14
  },
  {
    letter: 'ס',
    name: 'samech',
    pronunciation: 'סמך',
    examples: ['סוס', 'ספר', 'סלט', 'סבא'],
    description: 'האות החמש עשרה באלפבית. צורה עגולה וסגורה.',
    order: 15
  },
  {
    letter: 'ע',
    name: 'ayin',
    pronunciation: 'עין',
    examples: ['עין', 'עץ', 'עכבר', 'עוגה'],
    description: 'האות השש עשרה באלפבית. צליל גרוני ייחודי.',
    order: 16
  },
  {
    letter: 'פ',
    name: 'pe',
    pronunciation: 'פא',
    examples: ['פיל', 'פרח', 'פיצה', 'פנס'],
    finalForm: 'ף',
    description: 'האות השבע עשרה באלפבית. יש לה צורה סופית.',
    order: 17
  },
  {
    letter: 'צ',
    name: 'tsadi',
    pronunciation: 'צדיק',
    examples: ['צב', 'צבע', 'צחוק', 'ציפור'],
    finalForm: 'ץ',
    description: 'האות השמונה עשרה באלפבית. יש לה צורה סופית.',
    order: 18
  },
  {
    letter: 'ק',
    name: 'quf',
    pronunciation: 'קוף',
    examples: ['קוף', 'קפה', 'קיץ', 'קשת'],
    description: 'האות התשע עשרה באלפבית. נשמעת כמו K באנגלית.',
    order: 19
  },
  {
    letter: 'ר',
    name: 'resh',
    pronunciation: 'ריש',
    examples: ['רכבת', 'רגל', 'רוח', 'רחוב'],
    description: 'האות העשרים באלפבית. נשמעת כמו R באנגלית.',
    order: 20
  },
  {
    letter: 'ש',
    name: 'shin',
    pronunciation: 'שין',
    examples: ['שמש', 'שולחן', 'שמלה', 'שיר'],
    description: 'האות העשרים ואחת באלפבית. נשמעת כמו Sh באנגלית.',
    order: 21
  },
  {
    letter: 'ת',
    name: 'tav',
    pronunciation: 'תו',
    examples: ['תפוח', 'תנין', 'תיק', 'תמונה'],
    description: 'האות האחרונה באלפבית העברי. נשמעת כמו T באנגלית.',
    order: 22
  }
];
