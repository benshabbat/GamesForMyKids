import { SettingSelect } from './SettingSelect';

interface Props {
  difficulty: string;
  theme: string;
  language: string;
  onChange: (key: string, value: string) => void;
  disabled: boolean;
}

export function AppearanceSection({ difficulty, theme, language, onChange, disabled }: Props) {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          🎮 הגדרות משחק
        </h2>
        <div className="space-y-4">
          <SettingSelect
            label="רמת קושי"
            description="רמת הקושי הברירת מחדל"
            value={difficulty}
            options={[
              { value: 'easy', label: 'קל' },
              { value: 'normal', label: 'רגיל' },
              { value: 'hard', label: 'קשה' },
            ]}
            onChange={(v) => onChange('difficulty_level', v)}
            disabled={disabled}
          />
          <SettingSelect
            label="ערכת נושא"
            description="מראה האפליקציה"
            value={theme}
            options={[
              { value: 'light', label: 'בהיר' },
              { value: 'dark', label: 'כהה' },
              { value: 'auto', label: 'אוטומטי' },
            ]}
            onChange={(v) => onChange('theme', v)}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          🌐 שפה
        </h2>
        <div className="space-y-4">
          <SettingSelect
            label="שפת האפליקציה"
            description="השפה העיקרית"
            value={language}
            options={[
              { value: 'he', label: 'עברית' },
              { value: 'en', label: 'English' },
            ]}
            onChange={(v) => onChange('preferred_language', v)}
            disabled={disabled}
          />
        </div>
      </div>
    </>
  );
}
