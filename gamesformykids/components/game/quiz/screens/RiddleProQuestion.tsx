'use client';
import type { RiddlesProState } from '@/lib/quiz/useRiddlesProGame';
import type { RiddlePro } from '@/lib/quiz/data/riddles-pro';

interface Props {
  current: RiddlePro;
  choices: string[];
  cluesRevealed: RiddlesProState['cluesRevealed'];
  answersShown: boolean;
  questionNumber: number;
  total: number;
  score: number;
  lastPoints: number | null;
  lastCorrect: boolean | null;
  onRevealClue: () => void;
  onShowAnswers: () => void;
  onSelect: (choice: string) => void;
}

const POINTS_COLOR = ['text-green-600', 'text-yellow-600', 'text-orange-600'] as const;

export default function RiddleProQuestion({
  current, choices, cluesRevealed, answersShown, questionNumber, total, score,
  lastPoints, lastCorrect, onRevealClue, onShowAnswers, onSelect,
}: Props) {
  const waiting = lastCorrect !== null;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-6"
      style={{ background: 'linear-gradient(135deg, #fdf4ff 0%, #e0f2fe 100%)' }}
      dir="rtl">

      {/* Header */}
      <div className="w-full max-w-sm flex justify-between items-center mb-4 text-sm text-gray-500">
        <span>שאלה {questionNumber}/{total}</span>
        <span className="font-bold text-purple-700">⭐ {score} נקודות</span>
      </div>

      {/* Riddle card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-5 mb-4">
        <div className="text-4xl text-center mb-3">🤔</div>
        <p className="text-center text-lg font-semibold text-gray-800 leading-relaxed">
          {current.riddle}
        </p>
      </div>

      {/* Clue slots */}
      <div className="flex gap-3 mb-4">
        {current.clues.map((clue, i) => (
          <div key={i}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow transition-all duration-300 ${
              i < cluesRevealed
                ? 'bg-purple-100 border-2 border-purple-400 scale-110'
                : 'bg-gray-100 border-2 border-gray-200 opacity-40'
            }`}>
            {i < cluesRevealed ? clue : '❓'}
          </div>
        ))}
      </div>

      {/* Feedback */}
      {waiting && (
        <div className={`rounded-2xl p-3 mb-3 text-center text-xl font-bold ${lastCorrect ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
          {lastCorrect
            ? `✅ נכון! +${lastPoints} ${lastPoints === 3 ? '🌟🌟🌟' : lastPoints === 2 ? '🌟🌟' : '🌟'}`
            : `💙 כמעט! הנכון: ${current.answer}`}
        </div>
      )}

      {/* Scoring hint (only when no feedback shown) */}
      {!waiting && (
        <div className="flex gap-2 mb-4 text-xs text-gray-400">
          <span className={`${POINTS_COLOR[0]} font-bold`}>3 נק׳</span><span>ללא רמז</span>
          <span className="mx-1">|</span>
          <span className={`${POINTS_COLOR[1]} font-bold`}>2 נק׳</span><span>רמז 1</span>
          <span className="mx-1">|</span>
          <span className={`${POINTS_COLOR[2]} font-bold`}>1 נק׳</span><span>רמז 2+</span>
        </div>
      )}

      {/* Answer choices */}
      {answersShown && !waiting && (
        <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-4">
          {choices.map((c) => (
            <button key={c} onClick={() => onSelect(c)}
              className="bg-white border-2 border-purple-300 text-purple-800 font-bold py-4 rounded-2xl text-lg shadow active:scale-95 transition-transform hover:bg-purple-50">
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Action buttons */}
      {!waiting && (
        <div className="w-full max-w-sm flex flex-col gap-2">
          {cluesRevealed < 3 && !answersShown && (
            <button onClick={onRevealClue}
              className="w-full bg-linear-to-br from-purple-400 to-violet-500 text-white font-bold py-3 rounded-2xl shadow-lg active:scale-95 transition-transform">
              🔍 הצג רמז {cluesRevealed + 1} ({2 - cluesRevealed} נק׳)
            </button>
          )}
          {!answersShown && (
            <button onClick={onShowAnswers}
              className="w-full bg-white border-2 border-purple-300 text-purple-700 font-bold py-3 rounded-2xl active:scale-95 transition-transform">
              💡 ענה עכשיו
            </button>
          )}
        </div>
      )}
    </div>
  );
}
