"use client";
import { GameItemCardProps } from "@/lib/types/components/cards";

// Wikimedia Commons image URLs for famous public-domain paintings
const PHOTO_URLS: Record<string, string> = {
  "mona-lisa":          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/180px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
  "starry-night":       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/180px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  "the-scream":         "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/150px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
  "girl-pearl-earring": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/180px-1665_Girl_with_a_Pearl_Earring.jpg",
  "birth-of-venus":     "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/180px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
  "creation-of-adam":   "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/180px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
  "water-lilies":       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/180px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
  "sunflowers":         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg/180px-Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg",
  "last-supper":        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%22The_Last_Supper%22_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/180px-%22The_Last_Supper%22_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg",
  "american-gothic":    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_DeVolson_Wood_-_American_Gothic.jpg/180px-Grant_DeVolson_Wood_-_American_Gothic.jpg",
  "night-watch":        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/180px-The_Night_Watch_-_HD.jpg",
  "the-kiss":           "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/180px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
  "las-meninas":        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Las_Meninas_01.jpg/180px-Las_Meninas_01.jpg",
  "hay-wain":           "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Constable_The_Hay_Wain.jpg/180px-Constable_The_Hay_Wain.jpg",
  "whistlers-mother":   "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Whistlers_Mother_high_res.jpg/180px-Whistlers_Mother_high_res.jpg",
};

export default function FamousPaintingsGameCard({ item, onClick, isSelected }: GameItemCardProps) {
  const photoUrl = PHOTO_URLS[item.name];

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        w-full aspect-square rounded-3xl cursor-pointer transition-all duration-300
        transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-stone-100 flex flex-col items-center justify-center overflow-hidden
        border-8 ${isSelected ? "border-amber-400 ring-4 ring-amber-400 ring-offset-4" : "border-amber-200"}
      `}
    >
      {/* Painting Image */}
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
      <div className="w-full bg-stone-100 py-1 px-2">
        <span className="text-xs md:text-sm font-bold text-stone-800 text-center block leading-tight">
          {item.hebrew}
        </span>
      </div>
    </button>
  );
}
