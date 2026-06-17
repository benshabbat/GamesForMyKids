'use client';
import { useState, useCallback } from 'react';
import { JOKES, type JokeCategory, type Joke } from '@/lib/constants/jokes';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

export type JokesPhase = 'menu' | 'browse';

export function useJokesBrowser() {
  const [phase, setPhase] = useState<JokesPhase>('menu');
  const [category, setCategory] = useState<JokeCategory>('animals');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const categoryJokes = JOKES.filter(j => j.category === category);
  const current: Joke | undefined = categoryJokes[currentIndex];

  const selectCategory = useCallback((cat: JokeCategory) => {
    setCategory(cat);
    setCurrentIndex(0);
    setRevealed(false);
    setPhase('browse');
    const firstJoke = JOKES.find(j => j.category === cat);
    if (firstJoke) speakHebrew(firstJoke.setup);
  }, []);

  const revealPunchline = useCallback(() => {
    setRevealed(true);
    if (current) speakHebrew(current.punchline);
  }, [current]);

  const nextJoke = useCallback(() => {
    const next = (currentIndex + 1) % categoryJokes.length;
    setCurrentIndex(next);
    setRevealed(false);
    const nextJokeItem = categoryJokes[next];
    if (nextJokeItem) speakHebrew(nextJokeItem.setup);
  }, [currentIndex, categoryJokes]);

  const prevJoke = useCallback(() => {
    const prev = (currentIndex - 1 + categoryJokes.length) % categoryJokes.length;
    setCurrentIndex(prev);
    setRevealed(false);
    const prevJokeItem = categoryJokes[prev];
    if (prevJokeItem) speakHebrew(prevJokeItem.setup);
  }, [currentIndex, categoryJokes]);

  const readSetup = useCallback(() => {
    if (current) speakHebrew(current.setup);
  }, [current]);

  const backToMenu = useCallback(() => {
    setPhase('menu');
    setRevealed(false);
  }, []);

  return {
    phase, category, current, currentIndex, revealed,
    totalInCategory: categoryJokes.length,
    selectCategory, revealPunchline, nextJoke, prevJoke, readSetup, backToMenu,
  };
}
