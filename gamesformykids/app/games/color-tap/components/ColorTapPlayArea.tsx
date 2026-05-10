'use client';
import { useColorTapGame, TIME_PER_Q } from '../useColorTapGame';
import LivesDisplay from '@/components/game/shared/LivesDisplay';
import { useKeyboardControls } from '@/hooks/shared/game-controls/useKeyboardControls';
import { KeyboardHint } from '@/components/game/shared/KeyboardHint';

export default function ColorTapPlayArea() {
  const { question, feedback, timeLeft, score, lives, handleTap } =
    useColorTapGame();

  useKeyboardControls(
    {
      '1': () => handleTap(question.options[0]),
      '2': () => handleTap(question.options[1]),
      '3': () => handleTap(question.options[2]),
      '4': () => handleTap(question.options[3]),
    },
    !feedback,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      <div className="flex gap-8 mb-5 text-center">
        <div>
          <p className="text-2xl font-black text-pink-600">{score}</p>
          <p className="text-xs text-pink-400">ניקוד</p>
        </div>
        <div className="flex gap-1 items-center">
          <LivesDisplay lives={lives} />
        </div>
        <div>
          <p className={`text-2xl font-black ${timeLeft <= 2 ? 'text-red-500 animate-pulse' : 'text-purple-600'}`}>{timeLeft}</p>
          <p className="text-xs text-purple-400">שניות</p>
        </div>
      </div>

      <div className={`mb-6 rounded-3xl p-6 text-center shadow-xl w-full max-w-xs transition-all duration-200 ${
        feedback === 'correct' ? 'bg-green-100 ring-4 ring-green-400' :
        feedback === 'wrong' ? 'bg-red-100 ring-4 ring-red-400' : 'bg-white'
      }`}>
        <p className="text-gray-400 text-sm mb-3">בחר את הצבע:</p>
        <div className="flex items-center gap-4 justify-center mb-3">
          <div className={`w-16 h-16 rounded-full ${question.target.bg} shadow-lg`} />
          <p className="text-4xl font-black text-gray-700">{question.target.name}</p>
        </div>
        <div className="bg-gray-100 rounded-full h-2 w-full mx-auto">
          <div
            className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(timeLeft / TIME_PER_Q) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {question.options.map(color => (
          <button
            key={color.name}
            onClick={() => handleTap(color)}
            disabled={!!feedback}
            className={`${color.bg} h-24 rounded-3xl shadow-xl font-black text-white text-lg flex items-center justify-center gap-2 active:scale-90 transition-all hover:brightness-110 disabled:opacity-80`}
          >
            <span className="text-3xl">{color.emoji}</span>
            <span>{color.name}</span>
          </button>
        ))}
      </div>
      <KeyboardHint
        hints={question.options.map((c, i) => ({ key: String(i + 1), label: c.name }))}
      />
    </div>
  );
}
