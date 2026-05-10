import type { AppearanceSectionProps } from '@/lib/types/components';
import { SettingSelect } from './SettingSelect';
import { SectionContainer } from './SectionContainer';

export function AppearanceSection({ difficulty, theme, language, onChange, disabled }: AppearanceSectionProps) {
  return (
    <>
      <SectionContainer title="הגדרות משחק" emoji="🎮">
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
      </SectionContainer>

      <SectionContainer title="שפה" emoji="🌐">
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
      </SectionContainer>
    </>
  );
}
