'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

export const FACTS = [
  { fact: 'לכלב יש ארבע רגליים', answer: true, emoji: '🐕' },
  { fact: 'השמש היא כוכב', answer: true, emoji: '☀️' },
  { fact: 'דגים נושמים בעזרת ריאות', answer: false, emoji: '🐟' },
  { fact: 'לעכביש יש שמונה רגליים', answer: true, emoji: '🕷️' },
  { fact: 'הירח פולט אור עצמי', answer: false, emoji: '🌙' },
  { fact: 'לדולפין יש ריאות', answer: true, emoji: '🐬' },
  { fact: 'לנחש יש רגליים', answer: false, emoji: '🐍' },
  { fact: 'עכביש הוא חרק', answer: false, emoji: '🕷️' },
  { fact: 'ענבים הם פרי', answer: true, emoji: '🍇' },
  { fact: 'זברה שייכת למשפחת הסוסים', answer: true, emoji: '🦓' },
  { fact: 'פינגווין יכול לעוף', answer: false, emoji: '🐧' },
  { fact: 'תפוח גדל על עץ', answer: true, emoji: '🍎' },
  { fact: 'לחתול יש שש רגליים', answer: false, emoji: '🐈' },
  { fact: 'השמיים כחולים ביום', answer: true, emoji: '🌤️' },
  { fact: 'לדבורה יש כנפיים', answer: true, emoji: '🐝' },
  { fact: 'בננה היא ירק', answer: false, emoji: '🍌' },
  { fact: 'ציפורים מטילות ביצים', answer: true, emoji: '🐦' },
  { fact: 'לדג יש רגליים', answer: false, emoji: '🐠' },
  { fact: 'הלב שואב דם בגוף', answer: true, emoji: '❤️' },
  { fact: 'ים שתייה מלוח', answer: true, emoji: '🌊' },
  { fact: 'קוף אוהב בננות', answer: true, emoji: '🐒' },
  { fact: 'לפרפר שלוש זוגות כנפיים', answer: false, emoji: '🦋' },
  { fact: 'אריה הוא חיית בית', answer: false, emoji: '🦁' },
  { fact: 'שלג צבעו לבן', answer: true, emoji: '❄️' },
  { fact: 'תות שדה הוא פרי', answer: true, emoji: '🍓' },
];

export const TIME_PER_Q = 6;

export type GamePhase = 'menu' | 'playing' | 'dead';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useTrueFalseGame() {
  const [phase, setPhase]       = useState<GamePhase>('menu');
  const [deck, setDeck]         = useState(shuffle(FACTS));
  const [idx, setIdx]           = useState(0);
  const [score, setScore]       = useState(0);
  const [best, setBest]         = useState(0);
  const [lives, setLives]       = useState(3);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const phaseRef  = useRef<GamePhase>('menu');
  const scoreRef  = useRef(0);
  const livesRef  = useRef(3);
  const idxRef    = useRef(0);
  const deckRef   = useRef(shuffle(FACTS));

  const nextQ = useCallback(() => {
    const nextIdx = idxRef.current + 1;
    if (nextIdx >= deckRef.current.length) {
      deckRef.current = shuffle(FACTS);
      setDeck([...deckRef.current]);
      idxRef.current = 0;
    } else {
      idxRef.current = nextIdx;
    }
    setIdx(idxRef.current);
    setTimeLeft(TIME_PER_Q);
    setFeedback(null);
  }, []);

  const startGame = useCallback(() => {
    const d = shuffle(FACTS);
    deckRef.current = d;
    idxRef.current  = 0;
    scoreRef.current = 0;
    livesRef.current = 3;
    phaseRef.current = 'playing';
    setDeck(d);
    setIdx(0);
    setScore(0);
    setLives(3);
    setTimeLeft(TIME_PER_Q);
    setFeedback(null);
    setPhase('playing');
  }, []);

  useEffect(() => {
    if (phase !== 'playing' || feedback) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const newLives = livesRef.current - 1;
          livesRef.current = newLives;
          setLives(newLives);
          setFeedback('wrong');
          if (newLives <= 0) {
            phaseRef.current = 'dead';
            setPhase('dead');
            setBest(b => Math.max(b, scoreRef.current));
          }
          return TIME_PER_Q;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, feedback]);

  useEffect(() => {
    if (!feedback || phaseRef.current !== 'playing') return;
    const t = setTimeout(nextQ, 800);
    return () => clearTimeout(t);
  }, [feedback, nextQ]);

  const answer = useCallback((choice: boolean) => {
    if (phaseRef.current !== 'playing' || feedback) return;
    const correct = choice === deckRef.current[idxRef.current].answer;
    if (correct) {
      const ns = scoreRef.current + 10;
      scoreRef.current = ns;
      setScore(ns);
      setFeedback('correct');
    } else {
      const nl = livesRef.current - 1;
      livesRef.current = nl;
      setLives(nl);
      setFeedback('wrong');
      if (nl <= 0) {
        phaseRef.current = 'dead';
        setPhase('dead');
        setBest(b => Math.max(b, scoreRef.current));
      }
    }
  }, [feedback]);

  return {
    phase,
    q: deck[idx],
    score,
    best,
    lives,
    timeLeft,
    feedback,
    startGame,
    answer,
  };
}
