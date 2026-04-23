'use client';

interface CurrentHoliday {
  emoji: string;
  name: string;
  color: string;
  bg: string;
}

interface NextHoliday {
  name: string;
  emoji: string;
}

interface Props {
  current: CurrentHoliday;
  score: number;
  maxScore: number;
  holidayIndex: number;
  totalHolidays: number;
  nextHolidayInfo: NextHoliday | null;
  onNext: () => void;
}

export default function HolidaysResultScreen({ current, score, maxScore, holidayIndex, totalHolidays, nextHolidayInfo, onNext }: Props) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${current.bg} p-4 flex items-center`} dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3">{current.emoji}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">סיימת — {current.name}!</h2>
        <p className="text-gray-500 mb-6">⭐ {score} / {maxScore} נקודות</p>
        <div className="flex flex-col gap-3">
          <button onClick={onNext}
            className={`w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l ${current.color} shadow-lg hover:opacity-90 active:scale-95 transition-all`}>
            {holidayIndex < totalHolidays - 1 && nextHolidayInfo
              ? `הבא: ${nextHolidayInfo.name} ${nextHolidayInfo.emoji}`
              : '🎉 לסיכום!'}
          </button>
        </div>
      </div>
    </div>
  );
}
