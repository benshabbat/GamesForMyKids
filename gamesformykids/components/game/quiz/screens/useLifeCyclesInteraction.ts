'use client';
import { useState, useEffect, useCallback } from 'react';
import { useQuizGameStore } from '@/lib/stores';
import type { LifeCycleQuestion } from '@/lib/quiz/data/life-cycles';

export function useLifeCyclesInteraction(current: LifeCycleQuestion, onComplete: () => void) {
  const [placed, setPlaced] = useState<number[]>([]);
  const [shuffled, setShuffled] = useState<number[]>([]);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);

  const isCorrect = useQuizGameStore(s => s.isCorrect);
  const nextQuestion = useQuizGameStore(s => s.nextQuestion);

  useEffect(() => {
    const indices: number[] = [0, 1, 2, 3];
    setShuffled(indices.sort(() => Math.random() - 0.5));
    setPlaced([]);
    setWrongIdx(null);
  }, [current.id]);

  useEffect(() => {
    if (isCorrect !== true) return;
    const t = setTimeout(nextQuestion, 1200);
    return () => clearTimeout(t);
  }, [isCorrect, nextQuestion]);

  const tapStage = useCallback((stageIndex: number) => {
    if (isCorrect !== null) return;
    const nextExpected = placed.length;
    if (stageIndex === nextExpected) {
      const newPlaced = [...placed, stageIndex];
      setShuffled(prev => prev.filter(i => i !== stageIndex));
      setPlaced(newPlaced);
      if (newPlaced.length === 4) {
        setTimeout(onComplete, 300);
      }
    } else {
      setWrongIdx(stageIndex);
      setTimeout(() => setWrongIdx(null), 500);
    }
  }, [isCorrect, placed, onComplete]);

  return { placed, shuffled, wrongIdx, isCorrect, tapStage };
}
