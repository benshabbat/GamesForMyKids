'use client';

import { TzaddikStory } from '../data/tzadikim';

interface StoryMenuViewProps {
  stories: TzaddikStory[];
  currentIndex: number;
  score: number;
  maxScore: number;
  onSelectStory: (index: number) => void;
}

export default function StoryMenuView({
  stories,
  currentIndex,
  score,
  maxScore,
  onSelectStory,
}: StoryMenuViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 p-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        {/* כותרת */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">📜</div>
          <h1 className="text-3xl font-bold text-amber-800 mb-1">סיפורי צדיקים</h1>
          <p className="text-amber-600 text-lg">למד על גדולי ישראל ומה שלמדנו מהם</p>
          {score > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 bg-amber-100 border border-amber-300 rounded-full px-4 py-2">
              <span className="text-amber-700 font-bold">⭐ {score} / {maxScore} נקודות</span>
            </div>
          )}
        </div>

        {/* רשימת סיפורים */}
        <div className="grid gap-4">
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => onSelectStory(index)}
              className={`
                w-full text-right p-5 rounded-2xl border-2 transition-all duration-200
                shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]
                ${index < currentIndex
                  ? 'bg-green-50 border-green-300 opacity-80'
                  : index === currentIndex
                  ? `bg-gradient-to-l ${story.bgGradient} border-amber-400 ring-2 ring-amber-300`
                  : 'bg-white border-gray-200 hover:border-amber-300'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0
                  bg-gradient-to-br ${story.color} shadow-md
                `}>
                  {story.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-gray-800">{story.name}</h2>
                    {index < currentIndex && <span className="text-green-500 text-lg">✅</span>}
                    {index === currentIndex && (
                      <span className="text-xs bg-amber-500 text-white rounded-full px-2 py-0.5 font-bold">
                        ► הבא
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{story.shortTitle}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{story.years}</p>
                </div>
                <div className="text-gray-300 text-2xl">←</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
