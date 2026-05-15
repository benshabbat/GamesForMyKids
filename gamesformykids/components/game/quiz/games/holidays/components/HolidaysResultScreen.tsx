'use client';
import StoryInterludeCard from '@/components/game/shared/StoryInterludeCard';
import type { Holiday } from '../data/holidays';

interface Props {
  current: Holiday;
  score: number;
  maxScore: number;
  holidayIndex: number;
  totalHolidays: number;
  nextHolidayInfo: Holiday | null;
  onNext: () => void;
}

export default function HolidaysResultScreen({ current, score, maxScore, holidayIndex, totalHolidays, nextHolidayInfo, onNext }: Props) {
  const nextLabel = holidayIndex < totalHolidays - 1 && nextHolidayInfo
    ? `הבא: ${nextHolidayInfo.name} ${nextHolidayInfo.emoji}`
    : '🎉 לסיכום!';

  return (
    <StoryInterludeCard
      gradient={current.bg}
      emoji={current.emoji}
      title={`סיימת — ${current.name}!`}
      scoreLine={`⭐ ${score} / ${maxScore} נקודות`}
      buttonGradient={current.color}
      nextLabel={nextLabel}
      onNext={onNext}
    />
  );
}
