'use client';
import { useState, useCallback, useRef } from 'react';

export interface WordEntry { word: string; emoji: string; hint: string; }

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

import type { PhaseResults as GamePhase } from '@/lib/types';
import { shuffle } from '@/lib/utils';

export interface LetterSlot { ch: string; picked: boolean; idx: number; }
export interface PickedLetter { ch: string; srcIdx: number; }


function scramble(word: string): string[] {
  const letters = [...word];
  let scrambled = shuffle(letters);
  while (scrambled.join('') === word && letters.length > 1) scrambled = shuffle(letters);
  return scrambled;
}

export function useWordScrambleGame() {
  const [phase,   setPhase]   = useState<GamePhase>('menu');
  const [words,   setWords]   = useState<WordEntry[]>([]);
  const [wIdx,    setWIdx]    = useState(0);
  const [letters, setLetters] = useState<LetterSlot[]>([]);
  const [picked,  setPicked]  = useState<PickedLetter[]>([]);
  const [score,   setScore]   = useState(0);
  const [lives,   setLives]   = useState(3);
  const [shake,   setShake]   = useState(false);
  const [correct, setCorrect] = useState(false);

  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wordsRef  = useRef<WordEntry[]>([]);
  const wIdxRef   = useRef(0);
  const livesRef  = useRef(3);
  const pickedRef = useRef<PickedLetter[]>([]);
  const lettersRef = useRef<LetterSlot[]>([]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const loadWord = useCallback((ws: WordEntry[], idx: number) => {
    const entry = ws[idx];
    const sc = scramble(entry.word);
    const newLetters = sc.map((ch, i) => ({ ch, picked: false, idx: i }));
    lettersRef.current = newLetters;
    setLetters(newLetters);
    setPicked([]);
    pickedRef.current = [];
    setCorrect(false);
    setShake(false);
  }, []);

  const startGame = useCallback(() => {
    clearTimer();
    const ws = shuffle(WORD_LIST).slice(0, 8);
    wordsRef.current  = ws;
    wIdxRef.current   = 0;
    livesRef.current  = 3;
    pickedRef.current = [];
    setWords(ws);
    setWIdx(0);
    setScore(0);
    setLives(3);
    setPhase('playing');
    loadWord(ws, 0);
  }, [clearTimer, loadWord]);

  const pickLetter = useCallback((srcIdx: number) => {
    const letter = lettersRef.current[srcIdx];
    if (!letter || letter.picked) return;

    // Mark letter as picked (no side-effects inside updater)
    const newLetters = lettersRef.current.map((l, i) => i === srcIdx ? { ...l, picked: true } : l);
    lettersRef.current = newLetters;
    setLetters(newLetters);

    const newPicked = [...pickedRef.current, { ch: letter.ch, srcIdx }];
    pickedRef.current = newPicked;
    setPicked(newPicked);

    const currentWord = wordsRef.current[wIdxRef.current].word;

    if (newPicked.length === currentWord.length) {
      const attempt = newPicked.map(p => p.ch).join('');
      if (attempt === currentWord) {
        setCorrect(true);
        setScore(s => s + 20);
        timerRef.current = setTimeout(() => {
          const nextIdx = wIdxRef.current + 1;
          if (nextIdx >= wordsRef.current.length) {
            setPhase('results');
          } else {
            wIdxRef.current = nextIdx;
            setWIdx(nextIdx);
            loadWord(wordsRef.current, nextIdx);
          }
        }, 900);
      } else {
        setShake(true);
        const nl = livesRef.current - 1;
        livesRef.current = nl;
        setLives(nl);
        if (nl <= 0) {
          timerRef.current = setTimeout(() => setPhase('results'), 1000);
        }
        setTimeout(() => {
          setShake(false);
          setPicked([]);
          pickedRef.current = [];
          const resetLetters = lettersRef.current.map(l => ({ ...l, picked: false }));
          lettersRef.current = resetLetters;
          setLetters(resetLetters);
        }, 600);
      }
    }
  }, [loadWord]);

  const unpick = useCallback((pIdx: number) => {
    const p = pickedRef.current[pIdx];
    if (!p) return;
    const newLetters = lettersRef.current.map(l => l.idx === p.srcIdx ? { ...l, picked: false } : l);
    lettersRef.current = newLetters;
    setLetters(newLetters);
    const next = pickedRef.current.filter((_, i) => i !== pIdx);
    pickedRef.current = next;
    setPicked(next);
  }, []);

  return { phase, words, wIdx, letters, picked, score, lives, shake, correct, startGame, pickLetter, unpick, clearTimer };
}
