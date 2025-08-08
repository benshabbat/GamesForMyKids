"use client";

import React from 'react';
import Link from 'next/link';
import { Users, Award } from 'lucide-react';
import { GamesRegistry } from "@/lib/registry/gamesRegistry";

const GameRecommendations = () => {
  const allGames = GamesRegistry.getAllGameRegistrations().filter(game => game.available);
  
  // קטגוריזציה לפי גיל (דמה - אפשר להוסיף מאפיין age למשחקים)
  const ageGroups = {
    "2-3": {
      title: "גיל 2-3",
      icon: "👶",
      description: "משחקים פשוטים ובסיסיים",
      recommendedGames: allGames.filter(game => 
        game.id.includes('colors') || 
        game.id.includes('shapes') || 
        game.id.includes('bubbles')
      ).slice(0, 3)
    },
    "3-4": {
      title: "גיל 3-4", 
      icon: "🧒",
      description: "למידה והכרת מושגים",
      recommendedGames: allGames.filter(game => 
        game.id.includes('hebrew-letters') || 
        game.id.includes('counting') || 
        game.id.includes('memory')
      ).slice(0, 3)
    },
    "4-5": {
      title: "גיל 4-5",
      icon: "👦",
      description: "אתגרים וחשיבה מתקדמת", 
      recommendedGames: allGames.filter(game => 
        game.id.includes('math') || 
        game.id.includes('puzzles') || 
        game.id.includes('building')
      ).slice(0, 3)
    }
  };

  if (allGames.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🎯 המלצות לפי גיל</h2>
        <p className="text-lg text-gray-600">משחקים מותאמים לרמת הפיתוח של הילד</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(ageGroups).map(([ageKey, ageGroup]) => (
          <div key={ageKey} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{ageGroup.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{ageGroup.title}</h3>
              <p className="text-sm text-gray-600">{ageGroup.description}</p>
            </div>

            <div className="space-y-3">
              {ageGroup.recommendedGames.length > 0 ? (
                ageGroup.recommendedGames.map((game) => (
                  <Link key={game.id} href={game.href}>
                    <div className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:from-purple-50 hover:to-blue-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md border border-gray-100">
                      <div className="flex-shrink-0 ml-3">
                        <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-1.5 rounded-lg">
                          <game.icon className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">{game.title}</h4>
                        <p className="text-xs text-gray-600 truncate">{game.description}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <div className="text-2xl mb-2">🔄</div>
                  <p className="text-sm">משחקים בהכנה...</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <Users className="w-4 h-4 ml-1" />
                  <span>מותאם לגיל</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 ml-1" />
                  <span>מומלץ</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="text-center mt-8">
        <div className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20 shadow-lg backdrop-blur-sm">
          💡 לא בטוחים איזה משחק לבחור? התחילו עם המשחק המומלץ!
        </div>
      </div>
    </div>
  );
};

export default GameRecommendations;
