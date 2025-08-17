import { GameType } from "@/lib/types/base";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { generateGameMetadata } from '@/contexts/GameConfigContext';
import { GameTypeProvider } from '@/contexts/GameTypeContext';
import { GameConfigProvider } from '@/contexts/GameConfigContext';
import { GameLogicProvider } from '@/contexts/GameLogicContext';
import { AutoGamePageWithContext } from '@/components/shared/AutoGamePageWithContext';

// רשימת משחקים שתומכים ב-AutoGamePage (ללא import של hooks ב-server component)
const SUPPORTED_GAMES = [
  'animals', 'colors', 'fruits', 'vegetables', 'clothing',
  'letters', 'shapes', 'numbers', 'smells-tastes', 'weather',
  'transport', 'vehicles', 'tools', 'space', 'house',
  'instruments', 'professions', 'emotions', 'math','colored-shapes'
] as const;
// הערה: 'memory' הוסר כי יש לו דף ייעודי עם קונטקסט

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
      <GameConfigProvider gameType={actualGameType as SupportedGameType}>
        <GameLogicProvider>
          <AutoGamePageWithContext />
        </GameLogicProvider>
      </GameConfigProvider>
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
