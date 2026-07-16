"use client";
import Image from "next/image";
import { GameItemCardProps } from "@/lib/types/components/cards";
import { aspectClasses, borderRadiusClasses, hoverClasses, shadowClasses } from "./cardStyleMaps";

const NAME_TO_CODE: Record<string, string> = {
  france: "fr",
  germany: "de",
  spain: "es",
  italy: "it",
  uk: "gb",
  netherlands: "nl",
  portugal: "pt",
  sweden: "se",
  greece: "gr",
  switzerland: "ch",
  poland: "pl",
  austria: "at",
  usa: "us",
  brazil: "br",
  canada: "ca",
  mexico: "mx",
  argentina: "ar",
  japan: "jp",
  china: "cn",
  india: "in",
  israel: "il",
  turkey: "tr",
  "south-korea": "kr",
  thailand: "th",
  egypt: "eg",
  morocco: "ma",
  "south-africa": "za",
  australia: "au",
  russia: "ru",
  ukraine: "ua",
};

export default function FlagsGameCard({ item, onClick, isSelected }: GameItemCardProps) {
  const code = NAME_TO_CODE[item.name] ?? "un";
  const flagUrl = `https://flagcdn.com/w160/${code}.png`;

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
      {/* Flag image */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden rounded-xl">
        <Image
          src={flagUrl}
          alt={item.english || item.name}
          fill
          sizes="(max-width: 768px) 33vw, 160px"
          className="object-cover rounded-xl"
          referrerPolicy="no-referrer"
        />
      </div>
      {/* Country name in Hebrew */}
      <span className="text-sm md:text-base font-bold text-gray-800 text-center leading-tight">
        {item.hebrew}
      </span>
    </button>
  );
}
