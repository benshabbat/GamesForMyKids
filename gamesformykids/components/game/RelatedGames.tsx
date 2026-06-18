import Link from 'next/link';
import { GAME_CATEGORIES } from '@/lib/constants/gameCategories';
import { GAMES_REGISTRY } from '@/lib/registry/gamesRegistryData';

interface Props {
  gameType: string;
}

export default function RelatedGames({ gameType }: Props) {
  const categoryEntry = Object.values(GAME_CATEGORIES).find((cat) =>
    cat.gameIds.includes(gameType),
  );
  if (!categoryEntry) return null;

  const related = categoryEntry.gameIds
    .filter((id) => id !== gameType)
    .map((id) => GAMES_REGISTRY.find((g) => g.id === id && g.available))
    .filter(Boolean)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section dir="rtl" className="bg-white border-t border-gray-100 py-4 px-4">
      <h2 className="text-sm font-bold text-gray-500 mb-3">🎮 משחקים דומים</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {related.map((game) => (
          <Link
            key={game!.id}
            href={game!.href}
            className={`flex-none w-24 rounded-2xl ${game!.color} p-3 text-white text-center hover:scale-105 active:scale-95 transition-transform shadow-md`}
          >
            <div className="text-2xl mb-1">{game!.emoji}</div>
            <div className="text-xs font-bold leading-tight line-clamp-2">{game!.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
