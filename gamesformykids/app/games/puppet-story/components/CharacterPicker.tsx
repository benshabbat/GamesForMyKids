'use client';
import { CHARACTERS, SETTINGS, type Character, type Setting } from '../data/storyTemplates';

interface PickCharProps {
  step: 0 | 1;
  excludeId?: string | undefined;
  onPick: (c: Character) => void;
}

export function CharacterPicker({ step, excludeId, onPick }: PickCharProps) {
  const label = step === 0 ? 'בחר דמות ראשונה' : 'בחר דמות שנייה';
  const available = step === 0 ? CHARACTERS : CHARACTERS.filter(c => c.id !== excludeId);
  return (
    <div className="flex flex-col items-center gap-4" dir="rtl">
      <h2 className="text-xl font-bold text-purple-800">{label}</h2>
      <div className="grid grid-cols-4 gap-3">
        {available.map(c => (
          <button
            key={c.id}
            onClick={() => onPick(c)}
            className="flex flex-col items-center gap-1 bg-white rounded-2xl p-3 shadow hover:shadow-md hover:bg-purple-50 transition-all active:scale-95"
          >
            <span className="text-4xl">{c.emoji}</span>
            <span className="text-xs font-bold text-gray-700">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

interface PickSettingProps {
  onPick: (s: Setting) => void;
}

export function SettingPicker({ onPick }: PickSettingProps) {
  return (
    <div className="flex flex-col items-center gap-4" dir="rtl">
      <h2 className="text-xl font-bold text-purple-800">בחר מיקום</h2>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {SETTINGS.map(s => (
          <button
            key={s.id}
            onClick={() => onPick(s)}
            className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow hover:shadow-md hover:bg-purple-50 transition-all active:scale-95 text-right"
          >
            <span className="text-4xl">{s.emoji}</span>
            <span className="text-lg font-bold text-gray-800">{s.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
