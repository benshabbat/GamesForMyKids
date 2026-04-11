"use client";
import { GameItemCardProps } from "@/lib/types/components/cards";

// Map team name → Wikimedia Commons logo URL
const LOGO_URLS: Record<string, string> = {
  "barcelona":         "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
  "real-madrid":       "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  "manchester-united": "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  "liverpool":         "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  "chelsea":           "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  "arsenal":           "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  "manchester-city":   "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
  "juventus":          "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg",
  "ac-milan":          "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
  "psg":               "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
  "bayern":            "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282002%E2%80%932017%29.svg",
  "dortmund":          "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
  "ajax":              "https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg",
  "atletico":          "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
  "tottenham":         "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
  "porto":             "https://upload.wikimedia.org/wikipedia/en/3/3b/FC_Porto.svg",
  "benfica":           "https://upload.wikimedia.org/wikipedia/en/c/ce/Sport_Lisboa_e_Benfica_(logo).svg",
  "inter-milan":       "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
  "napoli":            "https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Napoli_%28crest%29.svg",
  "roma":              "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg",
  "leicester":         "https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg",
  "celtic":            "https://upload.wikimedia.org/wikipedia/en/a/a4/Celtic_FC_crest.svg",
  "rangers":           "https://upload.wikimedia.org/wikipedia/en/f/f2/Rangers_FC.svg",
  "maccabi-haifa":     "https://upload.wikimedia.org/wikipedia/en/5/55/Maccabi_Haifa_FC.svg",
  "hapoel":            "https://upload.wikimedia.org/wikipedia/en/b/bc/Hapoel_Tel_Aviv_FC.svg",
};

export default function SoccerLogosGameCard({ item, onClick, isSelected }: GameItemCardProps) {
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
      {/* Logo or emoji fallback */}
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden p-1">
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
      {/* Team name in Hebrew */}
      <span className="text-xs md:text-sm font-bold text-gray-800 text-center leading-tight">
        {item.hebrew}
      </span>
    </button>
  );
}
