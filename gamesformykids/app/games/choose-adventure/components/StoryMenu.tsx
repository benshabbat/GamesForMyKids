'use client';
import type { Story } from '@/lib/constants/stories/stories';

interface Props {
  stories: Story[];
  getEndingsCount: (id: string) => number;
  onSelect: (story: Story) => void;
}

const TOTAL_ENDINGS: Record<string, number> = {
  cat: 4,
  forest: 4,
  space: 4,
};

export default function StoryMenu({ stories, getEndingsCount, onSelect }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 max-w-md mx-auto" dir="rtl">
      <div className="text-center">
        <div className="text-6xl mb-3">📚</div>
        <h1 className="text-3xl font-bold text-indigo-800">ספר הרפתקאות</h1>
        <p className="text-gray-500 mt-1">בחר סיפור וגלה מה יקרה!</p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {stories.map((story) => {
          const found = getEndingsCount(story.id);
          const total = TOTAL_ENDINGS[story.id] ?? 3;
          return (
            <button
              key={story.id}
              onClick={() => onSelect(story)}
              className={`w-full bg-gradient-to-l ${story.color} text-white rounded-3xl p-5 text-right shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform`}
            >
              <div className="flex items-center gap-3">
                <span className="text-5xl">{story.emoji}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{story.title}</h2>
                  <p className="text-sm opacity-90 mt-0.5">{story.description}</p>
                  {found > 0 && (
                    <p className="text-xs mt-1 opacity-80">
                      🔍 גילית {found}/{total} סיומים
                    </p>
                  )}
                </div>
                <span className="text-3xl">←</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
