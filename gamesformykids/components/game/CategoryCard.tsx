"use client";

import { Star } from "lucide-react";
import { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
  gamesCount: number;
  availableCount: number;
  onClick: () => void;
}

export default function CategoryCard({
  category,
  gamesCount,
  availableCount,
  onClick
}: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <div
      onClick={onClick}
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
}
