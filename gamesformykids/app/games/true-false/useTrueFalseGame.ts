'use client';
import { useState, useCallback, useRef } from 'react';
import { useTimedQuizGame } from '@/hooks/games/useTimedQuizGame';

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

import { shuffle } from '@/lib/utils';

export function useTrueFalseGame() {
  const [deck, setDeck]   = useState(() => shuffle(FACTS));
  const [idx, setIdx]     = useState(0);

  const idxRef  = useRef(0);
  const deckRef = useRef(shuffle(FACTS));

  const {
    phase, score, best, lives, timeLeft, feedback,
    phaseRef, startGame: startBase, handleCorrect, handleWrong,
  } = useTimedQuizGame({
    timePerQ: TIME_PER_Q,
    feedbackDelay: 800,
    onNextQuestion: () => {
      const nextIdx = idxRef.current + 1;
      if (nextIdx >= deckRef.current.length) {
        deckRef.current = shuffle(FACTS);
        setDeck([...deckRef.current]);
        idxRef.current = 0;
      } else {
        idxRef.current = nextIdx;
      }
      setIdx(idxRef.current);
    },
  });

  const startGame = useCallback(() => {
    const d = shuffle(FACTS);
    deckRef.current = d;
    idxRef.current = 0;
    startBase(() => {
      setDeck(d);
      setIdx(0);
    });
  }, [startBase]);

  const answer = useCallback((choice: boolean) => {
    if (phaseRef.current !== 'playing' || feedback) return;
    const correct = choice === (deckRef.current[idxRef.current]?.answer ?? false);
    if (correct) {
      handleCorrect(10);
    } else {
      handleWrong();
    }
  }, [feedback, phaseRef, handleCorrect, handleWrong]);

  return {
    phase,
    q: deck[idx] ?? null,
    score,
    best,
    lives,
    timeLeft,
    feedback,
    startGame,
    answer,
  };
}
