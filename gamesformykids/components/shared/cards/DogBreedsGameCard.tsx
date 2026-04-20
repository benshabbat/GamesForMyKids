"use client";
import { useState } from "react";
import { GameItemCardProps } from "@/lib/types/components/cards";

// Wikimedia Commons image URLs for dog breed photos (public domain / CC licensed)
const PHOTO_URLS: Record<string, string> = {
  "golden-retriever": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_Retriever_Dukedestiny01_drvd.jpg/200px-Golden_Retriever_Dukedestiny01_drvd.jpg",
  "german-shepherd":  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Collage_of_Nine_Dogs.jpg/200px-Collage_of_Nine_Dogs.jpg",
  "labrador":         "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Labrador_on_Quantock_%282175262184%29.jpg/200px-Labrador_on_Quantock_%282175262184%29.jpg",
  "bulldog":          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Bulldogge.jpg/200px-Bulldogge.jpg",
  "poodle":           "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Full_attention_%288067349690%29.jpg/200px-Full_attention_%288067349690%29.jpg",
  "beagle":           "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/000_0069.jpg/200px-000_0069.jpg",
  "chihuahua":        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chihuahua1_bvdb.jpg/200px-Chihuahua1_bvdb.jpg",
  "husky":            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Siberian-husky.jpg/200px-Siberian-husky.jpg",
  "dachshund":        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Short-haired-Dachshund.jpg/200px-Short-haired-Dachshund.jpg",
  "dalmatian":        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Dalmatian_dog_Spot.jpg/200px-Dalmatian_dog_Spot.jpg",
  "rottweiler":       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Rottweiler_shooting.jpg/200px-Rottweiler_shooting.jpg",
  "pomeranian":       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Pomeranian_orange_dog.jpg/200px-Pomeranian_orange_dog.jpg",
  "shih-tzu":         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Shih-Tzu-Sweetie.jpg/200px-Shih-Tzu-Sweetie.jpg",
  "border-collie":    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Border_Collie_sheep.jpg/200px-Border_Collie_sheep.jpg",
  "maltese":          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Maltese_600.jpg/200px-Maltese_600.jpg",
};

export default function DogBreedsGameCard({ item, onClick, isSelected }: GameItemCardProps) {
  const photoUrl = PHOTO_URLS[item.name];
  const [imageError, setImageError] = useState(false);

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        w-full aspect-square rounded-3xl cursor-pointer transition-all duration-300
        transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-amber-50 flex flex-col items-center justify-center overflow-hidden
        border-8 ${isSelected ? "border-amber-500 ring-4 ring-amber-500 ring-offset-4" : "border-amber-200"}
      `}
    >
      {/* Dog Photo */}
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
      <div className="w-full bg-amber-50 py-1 px-2">
        <span className="text-xs md:text-sm font-bold text-amber-900 text-center block leading-tight">
          {item.hebrew}
        </span>
      </div>
    </button>
  );
}
