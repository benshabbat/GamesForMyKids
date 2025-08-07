import { AutoGamePage } from "@/components/shared/AutoGamePage";
import { GameType } from "@/lib/types/base";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { GAME_UI_CONFIGS } from '@/lib/constants/ui/gameConfigs';

// רשימת משחקים שתומכים ב-AutoGamePage (ללא import של hooks ב-server component)
const SUPPORTED_GAMES = [
  'animals', 'colors', 'fruits', 'vegetables', 'clothing',
  'letters', 'shapes', 'numbers', 'smells-tastes', 'weather',
  'transport', 'vehicles', 'tools', 'space', 'house',
  'instruments', 'professions', 'emotions'
] as const;
// הערה: 'memory' ו-'math' הוסרו כי יש להם דפים ייעודיים משלהם

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
  const config = GAME_UI_CONFIGS[actualGameType];
  
  if (!config) {
    return {
      title: 'משחק לא נמצא',
    };
  }

  return {
    title: config.title,
    description: config.subTitle,
  };
}

export default async function UniversalGamePage({ params }: GamePageProps) {
  const { gameType } = await params;
  
  // בדיקה שזה לא נתיב שיש לו דף ייעודי (למניעת קונפליקטים)
  const DEDICATED_ROUTES = ['entertainment', 'educational', 'memory', 'math', 'hebrew-letters', 'bubbles', 'drawing', 'building', 'puzzles', 'tzedakah', 'counting', 'colored-shapes', 'advanced'];
  if (DEDICATED_ROUTES.includes(gameType)) {
    notFound();
  }
  
  // המרת URL לGameType במקרה של חוסר התאמה
  const actualGameType = URL_TO_GAME_TYPE_MAP[gameType] || (gameType as GameType);
  
  // בדיקה שזה משחק תקף שתומך ב-AutoGamePage
  if (!SUPPORTED_GAMES.includes(actualGameType as SupportedGameType)) {
    notFound();
  }

  return <AutoGamePage gameType={actualGameType as SupportedGameType} />;
}

// יצירת Static Paths לכל המשחקים
export async function generateStaticParams() {
  // רק משחקים שאין להם דפים ייעודיים
  const gameTypePaths = SUPPORTED_GAMES.map((gameType) => ({
    gameType,
  }));
  
  // הוספת URL-ים עם מיפוי מיוחד (רק אם אין להם דפים ייעודיים)
  const DEDICATED_ROUTES = ['entertainment', 'educational', 'memory', 'math', 'hebrew-letters', 'bubbles', 'drawing', 'building', 'puzzles', 'tzedakah', 'counting', 'colored-shapes', 'advanced'];
  const mappedPaths = Object.keys(URL_TO_GAME_TYPE_MAP)
    .filter(urlGameType => !DEDICATED_ROUTES.includes(urlGameType))
    .map((urlGameType) => ({
      gameType: urlGameType,
    }));
  
  return [...gameTypePaths, ...mappedPaths];
}
