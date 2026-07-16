"use client";
import { GameItemCardProps } from "@/lib/types/components/cards";
import { aspectClasses, borderRadiusClasses, hoverClasses, shadowClasses } from "./cardStyleMaps";

export default function GeographyTextCard({ item, onClick, isSelected }: GameItemCardProps) {
  return (
    <button
      onClick={() => onClick(item)}
      className={`
        w-full ${aspectClasses.square} ${borderRadiusClasses['3xl']} cursor-pointer transition-[transform,box-shadow] duration-300
        transform ${hoverClasses.scale} ${shadowClasses.xl} ${hoverClasses.glow}
        bg-white flex items-center justify-center p-4
        border-8 ${isSelected ? "border-green-400 ring-4 ring-green-400 ring-offset-4" : "border-blue-200"}
      `}
    >
      <span className="text-xl md:text-2xl font-bold text-blue-800 text-center leading-tight">
        {item.hebrew}
      </span>
    </button>
  );
}
