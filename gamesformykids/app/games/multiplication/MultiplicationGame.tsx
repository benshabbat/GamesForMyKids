'use client';
import { useEffect, useRef } from 'react';
import TimedMathGame from '@/components/game/shared/TimedMathGame';
import { MULTIPLICATION_CONFIG } from './multiplicationConfig';
import { useMultiplicationGameStore } from './multiplicationGameStore';
import { QUESTIONS_PER_LEVEL } from './data/tables';
import { recordLevelResult } from './masteryStorage';
import { speakHebrew } from '@/lib/utils/speech/speaker';

export default function MultiplicationGame() {
  const { phase, level, correct, question } = useMultiplicationGameStore();
  const prevPhase = useRef(phase);
  const spokenFor = useRef<string | null>(null);

  useEffect(() => {
    if (prevPhase.current !== 'result' && phase === 'result') {
      recordLevelResult(level, correct, QUESTIONS_PER_LEVEL);
    }
    prevPhase.current = phase;
  }, [phase, level, correct]);

  useEffect(() => {
    if (phase !== 'playing' || !question) return;
    const key = `${question.a}x${question.b}`;
    if (spokenFor.current === key) return;
    spokenFor.current = key;
    speakHebrew(`${question.a} כפול ${question.b}`);
  }, [phase, question]);

  return <TimedMathGame config={MULTIPLICATION_CONFIG} />;
}
