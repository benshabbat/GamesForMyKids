'use client';

import { useShallow } from 'zustand/react/shallow';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { useSoccerGame } from '@/lib/quiz/useSoccerGame';

export function useSoccerQuestion() {
  const { index, total, score, selected, isCorrect } = useQuizGameStore(
    useShallow((s) => ({
      index:     s.index,
      total:     s.total,
      score:     s.score,
      selected:  s.selected,
      isCorrect: s.isCorrect,
    })),
  );
  const nextQuestion = useQuizGameStore((s) => s.nextQuestion);

  const { current: currentQuestion, showGoal, selectAnswer } = useSoccerGame();

  const isAnswered = selected !== null;
  const progressPct = total > 0 ? ((index + 1) / total) * 100 : 0;
  const nextLabel = index + 1 < total ? 'הבא ⚽' : 'סיום! 🏆';

  function answerClass(idx: number): string {
    let cls = 'py-3 px-4 rounded-xl font-bold text-center shadow-md active:scale-95 transition text-sm ';
    if (isAnswered) {
      if (idx === currentQuestion?.correctIndex) cls += 'bg-green-500 text-white ring-4 ring-green-300';
      else if (String(idx) === selected) cls += 'bg-red-400 text-white';
      else cls += 'bg-white bg-opacity-50 text-gray-500';
    } else {
      cls += 'bg-white text-gray-800 hover:bg-yellow-50 border-2 border-transparent hover:border-yellow-400';
    }
    return cls;
  }

  return {
    currentIndex: index,
    total,
    score,
    selected,
    isCorrect,
    isAnswered,
    showGoal,
    currentQuestion,
    progressPct,
    nextLabel,
    answerClass,
    selectAnswer,
    nextQuestion,
  };
}
