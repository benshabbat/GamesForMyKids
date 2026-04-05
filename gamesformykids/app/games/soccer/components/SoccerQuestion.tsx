'use client';

import { PitchBackground, GoalAnimation, CATEGORY_ICONS } from './SoccerShared';

interface SoccerQuestion {
  emoji: string;
  category: string;
  question: string;
  answers: string[];
  correctIndex: number;
  funFact: string;
}

interface Props {
  currentIndex: number;
  total: number;
  score: number;
  currentQuestion: SoccerQuestion;
  phase: string;
  selected: number | null;
  isCorrect: boolean;
  showGoal: boolean;
  onSelect: (idx: number) => void;
  onNext: () => void;
  onMenu: () => void;
}

export default function SoccerQuestion({ currentIndex, total, score, currentQuestion, phase, selected, isCorrect, showGoal, onSelect, onNext, onMenu }: Props) {
  return (
    <PitchBackground>
      {showGoal && <GoalAnimation />}
      <div className="flex flex-col min-h-screen p-4" dir="rtl">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onMenu} className="text-green-200 text-sm font-bold">← חזור</button>
          <div className="flex items-center gap-3">
            <span className="bg-white bg-opacity-20 text-white font-bold px-3 py-1 rounded-full text-sm">
              {CATEGORY_ICONS[currentQuestion.category] ?? '⚽'} {currentQuestion.category}
            </span>
            <span className="bg-yellow-400 text-green-900 font-black px-3 py-1 rounded-full text-sm">
              ⚽ {score}
            </span>
          </div>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-4">
          <div className="h-2 bg-yellow-400 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }} />
        </div>
        <p className="text-green-200 text-xs text-center mb-4">שאלה {currentIndex + 1} מתוך {total}</p>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mb-5 text-center">
            <div className="text-6xl mb-3">{currentQuestion.emoji}</div>
            <p className="text-lg font-bold text-gray-800 leading-relaxed">{currentQuestion.question}</p>
            {phase === 'answered' && (
              <div className={`mt-4 p-3 rounded-xl text-sm leading-relaxed ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                <p className="font-bold">{isCorrect ? '✅ שאל אחד!' : `❌ התשובה: ${currentQuestion.answers[currentQuestion.correctIndex]}`}</p>
                <p className="text-xs mt-1">💡 {currentQuestion.funFact}</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            {currentQuestion.answers.map((ans, idx) => {
              let cls = 'py-3 px-4 rounded-xl font-bold text-center shadow-md active:scale-95 transition-all text-sm ';
              if (phase === 'answered') {
                if (idx === currentQuestion.correctIndex) cls += 'bg-green-500 text-white ring-4 ring-green-300';
                else if (idx === selected) cls += 'bg-red-400 text-white';
                else cls += 'bg-white bg-opacity-50 text-gray-500';
              } else {
                cls += 'bg-white text-gray-800 hover:bg-yellow-50 border-2 border-transparent hover:border-yellow-400';
              }
              return (
                <button key={idx} onClick={() => onSelect(idx)} disabled={phase === 'answered'} className={cls}>
                  {ans}
                </button>
              );
            })}
          </div>
          {phase === 'answered' && (
            <button onClick={onNext}
              className="mt-6 px-10 py-3 bg-yellow-400 text-green-900 rounded-xl font-black shadow-xl active:scale-95 text-lg">
              {currentIndex + 1 < total ? 'הבא ⚽' : 'סיום! 🏆'}
            </button>
          )}
        </div>
      </div>
    </PitchBackground>
  );
}
