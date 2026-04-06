'use client';
import ClockFace from './ClockFace';
import { ClockQuestion as ClockQuestionType } from '../data/times';

interface Props {
  index: number;
  total: number;
  score: number;
  current: ClockQuestionType;
  choices: ClockQuestionType[];
  selected: number | null;
  isCorrect: boolean;
  onSelect: (id: number) => void;
  onNext: () => void;
  onMenu: () => void;
}

export default function ClockQuestion({ index, total, score, current, choices, selected, isCorrect, onSelect, onNext, onMenu }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onMenu} className="text-indigo-500 text-sm bg-indigo-100 rounded-full px-3 py-1">← חזור</button>
          <span className="font-bold text-indigo-700">{index + 1} / {total}</span>
          <span className="font-bold text-indigo-700">⭐ {score}</span>
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
          {choices.map(c => {
            const isRight = c.id === current.id;
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50';
            if (selected !== null) {
              if (isRight) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (c.id === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button key={c.id} onClick={() => onSelect(c.id)} disabled={selected !== null}
                className={`py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${style}`}>
                <div className="text-2xl font-black">{c.digital}</div>
                <div className="text-sm opacity-75 mt-0.5">{c.description}</div>
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? `✅ נכון! ${current.digital} — ${current.description}` : `💙 ${current.digital} — ${current.description}`}
            </div>
            <button onClick={onNext} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-violet-500 to-indigo-600 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
