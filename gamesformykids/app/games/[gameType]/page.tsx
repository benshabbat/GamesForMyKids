import { GameType } from '@/lib/types/core/base';
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';
import { GameTypeProvider } from '@/lib/providers';
import { UltimateGamePage, GameLogicSync } from '@/components/game/universal/UltimateGamePage';

// רשימת משחקים שתומכים ב-AutoGamePage (ללא import של hooks ב-server component)
const SUPPORTED_GAMES = [
  'animals', 'colors', 'fruits', 'vegetables', 'clothing',
  'letters', 'shapes', 'numbers', 'smells-tastes', 'weather',
  'transport', 'vehicles', 'tools', 'space', 'house',
  'instruments', 'professions', 'emotions', 'math', 'colored-shapes',
  // משחקים חדשים
  'sports', 'kitchen', 'body-parts', 'family', 'dinosaurs',
  // משחקים נוספים חדשים
  'world-food', 'recycling', 'medicine', 'nature-sounds',
  'seasons-holidays', 'feelings', 'shopping-money', 'road-safety',
  // 6 משחקים כיפיים חדשים
  'birds', 'bugs-insects', 'superheroes', 'art-craft', 'camping', 'fairy-tale-chars',
  // 6 משחקים חדשים נוספים
  'ocean-life', 'garden-plants', 'magic-fairy-tales', 'space-adventure', 'cooking-kitchen', 'circus-show',
  // 6 משחקים טכנולוגיים חדשים
  'virtual-reality', 'new-professions', 'advanced-weather', 'advanced-colors', 'jewish-holidays', 'logic-games',
  // 6 משחקים חדשניים יוצאי דופן
  'sound-imitation', 'body-movements', 'touch-senses', 'emotional-social', 'time-clock', 'climate-planet',
  // משחקי גיאוגרפיה
  'flags',
  // משחקי ספורט
  'soccer-logos',
  // משחקי תחבורה וסמלים
  'car-brands',
  'world-landmarks',
  // משחקי מדע ותרבות
  'solar-system',
  'famous-paintings',
  // משחקי לוגואים וחיות
  'tech-logos',
  'dog-breeds',
  'cat-breeds',
  'nba-teams',
  // משחקי טבע וחרקים
  'exotic-birds',
  'butterflies',
] as const;

type SupportedGameType = typeof SUPPORTED_GAMES[number];

// מיפוי URL לGameType במקרים של חוסר התאמה
const URL_TO_GAME_TYPE_MAP: Record<string, GameType> = {
  'smelltaste': 'smells-tastes'
};

interface GamePageProps {
  params: Promise<{
    gameType: string;
  }>;
}

// מטא-דאטה דינמית
export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { gameType } = await params;
  
  // המרת URL לGameType במקרה של חוסר התאמה
  const actualGameType = URL_TO_GAME_TYPE_MAP[gameType] || (gameType as GameType);
  
  return generateGameMetadata(actualGameType, gameType);
}

/**
 * 🎮 Universal Game Page עם קונטקסט מלא!
 * - אפס props drilling
 * - כל הנתונים בקונטקסט
 * - פשוט מעטפת קונטקסטים + הקומפוננט
 * - עדכון: תוקן סדר הProviders
 */
export default async function UniversalGamePage({ params }: GamePageProps) {
  const { gameType } = await params;
  
  // המרת URL לGameType במקרה של חוסר התאמה
  const actualGameType = URL_TO_GAME_TYPE_MAP[gameType] || (gameType as GameType);
  
  // בדיקה שזה משחק תקף שתומך ב-AutoGamePage
  if (!SUPPORTED_GAMES.includes(actualGameType as SupportedGameType)) {
    notFound();
  }

  return (
    <GameTypeProvider initialGameType={actualGameType as SupportedGameType}>
      {/* GameLogicSync is a SIBLING of UltimateGamePage — not a child — so that
          UltimateGamePage re-renders (from gameActionsStore) don't cascade
          into GameLogicSync and cause an infinite effect loop. */}
      <GameLogicSync gameType={actualGameType as SupportedGameType} />
      <UltimateGamePage gameType={actualGameType as SupportedGameType} />
    </GameTypeProvider>
  );
}

// יצירת Static Paths לכל המשחקים
export async function generateStaticParams() {
  const gameTypePaths = SUPPORTED_GAMES.map((gameType) => ({
    gameType,
  }));
  
  // הוספת URL-ים עם מיפוי מיוחד
  const mappedPaths = Object.keys(URL_TO_GAME_TYPE_MAP).map((urlGameType) => ({
    gameType: urlGameType,
  }));
  
  return [...gameTypePaths, ...mappedPaths];
}
