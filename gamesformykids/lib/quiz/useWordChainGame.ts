'use client';
import { useState, useCallback } from 'react';
import { WORD_BANK, WORD_INDEX, getLastLetter } from './data/word-chain';
import { shuffle } from '@/lib/utils';

type Phase = 'menu' | 'playing' | 'result';

const CHAIN_GOAL = 10;

function pickChoicesFor(word: string): string[] | null {
  const last = getLastLetter(word);
  const valid = WORD_INDEX[last] ?? [];
  if (valid.length === 0) return null;

  const correct = shuffle(valid)[0];
  if (!correct) return null;
  const distractors = shuffle(WORD_BANK.filter(w => getLastLetter(w) !== last && w !== correct && w !== word)).slice(0, 3);
  if (distractors.length < 3) return null;
  return shuffle([correct, ...distractors]);
}

export function useWordChainGame() {
  const [phase, setPhase]         = useState<Phase>('menu');
  const [chain, setChain]         = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [choices, setChoices]     = useState<string[]>([]);
  const [score, setScore]         = useState(0);

  const lastLetter = currentWord ? getLastLetter(currentWord) : '';

  const startGame = useCallback(() => {
    const candidates = WORD_BANK.filter(w => {
      const last = getLastLetter(w);
      return (WORD_INDEX[last]?.length ?? 0) > 0;
    });
    const starting = shuffle(candidates)[0];
    if (!starting) return;
    const initialChoices = pickChoicesFor(starting);
    if (!initialChoices) return;
    setChain([starting]);
    setCurrentWord(starting);
    setChoices(initialChoices);
    setScore(0);
    setPhase('playing');
  }, []);

  const selectAnswer = useCallback((choice: string) => {
    if (phase !== 'playing') return;
    const last = getLastLetter(currentWord);
    const isCorrect = choice[0] === last;

    if (!isCorrect) {
      setPhase('result');
      return;
    }

    const newChain = [...chain, choice];
    const newScore = score + 1;
    setChain(newChain);
    setScore(newScore);

    if (newScore >= CHAIN_GOAL) {
      setPhase('result');
      return;
    }

    const nextChoices = pickChoicesFor(choice);
    if (!nextChoices) {
      // dead end — treat as win since they got here correctly
      setPhase('result');
      return;
    }
    setCurrentWord(choice);
    setChoices(nextChoices);
  }, [phase, currentWord, chain, score]);

  const restart = useCallback(() => {
    setPhase('menu');
    setChain([]);
    setCurrentWord('');
    setChoices([]);
    setScore(0);
  }, []);

  return { phase, chain, currentWord, lastLetter, choices, score, startGame, selectAnswer, restart };
}
