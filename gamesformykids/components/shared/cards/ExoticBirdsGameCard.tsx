"use client";
import { GameItemCardProps } from "@/lib/types/components/cards";

// Wikimedia Commons image URLs for exotic bird photos (public domain / CC licensed)
const PHOTO_URLS: Record<string, string> = {
  "flamingo":    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flamingos_Laguna_Colorada.jpg/200px-Flamingos_Laguna_Colorada.jpg",
  "toucan":      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ramphastos_sulfuratus_-Costa_Rica-8.jpg/200px-Ramphastos_sulfuratus_-Costa_Rica-8.jpg",
  "peacock":     "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Peacock_on_a_hill.jpg/200px-Peacock_on_a_hill.jpg",
  "macaw":       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaw_-_P1090413.jpg/200px-Macaw_-_P1090413.jpg",
  "owl":         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Bubo_scandiacus_2.jpg/200px-Bubo_scandiacus_2.jpg",
  "eagle":       "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/American-Bald-Eagle.jpg/200px-American-Bald-Eagle.jpg",
  "penguin":     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/South_Shetland-2016-Deception_Island%E2%80%93Chinstrap_penguin_%28Pygoscelis_antarctica%29_04.jpg/200px-South_Shetland-2016-Deception_Island%E2%80%93Chinstrap_penguin_%28Pygoscelis_antarctica%29_04.jpg",
  "parrot":      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/NZ_Kaka_1_-_Zealandia.jpg/200px-NZ_Kaka_1_-_Zealandia.jpg",
  "hummingbird": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Calypte_anna_-_female_p.jpg/200px-Calypte_anna_-_female_p.jpg",
  "pelican":     "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brown_pelican_plunge_diving.jpg/200px-Brown_pelican_plunge_diving.jpg",
  "swan":        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Cygnus_olor_-_Mindaugo_ezeras.jpg/200px-Cygnus_olor_-_Mindaugo_ezeras.jpg",
  "puffin":      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Atlantic_puffin_portrait.jpg/200px-Atlantic_puffin_portrait.jpg",
};

export default function ExoticBirdsGameCard({ item, onClick, isSelected }: GameItemCardProps) {
  const photoUrl = PHOTO_URLS[item.name];

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        w-full aspect-square rounded-3xl cursor-pointer transition-all duration-300
        transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-sky-50 flex flex-col items-center justify-center overflow-hidden
        border-8 ${isSelected ? "border-sky-400 ring-4 ring-sky-400 ring-offset-4" : "border-sky-200"}
      `}
    >
      <div className="flex-1 w-full overflow-hidden">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={item.english || item.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {item.emoji}
          </div>
        )}
      </div>
      <div className="w-full bg-sky-50 py-1 px-2">
        <span className="text-xs md:text-sm font-bold text-sky-900 text-center block leading-tight">
          {item.hebrew}
        </span>
      </div>
    </button>
  );
}
