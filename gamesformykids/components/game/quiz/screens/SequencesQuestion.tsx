'use client';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import type { SequenceLevel, SequenceQuestion } from '@/lib/quiz/data/sequences';
import { answerButtonClass } from '@/lib/quiz/answerButtonClass';

interface Props {
  level: SequenceLevel;
  current: SequenceQuestion;
  choices: number[];
  onSelect: (n: number) => void;
}

export default function SequencesQuestion({ level, current, choices, onSelect }: Props) {
  const index     = useQuizGameStore(s => s.index);
  const total     = useQuizGameStore(s => s.total);
  const score     = useQuizGameStore(s => s.score);
  const selected  = useQuizGameStore(s => s.selected !== null ? Number(s.selected) : null);
  const isCorrect = useQuizGameStore(s => s.isCorrect ?? false);
  const next      = useQuizGameStore(s => s.nextQuestion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-100 p-4" dir="rtl">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-cyan-700">{level.label} | {index + 1} / {total}</span>
          <span className="font-bold text-cyan-700">⭐ {score * 10}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-cyan-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-5">
          <p className="text-sm font-semibold text-gray-400 text-center mb-4">מה המספר הבא?</p>
          <div className="flex flex-wrap justify-center gap-3 items-center">
            {current.sequence.map((n, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 border-2 border-cyan-300 flex items-center justify-center font-black text-xl text-cyan-800">{n}</div>
                {i < current.sequence.length - 1 && <span className="text-gray-400 font-bold">،</span>}
              </div>
            ))}
            <span className="text-gray-400 font-bold text-2xl">,</span>
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center text-3xl">
              {selected !== null ? (isCorrect ? '✅' : '❌') : '❓'}
            </div>
          </div>
          {selected !== null && <p className="text-center mt-3 text-sm text-gray-500">כלל: {current.rule}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {choices.map((n, i) => (
            <button key={i} onClick={() => onSelect(n)} disabled={selected !== null}
              className={`py-5 rounded-2xl font-black text-3xl transition-all active:scale-95 ${answerButtonClass(
                n === current.next, n === selected, selected !== null,
                'bg-white border-2 border-gray-200 text-gray-700 hover:border-cyan-400',
              )}`}>
              {n}
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? `✅ נכון! הסדרה: ${[...current.sequence, current.next].join(', ')}` : `💙 הנכון: ${current.next} (כלל: ${current.rule})`}
            </div>
            <button onClick={next} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-cyan-500 to-sky-600 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
