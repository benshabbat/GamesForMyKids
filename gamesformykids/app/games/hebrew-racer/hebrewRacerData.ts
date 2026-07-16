export type RacerQuestion = {
  id: number;
  question: string;
  answer: string;
  wrongOptions: [string, string, string];
  emoji: string;
};

export const RACER_QUESTIONS: RacerQuestion[] = [
  { id: 1,  question: 'כַּמָּה זֶה 2 + 3?',                   answer: 'חמש',    wrongOptions: ['שלוש',  'שבע',    'שש'],       emoji: '🔢' },
  { id: 2,  question: 'כַּמָּה זֶה 4 + 2?',                   answer: 'שש',     wrongOptions: ['חמש',   'שמונה',  'שבע'],      emoji: '🔢' },
  { id: 3,  question: 'כַּמָּה זֶה 7 - 3?',                   answer: 'ארבע',   wrongOptions: ['שלוש',  'חמש',    'שתיים'],    emoji: '🔢' },
  { id: 4,  question: 'מָה הַצֶּבַע שֶׁל הַשָּׁמַיִם?',               answer: 'כחול',   wrongOptions: ['ירוק',  'אדום',   'צהוב'],     emoji: '☁️' },
  { id: 5,  question: 'מָה הַצֶּבַע שֶׁל עֵשֶׂב?',                 answer: 'ירוק',   wrongOptions: ['כחול',  'אדום',   'לבן'],      emoji: '🌿' },
  { id: 6,  question: 'אֵיזֶה בַּעַל חַיִּים נוֹבֵחַ?',             answer: 'כלב',    wrongOptions: ['חתול',  'פרה',    'חמור'],     emoji: '🐕' },
  { id: 7,  question: 'מָה הַצֶּבַע שֶׁל בָּנָנָה?',                answer: 'צהוב',   wrongOptions: ['אדום',  'ירוק',   'כחול'],     emoji: '🍌' },
  { id: 8,  question: 'הָאוֹת הָרִאשׁוֹנָה בָּאָלֶף-בֵּית?',           answer: 'אָלֶף',  wrongOptions: ['בֵּית', 'גִּימֶל','דָּלֶת'],  emoji: '🔤' },
  { id: 9,  question: 'הָאוֹת הָאַחֲרוֹנָה בָּאָלֶף-בֵּית?',           answer: 'תָּו',   wrongOptions: ['שִׁין', 'רֵישׁ',  'קוֹף'],    emoji: '🔤' },
  { id: 10, question: 'כַּמָּה אֶצְבָּעוֹת יֵשׁ בְּיָד?',              answer: 'חמש',    wrongOptions: ['ארבע',  'שש',     'שלוש'],     emoji: '✋' },
  { id: 11, question: 'כַּמָּה יָמִים יֵשׁ בְּשָׁבוּעַ?',              answer: 'שבעה',   wrongOptions: ['חמישה', 'עשרה',   'שישה'],     emoji: '📅' },
  { id: 12, question: 'מָה הַצֶּבַע שֶׁל תַּפּוּחַ אָדֹם?',           answer: 'אדום',   wrongOptions: ['צהוב',  'ירוק',   'כחול'],     emoji: '🍎' },
  { id: 13, question: 'אֵיזֶה בַּעַל חַיִּים יֵשׁ לוֹ חֲטוֹטֶרֶת?',    answer: 'גמל',    wrongOptions: ['סוס',   'כלב',    'פיל'],      emoji: '🐪' },
  { id: 14, question: 'כַּמָּה זֶה 3 × 2?',                   answer: 'שש',     wrongOptions: ['חמש',   'שבע',    'ארבע'],     emoji: '✖️' },
  { id: 15, question: 'מָה עוֹשִׂים עִם עִפָּרוֹן?',             answer: 'כותבים', wrongOptions: ['אוכלים','שותים',  'ישנים'],    emoji: '✏️' },
  { id: 16, question: 'מָה הַצֶּבַע שֶׁל עַגְבָנִיָּה?',             answer: 'אדום',   wrongOptions: ['צהוב',  'ירוק',   'לבן'],      emoji: '🍅' },
  { id: 17, question: 'כַּמָּה זֶה 10 - 5?',                  answer: 'חמש',    wrongOptions: ['שלוש',  'שבע',    'עשר'],      emoji: '🔢' },
  { id: 18, question: 'מָה עוֹשָׂה צִפּוֹר?',                  answer: 'עפה',    wrongOptions: ['שוחה',  'רצה',    'ישנה'],     emoji: '🐦' },
  { id: 19, question: 'מֵאֵיזֶה בַּעַל חַיִּים מְקַבְּלִים חָלָב?',     answer: 'פרה',    wrongOptions: ['כלב',   'חתול',   'עוף'],      emoji: '🐄' },
  { id: 20, question: 'כַּמָּה זֶה 1 + 1?',                   answer: 'שתיים',  wrongOptions: ['שלוש',  'ארבע',   'אחת'],      emoji: '🔢' },
  { id: 21, question: 'מָה הָאוֹת שֶׁבָּאָה אַחֲרֵי א?',            answer: 'בֵּית',  wrongOptions: ['גִּימֶל','דָּלֶת','הֵא'],    emoji: '🔤' },
  { id: 22, question: 'כַּמָּה זֶה 5 + 5?',                   answer: 'עשר',    wrongOptions: ['שמונה', 'תשע',    'שתים עשרה'], emoji: '🔢' },
  { id: 23, question: 'כַּמָּה עֵינַיִם יֵשׁ לְאָדָם?',             answer: 'שתיים',  wrongOptions: ['אחת',   'שלוש',   'ארבע'],     emoji: '👁️' },
  { id: 24, question: 'אֵיזֶה בַּעַל חַיִּים מְיָאוֹ?',             answer: 'חתול',   wrongOptions: ['כלב',   'פרה',    'כבשה'],     emoji: '🐱' },
  { id: 25, question: 'מָה עוֹשִׂים עִם סֵפֶר?',                answer: 'קוראים', wrongOptions: ['אוכלים','שותים',  'שרים'],     emoji: '📚' },
  { id: 26, question: 'מָה הַצֶּבַע שֶׁל שֶׁמֶשׁ?',                 answer: 'צהוב',   wrongOptions: ['כחול',  'ירוק',   'לבן'],      emoji: '☀️' },
  { id: 27, question: 'כַּמָּה זֶה 8 - 4?',                   answer: 'ארבע',   wrongOptions: ['חמש',   'שלוש',   'שש'],       emoji: '🔢' },
  { id: 28, question: 'מָה עוֹשִׂים עִם מַגֶּבֶת?',               answer: 'מתנגבים',wrongOptions: ['אוכלים','שותים',  'ישנים'],    emoji: '🛁' },
  { id: 29, question: 'אֵיזֶה פְּרִי צָהֹב וְאָרֹךְ?',            answer: 'בננה',   wrongOptions: ['תפוח',  'ענב',    'תות'],      emoji: '🍌' },
  { id: 30, question: 'כַּמָּה זֶה 6 + 4?',                   answer: 'עשר',    wrongOptions: ['שמונה', 'תשע',    'אחת עשרה'], emoji: '🔢' },
];

export const TOTAL_CHECKPOINTS = 10;
