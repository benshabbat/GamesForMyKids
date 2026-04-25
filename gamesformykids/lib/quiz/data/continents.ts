// יבשות העולם
export type ContinentQuestion = {
  id: number;
  question: string;
  answers: [string, string, string, string];
  correctIndex: number;
  emoji: string;
  continent?: string;
  funFact: string;
};

export const CONTINENTS = [
  { name: 'אסיה',       emoji: '🌏', color: '#f59e0b', area: '44 מיליון קמ"ר', population: '4.7 מיליארד', countries: 48, example: 'סין, הודו, יפן, ישראל' },
  { name: 'אפריקה',     emoji: '🌍', color: '#10b981', area: '30 מיליון קמ"ר', population: '1.4 מיליארד', countries: 54, example: 'מצרים, ניגריה, דרום אפריקה' },
  { name: 'אמריקה הצפונית', emoji: '🌎', color: '#3b82f6', area: '24 מיליון קמ"ר', population: '580 מיליון', countries: 23, example: 'ארה"ב, קנדה, מקסיקו' },
  { name: 'אמריקה הדרומית', emoji: '🌎', color: '#8b5cf6', area: '18 מיליון קמ"ר', population: '430 מיליון', countries: 12, example: 'ברזיל, ארגנטינה, פרו' },
  { name: 'אנטרקטיקה',  emoji: '🧊', color: '#06b6d4', area: '14 מיליון קמ"ר', population: '0', countries: 0, example: 'אין מדינות — רק תחנות מחקר' },
  { name: 'אירופה',     emoji: '🗺️', color: '#ef4444', area: '10 מיליון קמ"ר', population: '750 מיליון', countries: 44, example: 'צרפת, גרמניה, איטליה, ספרד' },
  { name: 'אוסטרליה (אוקיאניה)', emoji: '🦘', color: '#f97316', area: '8 מיליון קמ"ר', population: '42 מיליון', countries: 14, example: 'אוסטרליה, ניו זילנד, פפואה' },
];

export const CONTINENT_QUESTIONS: ContinentQuestion[] = [
  { id: 1,  emoji: '🌍', continent: 'אפריקה', question: 'מה היבשת הגדולה ביותר בעולם?',                              answers: ['אפריקה', 'אסיה', 'אמריקה', 'אירופה'],           correctIndex: 1, funFact: 'אסיה מהווה כ-30% מיבשת כדור הארץ!' },
  { id: 2,  emoji: '🧊', continent: 'אנטרקטיקה', question: 'מה היבשת הקרה ביותר בעולם?',                           answers: ['ארקטיקה', 'אנטרקטיקה', 'קנדה', 'רוסיה'],        correctIndex: 1, funFact: 'אנטרקטיקה מכילה 70% ממי המתוקים של כדור הארץ!' },
  { id: 3,  emoji: '🦘', continent: 'אוסטרליה', question: 'באיזו יבשת חי הקנגורו?',                                 answers: ['אסיה', 'אפריקה', 'אמריקה', 'אוסטרליה'],         correctIndex: 3, funFact: 'אוסטרליה היא המדינה היחידה שתופסת יבשת שלמה!' },
  { id: 4,  emoji: '🌏', continent: 'אסיה', question: 'באיזו יבשת נמצאת ישראל?',                                    answers: ['אפריקה', 'אירופה', 'אסיה', 'אמריקה'],            correctIndex: 2, funFact: 'אסיה היא היבשת המאוכלסת ביותר בעולם!' },
  { id: 5,  emoji: '🗺️', continent: 'אירופה', question: 'באיזו יבשת נמצאת צרפת?',                                  answers: ['אסיה', 'אמריקה', 'אפריקה', 'אירופה'],            correctIndex: 3, funFact: 'אירופה היא היבשת השנייה הקטנה בשטח!' },
  { id: 6,  emoji: '🌎', continent: 'אמריקה', question: 'באיזו יבשת נמצאת ברזיל?',                                  answers: ['אפריקה', 'אסיה', 'אמריקה הדרומית', 'אירופה'],   correctIndex: 2, funFact: 'ברזיל היא המדינה הגדולה ביותר באמריקה הדרומית!' },
  { id: 7,  emoji: '🌋', continent: 'אסיה', question: 'באיזו יבשת נמצא הר האוורסט הגבוה בעולם?',                    answers: ['אפריקה', 'אסיה', 'אמריקה', 'אירופה'],            correctIndex: 1, funFact: 'אוורסט גבוה 8,849 מטרים — הגבוה בעולם!' },
  { id: 8,  emoji: '🦁', continent: 'אפריקה', question: 'באיזו יבשת חי האריה בטבע?',                                answers: ['אסיה', 'אמריקה', 'אפריקה', 'אוסטרליה'],         correctIndex: 2, funFact: 'אפריקה היא היבשת עם המגוון הביולוגי הגדול ביותר!' },
  { id: 9,  emoji: '🌊', continent: 'אוסטרליה', question: 'מה המחסום הגדול ביותר בעולם הנמצא ליד אוסטרליה?',       answers: ['מחסום האלמוגים', 'מחסום הקרח', 'מחסום הצוקים', 'מחסום הנהרות'], correctIndex: 0, funFact: 'שונית האלמוגים הגדולה (GBR) היא המבנה הביולוגי הגדול בעולם!' },
  { id: 10, emoji: '🗼', continent: 'אירופה', question: 'באיזו יבשת נמצא מגדל אייפל?',                               answers: ['אסיה', 'אפריקה', 'אירופה', 'אמריקה'],            correctIndex: 2, funFact: 'מגדל אייפל נבנה ב-1889 כשעתומד רק 20 שנה!' },
  { id: 11, emoji: '🐊', continent: 'אמריקה', question: 'באיזו יבשת נמצא יער הגשם האמזוני?',                        answers: ['אפריקה', 'אסיה', 'אמריקה הדרומית', 'אמריקה הצפונית'], correctIndex: 2, funFact: 'יער הגשם האמזוני מייצר 20% מחמצן כדור הארץ!' },
  { id: 12, emoji: '🌐', continent: 'הכל', question: 'כמה יבשות יש בכדור הארץ?',                                    answers: ['5', '6', '7', '8'],                               correctIndex: 2, funFact: '7 יבשות: אסיה, אפריקה, אמריקה צפונית ודרומית, אנטרקטיקה, אירופה, אוסטרליה!' },
];

