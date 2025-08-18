"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { GameRegistration } from "@/lib/types";

interface GameCardProps {
  game: GameRegistration;
}

export default function GameCard({ game }: GameCardProps) {
  if (game.available) {
    return (
      <div className="relative">
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
      </div>
    );
  }

  return (
    <div className="relative">
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
    </div>
  );
}
