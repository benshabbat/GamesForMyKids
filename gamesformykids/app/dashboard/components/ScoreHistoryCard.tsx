'use client';
import { useMemo } from 'react';
import { useProgressTrackingStore } from '@/lib/stores/progressTrackingStore';
import { getGameLabel } from './gameLabels';

const W = 140;
const H = 48;
const PAD = 4;

function Sparkline({ scores, trend }: { scores: number[]; trend: 'up' | 'down' | 'flat' }) {
  if (scores.length < 2) {
    return <div className="w-[140px] h-[48px] flex items-center justify-center text-xs text-gray-300">אין מספיק נתונים</div>;
  }

  const minS = Math.min(...scores);
  const maxS = Math.max(...scores);
  const range = maxS - minS || 1;

  const innerW = W - PAD * 2;
  const innerH = H - PAD * 2;

  const pts = scores.map((s, i) => {
    const x = PAD + (i / (scores.length - 1)) * innerW;
    const y = PAD + (1 - (s - minS) / range) * innerH;
    return `${x},${y}`;
  });

  const color = trend === 'up' ? '#0077BB' : trend === 'down' ? '#EE7733' : '#94a3b8';

  return (
    <svg width={W} height={H} className="overflow-visible">
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {scores.map((s, i) => {
        const [x, y] = (pts[i] ?? '0,0').split(',').map(Number);
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );
}

export function ScoreHistoryCard() {
  const allSessions = useProgressTrackingStore(s => s.allSessions);

  const gameData = useMemo(() => {
    const byGame: Record<string, number[]> = {};
    for (const session of allSessions) {
      if (!byGame[session.gameType]) byGame[session.gameType] = [];
      byGame[session.gameType]!.push(session.score);
    }
    return Object.entries(byGame)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 6)
      .map(([gameType, scores]) => {
        const last10 = scores.slice(-10);
        const first = last10[0] ?? 0;
        const last = last10[last10.length - 1] ?? 0;
        const trend: 'up' | 'down' | 'flat' = last > first ? 'up' : last < first ? 'down' : 'flat';
        const trendLabel = trend === 'up' ? '📈' : trend === 'down' ? '📉' : '➡️';
        return { gameType, last10, trend, trendLabel, sessions: scores.length };
      });
  }, [allSessions]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 col-span-2">
      <h2 className="text-lg font-bold text-gray-800 mb-4">📊 התקדמות במשחקים</h2>
      {gameData.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">שחק כמה משחקים כדי לראות את ההתקדמות שלך!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gameData.map(({ gameType, last10, trend, trendLabel, sessions }) => {
            const { name, emoji } = getGameLabel(gameType);
            return (
              <div key={gameType} className="rounded-xl border border-gray-100 p-3 hover:border-indigo-200 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700 truncate">{emoji} {name}</span>
                  <span title={trend === 'up' ? 'שיפור' : trend === 'down' ? 'ירידה' : 'יציב'}>{trendLabel}</span>
                </div>
                <Sparkline scores={last10} trend={trend} />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">{sessions} משחקים</span>
                  <span className="text-xs font-medium text-gray-600">ניקוד: {last10[last10.length - 1] ?? 0}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
