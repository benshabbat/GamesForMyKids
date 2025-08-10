"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Star, Book, Palette, Calculator, Car, Home, Gamepad2, Apple } from 'lucide-react';
import { GamesRegistry } from "@/lib/registry/gamesRegistry";

// הגדרת קטגוריות המשחקים
const GAME_CATEGORIES = {
  basic: {
    title: "למידה בסיסית",
    description: "אותיות, מספרים, צבעים וצורות",
    icon: Book,
    color: "bg-blue-500",
    gradient: "from-blue-400 to-blue-600",
    gameIds: ["letters", "hebrew-letters", "numbers", "shapes", "colored-shapes", "colors"]
  },
  creative: {
    title: "יצירתיות ואומנות",
    description: "מוזיקה, כלי נגינה, פאזלים וציור",
    icon: Palette,
    color: "bg-purple-500",
    gradient: "from-purple-400 to-purple-600",
    gameIds: ["instruments", "puzzles", "drawing", "building"]
  },
  nature: {
    title: "טבע ואוכל",
    description: "חיות, פירות וירקות",
    icon: Apple,
    color: "bg-green-500",
    gradient: "from-green-400 to-green-600",
    gameIds: ["animals", "fruits", "vegetables"]
  },
  world: {
    title: "עולם ותחבורה",
    description: "כלי תחבורה, מזג אוויר וחלל",
    icon: Car,
    color: "bg-orange-500",
    gradient: "from-orange-400 to-orange-600",
    gameIds: ["transport", "weather", "space"]
  },
  home: {
    title: "בית וחיים",
    description: "חפצי בית, בגדים, מקצועות וצדקה",
    icon: Home,
    color: "bg-pink-500",
    gradient: "from-pink-400 to-pink-600",
    gameIds: ["house", "clothing", "professions", "tools", "tzedakah"]
  },
  math: {
    title: "מתמטיקה וחשיבה",
    description: "ספירה וחשבון מתמטי",
    icon: Calculator,
    color: "bg-indigo-500",
    gradient: "from-indigo-400 to-indigo-600",
    gameIds: ["counting", "math"]
  },
  games: {
    title: "משחקים מיוחדים",
    description: "זיכרון, בועות ורגשות",
    icon: Gamepad2,
    color: "bg-teal-500",
    gradient: "from-teal-400 to-teal-600",
    gameIds: ["memory", "bubbles", "emotions", "smelltaste"]
  }
};

const CategorizedGamesGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllGames, setShowAllGames] = useState(false);

  // קבלת כל המשחקים מהרישום - נקבל את הרישומים המקוריים
  const allGameRegistrations = GamesRegistry.getAllGameRegistrations();
  const totalGamesCount = allGameRegistrations.length;

  // פונקציה לקבלת משחקים לפי קטגוריה
  const getGamesByCategory = (categoryKey: string) => {
    const category = GAME_CATEGORIES[categoryKey as keyof typeof GAME_CATEGORIES];
    if (!category) return [];
    
    return allGameRegistrations.filter(game => category.gameIds.includes(game.id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => {
            setSelectedCategory(null);
            setShowAllGames(false);
          }}
          className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
            !selectedCategory && !showAllGames
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
          }`}
        >
          📚 קטגוריות
        </button>
        <button
          onClick={() => {
            setSelectedCategory(null);
            setShowAllGames(true);
          }}
          className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
            showAllGames
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
          }`}
        >
          🎮 כל המשחקים ({totalGamesCount})
        </button>
      </div>

      {!selectedCategory && !showAllGames && (
        /* Categories View */
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            בחר קטגוריה 📚
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(GAME_CATEGORIES).map(([key, category]) => {
              const Icon = category.icon;
              const categoryGames = getGamesByCategory(key);
              const gamesCount = categoryGames.length;
              const availableCount = categoryGames.filter(g => g.available).length;
              
              return (
                <div
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`relative p-6 rounded-3xl shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-2xl bg-gradient-to-br ${category.gradient}`}
                >
                  <div className="text-center text-white">
                    <div className="mb-4 flex justify-center">
                      <Icon size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {category.title}
                    </h3>
                    <p className="text-lg opacity-90 mb-3">
                      {category.description}
                    </p>
                    <div className="bg-gradient-to-r from-black/30 to-black/20 rounded-full py-2 px-4 inline-block border border-white/40 backdrop-blur-sm shadow-lg hover:from-black/40 hover:to-black/30 transition-all duration-300">
                      <span className="font-bold text-white drop-shadow-lg">
                        {gamesCount} משחקים
                        {availableCount < gamesCount && ` (${availableCount} זמינים)`}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Star className="w-6 h-6 text-yellow-300 fill-current" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedCategory && (
        /* Selected Category Games */
        <div>
          <div className="text-center mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-medium transition-colors"
            >
              → חזור לקטגוריות
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {GAME_CATEGORIES[selectedCategory as keyof typeof GAME_CATEGORIES]?.title}
            </h2>
            <p className="text-lg text-gray-600 mb-3">
              {GAME_CATEGORIES[selectedCategory as keyof typeof GAME_CATEGORIES]?.description}
            </p>
            <div className="inline-block bg-blue-100 rounded-full px-4 py-2">
              <span className="text-blue-800 font-semibold">
                {getGamesByCategory(selectedCategory).length} משחקים 
                ({getGamesByCategory(selectedCategory).filter(g => g.available).length} זמינים)
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getGamesByCategory(selectedCategory).length > 0 ? (
              getGamesByCategory(selectedCategory).map((game) => (
                <div key={game.id} className="relative">
                  {game.available ? (
                    <Link href={game.href}>
                      <div
                        className={`
                          relative p-6 rounded-3xl shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-2xl overflow-hidden
                          ${game.color}
                        `}
                      >
                        {/* Gradient overlay for enhanced visual appeal */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                        
                        <div className="relative text-center text-white">
                          <div className="mb-4 flex justify-center">
                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                              <game.icon className="w-10 h-10" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2 drop-shadow-sm">
                            {game.title}
                          </h3>
                          <p className="text-lg opacity-90 drop-shadow-sm">
                            {game.description}
                          </p>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Star className="w-5 h-5 text-yellow-300 fill-current drop-shadow-sm" />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="relative p-6 rounded-3xl shadow-xl bg-gray-300 cursor-not-allowed">
                      <div className="absolute inset-0 bg-gray-400 bg-opacity-50 rounded-3xl flex items-center justify-center">
                        <span className="text-white text-xl font-bold">בקרוב!</span>
                      </div>
                      <div className="text-center text-white">
                        <div className="mb-4 flex justify-center">
                          <game.icon className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {game.title}
                        </h3>
                        <p className="text-lg opacity-90">
                          {game.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">אין עדיין משחקים בקטגוריה זו</h3>
                <p className="text-gray-500">המשחקים בקטגוריה זו עדיין בפיתוח</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showAllGames && (
        /* All Games View */
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            כל המשחקים ({totalGamesCount})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGameRegistrations.map((game) => (
              <div key={game.id} className="relative">
                {game.available ? (
                  <Link href={game.href}>
                    <div
                      className={`
                        relative p-6 rounded-3xl shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-2xl overflow-hidden
                        ${game.color}
                      `}
                    >
                      {/* Gradient overlay for enhanced visual appeal */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                      
                      <div className="relative text-center text-white">
                        <div className="mb-4 flex justify-center">
                          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                            <game.icon className="w-10 h-10" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 drop-shadow-sm">
                          {game.title}
                        </h3>
                        <p className="text-lg opacity-90 drop-shadow-sm">
                          {game.description}
                        </p>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Star className="w-5 h-5 text-yellow-300 fill-current drop-shadow-sm" />
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="relative p-6 rounded-3xl shadow-xl bg-gray-300 cursor-not-allowed">
                    <div className="absolute inset-0 bg-gray-400 bg-opacity-50 rounded-3xl flex items-center justify-center">
                      <span className="text-white text-xl font-bold">בקרוב!</span>
                    </div>
                    <div className="text-center text-white">
                      <div className="mb-4 flex justify-center">
                        <game.icon className="w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {game.title}
                      </h3>
                      <p className="text-lg opacity-90">
                        {game.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorizedGamesGrid;
