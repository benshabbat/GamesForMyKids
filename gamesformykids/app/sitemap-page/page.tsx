import { Metadata } from 'next';
import Link from 'next/link';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';
import { hebrewLetters } from '@/app/games/hebrew-letters/constants/hebrewLetters';

export const metadata: Metadata = {
  title: 'מפת האתר - כל המשחקים במקום אחד | משחקים לילדים',
  description: 'מפת האתר המלאה של משחקים לילדים 2-5. גלו את כל המשחקים החינוכיים והמהנים שלנו.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function SitemapPage() {
  const games = GamesRegistry.getAllGameRegistrations().filter(g => g.available);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* כותרת */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-800 mb-4">
            🗺️ מפת האתר
          </h1>
          <p className="text-xl text-purple-600">
            כל המשחקים והדפים שלנו במקום אחד
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* דפים עיקריים */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              🏠 דפים עיקריים
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                  עמוד הבית
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-blue-600 hover:text-blue-800 transition-colors">
                  כל המשחקים
                </Link>
              </li>
              <li>
                <Link href="/games/hebrew-letters" className="text-blue-600 hover:text-blue-800 transition-colors">
                  תרגול אותיות עבריות
                </Link>
              </li>
            </ul>
          </div>

          {/* כל המשחקים */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              🎮 כל המשחקים ({games.length})
            </h2>
            <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
              {games.map((game) => (
                <Link
                  key={game.id}
                  href={game.href}
                  className="text-blue-600 hover:text-blue-800 transition-colors text-sm p-2 rounded hover:bg-blue-50"
                >
                  {game.title}
                </Link>
              ))}
            </div>
          </div>

          {/* אותיות עבריות */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              📝 אותיות עבריות
            </h2>
            <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
              {hebrewLetters.map(letter => (
                <Link 
                  key={letter.name}
                  href={`/games/hebrew-letters/${letter.name}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors text-center p-2 rounded hover:bg-blue-50 flex flex-col items-center"
                >
                  <span className="text-2xl">{letter.letter}</span>
                  <span className="text-xs">{letter.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* חזרה לעמוד הבית */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            🏠 חזרה לעמוד הראשי
          </Link>
        </div>
      </div>
    </div>
  );
}
