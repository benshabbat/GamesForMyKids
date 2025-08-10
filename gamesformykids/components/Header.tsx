import { GamesRegistry } from "@/lib/registry/gamesRegistry";
import Link from "next/link";

function Header() {
  const availableGames = GamesRegistry.getAllGameRegistrations().filter(
    (game) => game.available
  );
  if (availableGames.length === 0) return null;
  const randomGame =
    availableGames[Math.floor(Math.random() * availableGames.length)];

  return (
    <header className="text-center py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">
          🌟
        </div>
        <div className="absolute top-16 right-16 text-5xl opacity-20 animate-pulse">
          🎈
        </div>
        <div
          className="absolute bottom-10 left-20 text-4xl opacity-20 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          🎨
        </div>
        <div
          className="absolute bottom-16 right-12 text-5xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          📚
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-purple-800 mb-4 drop-shadow-lg">
          🎮 משחקים לילדים 🎮
        </h1>
        <p className="text-xl md:text-2xl text-purple-600 font-semibold mb-6">
          משחקים מהנים לגיל 2-5!
        </p>

        {/* New feature highlights */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-purple-800">למידה מהנה</h3>
              <p className="text-sm text-purple-600">אותיות, מספרים וצורות</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="font-bold text-purple-800">פיתוח חשיבה</h3>
              <p className="text-sm text-purple-600">זיכרון ופתרון בעיות</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-bold text-purple-800">יצירתיות</h3>
              <p className="text-sm text-purple-600">ציור ובנייה</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <Link href={randomGame.href}>
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            ✨ התחילו לשחק עכשיו! ✨
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
