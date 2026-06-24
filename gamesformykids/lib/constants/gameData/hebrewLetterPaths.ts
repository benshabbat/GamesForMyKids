// Normalized waypoint coordinates: [x, y] where 0,0 = top-left, 100,100 = bottom-right
// Each letter may have 1-2 strokes (arrays of waypoints)
// The first point of the first stroke is the start point shown to the child

export interface HebrewLetterPath {
  char: string;
  name: string;         // e.g. 'אָלֶף'
  sound: string;        // e.g. 'alef'
  color: string;        // Tailwind background gradient
  strokes: Array<Array<[number, number]>>;
}

export const HEBREW_LETTER_PATHS: HebrewLetterPath[] = [
  {
    char: 'א', name: 'אָלֶף', sound: 'אָלֶף',
    color: 'from-red-400 to-red-600',
    strokes: [
      [[65, 15], [50, 50], [35, 85]],
      [[15, 32], [50, 50], [80, 68]],
    ],
  },
  {
    char: 'ב', name: 'בֵּית', sound: 'בֵּית',
    color: 'from-orange-400 to-orange-600',
    strokes: [
      [[70, 18], [28, 18], [28, 82], [70, 82]],
    ],
  },
  {
    char: 'ג', name: 'גִּימֶל', sound: 'גִּימֶל',
    color: 'from-yellow-400 to-yellow-600',
    strokes: [
      [[52, 12], [52, 78], [70, 92]],
    ],
  },
  {
    char: 'ד', name: 'דָּלֶת', sound: 'דָּלֶת',
    color: 'from-green-400 to-green-600',
    strokes: [
      [[28, 22], [70, 22], [70, 85]],
    ],
  },
  {
    char: 'ה', name: 'הֵא', sound: 'הֵא',
    color: 'from-teal-400 to-teal-600',
    strokes: [
      [[28, 22], [28, 55]],
      [[70, 22], [28, 22], [70, 22], [70, 85]],
    ],
  },
  {
    char: 'ו', name: 'וָאו', sound: 'וָאו',
    color: 'from-cyan-400 to-cyan-600',
    strokes: [
      [[50, 12], [50, 88]],
    ],
  },
  {
    char: 'ז', name: 'זַיִן', sound: 'זַיִן',
    color: 'from-blue-400 to-blue-600',
    strokes: [
      [[28, 16], [70, 16], [55, 88]],
    ],
  },
  {
    char: 'ח', name: 'חֵת', sound: 'חֵת',
    color: 'from-indigo-400 to-indigo-600',
    strokes: [
      [[22, 85], [22, 18], [78, 18], [78, 85]],
    ],
  },
  {
    char: 'ט', name: 'טֵת', sound: 'טֵת',
    color: 'from-violet-400 to-violet-600',
    strokes: [
      [[72, 22], [28, 22], [28, 80], [72, 80], [72, 32], [60, 20]],
    ],
  },
  {
    char: 'י', name: 'יוֹד', sound: 'יוֹד',
    color: 'from-purple-400 to-purple-600',
    strokes: [
      [[50, 20], [52, 42]],
    ],
  },
  {
    char: 'כ', name: 'כַּף', sound: 'כַּף',
    color: 'from-pink-400 to-pink-600',
    strokes: [
      [[70, 18], [28, 18], [28, 82]],
    ],
  },
  {
    char: 'ל', name: 'לָמֶד', sound: 'לָמֶד',
    color: 'from-rose-400 to-rose-600',
    strokes: [
      [[50, 82], [50, 28], [35, 10]],
    ],
  },
  {
    char: 'מ', name: 'מֵם', sound: 'מֵם',
    color: 'from-red-400 to-red-600',
    strokes: [
      [[68, 18], [32, 18], [32, 82], [68, 82], [68, 18]],
    ],
  },
  {
    char: 'נ', name: 'נוּן', sound: 'נוּן',
    color: 'from-orange-400 to-orange-600',
    strokes: [
      [[50, 18], [50, 72], [65, 85]],
    ],
  },
  {
    char: 'ס', name: 'סָמֶך', sound: 'סָמֶך',
    color: 'from-amber-400 to-amber-600',
    strokes: [
      [[65, 22], [35, 22], [20, 50], [35, 80], [65, 80], [80, 50], [65, 22]],
    ],
  },
  {
    char: 'ע', name: 'עַיִן', sound: 'עַיִן',
    color: 'from-lime-400 to-lime-600',
    strokes: [
      [[28, 22], [50, 78], [72, 22]],
    ],
  },
  {
    char: 'פ', name: 'פֵּא', sound: 'פֵּא',
    color: 'from-emerald-400 to-emerald-600',
    strokes: [
      [[65, 60], [72, 22], [28, 22], [28, 60], [52, 70]],
    ],
  },
  {
    char: 'צ', name: 'צַדִּי', sound: 'צַדִּי',
    color: 'from-sky-400 to-sky-600',
    strokes: [
      [[28, 22], [50, 58], [72, 22]],
      [[50, 58], [50, 82], [68, 92]],
    ],
  },
  {
    char: 'ק', name: 'קוֹף', sound: 'קוֹף',
    color: 'from-blue-400 to-blue-600',
    strokes: [
      [[28, 75], [28, 22], [70, 22], [70, 90]],
    ],
  },
  {
    char: 'ר', name: 'רֵישׁ', sound: 'רֵישׁ',
    color: 'from-violet-400 to-violet-600',
    strokes: [
      [[28, 22], [70, 22], [70, 85]],
    ],
  },
  {
    char: 'ש', name: 'שִׁין', sound: 'שִׁין',
    color: 'from-fuchsia-400 to-fuchsia-600',
    strokes: [
      [[25, 14], [50, 32], [50, 85]],
      [[50, 32], [75, 14]],
    ],
  },
  {
    char: 'ת', name: 'תָּו', sound: 'תָּו',
    color: 'from-pink-400 to-pink-600',
    strokes: [
      [[28, 85], [28, 22], [70, 22], [70, 85]],
      [[28, 85], [42, 92]],
    ],
  },
];
