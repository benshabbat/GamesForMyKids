import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GamesRegistry, GameRegistration } from '@/lib/registry/gamesRegistry';

export interface AgeGroupData {
  title: string;
  icon: string;
  description: string;
  recommendedGames: GameRegistration[];
}

interface FeaturedGameState {
  featuredGame: GameRegistration | null;
  ageGroups: Record<string, AgeGroupData>;
  ageGroupKeys: string[];
  isInitialized: boolean;
  initialize: () => void;
}

function computeAgeGroups(allGames: GameRegistration[]): Record<string, AgeGroupData> {
  return {
    "2-3": {
      title: "גיל 2-3",
      icon: "👶",
      description: "משחקים פשוטים ובסיסיים",
      recommendedGames: allGames
        .filter((g) => g.id.includes("colors") || g.id.includes("shapes") || g.id.includes("bubbles"))
        .slice(0, 3),
    },
    "3-4": {
      title: "גיל 3-4",
      icon: "🧒",
      description: "למידה והכרת מושגים",
      recommendedGames: allGames
        .filter((g) => g.id.includes("hebrew-letters") || g.id.includes("counting") || g.id.includes("memory"))
        .slice(0, 3),
    },
    "4-5": {
      title: "גיל 4-5",
      icon: "👦",
      description: "אתגרים וחשיבה מתקדמת",
      recommendedGames: allGames
        .filter((g) => g.id.includes("math") || g.id.includes("puzzles") || g.id.includes("building"))
        .slice(0, 3),
    },
  };
}

export const useFeaturedGameStore = create<FeaturedGameState>()(
  devtools(
    (set, get) => ({
      featuredGame: null,
      ageGroups: {},
      ageGroupKeys: [],
      isInitialized: false,

      initialize: () => {
        if (get().isInitialized) return;

        const allGames = GamesRegistry.getAllGameRegistrations().filter((g) => g.available);
        if (allGames.length === 0) return;

        const today = new Date();
        const dayOfYear = Math.floor(
          (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
        );
        const featuredGame = allGames[dayOfYear % allGames.length]!;
        const ageGroups = computeAgeGroups(allGames);

        set(
          { featuredGame, ageGroups, ageGroupKeys: Object.keys(ageGroups), isInitialized: true },
          false,
          'featuredGame/initialize'
        );
      },
    }),
    { name: 'FeaturedGameStore' }
  )
);
