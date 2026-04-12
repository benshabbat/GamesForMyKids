"use client";
import { GameItemCardProps } from "@/lib/types/components/cards";

// Wikimedia Commons SVG/PNG logos for NBA teams (public domain / freely licensed)
const LOGO_URLS: Record<string, string> = {
  "lakers":   "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/200px-Los_Angeles_Lakers_logo.svg.png",
  "bulls":    "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Chicago_Bulls_logo.svg/200px-Chicago_Bulls_logo.svg.png",
  "warriors": "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Golden_State_Warriors_logo.svg/200px-Golden_State_Warriors_logo.svg.png",
  "celtics":  "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Boston_Celtics.svg/200px-Boston_Celtics.svg.png",
  "heat":     "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Miami_Heat_logo.svg/200px-Miami_Heat_logo.svg.png",
  "nets":     "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/200px-Brooklyn_Nets_newlogo.svg.png",
  "knicks":   "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/New_York_Knicks_logo.svg/200px-New_York_Knicks_logo.svg.png",
  "spurs":    "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/San_Antonio_Spurs.svg/200px-San_Antonio_Spurs.svg.png",
  "mavs":     "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Dallas_Mavericks_logo.svg/200px-Dallas_Mavericks_logo.svg.png",
  "clippers": "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Los_Angeles_Clippers_%282015%29.svg/200px-Los_Angeles_Clippers_%282015%29.svg.png",
  "suns":     "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Phoenix_Suns_logo.svg/200px-Phoenix_Suns_logo.svg.png",
  "bucks":    "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Milwaukee_Bucks_logo.svg/200px-Milwaukee_Bucks_logo.svg.png",
};

const BG_COLORS: Record<string, string> = {
  "lakers":   "bg-yellow-900",
  "bulls":    "bg-gray-900",
  "warriors": "bg-blue-900",
  "celtics":  "bg-green-900",
  "heat":     "bg-gray-900",
  "nets":     "bg-black",
  "knicks":   "bg-blue-900",
  "spurs":    "bg-gray-800",
  "mavs":     "bg-blue-900",
  "clippers": "bg-blue-800",
  "suns":     "bg-orange-900",
  "bucks":    "bg-green-900",
};

export default function NbaTeamsGameCard({ item, onClick, isSelected }: GameItemCardProps) {
  const logoUrl = LOGO_URLS[item.name];
  const bgColor = BG_COLORS[item.name] ?? "bg-gray-900";

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        w-full aspect-square rounded-3xl cursor-pointer transition-all duration-300
        transform hover:scale-110 shadow-xl hover:shadow-2xl
        ${bgColor} flex flex-col items-center justify-center overflow-hidden
        border-8 ${isSelected ? "border-orange-400 ring-4 ring-orange-400 ring-offset-4" : "border-gray-700"}
      `}
    >
      <div className="flex-1 w-full flex items-center justify-center p-3">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={item.english || item.name}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <div className="text-6xl">{item.emoji}</div>
        )}
      </div>
      <div className="w-full bg-black bg-opacity-60 py-1 px-2">
        <span className="text-xs md:text-sm font-bold text-orange-200 text-center block leading-tight">
          {item.hebrew}
        </span>
      </div>
    </button>
  );
}
