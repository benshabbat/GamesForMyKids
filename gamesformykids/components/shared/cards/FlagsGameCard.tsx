"use client";
import { GameItemCardProps } from "@/lib/types/components/cards";

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
        w-full aspect-square rounded-3xl cursor-pointer transition-all duration-300
        transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-white flex flex-col items-center justify-center p-3 gap-2
        border-8 ${isSelected ? "border-green-400 ring-4 ring-green-400 ring-offset-4" : "border-white"}
      `}
    >
      {/* Flag image */}
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flagUrl}
          alt={item.english || item.name}
          className="w-full h-full object-cover rounded-xl"
          loading="lazy"
        />
      </div>
      {/* Country name in Hebrew */}
      <span className="text-sm md:text-base font-bold text-gray-800 text-center leading-tight">
        {item.hebrew}
      </span>
    </button>
  );
}
