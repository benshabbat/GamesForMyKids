export type Level = { letter: string; correct: string; wrong: [string, string] };

export const LEVELS: Level[] = [
  { letter: 'א', correct: 'אַרְיֵה', wrong: ['כֶּלֶב', 'סֵפֶר'] },
  { letter: 'ב', correct: 'בַּיִת', wrong: ['יֶלֶד', 'מְכוֹנִית'] },
  { letter: 'ג', correct: 'גָּמָל', wrong: ['פִּיל', 'כֶּלֶב'] },
  { letter: 'ד', correct: 'דָּג', wrong: ['יָרֵחַ', 'שֶׁמֶשׁ'] },
  { letter: 'ה', correct: 'הַר', wrong: ['יָם', 'כֶּלֶב'] },
  { letter: 'ו', correct: 'וֶרֶד', wrong: ['כֶּלֶב', 'סֵפֶר'] },
  { letter: 'ז', correct: 'זְאֵב', wrong: ['אַרְנָב', 'חָתוּל'] },
  { letter: 'ח', correct: 'חָתוּל', wrong: ['כֶּלֶב', 'סֵפֶר'] },
  { letter: 'ט', correct: 'טָלֶה', wrong: ['פָּרָה', 'סֵפֶר'] },
  { letter: 'י', correct: 'יָרֵחַ', wrong: ['שֶׁמֶשׁ', 'כּוֹכָב'] },
  { letter: 'כ', correct: 'כֶּלֶב', wrong: ['חָתוּל', 'אַרְנָב'] },
  { letter: 'ל', correct: 'לֵב', wrong: ['יָדַיִם', 'כֶּלֶב'] },
  { letter: 'מ', correct: 'מְכוֹנִית', wrong: ['אוֹטוֹבּוּס', 'רַכֶּבֶת'] },
  { letter: 'נ', correct: 'נָחָשׁ', wrong: ['חָתוּל', 'כֶּלֶב'] },
  { letter: 'ס', correct: 'סוּס', wrong: ['חֲמוֹר', 'פָּרָה'] },
  { letter: 'ע', correct: 'עֵץ', wrong: ['פֶּרַח', 'שֶׁמֶשׁ'] },
  { letter: 'פ', correct: 'פִּיל', wrong: ['גָּמָל', 'אַרְנָב'] },
  { letter: 'צ', correct: 'צָב', wrong: ['נָחָשׁ', 'כֶּלֶב'] },
  { letter: 'ק', correct: 'קוֹף', wrong: ['פִּיל', 'כֶּלֶב'] },
  { letter: 'ר', correct: 'רַכֶּבֶת', wrong: ['מְכוֹנִית', 'אוֹטוֹבּוּס'] },
  { letter: 'ש', correct: 'שֶׁמֶשׁ', wrong: ['יָרֵחַ', 'כּוֹכָב'] },
  { letter: 'ת', correct: 'תַּפּוּחַ', wrong: ['סֵפֶר', 'כֶּלֶב'] },
];

export const LEVELS_PER_GAME = 8;
