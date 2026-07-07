'use client';
import { useCallback, useEffect, useState } from 'react';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { SOUND_CLIPS, type SoundCategory, type SoundClip } from './data/soundClips';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';
import { shuffle } from '@/lib/utils';

const ROUNDS = 15;
const ADVANCE_DELAY_MS = 1800;

export interface SoundRound {
  clip: SoundClip;
  choices: SoundClip[];
}

function buildRounds(pool: SoundClip[]): SoundRound[] {
  return shuffle(pool).slice(0, ROUNDS).map((clip) => {
    const others = shuffle(pool.filter((c) => c.id !== clip.id)).slice(0, 3);
    return { clip, choices: shuffle([clip, ...others]) };
  });
}

export function useSoundQuizGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<SoundRound>('sound-quiz');
  const [choicesRevealed, setChoicesRevealed] = useState(false);

  // Hide the choice grid again as soon as a new round loads
  useEffect(() => {
    setChoicesRevealed(false);
  }, [current]);

  const startGame = useCallback((cat: SoundCategory | 'all') => {
    const pool = cat === 'all' ? SOUND_CLIPS : SOUND_CLIPS.filter((c) => c.category === cat);
    begin(buildRounds(pool));
  }, [begin]);

  const playSound = useCallback(() => {
    if (!current) return;
    setChoicesRevealed(true);
    speakHebrew(current.clip.soundText);
  }, [current]);

  const replaySound = useCallback(() => {
    if (!current) return;
    speakHebrew(current.clip.soundText);
  }, [current]);

  const selectAnswer = useCallback((clip: SoundClip) => {
    if (!current) return;
    const correct = clip.id === current.clip.id;
    answer(clip.id, correct);
    speakHebrew(correct ? `נכון! ${current.clip.name}` : `לא נכון. התשובה הנכונה היא ${current.clip.name}`);
    setTimeout(() => useQuizGameStore.getState().nextQuestion(), ADVANCE_DELAY_MS);
  }, [current, answer]);

  const restart = useCallback(() => {
    reset(buildRounds(SOUND_CLIPS));
  }, [reset]);

  return { phase, current, choicesRevealed, startGame, playSound, replaySound, selectAnswer, restart };
}
