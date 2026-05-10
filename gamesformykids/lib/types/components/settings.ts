import type { ReactNode } from 'react';

export interface SettingToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export interface SettingSelectOption {
  value: string;
  label: string;
}

export interface SettingSelectProps {
  label: string;
  description: string;
  value: string;
  options: SettingSelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export interface AudioSectionProps {
  soundEnabled: boolean;
  musicEnabled: boolean;
  notificationsEnabled: boolean;
  onChange: (key: string, value: boolean) => void;
  disabled: boolean;
}

export interface AppearanceSectionProps {
  difficulty: string;
  theme: string;
  language: string;
  onChange: (key: string, value: string) => void;
  disabled: boolean;
}

export interface AccountSectionProps {
  onSignOut: () => void;
}

export interface SectionContainerProps {
  title: string;
  emoji: string;
  children: ReactNode;
}
