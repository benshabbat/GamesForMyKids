'use client';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { NIKUD_QUESTIONS, NIKUD_OPTIONS, type NikudQuestion } from './nikudDragData';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import { shuffle } from '@/lib/utils';

const ROUNDS = 10;
const ADVANCE_DELAY_MS = 1000;
const RETRY_DELAY_MS = 1000;

export function useNikudDragGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<NikudQuestion>('nikud-drag');
  const [wrongFlash, setWrongFlash] = useState(false);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const choices = useMemo(() => shuffle(NIKUD_OPTIONS), [current]);

  const startGame = useCallback(() => {
    setWrongFlash(false);
    begin(shuffle(NIKUD_QUESTIONS).slice(0, ROUNDS));
  }, [begin]);

  const selectNikud = useCallback((nikudId: string) => {
    if (!current || wrongFlash) return;
    const isCorrect = nikudId === current.targetNikudId;
    if (isCorrect) {
      answer(nikudId, true);
      setTimeout(() => useQuizGameStore.getState().nextQuestion(), ADVANCE_DELAY_MS);
    } else {
      setWrongFlash(true);
      retryTimerRef.current = setTimeout(() => setWrongFlash(false), RETRY_DELAY_MS);
    }
  }, [current, wrongFlash, answer]);

  const restart = useCallback(() => {
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    setWrongFlash(false);
    reset(shuffle(NIKUD_QUESTIONS).slice(0, ROUNDS));
  }, [reset]);

  const replay = useCallback(() => {
    if (current) void speakHebrew(current.ttsText);
  }, [current]);

  return { phase, current, choices, wrongFlash, startGame, selectNikud, restart, replay };
}
