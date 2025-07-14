import Link from 'next/link';
import { Star, Heart, Circle, Square, Music } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
  available: boolean;
}

export default function HomePage() {
  const games: Game[] = [
    {
      id: 'memory',
      title: 'משחק זיכרון',
      description: 'מצא את הזוגות!',
      icon: <Heart className="w-8 h-8" />,
      color: 'bg-pink-400 hover:bg-pink-500',
      href: '/games/memory',
      available: true
    },
    {
      id: 'colors',
      title: 'משחק צבעים',
      description: 'למד צבעים!',
      icon: <Circle className="w-8 h-8" />,
      color: 'bg-blue-400 hover:bg-blue-500',
      href: '/games/colors',
      available: true  // ← עכשיו זמין!
    },
    {
      id: 'shapes',
      title: 'משחק צורות',
      description: 'למד צורות',
      icon: <Square className="w-8 h-8" />,
      color: 'bg-green-400 hover:bg-green-500',
      href: '/games/shapes',
      available: false
    },
    {
      id: 'bubbles',
      title: 'בועות מוזיקליות',
      description: 'פוצץ בועות',
      icon: <Music className="w-8 h-8" />,
      color: 'bg-purple-400 hover:bg-purple-500',
      href: '/games/bubbles',
      available: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-5xl md:text-7xl font-bold text-purple-800 mb-4">
          🎮 משחקים לילדים 🎮
        </h1>
        <p className="text-xl md:text-2xl text-purple-600 font-semibold">
          משחקים מהנים לגיל 4!
        </p>
      </header>

      {/* Games Grid */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {games.map((game) => (
            <div key={game.id} className="relative">
              {game.available ? (
                <Link href={game.href}>
                  <div className={`
                    relative p-8 rounded-3xl shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-2xl
                    ${game.color}
                  `}>
                    <GameCard game={game} />
                  </div>
                </Link>
              ) : (
                <div className="relative p-8 rounded-3xl shadow-xl bg-gray-300 cursor-not-allowed">
                  <div className="absolute inset-0 bg-gray-400 bg-opacity-50 rounded-3xl flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">בקרוב!</span>
                  </div>
                  <GameCard game={game} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-purple-600">
        <p className="text-lg">נוצר במיוחד לילדים בגיל 4 💜</p>
        <p className="text-sm mt-2">2 משחקים זמינים, עוד בדרך!</p>
      </footer>
    </div>
  );
}

function GameCard({ game }: { game: Game }) {
  return (
    <>
      <div className="text-center text-white">
        <div className="mb-4 flex justify-center">
          {game.icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-2">{game.title}</h3>
        <p className="text-lg md:text-xl opacity-90">{game.description}</p>
      </div>
      
      {game.available && (
        <div className="absolute top-4 right-4">
          <Star className="w-6 h-6 text-yellow-300 fill-current" />
        </div>
      )}
    </>
  );
}