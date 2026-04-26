// שעות לשעון
export type ClockQuestion = {
  id: number;
  hour: number;    // 1-12
  minute: number;  // 0, 15, 30, 45
  digital: string; // "3:00"
  description: string; // "השעה שלוש"
};

const hebrewNumbers: Record<number, string> = {
  1: 'אחת', 2: 'שתיים', 3: 'שלוש', 4: 'ארבע',
  5: 'חמש', 6: 'שש', 7: 'שבע', 8: 'שמונה',
  9: 'תשע', 10: 'עשר', 11: 'אחת עשרה', 12: 'שתים עשרה',
};

function makeDescription(hour: number, minute: number): string {
  if (minute === 0)  return `השעה ${hebrewNumbers[hour]}`;
  if (minute === 15) return `השעה ${hebrewNumbers[hour]} ורבע`;
  if (minute === 30) return `השעה ${hebrewNumbers[hour]} וחצי`;
  if (minute === 45) {
    const next = hour === 12 ? 1 : hour + 1;
    return `השעה ${hebrewNumbers[next]} פחות רבע`;
  }
  return '';
}

function digital(h: number, m: number) {
  return `${h}:${m.toString().padStart(2, '0')}`;
}

const TIMES: [number, number][] = [
  [1,0],[2,0],[3,0],[4,0],[5,0],[6,0],
  [7,0],[8,0],[9,0],[10,0],[11,0],[12,0],
  [1,30],[3,30],[6,30],[9,30],
  [2,15],[5,15],[8,15],
  [3,45],[6,45],[9,45],
];

export const CLOCK_QUESTIONS: ClockQuestion[] = TIMES.map(([h, m], i) => ({
  id: i + 1,
  hour: h,
  minute: m,
  digital: digital(h, m),
  description: makeDescription(h, m),
}));

