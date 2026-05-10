import type { AudioSectionProps } from '@/lib/types/components';
import { SettingToggle } from './SettingToggle';
import { SectionContainer } from './SectionContainer';

export function AudioSection({ soundEnabled, musicEnabled, notificationsEnabled, onChange, disabled }: AudioSectionProps) {
  return (
    <>
      <SectionContainer title="הגדרות שמע" emoji="🔊">
        <div className="space-y-4">
          <SettingToggle
            label="צלילי משחק"
            description="הפעלת צלילים במשחקים"
            checked={soundEnabled}
            onChange={(v) => onChange('sound_enabled', v)}
            disabled={disabled}
          />
          <SettingToggle
            label="מוזיקת רקע"
            description="הפעלת מוזיקה ברקע"
            checked={musicEnabled}
            onChange={(v) => onChange('music_enabled', v)}
            disabled={disabled}
          />
        </div>
      </SectionContainer>

      <SectionContainer title="הגדרות התראות" emoji="🔔">
        <div className="space-y-4">
          <SettingToggle
            label="התראות משחק"
            description="התראות על הישגים והתקדמות"
            checked={notificationsEnabled}
            onChange={(v) => onChange('notifications_enabled', v)}
            disabled={disabled}
          />
        </div>
      </SectionContainer>
    </>
  );
}
