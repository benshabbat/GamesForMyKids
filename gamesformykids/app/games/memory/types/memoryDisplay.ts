import type { DifficultyLevel } from './memory';

export interface DifficultyOption {
  key: DifficultyLevel;
  emoji: string;
  name: string;
  pairs: number;
  isActive: boolean;
}

export interface PerformanceLevel {
  level: string;
  emoji: string;
  color: string;
  timeComment: string;
}

export interface WinAchievement {
  id: string;
  bgColor: string;
  textColor: string;
  label: string;
}
