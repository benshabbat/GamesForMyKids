import { useProfileComputedStats } from '../stores/useProfileStore';

const STAT_STYLES = [
  { from: 'from-purple-400', to: 'to-purple-600', text: 'text-purple-600', bg: 'bg-purple-50' },
  { from: 'from-blue-400',   to: 'to-blue-600',   text: 'text-blue-600',   bg: 'bg-blue-50'   },
  { from: 'from-amber-400',  to: 'to-amber-600',  text: 'text-amber-600',  bg: 'bg-amber-50'  },
  { from: 'from-green-400',  to: 'to-green-600',  text: 'text-green-600',  bg: 'bg-green-50'  },
];

export function ProfileStatCards() {
  const { totalScore, totalPlayTime, achievementsCount, gamesPlayed } = useProfileComputedStats();

  const stats = [
    { emoji: '🏆', label: 'סך הניקוד',   value: totalScore.toLocaleString('he-IL') },
    { emoji: '⏰', label: 'זמן משחק',     value: `${totalPlayTime} דק׳` },
    { emoji: '🎖️', label: 'הישגים',       value: String(achievementsCount) },
    { emoji: '🎮', label: 'משחקים ששוחקו', value: String(gamesPlayed) },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map(({ emoji, label, value }, i) => {
        const style = STAT_STYLES[i] ?? STAT_STYLES[0]!;
        return (
          <div key={label} className={`${style.bg} rounded-2xl shadow p-5 text-center`}>
            <div className="text-3xl mb-2">{emoji}</div>
            <p className={`text-2xl font-bold ${style.text}`}>{value}</p>
            <h3 className="text-sm font-medium text-gray-600 mt-1">{label}</h3>
          </div>
        );
      })}
    </div>
  );
}
