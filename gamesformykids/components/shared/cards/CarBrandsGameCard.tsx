"use client";
import { GameItemCardProps } from "@/lib/types/components/cards";

const LOGO_URLS: Record<string, string> = {
  toyota:      "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg",
  bmw:         "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  mercedes:    "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
  volkswagen:  "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg",
  ford:        "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
  honda:       "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
  audi:        "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
  tesla:       "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  ferrari:     "https://upload.wikimedia.org/wikipedia/en/d/d1/Ferrari-Logo.svg",
  nissan:      "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nissan_2020_logo.svg",
  hyundai:     "https://upload.wikimedia.org/wikipedia/commons/0/07/Hyundai_Motor_Company_logo.svg",
  kia:         "https://upload.wikimedia.org/wikipedia/commons/1/13/Kia_logo.svg",
  peugeot:     "https://upload.wikimedia.org/wikipedia/commons/1/17/Logo_PEUGEOT.svg",
  renault:     "https://upload.wikimedia.org/wikipedia/commons/b/b7/Renault_2021_Text.svg",
  mazda:       "https://upload.wikimedia.org/wikipedia/commons/8/8d/Mazda_logo.svg",
  volvo:       "https://upload.wikimedia.org/wikipedia/commons/a/a2/Volvo_logo.svg",
  lamborghini: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Lamborghini-Logo.svg",
  subaru:      "https://upload.wikimedia.org/wikipedia/commons/5/5a/Subaru_logo.svg",
  porsche:     "https://upload.wikimedia.org/wikipedia/en/1/13/Porsche_logo.svg",
  jeep:        "https://upload.wikimedia.org/wikipedia/commons/a/a5/Jeep_logo.svg",
};

export default function CarBrandsGameCard({ item, onClick, isSelected }: GameItemCardProps) {
  const logoUrl = LOGO_URLS[item.name];

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
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden p-2">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={item.english || item.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <span className="text-5xl">{item.emoji}</span>
        )}
      </div>
      <span className="text-xs md:text-sm font-bold text-gray-800 text-center leading-tight">
        {item.hebrew}
      </span>
    </button>
  );
}
