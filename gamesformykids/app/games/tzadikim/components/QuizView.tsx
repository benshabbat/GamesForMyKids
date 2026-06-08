'use client';

import { TzaddikStory, QuizQuestion } from '../data/tzadikim';
import QuizQuestionCard from '@/components/game/quiz/QuizQuestionCard';

interface QuizViewProps {
  story: TzaddikStory;
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  selected: number | null;
  isCorrect: boolean | null;
  score: number;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
}

export default function QuizView({
  story,
  question,
  questionIndex,
  totalQuestions,
  selected,
  isCorrect,
  score,
  onSelectAnswer,
  onNext,
}: QuizViewProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${story.bgGradient} p-4`}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{story.emoji}</div>
          <h2 className="text-xl font-bold text-gray-700">{story.name}</h2>
          <p className="text-gray-500 text-sm">שאלה {questionIndex + 1} מתוך {totalQuestions}</p>
          <div className="mt-3 h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-l ${story.color} transition-all duration-500`}
              style={{ width: `${(questionIndex / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <QuizQuestionCard
          question={question.question}
          answers={question.answers}
          correctIndex={question.correctIndex}
          selected={selected}
          isCorrect={isCorrect}
          onSelect={onSelectAnswer}
          onNext={onNext}
          isLast={questionIndex >= totalQuestions - 1}
          accentGradient={story.color}
          idleButtonClass="bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-400 hover:bg-amber-50"
        />

        <div className="text-center mt-4 text-gray-500 text-sm">
          ⭐ {score} נקודות עד כה
        </div>
      </div>
    </div>
  );
}
