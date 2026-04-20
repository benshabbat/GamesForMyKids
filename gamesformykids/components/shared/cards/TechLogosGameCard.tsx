"use client";
import { useState } from "react";
import { GameItemCardProps } from "@/lib/types/components/cards";

// Wikimedia Commons thumbnail URLs for tech company logos (public domain / freely licensed)
const LOGO_URLS: Record<string, string> = {
  "google":    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png",
  "apple":     "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/150px-Apple_logo_black.svg.png",
  "microsoft": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png",
  "amazon":    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png",
  "meta":      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/200px-Meta_Platforms_Inc._logo.svg.png",
  "netflix":   "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png",
  "spotify":   "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/200px-Spotify_logo_with_text.svg.png",
  "youtube":   "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/200px-YouTube_full-color_icon_%282017%29.svg.png",
  "tesla":     "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/150px-Tesla_T_symbol.svg.png",
  "samsung":   "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/200px-Samsung_Logo.svg.png",
  "intel":     "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/200px-Intel-logo.svg.png",
  "twitter-x": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/150px-X_logo_2023.svg.png",
  "github":    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/200px-Octicons-mark-github.svg.png",
  "adobe":     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Horizontal_Lockup_Red_HEX.svg/200px-Adobe_Corporate_Horizontal_Lockup_Red_HEX.svg.png",
  "paypal":    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png",
};

// Background colors per logo for better contrast
const BG_COLORS: Record<string, string> = {
  "google": "bg-white",
  "apple": "bg-gray-100",
  "microsoft": "bg-white",
  "amazon": "bg-white",
  "meta": "bg-white",
  "netflix": "bg-black",
  "spotify": "bg-black",
  "youtube": "bg-white",
  "tesla": "bg-white",
  "samsung": "bg-white",
  "intel": "bg-white",
  "twitter-x": "bg-black",
  "github": "bg-white",
  "adobe": "bg-white",
  "paypal": "bg-white",
};

export default function TechLogosGameCard({ item, onClick, isSelected }: GameItemCardProps) {
  const logoUrl = LOGO_URLS[item.name];
  const bgColor = BG_COLORS[item.name] ?? "bg-white";
  const [imageError, setImageError] = useState(false);

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        w-full aspect-square rounded-3xl cursor-pointer transition-all duration-300
        transform hover:scale-110 shadow-xl hover:shadow-2xl
        ${bgColor} flex flex-col items-center justify-center overflow-hidden
        border-8 ${isSelected ? "border-blue-400 ring-4 ring-blue-400 ring-offset-4" : "border-gray-200"}
      `}
    >
      {/* Logo */}
      <div className="flex-1 w-full flex items-center justify-center p-4">
        {logoUrl && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={item.english || item.name}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-6xl">{item.emoji}</div>
        )}
      </div>
      {/* Label */}
      <div className="w-full bg-gray-50 py-1 px-2">
        <span className="text-xs md:text-sm font-bold text-gray-800 text-center block leading-tight">
          {item.hebrew}
        </span>
      </div>
    </button>
  );
}
