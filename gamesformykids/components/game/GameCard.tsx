"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { ComponentTypes } from "@/lib/types";

export default function GameCard({ game }: ComponentTypes.GameCardProps) {
  if (game.available) {
    return (
      <div className="relative">
        <Link href={game.href}>
          <div
            className={`
              relative p-3 md:p-6 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-2xl overflow-hidden
              ${game.color}
            `}
          >
            {/* Gradient overlay for enhanced visual appeal */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            
            <div className="relative text-center text-white">
              <div className="mb-2 md:mb-4 flex justify-center">
                <div className="bg-white/20 p-1.5 md:p-2 rounded-full backdrop-blur-sm">
                  <game.icon className="w-7 h-7 md:w-10 md:h-10" />
                </div>
              </div>
              <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 drop-shadow-sm leading-tight">
                {game.title}
              </h3>
              <p className="text-xs md:text-lg opacity-90 drop-shadow-sm hidden sm:block">
                {game.description}
              </p>
            </div>
            <div className="absolute top-2 right-2 md:top-4 md:right-4">
              <Star className="w-3.5 h-3.5 md:w-5 md:h-5 text-yellow-300 fill-current drop-shadow-sm" />
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative p-3 md:p-6 rounded-2xl md:rounded-3xl shadow-lg bg-gray-300 cursor-not-allowed">
        <div className="absolute inset-0 bg-gray-400 bg-opacity-50 rounded-2xl md:rounded-3xl flex items-center justify-center">
          <span className="text-white text-sm md:text-xl font-bold">בקרוב!</span>
        </div>
        <div className="text-center text-white">
          <div className="mb-2 md:mb-4 flex justify-center">
            <game.icon className="w-7 h-7 md:w-10 md:h-10" />
          </div>
          <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2">
            {game.title}
          </h3>
          <p className="text-xs md:text-lg opacity-90 hidden sm:block">
            {game.description}
          </p>
        </div>
      </div>
    </div>
  );
}
