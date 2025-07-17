import Link from "next/link";
import { Star } from "lucide-react";
import { GamesRegistry } from "@/lib/registry/gamesRegistry";

function GamesGrid() {
  // קבלת כל המשחקים אוטומטית מהרישום
  const games = GamesRegistry.getAllGames();
  
  return (
    <div className="max-w-4xl mx-auto px-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {games.map((game) => (
          <div key={game.id} className="relative">
            {game.available ? (
              <Link href={game.href}>
                <div
                  className={`
                    relative p-8 rounded-3xl shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-2xl
                    ${game.color}
                  `}
                >
                  <div className="text-center text-white">
                    <div className="mb-4 flex justify-center">{game.icon}</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {game.title}
                    </h3>
                    <p className="text-lg md:text-xl opacity-90">
                      {game.description}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4">
                    <Star className="w-6 h-6 text-yellow-300 fill-current" />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="relative p-8 rounded-3xl shadow-xl bg-gray-300 cursor-not-allowed">
                <div className="absolute inset-0 bg-gray-400 bg-opacity-50 rounded-3xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">בקרוב!</span>
                </div>

                <div className="text-center text-white">
                  <div className="mb-4 flex justify-center">{game.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {game.title}
                  </h3>
                  <p className="text-lg md:text-xl opacity-90">
                    {game.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesGrid;