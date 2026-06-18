'use client';
import { useState } from 'react';
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

  const selectCategory = (cat: JokeCategory) => {
    setCategory(cat);
    setCurrentIndex(0);
    setRevealed(false);
    setPhase('browse');
    const firstJoke = JOKES.find(j => j.category === cat);
    if (firstJoke) speakHebrew(firstJoke.setup);
  };

  const revealPunchline = () => {
    setRevealed(true);
    if (current) speakHebrew(current.punchline);
  };

  const nextJoke = () => {
    const next = (currentIndex + 1) % categoryJokes.length;
    setCurrentIndex(next);
    setRevealed(false);
    const nextJokeItem = categoryJokes[next];
    if (nextJokeItem) speakHebrew(nextJokeItem.setup);
  };

  const prevJoke = () => {
    const prev = (currentIndex - 1 + categoryJokes.length) % categoryJokes.length;
    setCurrentIndex(prev);
    setRevealed(false);
    const prevJokeItem = categoryJokes[prev];
    if (prevJokeItem) speakHebrew(prevJokeItem.setup);
  };

  const readSetup = () => {
    if (current) speakHebrew(current.setup);
  };

  const backToMenu = () => {
    setPhase('menu');
    setRevealed(false);
  };

  return {
    phase, category, current, currentIndex, revealed,
    totalInCategory: categoryJokes.length,
    selectCategory, revealPunchline, nextJoke, prevJoke, readSetup, backToMenu,
  };
}
