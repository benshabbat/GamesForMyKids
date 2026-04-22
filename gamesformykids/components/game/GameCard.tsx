"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { ComponentTypes } from "@/lib/types";
import { useFavoritesStore } from "@/lib/stores";

export default function GameCard({ game }: ComponentTypes.GameCardProps) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFav = useFavoritesStore((s) => s.favoriteIds.includes(game.id));

  if (game.available) {
    return (
      <div className="relative">
        <Link href={game.href}>
          <div
            className={`
              relative p-3 md:p-4 lg:p-6 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-2xl overflow-hidden
              ${game.color}
            `}
          >
            {/* Gradient overlay for enhanced visual appeal */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            
            <div className="relative text-center text-white">
              <div className="mb-2 md:mb-4 flex justify-center">
                <div className="bg-white/20 p-1.5 md:p-2 rounded-full backdrop-blur-sm">
                  {game.emoji ? (
                    <span className="text-2xl md:text-3xl lg:text-4xl leading-none">{game.emoji}</span>
                  ) : (
                    <game.icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                  )}
                </div>
              </div>
              <h3 className="text-sm md:text-base lg:text-xl font-bold mb-1 md:mb-2 drop-shadow-sm leading-tight">
                {game.title}
              </h3>
              <p className="text-xs md:text-sm lg:text-base opacity-90 drop-shadow-sm hidden sm:block">
                {game.description}
              </p>
            </div>
            {/* כפתור מועדפים — כוכב */}
            <button
              onClick={(e) => { e.preventDefault(); toggleFavorite(game.id); }}
              aria-label={isFav ? 'הסר ממועדפים' : 'הוסף למועדפים'}
              className={`absolute top-2 right-2 md:top-4 md:right-4 p-0.5 rounded-full transition-all duration-200 z-10 ${
                isFav ? 'scale-125' : 'opacity-60 hover:opacity-100 hover:scale-110'
              }`}
            >
              <Star className={`w-3.5 h-3.5 md:w-5 md:h-5 drop-shadow-sm transition-colors duration-200 ${
                isFav ? 'text-yellow-300 fill-current' : 'text-white'
              }`} />
            </button>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative p-3 md:p-4 lg:p-6 rounded-2xl md:rounded-3xl shadow-lg bg-gray-300 cursor-not-allowed overflow-hidden">
        <div className="absolute inset-0 bg-gray-400 bg-opacity-50 rounded-2xl md:rounded-3xl flex items-center justify-center">
          <span className="text-white text-sm md:text-base lg:text-xl font-bold">בקרוב!</span>
        </div>
        <div className="text-center text-white">
          <div className="mb-2 md:mb-4 flex justify-center">
            {game.emoji ? (
              <span className="text-2xl md:text-3xl lg:text-4xl leading-none opacity-60">{game.emoji}</span>
            ) : (
              <game.icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
            )}
          </div>
          <h3 className="text-sm md:text-base lg:text-xl font-bold mb-1 md:mb-2">
            {game.title}
          </h3>
          <p className="text-xs md:text-sm lg:text-base opacity-90 hidden sm:block">
            {game.description}
          </p>
        </div>
      </div>
    </div>
  );
}
