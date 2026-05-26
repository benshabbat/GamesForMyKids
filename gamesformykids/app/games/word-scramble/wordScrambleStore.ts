import { makeStore } from '@/lib/stores/createStore';
import type { PhaseResults as Phase } from '@/lib/types';
import { shuffle } from '@/lib/utils';

// ── Types ──────────────────────────────────────────────────────────────────

export interface WordEntry   { word: string; emoji: string; hint: string; }
export interface LetterSlot  { ch: string; picked: boolean; idx: number; }
export interface PickedLetter { ch: string; srcIdx: number; }

// ── Word data ──────────────────────────────────────────────────────────────

export const WORD_LIST: WordEntry[] = [
  { word: 'כלב',    emoji: '🐕', hint: 'חיית מחמד נאמנה' },
  { word: 'חתול',  emoji: '🐈', hint: 'מיאו!' },
  { word: 'ארנב',  emoji: '🐇', hint: 'קופץ ואוהב גזר' },
  { word: 'סוס',   emoji: '🐴', hint: 'חיה שרוכבים עליה' },
  { word: 'פרה',   emoji: '🐄', hint: 'נותנת חלב' },
  { word: 'כבשה',  emoji: '🐑', hint: 'צמר לבן חם' },
  { word: 'דג',    emoji: '🐟', hint: 'שוחה וצוללת' },
  { word: 'ציפור', emoji: '🐦', hint: 'עפה בשמיים' },
  { word: 'תפוח',  emoji: '🍎', hint: 'פרי אדום וטעים' },
  { word: 'בננה',  emoji: '🍌', hint: 'קוף אוהב' },
  { word: 'ענב',   emoji: '🍇', hint: 'אשכולות סגולים' },
  { word: 'שמש',   emoji: '☀️', hint: 'מחממת ומאירה' },
  { word: 'ירח',   emoji: '🌙', hint: 'זורח בלילה' },
  { word: 'ספר',   emoji: '📚', hint: 'קוראים בו סיפורים' },
  { word: 'ים',    emoji: '🌊', hint: 'מים מלוחים וכחולים' },
  { word: 'עץ',    emoji: '🌳', hint: 'גדל עם עלים' },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function scramble(word: string): string[] {
  const letters = [...word];
  let result = shuffle(letters);
  while (result.join('') === word && letters.length > 1) result = shuffle(letters);
  return result;
}

function makeLetters(word: string): LetterSlot[] {
  return scramble(word).map((ch, i) => ({ ch, picked: false, idx: i }));
}

// ── Store ──────────────────────────────────────────────────────────────────

interface WordScrambleState {
  phase:   Phase;
  words:   WordEntry[];
  wIdx:    number;
  letters: LetterSlot[];
  picked:  PickedLetter[];
  score:   number;
  lives:   number;
  shake:   boolean;
  correct: boolean;
}

interface WordScrambleActions {
  startGame:  () => void;
  pickLetter: (srcIdx: number) => void;
  unpick:     (pIdx: number) => void;
}

const INITIAL: WordScrambleState = {
  phase: 'menu', words: [], wIdx: 0, letters: [], picked: [],
  score: 0, lives: 3, shake: false, correct: false,
};

export const useWordScrambleStore = makeStore<WordScrambleState & WordScrambleActions>(
  'WordScrambleStore',
  (set, get) => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    function clearTimer() {
      if (timerId) { clearTimeout(timerId); timerId = null; }
    }

    return {
      ...INITIAL,

      startGame: () => {
        clearTimer();
        const words = shuffle(WORD_LIST).slice(0, 8);
        set(
          { ...INITIAL, phase: 'playing', words, letters: makeLetters(words[0]!.word) },
          false, 'wordScramble/startGame',
        );
      },

      pickLetter: (srcIdx: number) => {
        const { phase, letters, picked, words, wIdx, score, lives } = get();
        if (phase !== 'playing') return;

        const letter = letters[srcIdx];
        if (!letter || letter.picked) return;

        const newLetters = letters.map((l, i) => i === srcIdx ? { ...l, picked: true } : l);
        const newPicked  = [...picked, { ch: letter.ch, srcIdx }];
        set({ letters: newLetters, picked: newPicked }, false, 'wordScramble/pick');

        const currentWord = words[wIdx]!.word;
        if (newPicked.length < currentWord.length) return;

        const attempt = newPicked.map(p => p.ch).join('');
        if (attempt === currentWord) {
          set({ correct: true, score: score + 20 }, false, 'wordScramble/correct');
          timerId = setTimeout(() => {
            const { words: ws, wIdx: idx } = get();
            const nextIdx = idx + 1;
            if (nextIdx >= ws.length) {
              set({ phase: 'results' }, false, 'wordScramble/results');
            } else {
              set(
                { wIdx: nextIdx, letters: makeLetters(ws[nextIdx]!.word), picked: [], correct: false, shake: false },
                false, 'wordScramble/nextWord',
              );
            }
          }, 900);
        } else {
          const newLives = lives - 1;
          set({ shake: true, lives: newLives }, false, 'wordScramble/wrong');
          if (newLives <= 0) {
            timerId = setTimeout(() => set({ phase: 'results' }, false, 'wordScramble/results'), 1000);
          }
          setTimeout(() => {
            const { letters: cur } = get();
            set(
              { shake: false, picked: [], letters: cur.map(l => ({ ...l, picked: false })) },
              false, 'wordScramble/resetPick',
            );
          }, 600);
        }
      },

      unpick: (pIdx: number) => {
        const { picked, letters } = get();
        const p = picked[pIdx];
        if (!p) return;
        set(
          {
            letters: letters.map(l => l.idx === p.srcIdx ? { ...l, picked: false } : l),
            picked:  picked.filter((_, i) => i !== pIdx),
          },
          false, 'wordScramble/unpick',
        );
      },
    };
  },
);
