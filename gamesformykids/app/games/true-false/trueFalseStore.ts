import { makeStore } from '@/lib/stores/createStore';
import { setupLivesTimer } from '@/lib/stores/livesTimerHelpers';
import type { LivesGameState } from '@/lib/types';
import { shuffle } from '@/lib/utils';

// ── Facts data ──────────────────────────────────────────────────────────────

export const FACTS = [
  { fact: 'לכלב יש ארבע רגליים',          answer: true,  emoji: '🐕' },
  { fact: 'השמש היא כוכב',                 answer: true,  emoji: '☀️' },
  { fact: 'דגים נושמים בעזרת ריאות',       answer: false, emoji: '🐟' },
  { fact: 'לעכביש יש שמונה רגליים',        answer: true,  emoji: '🕷️' },
  { fact: 'הירח פולט אור עצמי',            answer: false, emoji: '🌙' },
  { fact: 'לדולפין יש ריאות',              answer: true,  emoji: '🐬' },
  { fact: 'לנחש יש רגליים',               answer: false, emoji: '🐍' },
  { fact: 'עכביש הוא חרק',                answer: false, emoji: '🕷️' },
  { fact: 'ענבים הם פרי',                 answer: true,  emoji: '🍇' },
  { fact: 'זברה שייכת למשפחת הסוסים',     answer: true,  emoji: '🦓' },
  { fact: 'פינגווין יכול לעוף',           answer: false, emoji: '🐧' },
  { fact: 'תפוח גדל על עץ',              answer: true,  emoji: '🍎' },
  { fact: 'לחתול יש שש רגליים',           answer: false, emoji: '🐈' },
  { fact: 'השמיים כחולים ביום',           answer: true,  emoji: '🌤️' },
  { fact: 'לדבורה יש כנפיים',            answer: true,  emoji: '🐝' },
  { fact: 'בננה היא ירק',                answer: false, emoji: '🍌' },
  { fact: 'ציפורים מטילות ביצים',         answer: true,  emoji: '🐦' },
  { fact: 'לדג יש רגליים',               answer: false, emoji: '🐠' },
  { fact: 'הלב שואב דם בגוף',            answer: true,  emoji: '❤️' },
  { fact: 'ים שתייה מלוח',              answer: true,  emoji: '🌊' },
  { fact: 'קוף אוהב בננות',             answer: true,  emoji: '🐒' },
  { fact: 'לפרפר שלוש זוגות כנפיים',    answer: false, emoji: '🦋' },
  { fact: 'אריה הוא חיית בית',           answer: false, emoji: '🦁' },
  { fact: 'שלג צבעו לבן',              answer: true,  emoji: '❄️' },
  { fact: 'תות שדה הוא פרי',            answer: true,  emoji: '🍓' },
];

export type Fact = typeof FACTS[number];

// ── Store ───────────────────────────────────────────────────────────────────

export const TIME_PER_Q = 6;

interface TrueFalseState extends LivesGameState {
  deck: Fact[];
  idx:  number;
}

interface TrueFalseActions {
  startGame: () => void;
  answer:    (choice: boolean) => void;
}

const INITIAL: TrueFalseState = {
  phase: 'menu', score: 0, best: 0, lives: 3,
  timeLeft: TIME_PER_Q, feedback: null, deck: shuffle(FACTS), idx: 0,
};

export const useTrueFalseStore = makeStore<TrueFalseState & TrueFalseActions>(
  'TrueFalseStore',
  (set, get) => {
    const timer = setupLivesTimer({
      name: 'TrueFalseStore', timePerQ: TIME_PER_Q, feedbackMs: 800, initialLives: 3,
      set, get,
      getNextUpdates: () => {
        const { deck, idx } = get();
        const nextIdx = idx + 1;
        if (nextIdx >= deck.length) {
          const newDeck = shuffle(FACTS);
          return { deck: newDeck, idx: 0 };
        }
        return { idx: nextIdx };
      },
    });

    return {
      ...INITIAL,

      startGame: () => {
        const deck = shuffle(FACTS);
        timer.startGame(() => ({ deck, idx: 0 }));
      },

      answer: (choice: boolean) => {
        const { phase, feedback, deck, idx } = get();
        if (phase !== 'playing' || feedback !== null) return;
        if (choice === deck[idx].answer) timer.correct(10);
        else timer.wrong();
      },
    };
  },
);
