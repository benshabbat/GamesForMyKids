"use client";
import { useState } from "react";
import { GameItemCardProps } from "@/lib/types/components/cards";

// Wikimedia Commons image URLs for butterfly/moth photos (public domain / CC licensed)
const PHOTO_URLS: Record<string, string> = {
  "monarch":       "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Monarch_butterfly_on_a_flower.jpg/200px-Monarch_butterfly_on_a_flower.jpg",
  "swallowtail":   "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Eastern_Tiger_Swallowtail_%28Papilio_glaucus%29.jpg/200px-Eastern_Tiger_Swallowtail_%28Papilio_glaucus%29.jpg",
  "blue-morpho":   "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Morpho_menelaus_huebneri_MHNT.jpg/200px-Morpho_menelaus_huebneri_MHNT.jpg",
  "painted-lady":  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Vanessa_cardui_1.jpg/200px-Vanessa_cardui_1.jpg",
  "red-admiral":   "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Vanessa_atalanta_-_Chris_Moody.jpg/200px-Vanessa_atalanta_-_Chris_Moody.jpg",
  "cabbage-white": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Pieris_brassicae20.jpg/200px-Pieris_brassicae20.jpg",
  "birdwing":      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Ornithoptera_alexandrae.jpg/200px-Ornithoptera_alexandrae.jpg",
  "glasswing":     "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Greta_oto.jpg/200px-Greta_oto.jpg",
  "luna-moth":     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Actias_luna_2.jpg/200px-Actias_luna_2.jpg",
  "zebra-longwing":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Heliconius_charithonia_1.jpg/200px-Heliconius_charithonia_1.jpg",
  "atlas-moth":    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Attacus_atlas_qtl1.jpg/200px-Attacus_atlas_qtl1.jpg",
  "apollo":        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Parnassius_apollo_hannyngemontis.jpg/200px-Parnassius_apollo_hannyngemontis.jpg",
};

export default function ButterfliesGameCard({ item, onClick, isSelected }: GameItemCardProps) {
  const photoUrl = PHOTO_URLS[item.name];
  const [imageError, setImageError] = useState(false);

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        w-full aspect-square rounded-3xl cursor-pointer transition-all duration-300
        transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-pink-50 flex flex-col items-center justify-center overflow-hidden
        border-8 ${isSelected ? "border-pink-400 ring-4 ring-pink-400 ring-offset-4" : "border-pink-200"}
      `}
    >
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
      <div className="w-full bg-pink-50 py-1 px-2">
        <span className="text-xs md:text-sm font-bold text-pink-900 text-center block leading-tight">
          {item.hebrew}
        </span>
      </div>
    </button>
  );
}
