interface ProfileStatCardsProps {
  totalScore: number;
  totalPlayTime: number;
  achievementsCount: number;
}

export function ProfileStatCards({ totalScore, totalPlayTime, achievementsCount }: ProfileStatCardsProps) {
  const stats = [
    { emoji: '🏆', label: 'סך הניקוד', value: String(totalScore) },
    { emoji: '⏰', label: 'זמן משחק', value: `${totalPlayTime} דקות` },
    { emoji: '🎖️', label: 'הישגים', value: String(achievementsCount) },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {stats.map(({ emoji, label, value }) => (
        <div key={label} className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">{emoji}</div>
          <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
          <p className="text-2xl font-bold text-purple-600">{value}</p>
        </div>
      ))}
    </div>
  );
}
