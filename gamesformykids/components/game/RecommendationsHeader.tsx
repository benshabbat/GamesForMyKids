"use client";

import { ComponentTypes } from "@/lib/types";

export default function RecommendationsHeader({ title, description }: ComponentTypes.RecommendationsHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  );
}
