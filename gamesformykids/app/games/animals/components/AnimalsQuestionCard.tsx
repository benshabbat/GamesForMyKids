'use client';
import { useQuizGameStore } from '@/lib/stores';
import { useAnimalsStore } from '@/lib/stores/animalsStore';

export default function AnimalsQuestionCard() {
  const index     = useQuizGameStore(s => s.index);
  const total     = useQuizGameStore(s => s.total);
  const score     = useQuizGameStore(s => s.score);
  const selected  = useQuizGameStore(s => s.selected);
  const isCorrect = useQuizGameStore(s => s.isCorrect);
  const nextQuestion = useQuizGameStore(s => s.nextQuestion);
  const goToMenu     = useQuizGameStore(s => s.goToMenu);

  const questions    = useAnimalsStore(s => s.questions);
  const selectAnswer = useAnimalsStore(s => s.selectAnswer);

  const current = questions[index] ?? null;
  if (!current) return null;
  const prompt = current.mode === 'emoji-to-name' ? current.animal.emoji : current.animal.hebrew;
  const promptLabel = current.mode === 'emoji-to-name' ? 'מה שם החיה?' : 'מה הסמל של החיה?';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={goToMenu} className="text-green-500 text-sm bg-green-100 rounded-full px-3 py-1">← חזור</button>
          <span className="text-green-700 font-bold">שאלה {index + 1} / {total}</span>
          <span className="text-green-700 font-bold">⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-green-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-5 text-center">
          <p className="text-8xl mb-3">{prompt}</p>
          <p className="text-xl font-bold text-gray-700">{promptLabel}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {current.choices.map(animal => {
            const displayVal = current.mode === 'emoji-to-name' ? animal.hebrew : animal.emoji;
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-400 hover:bg-green-50';
            if (selected) {
              if (animal.id === current.animal.id) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (animal.id === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button key={animal.id} onClick={() => selectAnswer(animal.id)} disabled={!!selected}
                className={`py-4 rounded-2xl text-2xl font-bold transition-all active:scale-95 ${style}`}>
                {displayVal}
              </button>
            );
          })}
        </div>
        {selected && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? `✅ נכון! ${current.animal.hebrew} ${current.animal.emoji}` : `💙 זה: ${current.animal.hebrew} ${current.animal.emoji}`}
              <p className="text-sm font-normal opacity-80 mt-1">{current.animal.fact}</p>
            </div>
            <button onClick={nextQuestion} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-green-500 to-teal-600 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
