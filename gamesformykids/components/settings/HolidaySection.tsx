'use client';

import { useAudioSettingsStore } from '@/lib/stores/audioSettingsStore';
import { HOLIDAY_CONFIGS } from '@/lib/constants/holidayLanes';
import { SectionContainer } from './SectionContainer';

export function HolidaySection() {
  const holidayThemesEnabled = useAudioSettingsStore((s) => s.holidayThemesEnabled);
  const toggleHolidayThemes = useAudioSettingsStore((s) => s.toggleHolidayThemes);

  return (
    <SectionContainer title="ערכות חג" emoji="🎉">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-medium text-gray-800">עיצוב חגים אוטומטי</p>
            <p className="text-sm text-gray-500 mt-0.5">
              מציג קונפטי וקישוטים מיוחדים בחגים — חנוכה, פורים, פסח ועוד
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {HOLIDAY_CONFIGS.map((h) => (
                <span key={h.id} className="text-base" title={h.name}>{h.emoji}</span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={toggleHolidayThemes}
            aria-pressed={holidayThemesEnabled}
            className={`
              flex-shrink-0 relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200
              ${holidayThemesEnabled ? 'bg-purple-500' : 'bg-gray-300'}
            `}
          >
            <span className="sr-only">{holidayThemesEnabled ? 'כבה עיצוב חגים' : 'הפעל עיצוב חגים'}</span>
            <span
              className={`
                inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200
                ${holidayThemesEnabled ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
      </div>
    </SectionContainer>
  );
}
