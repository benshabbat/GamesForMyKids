'use client';

interface Question {
  a: number;
  b: number;
  op: '+' | '-';
  emojiA: string;
  emojiB: string;
  choices: number[];
}

interface Props {
  q: Question;
  feedback: 'correct' | 'wrong' | null;
  level: number;
  timeLeft: number;
  timePerQ: number;
  score: number;
  lives: number;
  streak: number;
  onTap: (choice: number) => void;
}

function renderEmojis(count: number, emoji: string) {
  return Array.from({ length: Math.min(count, 15) }, (_, i) => (
    <span key={i} className="text-2xl leading-none">{emoji}</span>
  ));
}

export default function EmojiMathPlayArea({ q, feedback, level, timeLeft, timePerQ, score, lives, streak, onTap }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      <div className="flex gap-5 mb-4 text-center">
        <div>
          <p className="text-2xl font-black text-orange-600">{score}</p>
          <p className="text-xs text-orange-400">ניקוד</p>
        </div>
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map(i => (
            <span key={i} className={`text-xl ${i < lives ? '' : 'opacity-20'}`}>❤️</span>
          ))}
        </div>
        <div>
          <p className={`text-2xl font-black ${timeLeft <= 2 ? 'text-red-500 animate-pulse' : 'text-orange-700'}`}>{timeLeft}</p>
          <p className="text-xs text-orange-400">שניות</p>
        </div>
        {streak >= 2 && (
          <div>
            <p className="text-2xl font-black text-yellow-500">🔥{streak}</p>
            <p className="text-xs text-yellow-400">רצף</p>
          </div>
        )}
      </div>

      <div className={`w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl mb-5 transition-all duration-200 ${
        feedback === 'correct' ? 'ring-4 ring-green-400 bg-green-50' :
        feedback === 'wrong' ? 'ring-4 ring-red-400 bg-red-50' : ''
      }`}>
        <p className="text-center text-gray-400 text-xs mb-3">רמה {level}</p>
        <div className="flex flex-wrap gap-1 justify-center mb-3 min-h-12 p-2 bg-orange-50 rounded-2xl">
          {renderEmojis(q.a, q.emojiA)}
        </div>
        <div className="text-center text-2xl font-black text-gray-700 my-2">
          {q.op === '+' ? '➕' : '➖'}
        </div>
        <div className="flex flex-wrap gap-1 justify-center mb-3 min-h-12 p-2 bg-yellow-50 rounded-2xl">
          {renderEmojis(q.b, q.emojiB)}
        </div>
        <p className="text-center text-4xl font-black text-gray-700">= ?</p>
        <div className="mt-3 bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1.5 rounded-full transition-all duration-1000"
            style={{ width: `${(timeLeft / timePerQ) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {q.choices.map(c => (
          <button
            key={c}
            onClick={() => onTap(c)}
            disabled={!!feedback}
            className="py-5 rounded-3xl bg-white font-black text-3xl text-gray-700 shadow-xl border-2 border-orange-200 active:scale-90 hover:border-orange-400 transition-all disabled:opacity-60"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
