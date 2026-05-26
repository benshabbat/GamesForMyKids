'use client';

import { TzaddikStory } from '../data/tzadikim';

interface StoryReadingViewProps {
  story: TzaddikStory;
  storyIndex: number;
  totalStories: number;
  onStartQuiz: () => void;
  onBack: () => void;
}

export default function StoryReadingView({
  story,
  storyIndex,
  totalStories,
  onStartQuiz,
  onBack,
}: StoryReadingViewProps) {
  const paragraphs = story.story.split('\n\n').filter(Boolean);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${story.bgGradient} p-4`} dir="rtl">
      <div className="max-w-2xl mx-auto">

        {/* כותרת סיפור */}
        <div className={`
          rounded-3xl p-6 mb-6 text-white text-center shadow-xl relative
          bg-gradient-to-br ${story.color}
        `}>
          <button
            onClick={onBack}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-sm font-medium bg-white/20 rounded-full px-3 py-1"
          >
            ← חזור
          </button>
          <div className="text-6xl mb-2">{story.emoji}</div>
          <h1 className="text-3xl font-bold mb-1">{story.name}</h1>
          <p className="text-white/80 text-sm">{story.years}</p>
          <p className="text-white/90 text-base mt-1">{story.shortTitle}</p>
          <div className="mt-3 text-xs text-white/70">
            סיפור {storyIndex + 1} מתוך {totalStories}
          </div>
        </div>

        {/* גוף הסיפור */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-5">
          <div className="space-y-4">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-gray-700 text-lg leading-relaxed font-medium"
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* לקח הסיפור */}
        <div className="bg-amber-50 border-r-4 border-amber-400 rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="font-bold text-amber-800 mb-1">מה למדנו?</p>
              <p className="text-amber-700 text-base leading-relaxed">{story.lesson}</p>
            </div>
          </div>
        </div>

        {/* כפתור לחידון */}
        <button
          onClick={onStartQuiz}
          className={`
            w-full py-5 rounded-2xl text-white font-bold text-xl shadow-lg
            bg-gradient-to-l ${story.color}
            hover:opacity-90 active:scale-95 transition-all duration-200
          `}
        >
          🧠 לחידון על הסיפור! ←
        </button>
      </div>
    </div>
  );
}
