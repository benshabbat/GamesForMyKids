'use client';

import { useScreenTimeStore } from '@/lib/stores/screenTimeStore';
import { SectionContainer } from './SectionContainer';

const OPTIONS: { label: string; value: number | null }[] = [
  { label: 'אין הגבלה', value: null },
  { label: '15 דקות', value: 15 },
  { label: '30 דקות', value: 30 },
  { label: '45 דקות', value: 45 },
  { label: '60 דקות', value: 60 },
];

export function ScreenTimeSection() {
  const timeLimitMinutes = useScreenTimeStore((s) => s.timeLimitMinutes);
  const setTimeLimit = useScreenTimeStore((s) => s.setTimeLimit);

  return (
    <SectionContainer title="זמן משחק" emoji="⏱️">
      <div className="space-y-3">
        <p className="text-sm text-gray-500">
          כשהזמן נגמר, מוצגת הודעה ידידותית. ניתן להאריך ב-5 דקות פעם אחת.
        </p>
        <div className="flex flex-wrap gap-2">
          {OPTIONS.map(({ label, value }) => (
            <button
              key={String(value)}
              type="button"
              onClick={() => setTimeLimit(value)}
              className={`
                px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all
                ${timeLimitMinutes === value
                  ? 'bg-purple-500 border-purple-600 text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
