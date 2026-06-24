export interface NikudOption {
  id: string;
  name: string;
  syllableWith: (consonant: string) => string;
}

export interface NikudQuestion {
  id: number;
  consonant: string;
  targetNikudId: string;
  syllable: string;
  ttsText: string;
}

export const NIKUD_OPTIONS: NikudOption[] = [
  { id: 'kamatz',  name: 'קָמַץ',  syllableWith: (c) => `${c}ָ` },
  { id: 'chirik',  name: 'חִירִיק', syllableWith: (c) => `${c}ִ` },
  { id: 'tsere',   name: 'צֵירֵי',  syllableWith: (c) => `${c}ֵ` },
  { id: 'segol',   name: 'סֶגּוֹל', syllableWith: (c) => `${c}ֶ` },
  { id: 'holam',   name: 'חוֹלָם',  syllableWith: (c) => `${c}וֹ` },
];

export const NIKUD_QUESTIONS: NikudQuestion[] = [
  { id: 1,  consonant: 'ב', targetNikudId: 'kamatz',  syllable: 'בָ', ttsText: 'בָּ'  },
  { id: 2,  consonant: 'מ', targetNikudId: 'chirik',  syllable: 'מִ', ttsText: 'מִ'   },
  { id: 3,  consonant: 'כ', targetNikudId: 'tsere',   syllable: 'כֵ', ttsText: 'כֵּ'  },
  { id: 4,  consonant: 'ד', targetNikudId: 'segol',   syllable: 'דֶ', ttsText: 'דֶּ'  },
  { id: 5,  consonant: 'ל', targetNikudId: 'holam',   syllable: 'לוֹ', ttsText: 'לוֹ' },
  { id: 6,  consonant: 'ש', targetNikudId: 'kamatz',  syllable: 'שָ', ttsText: 'שָׁ'  },
  { id: 7,  consonant: 'ת', targetNikudId: 'chirik',  syllable: 'תִ', ttsText: 'תִּ'  },
  { id: 8,  consonant: 'פ', targetNikudId: 'tsere',   syllable: 'פֵ', ttsText: 'פֵּ'  },
  { id: 9,  consonant: 'ר', targetNikudId: 'holam',   syllable: 'רוֹ', ttsText: 'רוֹ' },
  { id: 10, consonant: 'נ', targetNikudId: 'segol',   syllable: 'נֶ', ttsText: 'נֶ'   },
  { id: 11, consonant: 'ג', targetNikudId: 'kamatz',  syllable: 'גָ', ttsText: 'גָּ'  },
  { id: 12, consonant: 'ה', targetNikudId: 'chirik',  syllable: 'הִ', ttsText: 'הִ'   },
  { id: 13, consonant: 'ז', targetNikudId: 'holam',   syllable: 'זוֹ', ttsText: 'זוֹ' },
  { id: 14, consonant: 'ח', targetNikudId: 'tsere',   syllable: 'חֵ', ttsText: 'חֵ'   },
  { id: 15, consonant: 'ט', targetNikudId: 'segol',   syllable: 'טֶ', ttsText: 'טֶ'   },
  { id: 16, consonant: 'י', targetNikudId: 'kamatz',  syllable: 'יָ', ttsText: 'יָ'   },
  { id: 17, consonant: 'ס', targetNikudId: 'chirik',  syllable: 'סִ', ttsText: 'סִ'   },
  { id: 18, consonant: 'ע', targetNikudId: 'tsere',   syllable: 'עֵ', ttsText: 'עֵ'   },
  { id: 19, consonant: 'צ', targetNikudId: 'holam',   syllable: 'צוֹ', ttsText: 'צוֹ' },
  { id: 20, consonant: 'ק', targetNikudId: 'segol',   syllable: 'קֶ', ttsText: 'קֶ'   },
];
