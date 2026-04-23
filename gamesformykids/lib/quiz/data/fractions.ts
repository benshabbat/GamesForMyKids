// שברים פשוטים - זיהוי חזותי
export type FractionQuestion = {
  id: number;
  numerator: number;
  denominator: number;
  display: string;        // "1/2"
  description: string;   // "חצי"
  wrongOptions: [string, string, string];
  wrongDisplays: [string, string, string];
};

export const FRACTION_QUESTIONS: FractionQuestion[] = [
  { id: 1,  numerator: 1, denominator: 2,  display: '1/2',  description: 'חצי (1/2)',       wrongOptions: ['שליש','רבע','שלושה רבעים'], wrongDisplays: ['1/3','1/4','3/4'] },
  { id: 2,  numerator: 1, denominator: 3,  display: '1/3',  description: 'שליש (1/3)',      wrongOptions: ['חצי','רבע','שניים שלישים'], wrongDisplays: ['1/2','1/4','2/3'] },
  { id: 3,  numerator: 1, denominator: 4,  display: '1/4',  description: 'רבע (1/4)',       wrongOptions: ['חצי','שליש','שלושה רבעים'], wrongDisplays: ['1/2','1/3','3/4'] },
  { id: 4,  numerator: 3, denominator: 4,  display: '3/4',  description: 'שלושה רבעים',     wrongOptions: ['חצי','שליש','שני שלישים'], wrongDisplays: ['1/2','1/3','2/3'] },
  { id: 5,  numerator: 2, denominator: 3,  display: '2/3',  description: 'שני שלישים',      wrongOptions: ['חצי','שלושה רבעים','שליש'], wrongDisplays: ['1/2','3/4','1/3'] },
  { id: 6,  numerator: 1, denominator: 5,  display: '1/5',  description: 'חמישית (1/5)',    wrongOptions: ['רבע','שליש','שישית'], wrongDisplays: ['1/4','1/3','1/6'] },
  { id: 7,  numerator: 2, denominator: 5,  display: '2/5',  description: 'שתי חמישיות',     wrongOptions: ['שליש','חצי','שלוש חמישיות'], wrongDisplays: ['1/3','1/2','3/5'] },
  { id: 8,  numerator: 3, denominator: 5,  display: '3/5',  description: 'שלוש חמישיות',    wrongOptions: ['חצי','שני שלישים','ארבע חמישיות'], wrongDisplays: ['1/2','2/3','4/5'] },
  { id: 9,  numerator: 1, denominator: 6,  display: '1/6',  description: 'שישית (1/6)',     wrongOptions: ['חמישית','רבע','שמינית'], wrongDisplays: ['1/5','1/4','1/8'] },
  { id: 10, numerator: 1, denominator: 8,  display: '1/8',  description: 'שמינית (1/8)',    wrongOptions: ['שישית','רבע','עשירית'], wrongDisplays: ['1/6','1/4','1/10'] },
  { id: 11, numerator: 4, denominator: 5,  display: '4/5',  description: 'ארבע חמישיות',    wrongOptions: ['שלוש חמישיות','שלושה רבעים','שני שלישים'], wrongDisplays: ['3/5','3/4','2/3'] },
  { id: 12, numerator: 5, denominator: 6,  display: '5/6',  description: 'חמישה שישיות',    wrongOptions: ['שלושה רבעים','שני שלישים','שלוש חמישיות'], wrongDisplays: ['3/4','2/3','3/5'] },
  { id: 13, numerator: 1, denominator: 10, display: '1/10', description: 'עשירית (1/10)',   wrongOptions: ['שמינית','שישית','חמישית'], wrongDisplays: ['1/8','1/6','1/5'] },
  { id: 14, numerator: 3, denominator: 8,  display: '3/8',  description: 'שלוש שמיניות',   wrongOptions: ['שליש','חצי','רבע'], wrongDisplays: ['1/3','1/2','1/4'] },
  { id: 15, numerator: 7, denominator: 8,  display: '7/8',  description: 'שבע שמיניות',    wrongOptions: ['שלושה רבעים','חמישה שישיות','שני שלישים'], wrongDisplays: ['3/4','5/6','2/3'] },
];

export const QUESTIONS_PER_GAME = 10;
