/**
 * ===============================================
 * Photo / Logo Card Configurations
 * ===============================================
 * Assembles per-category URL maps into PHOTO_CARD_CONFIGS.
 * URL maps live in ./photoCardData/ submodules.
 */

import { BUTTERFLIES_URLS }    from './photoCardData/butterflies';
import { EXOTIC_BIRDS_URLS }   from './photoCardData/exoticBirds';
import { CAT_BREEDS_URLS }     from './photoCardData/catBreeds';
import { DOG_BREEDS_URLS }     from './photoCardData/dogBreeds';
import { WORLD_LANDMARKS_URLS } from './photoCardData/worldLandmarks';
import { FAMOUS_PAINTINGS_URLS } from './photoCardData/famousPaintings';
import { SOLAR_SYSTEM_URLS }   from './photoCardData/solarSystem';
import { NBA_TEAMS_URLS, NBA_BG_MAP } from './photoCardData/nbaTeams';
import { TECH_LOGOS_URLS, TECH_BG_MAP } from './photoCardData/techLogos';
import { SOCCER_LOGOS_URLS }   from './photoCardData/soccerLogos';
import { CAR_BRANDS_URLS }     from './photoCardData/carBrands';
import { DINOSAURS_URLS }      from './photoCardData/dinosaurs';
import { ANIMALS_URLS }        from './photoCardData/animals';
import { FRUITS_URLS }         from './photoCardData/fruits';

export interface PhotoCardConfig {
  imageUrls: Record<string, string>;
  objectFit: "cover" | "contain";
  cardBg: string;
  cardBgMap?: Record<string, string>;
  selectedBorder: string;
  defaultBorder: string;
  labelBg: string;
  labelText: string;
  imagePadding?: string;
}

export const PHOTO_CARD_CONFIGS = {
  "butterflies": {
    imageUrls: BUTTERFLIES_URLS, objectFit: "cover",
    cardBg: "bg-pink-50", selectedBorder: "border-pink-400 ring-4 ring-pink-400 ring-offset-4",
    defaultBorder: "border-pink-200", labelBg: "bg-pink-50", labelText: "text-pink-900",
  },
  "exotic-birds": {
    imageUrls: EXOTIC_BIRDS_URLS, objectFit: "cover",
    cardBg: "bg-sky-50", selectedBorder: "border-sky-400 ring-4 ring-sky-400 ring-offset-4",
    defaultBorder: "border-sky-200", labelBg: "bg-sky-50", labelText: "text-sky-900",
  },
  "cat-breeds": {
    imageUrls: CAT_BREEDS_URLS, objectFit: "cover",
    cardBg: "bg-purple-50", selectedBorder: "border-purple-400 ring-4 ring-purple-400 ring-offset-4",
    defaultBorder: "border-purple-200", labelBg: "bg-purple-50", labelText: "text-purple-900",
  },
  "dog-breeds": {
    imageUrls: DOG_BREEDS_URLS, objectFit: "cover",
    cardBg: "bg-amber-50", selectedBorder: "border-amber-500 ring-4 ring-amber-500 ring-offset-4",
    defaultBorder: "border-amber-200", labelBg: "bg-amber-50", labelText: "text-amber-900",
  },
  "world-landmarks": {
    imageUrls: WORLD_LANDMARKS_URLS, objectFit: "cover",
    cardBg: "bg-white", selectedBorder: "border-green-400 ring-4 ring-green-400 ring-offset-4",
    defaultBorder: "border-white", labelBg: "bg-white", labelText: "text-gray-800",
  },
  "famous-paintings": {
    imageUrls: FAMOUS_PAINTINGS_URLS, objectFit: "cover",
    cardBg: "bg-stone-100", selectedBorder: "border-amber-400 ring-4 ring-amber-400 ring-offset-4",
    defaultBorder: "border-amber-200", labelBg: "bg-stone-100", labelText: "text-stone-800",
  },
  "solar-system": {
    imageUrls: SOLAR_SYSTEM_URLS, objectFit: "cover",
    cardBg: "bg-gray-900", selectedBorder: "border-yellow-400 ring-4 ring-yellow-400 ring-offset-4",
    defaultBorder: "border-gray-800", labelBg: "bg-gray-900", labelText: "text-yellow-200",
  },
  "nba-teams": {
    imageUrls: NBA_TEAMS_URLS, objectFit: "contain",
    cardBg: "bg-gray-900", cardBgMap: NBA_BG_MAP,
    selectedBorder: "border-orange-400 ring-4 ring-orange-400 ring-offset-4",
    defaultBorder: "border-gray-700", labelBg: "bg-black/60", labelText: "text-orange-200",
    imagePadding: "p-3",
  },
  "tech-logos": {
    imageUrls: TECH_LOGOS_URLS, objectFit: "contain",
    cardBg: "bg-white", cardBgMap: TECH_BG_MAP,
    selectedBorder: "border-blue-400 ring-4 ring-blue-400 ring-offset-4",
    defaultBorder: "border-gray-200", labelBg: "bg-gray-50", labelText: "text-gray-800",
    imagePadding: "p-4",
  },
  "soccer-logos": {
    imageUrls: SOCCER_LOGOS_URLS, objectFit: "contain",
    cardBg: "bg-white", selectedBorder: "border-green-400 ring-4 ring-green-400 ring-offset-4",
    defaultBorder: "border-white", labelBg: "bg-white", labelText: "text-gray-800",
    imagePadding: "p-1",
  },
  "car-brands": {
    imageUrls: CAR_BRANDS_URLS, objectFit: "contain",
    cardBg: "bg-white", selectedBorder: "border-green-400 ring-4 ring-green-400 ring-offset-4",
    defaultBorder: "border-white", labelBg: "bg-white", labelText: "text-gray-800",
    imagePadding: "p-2",
  },
  "dinosaurs": {
    imageUrls: DINOSAURS_URLS, objectFit: "cover",
    cardBg: "bg-stone-100", selectedBorder: "border-emerald-500 ring-4 ring-emerald-500 ring-offset-4",
    defaultBorder: "border-stone-300", labelBg: "bg-stone-100", labelText: "text-stone-800",
  },
  // Real-photo toggle targets (emoji cards by default; these activate when showRealPhotos is on)
  "animals": {
    imageUrls: ANIMALS_URLS, objectFit: "cover",
    cardBg: "bg-green-50", selectedBorder: "border-green-400 ring-4 ring-green-400 ring-offset-4",
    defaultBorder: "border-green-200", labelBg: "bg-green-50", labelText: "text-green-900",
  },
  "fruits": {
    imageUrls: FRUITS_URLS, objectFit: "cover",
    cardBg: "bg-yellow-50", selectedBorder: "border-yellow-400 ring-4 ring-yellow-400 ring-offset-4",
    defaultBorder: "border-yellow-200", labelBg: "bg-yellow-50", labelText: "text-yellow-900",
  },
} as const satisfies Record<string, PhotoCardConfig>;

export type PhotoCardGameType = keyof typeof PHOTO_CARD_CONFIGS;
