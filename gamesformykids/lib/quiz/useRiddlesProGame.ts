'use client';
import { useState, useCallback, useRef } from 'react';
import { RIDDLES_PRO, type RiddlePro } from './data/riddles-pro';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

const SESSION_SIZE = 10;

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
  const shuffled = [...RIDDLES_PRO].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, SESSION_SIZE);
}

function makeChoices(riddle: RiddlePro): string[] {
  return [riddle.answer, ...riddle.wrongOptions].sort(() => Math.random() - 0.5);
}

export function useRiddlesProGame(): RiddlesProState {
  const [phase, setPhase] = useState<RiddlesProPhase>('menu');
  const [current, setCurrent] = useState<RiddlePro | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [cluesRevealed, setCluesRevealed] = useState(0);
  const [answersShown, setAnswersShown] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [lastPoints, setLastPoints] = useState<number | null>(null);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const sessionRef = useRef<RiddlePro[]>([]);
  const sessionIdxRef = useRef(0);
  const cluesRef = useRef(0);

  const loadNext = useCallback(() => {
    const idx = sessionIdxRef.current;
    const session = sessionRef.current;
    if (idx >= session.length) {
      setPhase('result');
      return;
    }
    const riddle = session[idx];
    if (!riddle) { setPhase('result'); return; }
    setCurrent(riddle);
    setChoices(makeChoices(riddle));
    setCluesRevealed(0);
    setAnswersShown(false);
    cluesRef.current = 0;
    setLastPoints(null);
    setLastCorrect(null);
    setQuestionNumber(idx + 1);
    speakHebrew(riddle.riddle);
  }, []);

  const startGame = useCallback(() => {
    sessionRef.current = pickSession();
    sessionIdxRef.current = 0;
    setScore(0);
    setPhase('playing');
    loadNext();
  }, [loadNext]);

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
    if (!current) return;
    const isCorrect = choice === current.answer;
    const points = isCorrect ? Math.max(1, 3 - cluesRef.current) : 0;
    setLastCorrect(isCorrect);
    setLastPoints(isCorrect ? points : null);
    if (isCorrect) {
      setScore(s => s + points);
      speakHebrew(`נכון! ${current.answer}! קיבלת ${points} נקודות`);
    } else {
      speakHebrew(`לא נכון — התשובה היא ${current.answer}`);
    }
    sessionIdxRef.current += 1;
    setTimeout(loadNext, 1800);
  }, [current, loadNext]);

  const restart = useCallback(() => {
    setPhase('menu');
    setCurrent(null);
  }, []);

  return {
    phase, current, choices, cluesRevealed, answersShown,
    score, questionNumber, total: SESSION_SIZE, lastPoints, lastCorrect,
    startGame, revealClue, showAnswers, selectAnswer, restart,
  };
}
