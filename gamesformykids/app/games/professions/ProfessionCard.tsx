"use client";

import { Profession } from "@/lib/types/game";

interface ProfessionCardProps {
  profession: Profession;
  onClick: () => void;
  disabled: boolean;
}

export default function ProfessionCard({ profession, onClick, disabled }: ProfessionCardProps) {
  return (
    <div
      className={`
        ${profession.color}
        p-6 rounded-2xl shadow-lg cursor-pointer
        transform transition-all duration-300
        hover:scale-105 hover:shadow-xl
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:rotate-2'}
        border-4 border-white
        flex flex-col items-center justify-center
        min-h-[150px]
      `}
      onClick={disabled ? undefined : onClick}
    >
      <div className="text-6xl mb-3 animate-pulse">
        {profession.emoji}
      </div>
      <div className="text-lg font-bold text-gray-800 text-center">
        {profession.name}
      </div>
      <div className="text-sm text-gray-600 text-center mt-2 hidden sm:block">
        {profession.description.length > 30 
          ? profession.description.substring(0, 30) + "..."
          : profession.description
        }
      </div>
    </div>
  );
}
