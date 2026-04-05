'use client';

interface Question {
  text: string;
  answer: number;
  choices: number[];
}

interface Props {
  q: Question;
  feedback: 'correct' | 'wrong' | null;
  streak: number;
  onTap: (choice: number) => void;
}

export default function MathRaceQuestion({ q, feedback, streak, onTap }: Props) {
  return (
    <>
      <div className={`w-full max-w-sm bg-white rounded-3xl p-8 text-center shadow-2xl mb-5 transition-all duration-150 ${
        feedback === 'correct' ? 'bg-green-50 ring-4 ring-green-400 scale-105' :
        feedback === 'wrong' ? 'bg-red-50 ring-4 ring-red-400' : ''
      }`}>
        <p className="text-4xl font-black text-gray-700 tracking-wide">{q.text}</p>
        {feedback && (
          <p className={`text-2xl mt-3 font-bold ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
            {feedback === 'correct' ? `✅ ${streak >= 3 ? 'בום! +20' : 'נכון! +10'}` : `❌ התשובה: ${q.answer}`}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {q.choices.map(c => (
          <button
            key={c}
            onClick={() => onTap(c)}
            disabled={!!feedback}
            className="py-5 rounded-3xl bg-white font-black text-3xl text-indigo-700 shadow-xl border-2 border-blue-200 active:scale-90 hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-50"
          >
            {c}
          </button>
        ))}
      </div>
    </>
  );
}
