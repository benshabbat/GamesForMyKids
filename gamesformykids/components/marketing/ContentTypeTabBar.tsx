'use client';

export type ContentType = 'games' | 'creative' | 'riddles' | 'tools';

const TABS: { id: ContentType; label: string; emoji: string; color: string }[] = [
  { id: 'games',    label: 'משחקים', emoji: '🎮', color: 'from-blue-500 to-indigo-600' },
  { id: 'creative', label: 'יצירה',  emoji: '🎨', color: 'from-pink-500 to-purple-600' },
  { id: 'riddles',  label: 'חידות',  emoji: '🤣', color: 'from-yellow-500 to-orange-500' },
  { id: 'tools',    label: 'כלים',   emoji: '🎲', color: 'from-teal-500 to-green-600' },
];

interface Props {
  active: ContentType;
  onChange: (tab: ContentType) => void;
}

export default function ContentTypeTabBar({ active, onChange }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-4" dir="rtl">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold
                whitespace-nowrap transition-[background-color,box-shadow,transform,color] duration-200 shrink-0
                ${isActive
                  ? `bg-gradient-to-l ${tab.color} text-white shadow-lg scale-105`
                  : 'bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-sm hover:shadow-md'
                }
              `}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="text-base leading-none">{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
