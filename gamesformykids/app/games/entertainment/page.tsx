"use client";

import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { GamesRegistry } from "@/lib/registry/gamesRegistry";

// משחקי בידור
const ENTERTAINMENT_GAME_IDS = [
  "bubbles", "drawing", "building", "puzzles", "tzedakah",
  "instruments", "emotions"
];

export default function EntertainmentGamesPage() {
  // קבלת המשחקים הבידוריים מהרישום
  const allGames = GamesRegistry.getAllGameRegistrations();
  const entertainmentGames = allGames.filter(game => 
    ENTERTAINMENT_GAME_IDS.includes(game.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-100">
      {/* כותרת בידורית */}
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-6 mb-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-4xl">🎪</span>
            <h2 className="text-3xl font-bold">משחקי בידור</h2>
            <span className="text-4xl">🎈</span>
          </div>
          <p className="text-center text-lg text-pink-100">
            משחקים מהנים ומרגשים לשעות של בידור איכותי
          </p>
        </div>
      </div>

      {/* תוכן המשחקים */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-pink-50 rounded-xl">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-bold text-pink-800">יצירתיות</h3>
              <p className="text-sm text-pink-600">הביעו את עצמכם בצורה יצירתית</p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl mb-2">🎵</div>
              <h3 className="font-bold text-orange-800">מוזיקה וקול</h3>
              <p className="text-sm text-orange-600">משחקים עם צלילים מהנים</p>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <div className="text-3xl mb-2">🌈</div>
              <h3 className="font-bold text-yellow-800">צבעים וצורות</h3>
              <p className="text-sm text-yellow-600">עולם מלא בצבעים יפים</p>
            </div>
          </div>
        </div>

        {/* רשת המשחקים */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {entertainmentGames.map((game) => (
            <div key={game.id} className="relative">
              {game.available ? (
                <Link href={game.href}>
                  <div
                    className={`
                      relative p-8 rounded-3xl shadow-xl transition-all duration-300 
                      transform hover:scale-105 cursor-pointer hover:shadow-2xl
                      ${game.color}
                    `}
                  >
                    <div className="text-center text-white">
                      <div className="mb-6 flex justify-center">
                        <game.icon className="w-12 h-12" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        {game.title}
                      </h3>
                      <p className="text-lg opacity-90 mb-4">
                        {game.description}
                      </p>
                      
                      {/* תגית בידור */}
                      <div className="bg-white bg-opacity-20 rounded-full py-2 px-4 inline-block">
                        <span className="text-sm font-bold text-white">
                          🎨 משחק בידור
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Star className="w-6 h-6 text-yellow-300 fill-current" />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative p-8 rounded-3xl shadow-xl bg-gray-300 cursor-not-allowed">
                  <div className="absolute inset-0 bg-gray-400 bg-opacity-50 rounded-3xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">בקרוב!</span>
                  </div>
                  <div className="text-center text-white">
                    <div className="mb-6 flex justify-center">
                      <game.icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">
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

        {/* כפתור חזרה */}
        <div className="text-center mb-8">
          <Link 
            href="/games"
            className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-full font-bold hover:bg-pink-700 transition-colors"
          >
            ← חזרה לכל המשחקים
          </Link>
        </div>

        {/* מספר המשחקים */}
        <div className="text-center">
          <div className="bg-pink-50 rounded-2xl p-6 inline-block">
            <p className="text-pink-800 text-lg">
              <span className="font-bold text-2xl">{entertainmentGames.length}</span> משחקי בידור
            </p>
            <p className="text-pink-600 text-sm mt-2">
              משחקים מהנים ויצירתיים
            </p>
          </div>
        </div>
      </div>

      {/* פוטר בידורי */}
      <footer className="mt-12 bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-orange-100">
            🎉 הכי חשוב - להנות ולחייך!
          </p>
        </div>
      </footer>
    </div>
  );
}
