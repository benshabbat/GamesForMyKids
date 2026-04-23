'use client';
import { QuizProgress, QuizAnswerGrid, QuizFeedback } from '@/components/game/quiz';

const SHAPE_COLORS: Record<string, string> = {
  'קובייה':        '#6366f1',
  'כדור':          '#06b6d4',
  'גליל':          '#f59e0b',
  'חרוני':          '#ef4444',
  'פירמידה':       '#8b5cf6',
  'מנסרה משולשת':  '#10b981',
  'תיבה':          '#3b82f6',
  'כדורי (ספירה)': '#06b6d4',
};

interface Shape3d {
  shape: string;
  emoji: string;
}

interface Shapes3dQuestion {
  type: string;
  question: string;
  answer: string;
}

interface Props {
  index: number;
  total: number;
  score: number;
  current: Shapes3dQuestion;
  currentShape: Shape3d | null;
  choices: string[];
  selected: string | null;
  isCorrect: boolean;
  onSelect: (choice: string) => void;
  onNext: () => void;
}

export default function Shapes3dQuestion({ index, total, score, current, currentShape, choices, selected, isCorrect, onSelect, onNext }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress index={index} total={total} score={score} theme="indigo" />
        <div className="bg-indigo-50 rounded-2xl p-5 mb-5 text-center">
          {currentShape && (
            <>
              <div className="text-6xl mb-2" style={{ filter: `drop-shadow(0 0 8px ${SHAPE_COLORS[currentShape.shape] ?? '#6366f1'})` }}>
                {currentShape.emoji}
              </div>
              {current.type !== 'name' && (
                <div className="text-lg font-bold mb-1" style={{ color: SHAPE_COLORS[currentShape.shape] ?? '#6366f1' }}>
                  {currentShape.shape}
                </div>
              )}
            </>
          )}
          <p className="text-gray-800 text-lg font-bold mt-2 leading-relaxed">{current.question}</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          selected={selected}
          isCorrect={isCorrect}
          correctValue={current.answer}
          onSelect={onSelect}
          theme="indigo"
        />
        <QuizFeedback
          isCorrect={selected !== null ? isCorrect : null}
          correctLabel={current.answer}
          onNext={onNext}
          index={index}
          total={total}
          theme="indigo"
        />
      </div>
    </div>
  );
}