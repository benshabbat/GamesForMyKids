"use client";
import { GameItemCardProps } from "@/lib/types/components/cards";

// Wikimedia Commons thumbnail URLs for famous landmarks
const PHOTO_URLS: Record<string, string> = {
  "eiffel-tower":      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/180px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
  "big-ben":           "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007_icon.png/100px-Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007_icon.png",
  "statue-of-liberty": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Statue_of_Liberty%2C_NY_4.jpg/180px-Statue_of_Liberty%2C_NY_4.jpg",
  "colosseum":         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/180px-Colosseo_2020.jpg",
  "taj-mahal":         "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/TajMahal_2012.jpg/180px-TajMahal_2012.jpg",
  "great-wall":        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/180px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
  "pyramids":          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/180px-Kheops-Pyramid.jpg",
  "sydney-opera":      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Sydney_Australia._%2821339175489%29.jpg/180px-Sydney_Australia._%2821339175489%29.jpg",
  "burj-khalifa":      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Burj_Khalifa.jpg/180px-Burj_Khalifa.jpg",
  "sagrada-familia":   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sagrada_Familia_01.jpg/180px-Sagrada_Familia_01.jpg",
  "acropolis":         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/180px-The_Parthenon_in_Athens.jpg",
  "petra":             "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Treasury_petra_crop.jpg/180px-Treasury_petra_crop.jpg",
  "niagara-falls":     "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/NiagaraFalls_2010.jpg/180px-NiagaraFalls_2010.jpg",
  "mount-fuji":        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/080103_hakkai_fuji.jpg/180px-080103_hakkai_fuji.jpg",
  "stonehenge":        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_30.jpg/180px-Stonehenge2007_07_30.jpg",
  "christ-redeemer":   "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Cristo_Redentor.jpg/180px-Christ_the_Redeemer_-_Cristo_Redentor.jpg",
  "machu-picchu":      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/180px-Machu_Picchu%2C_Peru.jpg",
  "tower-of-london":   "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Tower_of_London_viewed_from_the_River_Thames.jpg/180px-Tower_of_London_viewed_from_the_River_Thames.jpg",
  "angkor-wat":        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Angkor_wat_temple.jpg/180px-Angkor_wat_temple.jpg",
  "golden-gate":       "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/180px-GoldenGateBridge-001.jpg",
};

export default function WorldLandmarksGameCard({ item, onClick, isSelected }: GameItemCardProps) {
  const photoUrl = PHOTO_URLS[item.name];

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        w-full aspect-square rounded-3xl cursor-pointer transition-all duration-300
        transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-white flex flex-col items-center justify-center overflow-hidden
        border-8 ${isSelected ? "border-green-400 ring-4 ring-green-400 ring-offset-4" : "border-white"}
      `}
    >
      {/* Photo */}
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
      {/* Label */}
      <div className="w-full bg-white py-1 px-2">
        <span className="text-xs md:text-sm font-bold text-gray-800 text-center block leading-tight">
          {item.hebrew}
        </span>
      </div>
    </button>
  );
}
