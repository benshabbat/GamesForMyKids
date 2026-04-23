'use client';
import { QuizProgress, QuizAnswerGrid, QuizFeedback } from '@/components/game/quiz';

const CAT_COLORS: Record<string, string> = {
  'הכל': 'bg-indigo-600 text-white',
  'חיות': 'bg-green-500 text-white',
  'אוכל': 'bg-orange-500 text-white',
  'גוף': 'bg-pink-500 text-white',
  'בית': 'bg-teal-500 text-white',
  'צבעים': 'bg-purple-500 text-white',
  'מספרים': 'bg-blue-500 text-white',
};

interface Word {
  emoji: string;
  hebrew: string;
  english: string;
  category: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: Word;
  choices: string[];
  selected: string | null;
  isCorrect: boolean;
  onSelect: (choice: string) => void;
  onNext: () => void;
}

export default function EnglishWordsQuestion({ index, total, score, current, choices, selected, isCorrect, onSelect, onNext }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress index={index} total={total} score={score} theme="indigo" />
        <div className="bg-indigo-50 rounded-2xl p-6 mb-5 text-center">
          <div className="text-6xl mb-3">{current.emoji}</div>
          <p className="text-gray-500 text-sm mb-1">מה המילה באנגלית?</p>
          <p className="text-3xl font-bold text-indigo-800">{current.hebrew}</p>
          <span className={`inline-block text-xs font-semibold mt-2 px-3 py-1 rounded-full ${CAT_COLORS[current.category] ?? 'bg-gray-400 text-white'}`}>
            {current.category}
          </span>
        </div>
        <div dir="ltr">
          <QuizAnswerGrid
            choices={choices}
            selected={selected}
            isCorrect={isCorrect}
            correctValue={current.english}
            onSelect={onSelect}
            theme="indigo"
          />
        </div>
        <QuizFeedback
          isCorrect={selected !== null ? isCorrect : null}
          correctLabel={current.english}
          onNext={onNext}
          index={index}
          total={total}
          theme="indigo"
          correctMsg={`🎉 Correct! ${current.english}`}
        />
      </div>
    </div>
  );
}