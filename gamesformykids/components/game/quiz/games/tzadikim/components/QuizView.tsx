'use client';

import { TzaddikStory, QuizQuestion } from '../data/tzadikim';
import { AnswerFeedback } from '../useTzadikimGame';

interface QuizViewProps {
  story: TzaddikStory;
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  feedback: AnswerFeedback | null;
  score: number;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
}

export default function QuizView({
  story,
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  feedback,
  score,
  onSelectAnswer,
  onNext,
}: QuizViewProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${story.bgGradient} p-4`} dir="rtl">
      <div className="max-w-2xl mx-auto">

        {/* כותרת חידון */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{story.emoji}</div>
          <h2 className="text-xl font-bold text-gray-700">{story.name}</h2>
          <p className="text-gray-500 text-sm">שאלה {questionIndex + 1} מתוך {totalQuestions}</p>

          {/* פס התקדמות */}
          <div className="mt-3 h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-l ${story.color} transition-all duration-500`}
              style={{ width: `${((questionIndex) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* כרטיס השאלה */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-5">
          <p className="text-xl font-bold text-gray-800 leading-relaxed text-center">
            {question.question}
          </p>
        </div>

        {/* תשובות */}
        <div className="space-y-3 mb-5">
          {question.answers.map((answer, index) => {
            let btnStyle = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-400 hover:bg-amber-50';
            let icon = '';

            if (feedback) {
              if (index === question.correctIndex) {
                btnStyle = 'bg-green-500 border-2 border-green-600 text-white shadow-lg';
                icon = '✅ ';
              } else if (index === selectedAnswer && !feedback.isCorrect) {
                btnStyle = 'bg-red-400 border-2 border-red-500 text-white';
                icon = '❌ ';
              } else {
                btnStyle = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
              }
            }

            return (
              <button
                key={index}
                onClick={() => onSelectAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`
                  w-full text-right py-4 px-5 rounded-2xl font-semibold text-lg
                  transition-all duration-200 active:scale-95
                  ${btnStyle}
                `}
              >
                {icon}{answer}
              </button>
            );
          })}
        </div>

        {/* פידבק */}
        {feedback && (
          <div className={`
            rounded-2xl p-4 mb-5 text-center font-bold text-lg
            ${feedback.isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}
          `}>
            {feedback.isCorrect
              ? '🌟 כל הכבוד! תשובה נכונה!'
              : `💙 התשובה הנכונה: "${question.answers[question.correctIndex]}"`
            }
          </div>
        )}

        {/* כפתור הבא */}
        {feedback && (
          <button
            onClick={onNext}
            className={`
              w-full py-4 rounded-2xl text-white font-bold text-xl shadow-lg
              bg-gradient-to-l ${story.color}
              hover:opacity-90 active:scale-95 transition-all duration-200
            `}
          >
            {questionIndex < totalQuestions - 1 ? 'שאלה הבאה ←' : 'לתוצאות! 🎉'}
          </button>
        )}

        {/* ניקוד שוטף */}
        <div className="text-center mt-4 text-gray-500 text-sm">
          ⭐ {score} נקודות עד כה
        </div>
      </div>
    </div>
  );
}
