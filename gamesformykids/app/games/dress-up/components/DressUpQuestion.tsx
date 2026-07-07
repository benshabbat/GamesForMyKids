'use client';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import {
  ZONE_ORDER, ZONE_PLACEHOLDER, ZONE_LABEL, CATEGORY_LABELS, QUESTIONS_PER_GAME,
  type ClothingItem, type Zone,
} from '../useDressUpGame';

interface Props {
  current: ClothingItem;
  choices: ClothingItem[];
  dressed: Partial<Record<Zone, ClothingItem>>;
  wrongFlash: boolean;
  onSelect: (item: ClothingItem) => void;
}

export default function DressUpQuestion({ current, choices, dressed, wrongFlash, onSelect }: Props) {
  const index = useQuizGameStore((s) => s.index);
  const score = useQuizGameStore((s) => s.score);
  const isCorrect = useQuizGameStore((s) => s.isCorrect);

  const feedback = isCorrect === true ? 'correct' : wrongFlash ? 'wrong' : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-50 to-purple-200 flex flex-col items-center p-4" dir="rtl">
      <div className="w-full max-w-md flex justify-between items-center mb-4 pt-2">
        <span className="bg-white rounded-full px-4 py-1 text-purple-700 font-bold text-lg shadow">
          {index + 1} / {QUESTIONS_PER_GAME}
        </span>
        <span className="text-purple-600 text-sm font-medium">{CATEGORY_LABELS[current.category]}</span>
        <span className="bg-white rounded-full px-4 py-1 text-purple-700 font-bold text-lg shadow">
          ⭐ {score}
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-4 mb-4 w-full max-w-md">
        <div className="flex justify-center gap-6">
          <div className="flex flex-col gap-2 items-center">
            {ZONE_ORDER.map(zone => (
              <div key={zone} className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-12 text-start">{ZONE_LABEL[zone]}</span>
                <div className={`w-14 h-12 flex items-center justify-center rounded-xl border-2 transition-colors ${
                  dressed[zone]
                    ? 'border-purple-300 bg-purple-50'
                    : 'border-dashed border-gray-200 bg-gray-50'
                }`}>
                  <span className="text-3xl">
                    {dressed[zone] ? dressed[zone]!.emoji : ZONE_PLACEHOLDER[zone]}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center text-6xl leading-none">
            <span>🧑</span>
          </div>
        </div>
      </div>

      <div className={`bg-white rounded-2xl shadow-lg p-4 mb-4 w-full max-w-md text-center border-4 transition-colors ${
        feedback === 'correct' ? 'border-green-400 bg-green-50' :
        feedback === 'wrong' ? 'border-red-300 bg-red-50' :
        'border-purple-200'
      }`}>
        <button
          onClick={() => speakHebrew(current.prompt)}
          className="text-2xl font-bold text-purple-700 flex items-center justify-center gap-2 w-full"
        >
          <span className="text-3xl">🔊</span>
          <span>{current.prompt}</span>
        </button>
        {feedback === 'correct' && (
          <p className="text-green-600 font-bold mt-2 text-lg motion-safe:animate-bounce">✅ כן! {current.hebrew}!</p>
        )}
        {feedback === 'wrong' && (
          <p className="text-red-500 font-bold mt-2">❌ לא נכון, נסה שוב!</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {choices.map(item => (
          <button
            key={item.name}
            onClick={() => onSelect(item)}
            disabled={feedback === 'correct'}
            className={`bg-white rounded-2xl shadow-md p-4 flex flex-col items-center gap-2 border-2 transition active:scale-95 ${
              feedback === 'correct' && item.name === current.name
                ? 'border-green-500 bg-green-50 scale-105'
                : feedback === 'wrong' && item.name === current.name
                ? 'border-purple-300'
                : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
            }`}
          >
            <span className="text-5xl">{item.emoji}</span>
            <span className="text-base font-bold text-purple-800">{item.hebrew}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
