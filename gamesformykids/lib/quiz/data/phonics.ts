export type PhonicsQuestion = {
  id: number;
  letter: string;
  sound: string;
  wrongOptions: [string, string, string];
  emoji: string;
};

export const PHONICS_QUESTIONS: PhonicsQuestion[] = [
  { id: 1,  letter: "א", sound: "אאאא",  wrongOptions: ["ע", "ה", "ח"], emoji: "🦁" },
  { id: 2,  letter: "ב", sound: "בבבב",  wrongOptions: ["פ", "כ", "מ"], emoji: "🏠" },
  { id: 3,  letter: "ג", sound: "גגגג",  wrongOptions: ["ד", "ז", "צ"], emoji: "🐪" },
  { id: 4,  letter: "ד", sound: "דדדד",  wrongOptions: ["ר", "ג", "ט"], emoji: "🐟" },
  { id: 5,  letter: "ה", sound: "ההההה", wrongOptions: ["א", "ע", "ח"], emoji: "🦛" },
  { id: 6,  letter: "ו", sound: "וווווו", wrongOptions: ["ב", "נ", "י"], emoji: "🪝" },
  { id: 7,  letter: "ז", sound: "זזזזזז", wrongOptions: ["ג", "ד", "ס"], emoji: "🦟" },
  { id: 8,  letter: "ח", sound: "חחחח",  wrongOptions: ["כ", "ה", "א"], emoji: "🐛" },
  { id: 9,  letter: "ט", sound: "טטטט",  wrongOptions: ["ת", "ד", "פ"], emoji: "🪕" },
  { id: 10, letter: "י", sound: "ייייי",  wrongOptions: ["ו", "נ", "ל"], emoji: "🤚" },
  { id: 11, letter: "כ", sound: "כככככ",  wrongOptions: ["ח", "ק", "ג"], emoji: "🪬" },
  { id: 12, letter: "ל", sound: "ללללל",  wrongOptions: ["נ", "י", "ו"], emoji: "🦁" },
  { id: 13, letter: "מ", sound: "מממממ",  wrongOptions: ["ב", "נ", "ו"], emoji: "🦩" },
  { id: 14, letter: "נ", sound: "נננננ",  wrongOptions: ["מ", "ל", "ו"], emoji: "🕯️" },
  { id: 15, letter: "ס", sound: "סססססס", wrongOptions: ["ז", "ש", "צ"], emoji: "🐎" },
  { id: 16, letter: "ע", sound: "עעעע",  wrongOptions: ["א", "ה", "ח"], emoji: "🌿" },
  { id: 17, letter: "פ", sound: "פפפפפ",  wrongOptions: ["ב", "כ", "מ"], emoji: "🦋" },
  { id: 18, letter: "צ", sound: "צצצצצ",  wrongOptions: ["ס", "ז", "ש"], emoji: "🌵" },
  { id: 19, letter: "ק", sound: "קקקקקק", wrongOptions: ["כ", "ג", "ח"], emoji: "🐒" },
  { id: 20, letter: "ר", sound: "ררררר",  wrongOptions: ["ד", "ל", "נ"], emoji: "🦕" },
  { id: 21, letter: "ש", sound: "שששששש", wrongOptions: ["ס", "ז", "צ"], emoji: "🦷" },
  { id: 22, letter: "ת", sound: "תתתתת",  wrongOptions: ["ט", "ד", "פ"], emoji: "🐊" },
];
