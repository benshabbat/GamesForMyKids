'use client';

interface TrueFalseQuestion {
  emoji: string;
  fact: string;
  answer: boolean;
}

interface Props {
  score: number;
  lives: number;
  timeLeft: number;
  timePer: number;
  q: TrueFalseQuestion | null;
  feedback: string | null;
  onAnswer: (val: boolean) => void;
}

export default function TrueFalsePlayScreen({ score, lives, timeLeft, timePer, q, feedback, onAnswer }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      <div className="flex gap-6 mb-5 text-center">
        <div><p className="text-2xl font-black text-teal-600">{score}</p><p className="text-xs text-teal-400">ניקוד</p></div>
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map(i => <span key={i} className={`text-2xl ${i < lives ? '' : 'opacity-20'}`}>❤️</span>)}
        </div>
        <div>
          <p className={`text-2xl font-black ${timeLeft <= 2 ? 'text-red-500 animate-pulse' : 'text-cyan-600'}`}>{timeLeft}</p>
          <p className="text-xs text-cyan-400">שניות</p>
        </div>
      </div>
      <div className={`w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl mb-6 transition-all duration-200 ${
        feedback === 'correct' ? 'ring-4 ring-green-400 bg-green-50' :
        feedback === 'wrong'   ? 'ring-4 ring-red-400 bg-red-50' : ''
      }`}>
        <div className="text-5xl mb-4">{q?.emoji}</div>
        <p className="text-xl font-bold text-gray-700 leading-relaxed">{q?.fact}</p>
        {feedback && (
          <p className={`text-3xl mt-3 ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
            {feedback === 'correct' ? '✅ נכון!' : q?.answer ? '❌ אוי! זה נכון' : '❌ אוי! זה לא נכון'}
          </p>
        )}
        <div className="mt-4 bg-gray-100 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-teal-400 to-cyan-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(timeLeft / timePer) * 100}%` }}
          />
        </div>
      </div>
      <div className="flex gap-5 w-full max-w-sm">
        <button
          onClick={() => onAnswer(true)}
          disabled={!!feedback}
          className="flex-1 py-6 rounded-3xl bg-green-500 text-white font-black text-5xl shadow-xl active:scale-90 hover:bg-green-400 transition-all disabled:opacity-60"
        >✅</button>
        <button
          onClick={() => onAnswer(false)}
          disabled={!!feedback}
          className="flex-1 py-6 rounded-3xl bg-red-500 text-white font-black text-5xl shadow-xl active:scale-90 hover:bg-red-400 transition-all disabled:opacity-60"
        >❌</button>
      </div>
    </div>
  );
}
