export type SingularPluralQuestion = {
  id: number;
  singular: string;
  plural: string;
  emoji: string;
  wrongOptions: [string, string, string];
};

export const SINGULAR_PLURAL_QUESTIONS: SingularPluralQuestion[] = [
  { id: 1,  singular: "כלב",    plural: "כלבים",   emoji: "🐕", wrongOptions: ["כלבות", "כלבן", "כלביים"] },
  { id: 2,  singular: "ילד",    plural: "ילדים",   emoji: "👦", wrongOptions: ["ילדות", "ילדן", "ילדיים"] },
  { id: 3,  singular: "ספר",    plural: "ספרים",   emoji: "📚", wrongOptions: ["ספרות", "ספרן", "ספריים"] },
  { id: 4,  singular: "עץ",     plural: "עצים",    emoji: "🌳", wrongOptions: ["עצות", "עציות", "עצן"] },
  { id: 5,  singular: "בית",    plural: "בתים",    emoji: "🏠", wrongOptions: ["ביתות", "בתות", "ביתיים"] },
  { id: 6,  singular: "ילדה",   plural: "ילדות",   emoji: "👧", wrongOptions: ["ילדים", "ילדיות", "ילדן"] },
  { id: 7,  singular: "שמלה",   plural: "שמלות",   emoji: "👗", wrongOptions: ["שמלים", "שמליות", "שמלן"] },
  { id: 8,  singular: "עוגה",   plural: "עוגות",   emoji: "🎂", wrongOptions: ["עוגים", "עוגיות", "עוגן"] },
  { id: 9,  singular: "אישה",   plural: "נשים",    emoji: "👩", wrongOptions: ["אישות", "אישים", "נשות"] },
  { id: 10, singular: "איש",    plural: "אנשים",   emoji: "👨", wrongOptions: ["אישים", "אנשות", "אישן"] },
  { id: 11, singular: "כוכב",   plural: "כוכבים",  emoji: "⭐", wrongOptions: ["כוכבות", "כוכבן", "כוכביים"] },
  { id: 12, singular: "ציפור",  plural: "ציפורים", emoji: "🐦", wrongOptions: ["ציפורות", "ציפורן", "ציפוריים"] },
  { id: 13, singular: "תפוח",   plural: "תפוחים",  emoji: "🍎", wrongOptions: ["תפוחות", "תפוחן", "תפוחיים"] },
  { id: 14, singular: "ענן",    plural: "עננים",   emoji: "☁️", wrongOptions: ["עננות", "ענניות", "עננן"] },
  { id: 15, singular: "יד",     plural: "ידיים",   emoji: "🖐️", wrongOptions: ["ידות", "ידים", "ידיות"] },
  { id: 16, singular: "רגל",    plural: "רגליים",  emoji: "🦵", wrongOptions: ["רגלים", "רגלות", "רגלן"] },
  { id: 17, singular: "שולחן",  plural: "שולחנות", emoji: "🍽️", wrongOptions: ["שולחנים", "שולחניות", "שולחנן"] },
  { id: 18, singular: "מכונית", plural: "מכוניות", emoji: "🚗", wrongOptions: ["מכוניתים", "מכוניתות", "מכוניתן"] },
  { id: 19, singular: "שיר",    plural: "שירים",   emoji: "🎵", wrongOptions: ["שירות", "שיריות", "שירן"] },
  { id: 20, singular: "דלת",    plural: "דלתות",   emoji: "🚪", wrongOptions: ["דלתים", "דלתיות", "דלתן"] },
];
