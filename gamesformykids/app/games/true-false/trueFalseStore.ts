import { makeStore } from '@/lib/stores/createStore';
import type { PhaseDead as Phase } from '@/lib/types';
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

export const TIME_PER_Q   = 6;
const        FEEDBACK_MS  = 800;
const        INITIAL_LIVES = 3;

interface TrueFalseState {
  phase:    Phase;
  score:    number;
  best:     number;
  lives:    number;
  timeLeft: number;
  feedback: 'correct' | 'wrong' | null;
  deck:     Fact[];
  idx:      number;
}

interface TrueFalseActions {
  startGame: () => void;
  answer:    (choice: boolean) => void;
}

const INITIAL_DECK = shuffle(FACTS);

const INITIAL: TrueFalseState = {
  phase: 'menu', score: 0, best: 0, lives: INITIAL_LIVES,
  timeLeft: TIME_PER_Q, feedback: null, deck: INITIAL_DECK, idx: 0,
};

export const useTrueFalseStore = makeStore<TrueFalseState & TrueFalseActions>(
  'TrueFalseStore',
  (set, get) => {
    let countdownId: ReturnType<typeof setInterval> | null = null;
    let feedbackId:  ReturnType<typeof setTimeout>  | null = null;

    function clearCountdown()     { if (countdownId) { clearInterval(countdownId); countdownId = null; } }
    function clearFeedbackTimer() { if (feedbackId)  { clearTimeout(feedbackId);   feedbackId  = null; } }

    function nextQuestion() {
      const { deck, idx } = get();
      const nextIdx = idx + 1;
      if (nextIdx >= deck.length) {
        const newDeck = shuffle(FACTS);
        set({ deck: newDeck, idx: 0 }, false, 'trueFalse/reshuffleDeck');
      } else {
        set({ idx: nextIdx }, false, 'trueFalse/nextIdx');
      }
    }

    function advanceAfterFeedback() {
      clearFeedbackTimer();
      feedbackId = setTimeout(() => {
        if (get().phase !== 'playing') return;
        nextQuestion();
        set({ feedback: null, timeLeft: TIME_PER_Q }, false, 'trueFalse/nextQuestion');
        startCountdown();
      }, FEEDBACK_MS);
    }

    function startCountdown() {
      clearCountdown();
      if (typeof window === 'undefined') return;
      countdownId = setInterval(() => {
        const { phase, feedback, timeLeft, lives, score, best } = get();
        if (phase !== 'playing' || feedback !== null) { clearCountdown(); return; }
        if (timeLeft <= 1) {
          clearCountdown();
          const newLives = lives - 1;
          const isDead   = newLives <= 0;
          set(
            isDead
              ? { lives: newLives, feedback: 'wrong', timeLeft: TIME_PER_Q, phase: 'dead', best: Math.max(best, score) }
              : { lives: newLives, feedback: 'wrong', timeLeft: TIME_PER_Q },
            false,
            'trueFalse/timeout',
          );
          if (!isDead) advanceAfterFeedback();
        } else {
          set({ timeLeft: timeLeft - 1 }, false, 'trueFalse/tick');
        }
      }, 1000);
    }

    return {
      ...INITIAL,

      startGame: () => {
        clearCountdown();
        clearFeedbackTimer();
        const deck = shuffle(FACTS);
        set({ ...INITIAL, phase: 'playing', best: get().best, deck, idx: 0 }, false, 'trueFalse/startGame');
        startCountdown();
      },

      answer: (choice: boolean) => {
        const { phase, feedback, deck, idx, lives, score, best } = get();
        if (phase !== 'playing' || feedback !== null) return;
        clearCountdown();

        const correct = choice === deck[idx].answer;
        if (correct) {
          set({ score: score + 10, feedback: 'correct' }, false, 'trueFalse/correct');
          advanceAfterFeedback();
        } else {
          const newLives = lives - 1;
          const isDead   = newLives <= 0;
          set(
            isDead
              ? { lives: newLives, feedback: 'wrong', phase: 'dead', best: Math.max(best, score) }
              : { lives: newLives, feedback: 'wrong' },
            false,
            'trueFalse/wrong',
          );
          if (!isDead) advanceAfterFeedback();
        }
      },
    };
  },
);
