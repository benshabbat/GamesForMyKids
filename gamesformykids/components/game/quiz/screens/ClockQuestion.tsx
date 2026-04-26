'use client';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import type { ClockQuestion as ClockQuestionType } from '@/lib/quiz/data/clock';
import { answerButtonClass } from '@/lib/quiz/answerButtonClass';
import ClockFace from './ClockFace';

interface Props {
  current: ClockQuestionType;
  choices: ClockQuestionType[];
  onSelect: (id: number) => void;
}

export default function ClockQuestion({ current, choices, onSelect }: Props) {
  const index     = useQuizGameStore(s => s.index);
  const total     = useQuizGameStore(s => s.total);
  const score     = useQuizGameStore(s => s.score);
  const selected  = useQuizGameStore(s => s.selected !== null ? Number(s.selected) : null);
  const isCorrect = useQuizGameStore(s => s.isCorrect ?? false);
  const next      = useQuizGameStore(s => s.nextQuestion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-indigo-700">{index + 1} / {total}</span>
          <span className="font-bold text-indigo-700">⭐ {score * 10}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-indigo-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-5 text-center">
          <p className="text-lg font-bold text-gray-600 mb-4">מה השעה?</p>
          <div className="flex justify-center">
            <ClockFace hour={current.hour} minute={current.minute} size={180} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {choices.map(c => (
            <button key={c.id} onClick={() => onSelect(c.id)} disabled={selected !== null}
              className={`py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${answerButtonClass(
                c.id === current.id, c.id === selected, selected !== null,
                'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50',
              )}`}>
              <div className="text-2xl font-black">{c.digital}</div>
              <div className="text-sm opacity-75 mt-0.5">{c.description}</div>
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? `✅ נכון! ${current.digital} — ${current.description}` : `💙 ${current.digital} — ${current.description}`}
            </div>
            <button onClick={next} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-violet-500 to-indigo-600 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
