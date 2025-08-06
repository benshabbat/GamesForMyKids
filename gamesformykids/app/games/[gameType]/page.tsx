import { AutoGamePage } from "@/components/shared/AutoGamePage";
import { GameType } from "@/lib/types/base";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { GAME_UI_CONFIGS } from '@/lib/constants/ui/gameConfigs';
import { GAME_HOOKS_MAP, AutoGameType } from '@/lib/constants/gameHooksMap';

// רשימת כל המשחקים שתומכים ב-AutoGamePage (מבוסס על GAME_HOOKS_MAP)
const SUPPORTED_GAMES: AutoGameType[] = Object.keys(GAME_HOOKS_MAP) as AutoGameType[];

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
  
  // בדיקה שזה משחק תקף שתומך ב-AutoGamePage
  if (!SUPPORTED_GAMES.includes(actualGameType as AutoGameType)) {
    notFound();
  }

  return <AutoGamePage gameType={actualGameType as AutoGameType} />;
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
