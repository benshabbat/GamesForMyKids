'use client';

import { useSoccerStore } from '../store/soccerStore';

export function useSoccerQuestion() {
  const {
    currentIndex, questions, score, phase,
    selected, isCorrect, showGoal,
    selectAnswer, nextQuestion,
  } = useSoccerStore();

  const total = questions.length;
  const currentQuestion = questions[currentIndex] ?? null;
  const progressPct = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;
  const nextLabel = currentIndex + 1 < total ? 'הבא ⚽' : 'סיום! 🏆';

  function answerClass(idx: number): string {
    let cls = 'py-3 px-4 rounded-xl font-bold text-center shadow-md active:scale-95 transition-all text-sm ';
    if (phase === 'answered') {
      if (idx === currentQuestion?.correctIndex) cls += 'bg-green-500 text-white ring-4 ring-green-300';
      else if (idx === selected) cls += 'bg-red-400 text-white';
      else cls += 'bg-white bg-opacity-50 text-gray-500';
    } else {
      cls += 'bg-white text-gray-800 hover:bg-yellow-50 border-2 border-transparent hover:border-yellow-400';
    }
    return cls;
  }

  return {
    currentIndex, total, score, phase, selected, isCorrect, showGoal,
    currentQuestion, progressPct, nextLabel,
    answerClass, selectAnswer, nextQuestion,
  };
}
