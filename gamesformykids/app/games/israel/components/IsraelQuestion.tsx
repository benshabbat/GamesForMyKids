'use client';
import { QuizProgress, QuizAnswerGrid, QuizFeedback } from '@/components/game/quiz';

const CAT_COLORS: Record<string, string> = {
  'הכל':      'bg-blue-600 text-white',
  'גאוגרפיה': 'bg-teal-500 text-white',
  'היסטוריה': 'bg-amber-500 text-white',
  'תרבות':    'bg-purple-500 text-white',
  'טבע':      'bg-green-500 text-white',
  'ערים':     'bg-rose-500 text-white',
};

interface IsraelQuestion {
  emoji: string;
  category: string;
  question: string;
  answers: string[];
  correctIndex: number;
  funFact: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: IsraelQuestion;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (i: number) => void;
  onNext: () => void;
}

export default function IsraelQuestion({ index, total, score, current, selected, isCorrect, onSelect, onNext }: Props) {
  const strSelected = selected !== null ? String(selected) : null;
  const choices = current.answers.map((_, i) => String(i));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress index={index} total={total} score={score} theme="blue" />
        <div className="bg-blue-50 rounded-2xl p-5 mb-5 text-center">
          <div className="text-5xl mb-2">{current.emoji}</div>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${CAT_COLORS[current.category] ?? 'bg-gray-400 text-white'}`}>
            {current.category}
          </span>
          <p className="text-gray-800 text-lg font-bold leading-relaxed">{current.question}</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          selected={strSelected}
          isCorrect={isCorrect}
          correctValue={String(current.correctIndex)}
          onSelect={(v) => onSelect(Number(v))}
          theme="blue"
          renderChoice={(v) => current.answers[Number(v)]}
        />
        <QuizFeedback
          isCorrect={selected !== null ? isCorrect : null}
          correctLabel={current.answers[current.correctIndex]}
          funFact={`💡 ${current.funFact}`}
          onNext={onNext}
          index={index}
          total={total}
          theme="blue"
        />
      </div>
    </div>
  );
}
