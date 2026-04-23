// שפות העולם
export type LanguageQuestion = {
  id: number;
  country: string;
  flag: string;
  language: string;
  wrongOptions: [string, string, string];
};

export const LANGUAGE_QUESTIONS: LanguageQuestion[] = [
  { id: 1,  country: 'ישראל 🇮🇱',     flag: '🇮🇱', language: 'עברית',     wrongOptions: ['ערבית', 'יידיש', 'ספרדית'] },
  { id: 2,  country: 'צרפת 🇫🇷',       flag: '🇫🇷', language: 'צרפתית',    wrongOptions: ['ספרדית', 'איטלקית', 'פורטוגזית'] },
  { id: 3,  country: 'גרמניה 🇩🇪',     flag: '🇩🇪', language: 'גרמנית',    wrongOptions: ['הולנדית', 'שוודית', 'דנית'] },
  { id: 4,  country: 'יפן 🇯🇵',        flag: '🇯🇵', language: 'יפנית',     wrongOptions: ['סינית', 'קוריאנית', 'תאית'] },
  { id: 5,  country: 'ברזיל 🇧🇷',      flag: '🇧🇷', language: 'פורטוגזית', wrongOptions: ['ספרדית', 'צרפתית', 'איטלקית'] },
  { id: 6,  country: 'סין 🇨🇳',        flag: '🇨🇳', language: 'סינית',     wrongOptions: ['יפנית', 'קוריאנית', 'מנדרינית מנגולית'] },
  { id: 7,  country: 'ספרד 🇪🇸',        flag: '🇪🇸', language: 'ספרדית',    wrongOptions: ['פורטוגזית', 'קטלנית', 'צרפתית'] },
  { id: 8,  country: 'רוסיה 🇷🇺',      flag: '🇷🇺', language: 'רוסית',     wrongOptions: ['אוקראינית', 'פולנית', 'צ\'כית'] },
  { id: 9,  country: 'איטליה 🇮🇹',     flag: '🇮🇹', language: 'איטלקית',   wrongOptions: ['צרפתית', 'ספרדית', 'לטינית'] },
  { id: 10, country: 'ערב הסעודית 🇸🇦', flag: '🇸🇦', language: 'ערבית',     wrongOptions: ['עברית', 'פרסית', 'טורקית'] },
  { id: 11, country: 'ברית המועצות — עם כוכב', flag: '🇬🇷', language: 'יוונית', wrongOptions: ['לטינית', 'איטלקית', 'ספרדית'] },
  { id: 12, country: 'יוון 🇬🇷',       flag: '🇬🇷', language: 'יוונית',    wrongOptions: ['לטינית', 'איטלקית', 'ספרדית'] },
  { id: 13, country: 'הולנד 🇳🇱',      flag: '🇳🇱', language: 'הולנדית',   wrongOptions: ['גרמנית', 'דנית', 'שוודית'] },
  { id: 14, country: 'שוודיה 🇸🇪',     flag: '🇸🇪', language: 'שוודית',    wrongOptions: ['נורווגית', 'דנית', 'פינית'] },
  { id: 15, country: 'פורטוגל 🇵🇹',    flag: '🇵🇹', language: 'פורטוגזית', wrongOptions: ['ספרדית', 'צרפתית', 'איטלקית'] },
  { id: 16, country: 'הודו 🇮🇳',       flag: '🇮🇳', language: 'הינדי',     wrongOptions: ['אורדו', 'בנגלי', 'תאמיל'] },
  { id: 17, country: 'טורקיה 🇹🇷',     flag: '🇹🇷', language: 'טורקית',    wrongOptions: ['ערבית', 'פרסית', 'אזרבייג\'נית'] },
  { id: 18, country: 'פולין 🇵🇱',      flag: '🇵🇱', language: 'פולנית',    wrongOptions: ['רוסית', 'צ\'כית', 'אוקראינית'] },
  { id: 19, country: 'מקסיקו 🇲🇽',     flag: '🇲🇽', language: 'ספרדית',    wrongOptions: ['פורטוגזית', 'צרפתית', 'אנגלית'] },
  { id: 20, country: 'קוריאה הדרומית 🇰🇷', flag: '🇰🇷', language: 'קוריאנית', wrongOptions: ['יפנית', 'סינית', 'וייטנאמית'] },
];

export const QUESTIONS_PER_GAME = 10;
