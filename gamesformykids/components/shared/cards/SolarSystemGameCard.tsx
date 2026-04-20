"use client";
import { useState } from "react";
import { GameItemCardProps } from "@/lib/types/components/cards";

// NASA / Wikimedia Commons image URLs for solar system bodies (public domain)
const PHOTO_URLS: Record<string, string> = {
  "sun":      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/200px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg",
  "mercury":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/200px-Mercury_in_true_color.jpg",
  "venus":    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/200px-Venus-real_color.jpg",
  "earth":    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/200px-The_Earth_seen_from_Apollo_17.jpg",
  "mars":     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/200px-OSIRIS_Mars_true_color.jpg",
  "jupiter":  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/200px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
  "saturn":   "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/200px-Saturn_during_Equinox.jpg",
  "uranus":   "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/200px-Uranus2.jpg",
  "neptune":  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/200px-Neptune_Full.jpg",
  "moon":     "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/200px-FullMoon2010.jpg",
  "pluto":    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/200px-Pluto_in_True_Color_-_High-Res.jpg",
  "comet":    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Comet_Hale-Bopp_1995O1.jpg/200px-Comet_Hale-Bopp_1995O1.jpg",
};

export default function SolarSystemGameCard({ item, onClick, isSelected }: GameItemCardProps) {
  const photoUrl = PHOTO_URLS[item.name];
  const [imageError, setImageError] = useState(false);

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        w-full aspect-square rounded-3xl cursor-pointer transition-all duration-300
        transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gray-900 flex flex-col items-center justify-center overflow-hidden
        border-8 ${isSelected ? "border-yellow-400 ring-4 ring-yellow-400 ring-offset-4" : "border-gray-800"}
      `}
    >
      {/* Photo */}
      <div className="flex-1 w-full overflow-hidden">
        {photoUrl && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={item.english || item.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {item.emoji}
          </div>
        )}
      </div>
      {/* Label */}
      <div className="w-full bg-gray-900 py-1 px-2">
        <span className="text-xs md:text-sm font-bold text-yellow-200 text-center block leading-tight">
          {item.hebrew}
        </span>
      </div>
    </button>
  );
}
