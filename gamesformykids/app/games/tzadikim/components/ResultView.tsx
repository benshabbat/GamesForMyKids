'use client';

import { TzaddikStory } from '../data/tzadikim';

interface ResultViewProps {
  story: TzaddikStory;
  storyIndex: number;
  totalStories: number;
  score: number;
  maxScore: number;
  onNextStory: () => void;
}

export default function ResultView({
  story,
  storyIndex,
  totalStories,
  score,
  maxScore,
  onNextStory,
}: ResultViewProps) {
  const isLastStory = storyIndex >= totalStories - 1;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${story.bgGradient} p-4 flex items-center`} dir="rtl">
      <div className="max-w-2xl mx-auto w-full">

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          {/* אייקון */}
          <div className={`
            w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-5xl
            bg-gradient-to-br ${story.color}
          `}>
            {story.emoji}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">סיימת את הסיפור!</h2>
          <p className="text-gray-500 mb-6">{story.name}</p>

          {/* לקח */}
          <div className="bg-amber-50 rounded-2xl p-4 mb-6 text-right">
            <p className="font-bold text-amber-800 mb-1">💡 הלקח:</p>
            <p className="text-amber-700">{story.lesson}</p>
          </div>

          {/* ניקוד */}
          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`text-4xl ${i < (score % 3 === 0 && score > 0 ? 3 : score % 3) ? 'opacity-100' : 'opacity-25'}`}>
                ⭐
              </span>
            ))}
          </div>

          <p className="text-gray-500 mb-8 text-sm">
            {`סה"כ: ${score} / ${maxScore} נקודות`}
          </p>

          {/* כפתורים */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onNextStory}
              className={`
                w-full py-4 rounded-2xl text-white font-bold text-xl shadow-lg
                bg-gradient-to-l ${story.color}
                hover:opacity-90 active:scale-95 transition-all
              `}
            >
              {isLastStory ? '🎉 לסיכום הסופי!' : `הסיפור הבא: סיפור ${storyIndex + 2} ←`}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
