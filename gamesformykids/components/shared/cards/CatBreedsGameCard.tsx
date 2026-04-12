"use client";
import { GameItemCardProps } from "@/lib/types/components/cards";

// Wikimedia Commons image URLs for cat breed photos (public domain / CC licensed)
const PHOTO_URLS: Record<string, string> = {
  "persian":          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/White_Persian_Cat.jpg/200px-White_Persian_Cat.jpg",
  "siamese":          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Siam_lilacpoint.jpg/200px-Siam_lilacpoint.jpg",
  "maine-coon":       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Maine_Coon_cat_by_Tomitheos.JPG/200px-Maine_Coon_cat_by_Tomitheos.JPG",
  "bengal":           "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Paintedcats_Red_Star_standing.jpg/200px-Paintedcats_Red_Star_standing.jpg",
  "ragdoll":          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Ragdoll_from_Gatil_Ragbelas.jpg/200px-Ragdoll_from_Gatil_Ragbelas.jpg",
  "british-short":    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Britishblue.jpg/200px-Britishblue.jpg",
  "scottish-fold":    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Scottish_fold_cat_prof.jpg/200px-Scottish_fold_cat_prof.jpg",
  "sphynx":           "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Sphynx2.jpg/200px-Sphynx2.jpg",
  "abyssinian":       "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/200px-Gustav_chocolate.jpg",
  "russian-blue":     "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/RussianBlue.jpg/200px-RussianBlue.jpg",
  "norwegian-forest": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/forestcat.jpg/200px-forestcat.jpg",
  "burmese":          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Chocolate_Burmese_cat.jpg/200px-Chocolate_Burmese_cat.jpg",
};

export default function CatBreedsGameCard({ item, onClick, isSelected }: GameItemCardProps) {
  const photoUrl = PHOTO_URLS[item.name];

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        w-full aspect-square rounded-3xl cursor-pointer transition-all duration-300
        transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-purple-50 flex flex-col items-center justify-center overflow-hidden
        border-8 ${isSelected ? "border-purple-400 ring-4 ring-purple-400 ring-offset-4" : "border-purple-200"}
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
      <div className="w-full bg-purple-50 py-1 px-2">
        <span className="text-xs md:text-sm font-bold text-purple-900 text-center block leading-tight">
          {item.hebrew}
        </span>
      </div>
    </button>
  );
}
