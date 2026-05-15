'use client';

import type { Holiday, HolidayQuestion } from '../data/holidays';
import QuizQuestionCard from '@/components/game/quiz/QuizQuestionCard';

interface Props {
  current: Holiday;
  currentQuestion: HolidayQuestion;
  questionIndex: number;
  totalQuestions: number;
  score: number;
  selected: number | null;
  isCorrect: boolean | null;
  onSelect: (i: number) => void;
  onNext: () => void;
}

export default function HolidaysQuizScreen({ current, currentQuestion, questionIndex, totalQuestions, score, selected, isCorrect, onSelect, onNext }: Props) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${current.bg} p-4`} dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className={`rounded-3xl p-5 mb-5 text-center text-white bg-gradient-to-br ${current.color} shadow-xl relative`}>
          <div className="text-5xl mb-1">{current.emoji}</div>
          <h2 className="text-2xl font-bold">{current.name}</h2>
          <p className="text-white/80 text-sm mt-1">{current.description}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-2 px-1">
          <span>שאלה {questionIndex + 1} / {totalQuestions}</span>
          <span>⭐ {score} נקודות</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-4">
          <div className={`h-full rounded-full bg-gradient-to-l ${current.color} transition-all`}
            style={{ width: `${(questionIndex / totalQuestions) * 100}%` }} />
        </div>
        <QuizQuestionCard
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          correctIndex={currentQuestion.correctIndex}
          selected={selected}
          isCorrect={isCorrect}
          onSelect={onSelect}
          onNext={onNext}
          isLast={questionIndex >= totalQuestions - 1}
          accentGradient={current.color}
          correctMessage="🌟 נכון מאוד!"
          idleButtonClass="bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-400"
        />
      </div>
    </div>
  );
}
