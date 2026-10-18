'use client';
import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { RIDDLES_PRO, type RiddlePro } from './data/riddles-pro';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';
import { shuffle } from '@/lib/utils';
import { useQuizSession } from './useQuizSession';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';

const SESSION_SIZE = 10;
const ADVANCE_DELAY_MS = 1800;

export type RiddlesProPhase = 'menu' | 'playing' | 'result';

export interface RiddlesProState {
  phase: RiddlesProPhase;
  current: RiddlePro | null;
  choices: string[];
  cluesRevealed: number;
  answersShown: boolean;
  score: number;
  questionNumber: number;
  total: number;
  lastPoints: number | null;
  lastCorrect: boolean | null;
  startGame: () => void;
  revealClue: () => void;
  showAnswers: () => void;
  selectAnswer: (choice: string) => void;
  restart: () => void;
}

function pickSession(): RiddlePro[] {
  const shuffled = shuffle(RIDDLES_PRO);
  return shuffled.slice(0, SESSION_SIZE);
}

function makeChoices(riddle: RiddlePro): string[] {
  return shuffle([riddle.answer, ...riddle.wrongOptions]);
}

export function useRiddlesProGame(): RiddlesProState {
  // The shared quiz session drives the phase and the question list: QuizGameShell and
  // QuizResultScreen read the global quiz store, so the game has to run through it.
  const { phase, current, begin, answer } = useQuizSession<RiddlePro>('riddles-pro');
  const index = useQuizGameStore((s) => s.index);

  const [cluesRevealed, setCluesRevealed] = useState(0);
  const [answersShown, setAnswersShown] = useState(false);
  const [score, setScore] = useState(0);
  const [lastPoints, setLastPoints] = useState<number | null>(null);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const cluesRef = useRef(0);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const choices = useMemo(() => (current ? makeChoices(current) : []), [current]);

  const resetRiddle = useCallback(() => {
    setCluesRevealed(0);
    setAnswersShown(false);
    cluesRef.current = 0;
    setLastPoints(null);
    setLastCorrect(null);
  }, []);

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current) { clearTimeout(advanceTimerRef.current); advanceTimerRef.current = null; }
  }, []);

  // Read each riddle aloud when it appears
  useEffect(() => {
    if (phase === 'playing' && current) speakHebrew(current.riddle);
  }, [phase, current]);

  // Don't move on (or speak) after the player has left the page
  useEffect(() => clearAdvanceTimer, [clearAdvanceTimer]);

  const startGame = useCallback(() => {
    clearAdvanceTimer();
    setScore(0);
    resetRiddle();
    begin(pickSession());
  }, [begin, clearAdvanceTimer, resetRiddle]);

  const revealClue = useCallback(() => {
    const next = cluesRef.current + 1;
    cluesRef.current = next;
    setCluesRevealed(next);
    if (next >= 3) setAnswersShown(true);
  }, []);

  const showAnswers = useCallback(() => {
    setAnswersShown(true);
  }, []);

  const selectAnswer = useCallback((choice: string) => {
    if (!current || advanceTimerRef.current) return;
    const isCorrect = choice === current.answer;
    const points = isCorrect ? Math.max(1, 3 - cluesRef.current) : 0;
    setLastCorrect(isCorrect);
    setLastPoints(isCorrect ? points : null);
    if (isCorrect) {
      setScore(s => s + points);
      speakHebrew(`נָכוֹן! ${current.answer}! קִבַּלְתָּ ${points} נְקֻדּוֹת`);
    } else {
      speakHebrew(`לֹא נָכוֹן — הַתְּשׁוּבָה הִיא ${current.answer}`);
    }
    answer(choice, isCorrect);
    advanceTimerRef.current = setTimeout(() => {
      advanceTimerRef.current = null;
      resetRiddle();
      useQuizGameStore.getState().nextQuestion();
    }, ADVANCE_DELAY_MS);
  }, [current, answer, resetRiddle]);

  const restart = useCallback(() => {
    clearAdvanceTimer();
    resetRiddle();
    useQuizGameStore.getState().goToMenu();
  }, [clearAdvanceTimer, resetRiddle]);

  return {
    phase, current, choices, cluesRevealed, answersShown,
    score, questionNumber: index + 1, total: SESSION_SIZE, lastPoints, lastCorrect,
    startGame, revealClue, showAnswers, selectAnswer, restart,
  };
}
