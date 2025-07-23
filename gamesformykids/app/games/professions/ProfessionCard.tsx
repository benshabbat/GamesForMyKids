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
        p-6 rounded-3xl shadow-lg cursor-pointer
        transform transition-all duration-300
        hover:scale-105 hover:shadow-xl
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'}
        border-2 border-white/50
        flex flex-col items-center justify-center
        min-h-[160px]
        backdrop-blur-sm
      `}
      onClick={disabled ? undefined : onClick}
    >
      <div className="text-7xl mb-4 animate-bounce">
        {profession.emoji}
      </div>
      <div className="text-xl font-bold text-gray-800 text-center mb-2">
        {profession.name}
      </div>
      <div className="text-sm text-gray-700 text-center px-2 hidden sm:block">
        {profession.description.length > 35 
          ? profession.description.substring(0, 35) + "..."
          : profession.description
        }
      </div>
    </div>
  );
}
