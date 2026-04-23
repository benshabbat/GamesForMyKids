// בירות העולם
export type CapitalQuestion = {
  id: number;
  country: string;
  flag: string;
  capital: string;
  wrongOptions: [string, string, string];
};

export const CAPITAL_QUESTIONS: CapitalQuestion[] = [
  { id: 1,  country: 'צרפת',       flag: '🇫🇷', capital: 'פריז',          wrongOptions: ['לונדון', 'ברלין', 'רומא'] },
  { id: 2,  country: 'גרמניה',     flag: '🇩🇪', capital: 'ברלין',         wrongOptions: ['המבורג', 'מינכן', 'פרנקפורט'] },
  { id: 3,  country: 'יפן',        flag: '🇯🇵', capital: 'טוקיו',         wrongOptions: ['אוסקה', 'קיוטו', 'הירושימה'] },
  { id: 4,  country: 'ארצות הברית', flag: '🇺🇸', capital: 'וושינגטון DC',  wrongOptions: ['ניו יורק', 'לוס אנג\'לס', 'שיקגו'] },
  { id: 5,  country: 'איטליה',     flag: '🇮🇹', capital: 'רומא',          wrongOptions: ['מילאנו', 'נפולי', 'פלורנציה'] },
  { id: 6,  country: 'ספרד',       flag: '🇪🇸', capital: 'מדריד',         wrongOptions: ['ברצלונה', 'סביליה', 'ולנסיה'] },
  { id: 7,  country: 'אוסטרליה',   flag: '🇦🇺', capital: 'קנברה',         wrongOptions: ['סידני', 'מלבורן', 'בריסביין'] },
  { id: 8,  country: 'קנדה',       flag: '🇨🇦', capital: 'אוטווה',        wrongOptions: ['טורונטו', 'מונטריאול', 'ונקובר'] },
  { id: 9,  country: 'ברזיל',      flag: '🇧🇷', capital: 'ברזיליה',       wrongOptions: ['ריו דה ז\'נרו', 'סאו פאולו', 'מנאוס'] },
  { id: 10, country: 'סין',        flag: '🇨🇳', capital: 'בייג\'ינג',     wrongOptions: ['שנגחאי', 'גואנגג\'ו', 'שנזן'] },
  { id: 11, country: 'רוסיה',      flag: '🇷🇺', capital: 'מוסקבה',        wrongOptions: ['סנט פטרסבורג', 'נובוסיבירסק', 'קזאן'] },
  { id: 12, country: 'הודו',       flag: '🇮🇳', capital: 'ניו דלהי',      wrongOptions: ['מומבאי', 'בנגלור', 'קולקטה'] },
  { id: 13, country: 'מקסיקו',     flag: '🇲🇽', capital: 'מקסיקו סיטי',  wrongOptions: ['גדלחרה', 'מונטריי', 'קנקון'] },
  { id: 14, country: 'ארגנטינה',   flag: '🇦🇷', capital: 'בואנוס איירס',  wrongOptions: ['קורדובה', 'רוסאריו', 'מנדוסה'] },
  { id: 15, country: 'מצרים',      flag: '🇪🇬', capital: 'קהיר',          wrongOptions: ['אלכסנדריה', 'לוקסור', 'אסואן'] },
  { id: 16, country: 'דרום אפריקה', flag: '🇿🇦', capital: 'פרטוריה',      wrongOptions: ['יוהנסבורג', 'קייפ טאון', 'דרבן'] },
  { id: 17, country: 'טורקיה',     flag: '🇹🇷', capital: 'אנקרה',         wrongOptions: ['איסטנבול', 'איזמיר', 'בורסה'] },
  { id: 18, country: 'פולין',      flag: '🇵🇱', capital: 'ורשה',          wrongOptions: ['קרקוב', 'גדנסק', 'פוזנן'] },
  { id: 19, country: 'הולנד',      flag: '🇳🇱', capital: 'אמסטרדם',       wrongOptions: ['רוטרדם', 'האג', 'אוטרכט'] },
  { id: 20, country: 'שבדיה',      flag: '🇸🇪', capital: 'שטוקהולם',      wrongOptions: ['גטבורג', 'מלמו', 'אופסאלה'] },
];

export const QUESTIONS_PER_GAME = 10;
