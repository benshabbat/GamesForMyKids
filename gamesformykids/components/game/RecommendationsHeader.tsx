"use client";

import { ComponentTypes } from "@/lib/types";

export default function RecommendationsHeader({ title, description }: ComponentTypes.RecommendationsHeaderProps) {
  return (
    <div className="text-center mb-4 md:mb-8">
      <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">{title}</h2>
      <p className="text-sm md:text-lg text-gray-600 hidden sm:block">{description}</p>
    </div>
  );
}
