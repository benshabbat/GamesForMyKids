'use client';

import { useAgeFilterStore, type AgeRange } from '@/lib/stores/ageFilterStore';
import { SectionContainer } from './SectionContainer';

const OPTIONS: { label: string; desc: string; value: AgeRange }[] = [
  { label: 'הכל', desc: 'הצג את כל המשחקים', value: 'all' },
  { label: '3-4', desc: 'גן טרום-חובה', value: '3-4' },
  { label: '5-7', desc: 'גן וכיתות א-ב', value: '5-7' },
  { label: '8-10', desc: 'כיתות ג-ה', value: '8-10' },
];

export function AgeFilterSection() {
  const ageRange = useAgeFilterStore((s) => s.ageRange);
  const setAgeRange = useAgeFilterStore((s) => s.setAgeRange);

  return (
    <SectionContainer title="מסנן גיל" emoji="🎂">
      <div className="space-y-3">
        <p className="text-sm text-gray-500">
          הגבל את רשימת המשחקים בדף הבית לגיל הילד שלך.
        </p>
        <div className="flex flex-wrap gap-2">
          {OPTIONS.map(({ label, desc, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setAgeRange(value)}
              title={desc}
              className={`
                px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-[background-color,border-color,color,box-shadow]
                ${ageRange === value
                  ? 'bg-purple-500 border-purple-600 text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'}
              `}
            >
              {label}
            </button>
          ))}
        </div>
        {ageRange !== 'all' && (
          <p className="text-xs text-purple-600 font-medium">
            🔧 פעיל: מוצגים רק משחקים לגיל {ageRange}
          </p>
        )}
      </div>
    </SectionContainer>
  );
}
