"use client";
import Image from 'next/image';
import { GameItemCardProps } from "@/lib/types/components/cards";
import { aspectClasses, borderRadiusClasses, hoverClasses, shadowClasses } from "./cardStyleMaps";

export default function GeographyGameCard({ item, onClick, isSelected }: GameItemCardProps) {
  const iso2 = item.id ?? item.name;
  const flagUrl = `https://flagcdn.com/w80/${iso2}.png`;

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        w-full ${aspectClasses.square} ${borderRadiusClasses['3xl']} cursor-pointer transition-[transform,box-shadow] duration-300
        transform ${hoverClasses.scale} ${shadowClasses.xl} ${hoverClasses.glow}
        bg-white flex flex-col items-center justify-center p-3 gap-2
        border-8 ${isSelected ? "border-green-400 ring-4 ring-green-400 ring-offset-4" : "border-white"}
      `}
    >
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden rounded-xl">
        <Image
          src={flagUrl}
          alt=""
          width={80}
          height={53}
          className="w-full h-auto object-cover rounded-xl"
          loading="lazy"
        />
      </div>
      <span className="text-sm md:text-base font-bold text-gray-800 text-center leading-tight">
        {item.hebrew}
      </span>
    </button>
  );
}
