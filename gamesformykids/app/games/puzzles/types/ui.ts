import type { ReactNode } from 'react';

export type StatColor = 'blue' | 'purple' | 'green' | 'orange';

export interface ModeCardProps {
  onClick: () => void;
  icon: ReactNode;
  iconBgClass: string;
  title: string;
  description: string;
  emojis: string[];
  badgeText: string;
  badgeClass: string;
}
