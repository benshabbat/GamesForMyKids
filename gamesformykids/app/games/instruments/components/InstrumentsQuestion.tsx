'use client';
import { QuizProgress, QuizAnswerGrid, QuizFeedback } from '@/components/game/quiz';

const FAMILY_COLORS: Record<string, string> = {
  'מיתרים': 'bg-amber-100 text-amber-800 border-amber-300',
  'נשיפה':  'bg-blue-100 text-blue-800 border-blue-300',
  'הקשה':   'bg-red-100 text-red-800 border-red-300',
  'מקלדת':  'bg-purple-100 text-purple-800 border-purple-300',
};

interface Instrument {
  emoji: string;
  family: string;
  description: string;
  instrument: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: Instrument;
  choices: string[];
  selected: string | null;
  isCorrect: boolean;
  onSelect: (choice: string) => void;
  onNext: () => void;
}

export default function InstrumentsQuestion({ index, total, score, current, choices, selected, isCorrect, onSelect, onNext }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress index={index} total={total} score={score} theme="amber" />
        <div className="bg-amber-50 rounded-2xl p-5 mb-5 text-center">
          <div className="text-6xl mb-3">{current.emoji}</div>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${FAMILY_COLORS[current.family] ?? 'bg-gray-100 text-gray-700'}`}>
            משפחה: {current.family}
          </span>
          <p className="text-gray-700 text-base mt-3 leading-relaxed">{current.description}</p>
          <p className="text-amber-700 font-bold mt-2">שם כלי הנגינה הוא?</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          selected={selected}
          isCorrect={isCorrect}
          correctValue={current.instrument}
          onSelect={onSelect}
          theme="amber"
        />
        <QuizFeedback
          isCorrect={selected !== null ? isCorrect : null}
          correctLabel={current.instrument}
          correctMsg="🎵 נכון מאוד!"
          onNext={onNext}
          index={index}
          total={total}
          theme="amber"
        />
      </div>
    </div>
  );
}