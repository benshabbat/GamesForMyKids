"use client";

import { Star } from "lucide-react";
import { ComponentTypes } from "@/lib/types";

export default function CategoryCard({
  category,
  gamesCount,
  onClick
}: ComponentTypes.CategoryCardProps) {
  const Icon = category.icon;

  return (
    <div
      onClick={onClick}
      className={`relative p-3 md:p-6 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-2xl bg-gradient-to-br ${category.gradient}`}
    >
      <div className="text-center text-white">
        <div className="mb-2 md:mb-4 flex justify-center">
          <Icon className="w-8 h-8 md:w-12 md:h-12" />
        </div>
        <h3 className="text-base md:text-2xl font-bold mb-1 md:mb-2 leading-tight">
          {category.title}
        </h3>
        <p className="text-xs md:text-lg opacity-90 mb-2 md:mb-3 hidden sm:block">
          {category.description}
        </p>
        <div className="bg-black/25 rounded-full py-1 px-2 md:py-2 md:px-4 inline-block border border-white/30 shadow-md">
          <span className="font-bold text-white text-xs md:text-sm drop-shadow">
            {gamesCount} משחקים
          </span>
        </div>
      </div>
      <div className="absolute top-2 right-2 md:top-4 md:right-4">
        <Star className="w-4 h-4 md:w-6 md:h-6 text-yellow-300 fill-current" />
      </div>
    </div>
  );
}
