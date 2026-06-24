'use client';

import { useSoundThemeStore, type SoundTheme } from '@/lib/stores/soundThemeStore';
import { useGameAudioStore } from '@/lib/stores/gameAudioStore';
import { playThemedSound } from '@/lib/utils/game/soundThemes';
import { SectionContainer } from './SectionContainer';

const THEMES: { value: SoundTheme; label: string; emoji: string; desc: string }[] = [
  { value: 'default', label: 'ברירת מחדל', emoji: '🎵', desc: 'אקורד מוזיקלי' },
  { value: 'farm',    label: 'חווה',       emoji: '🐄', desc: 'פעמון + רזוננס' },
  { value: 'space',   label: 'חלל',        emoji: '🚀', desc: 'לייזר' },
  { value: 'jungle',  label: 'ג\'ונגל',    emoji: '🦜', desc: 'ציוץ ציפורים' },
];

export function SoundThemeSection() {
  const theme = useSoundThemeStore((s) => s.theme);
  const setTheme = useSoundThemeStore((s) => s.setTheme);
  const audioContext = useGameAudioStore((s) => s.audioContext);

  const handleSelect = (value: SoundTheme) => {
    setTheme(value);
    // Preview the sound
    if (audioContext) {
      playThemedSound(audioContext, 'success', value);
    }
  };

  return (
    <SectionContainer title="ערכת צלילים" emoji="🎶">
      <div className="space-y-3">
        <p className="text-sm text-gray-500">
          בחר ערכת צלילים לאפקטי המשחק. לחץ על כפתור לתצוגה מקדימה.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map(({ value, label, emoji, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleSelect(value)}
              className={`
                flex items-center gap-2 px-3 py-3 rounded-xl border-2 text-right transition-all
                ${theme === value
                  ? 'bg-purple-500 border-purple-600 text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'}
              `}
            >
              <span className="text-2xl shrink-0">{emoji}</span>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate">{label}</p>
                <p className={`text-xs truncate ${theme === value ? 'text-purple-200' : 'text-gray-400'}`}>
                  {desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
