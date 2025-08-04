import { AutoGamePage } from "@/components/shared/AutoGamePage";
import { GameType } from "@/lib/types/base";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { GAME_UI_CONFIGS } from '@/lib/constants/ui/gameConfigs';

// רשימת כל המשחקים שתומכים ב-AutoGamePage
const SUPPORTED_GAMES: GameType[] = [
  'animals', 'colors', 'fruits', 'vegetables', 'weather',
  'transport', 'instruments', 'space', 'clothing', 
  'smells-tastes', 'house', 'tools', 'professions',
  'emotions', 'letters', 'shapes', 'numbers'
];

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
  
  // המרת URL לGameType במקרה של חוסר התאמה
  const actualGameType = URL_TO_GAME_TYPE_MAP[gameType] || (gameType as GameType);
  
  // בדיקה שזה משחק תקף
  if (!SUPPORTED_GAMES.includes(actualGameType)) {
    notFound();
  }

  return <AutoGamePage gameType={actualGameType} />;
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
