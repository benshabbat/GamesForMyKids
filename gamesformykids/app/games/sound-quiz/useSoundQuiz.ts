'use client';
import { useCallback, useEffect } from 'react';
import { useSoundQuizStore } from './soundQuizStore';
import { SOUND_CLIPS, type SoundCategory } from './data/soundClips';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

const ROUNDS = 15;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i] as T; a[i] = a[j] as T; a[j] = tmp;
  }
  return a;
}

function pickChoices(correct: typeof SOUND_CLIPS[number], pool: typeof SOUND_CLIPS) {
  const others = shuffle(pool.filter(c => c.id !== correct.id)).slice(0, 3);
  return shuffle([correct, ...others]);
}

export function useSoundQuiz() {
  const store = useSoundQuizStore();
  const { phase, category, current, choices, choicesRevealed, score, total, lastCorrect } = store;

  const pool = category === 'all' ? SOUND_CLIPS : SOUND_CLIPS.filter(c => c.category === category);

  const loadNext = useCallback(() => {
    const remaining = shuffle(pool).slice(0, ROUNDS);
    const clip = remaining[total % remaining.length];
    if (!clip) { store.endGame(); return; }
    store.nextQuestion(clip, pickChoices(clip, pool));
  }, [pool, total, store]);

  const startGame = useCallback((cat: SoundCategory | 'all') => {
    store.startGame(cat);
  }, [store]);

  const playSound = useCallback(() => {
    if (!current) return;
    store.revealChoices();
    speakHebrew(current.soundText);
  }, [current, store]);

  const replaySound = useCallback(() => {
    if (!current) return;
    speakHebrew(current.soundText);
  }, [current]);

  const selectAnswer = useCallback((clip: typeof SOUND_CLIPS[number]) => {
    if (!current) return;
    const correct = clip.id === current.id;
    store.selectAnswer(clip, correct);
    if (correct) {
      speakHebrew(`נכון! ${current.name}`);
    } else {
      speakHebrew(`לא נכון. התשובה הנכונה היא ${current.name}`);
    }
    if (total + 1 >= ROUNDS) {
      setTimeout(() => store.endGame(), 1800);
    } else {
      setTimeout(() => loadNext(), 1800);
    }
  }, [current, total, store, loadNext]);

  // Load first question when phase becomes 'playing'
  useEffect(() => {
    if (phase === 'playing' && !current) {
      loadNext();
    }
  }, [phase, current, loadNext]);

  return {
    phase,
    category,
    current,
    choices,
    choicesRevealed,
    score,
    total,
    lastCorrect,
    startGame,
    playSound,
    replaySound,
    selectAnswer,
    reset: store.reset,
  };
}
