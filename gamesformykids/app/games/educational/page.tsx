import { type Metadata } from 'next';
import Link from 'next/link';
import { GAME_CATEGORIES } from '@/lib/constants/gameCategories';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';

export const metadata: Metadata = {
  title: 'משחקים חינוכיים | GamesForMyKids',
  description: 'אוסף המשחקים החינוכיים שלנו לילדים — צבעים, מספרים, עברית ועוד',
  openGraph: {
    title: 'משחקים חינוכיים',
    description: 'אוסף המשחקים החינוכיים שלנו לילדים — צבעים, מספרים, עברית ועוד',
    type: 'website',
    url: '/games/educational',
  },
  alternates: { canonical: '/games/educational' },
};

export default function EducationalPage() {
  const category = GAME_CATEGORIES.educational!;
  const games = category.gameIds
    .map((id) => GamesRegistry.getGameById(id))
    .filter((g): g is NonNullable<typeof g> => g !== undefined && g.available);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100" dir="rtl">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-10">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">משחקים חינוכיים</h1>
          <p className="text-lg text-gray-600">{category.description}</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {games.map((game) => (
            <Link key={game.id} href={game.href} aria-label={game.title}>
              <div
                className={`
                  relative p-4 md:p-6 rounded-2xl shadow-lg transition-all duration-300
                  transform hover:scale-105 cursor-pointer hover:shadow-2xl overflow-hidden
                  ${game.color}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="relative text-center text-white">
                  <div className="mb-3 flex justify-center">
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                      <span className="text-3xl md:text-4xl leading-none">{game.emoji}</span>
                    </div>
                  </div>
                  <h2 className="text-base md:text-lg font-bold mb-1 drop-shadow-sm leading-tight">
                    {game.title}
                  </h2>
                  <p className="text-xs md:text-sm opacity-90 drop-shadow-sm hidden sm:block">
                    {game.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 font-semibold transition-colors"
          >
            ← חזרה לדף הבית
          </Link>
        </div>
      </div>
    </div>
  );
}
