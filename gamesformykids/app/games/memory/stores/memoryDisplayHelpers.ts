import { MEMORY_GAME_CONSTANTS } from '@/lib/constants';
import type { DifficultyLevel } from '../types/memory';
import type { DifficultyOption, PerformanceLevel, WinAchievement } from '../types/memoryDisplay';

export function getDifficultyOptions(
  activeDifficulty: DifficultyLevel,
): DifficultyOption[] {
  type DifficultyKey = keyof typeof MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS;
  const activeName = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[activeDifficulty as DifficultyKey].name;
  return (
    Object.entries(MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS) as [
      DifficultyKey,
      (typeof MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS)[DifficultyKey],
    ][]
  ).map(([key, config]) => ({
    key,
    emoji: config.emoji,
    name: config.name,
    pairs: config.pairs,
    isActive: config.name === activeName,
  }));
}

export function getPerformanceLevel(
  score: number,
  moves: number,
  timeLeft: number,
  formatTime: (seconds: number) => string,
): PerformanceLevel {
  const efficiency = score / Math.max(moves, 1);
  const timeBonus =
    timeLeft > 60 ? 'מהיר כברק!' : timeLeft > 30 ? 'בזמן טוב!' : 'ממש בזמן!';
  const remaining = formatTime(timeLeft);
  const timeComment = `${timeBonus} נשאר לך ${remaining}`;
  if (efficiency > 50) return { level: 'מושלם!', emoji: '🏆', color: 'text-yellow-600', timeComment };
  if (efficiency > 30) return { level: 'מעולה!', emoji: '🥇', color: 'text-green-600', timeComment };
  if (efficiency > 20) return { level: 'טוב מאוד!', emoji: '🥈', color: 'text-blue-600', timeComment };
  return { level: 'יפה!', emoji: '🥉', color: 'text-purple-600', timeComment };
}

export function getWinAchievements(
  score: number,
  moves: number,
  streak: number,
  perfectMatches: number,
  timeLeft: number,
  totalPairs: number,
): WinAchievement[] {
  const achievements: WinAchievement[] = [];
  if (perfectMatches === totalPairs)
    achievements.push({ id: 'perfect', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', label: '🏆 מושלם בכל הזוגות!' });
  if (streak >= 5)
    achievements.push({ id: 'streak', bgColor: 'bg-orange-100', textColor: 'text-orange-800', label: `🔥 רצף אש של ${streak}!` });
  if (moves <= totalPairs * 1.5)
    achievements.push({ id: 'efficient', bgColor: 'bg-green-100', textColor: 'text-green-800', label: '⚡ יעילות מקסימלית!' });
  if (timeLeft > 120)
    achievements.push({ id: 'fast', bgColor: 'bg-blue-100', textColor: 'text-blue-800', label: '⏰ מהיר כאלף!' });
  // suppress unused-var lint
  void score;
  return achievements;
}
