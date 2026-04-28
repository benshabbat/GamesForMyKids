import { SettingToggle } from './SettingToggle';

interface Props {
  soundEnabled: boolean;
  musicEnabled: boolean;
  notificationsEnabled: boolean;
  onChange: (key: string, value: boolean) => void;
  disabled: boolean;
}

export function AudioSection({ soundEnabled, musicEnabled, notificationsEnabled, onChange, disabled }: Props) {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          🔊 הגדרות שמע
        </h2>
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
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          🔔 הגדרות התראות
        </h2>
        <div className="space-y-4">
          <SettingToggle
            label="התראות משחק"
            description="התראות על הישגים והתקדמות"
            checked={notificationsEnabled}
            onChange={(v) => onChange('notifications_enabled', v)}
            disabled={disabled}
          />
        </div>
      </div>
    </>
  );
}
