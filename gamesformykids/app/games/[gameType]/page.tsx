import { GameType } from "@/lib/types/base";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { GAME_UI_CONFIGS } from '@/lib/constants/ui/gameConfigs';
import { EnhancedGameWrapper } from '@/components/shared/EnhancedGameWrapper';
import { SimpleEnhancedGamePage } from '@/components/shared/SimpleEnhancedGamePage';

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
  const config = GAME_UI_CONFIGS[actualGameType];
  
  if (!config) {
    return {
      title: 'משחק לא נמצא',
    };
  }

  return {
    title: config.title,
    description: config.subTitle,
    keywords: `${config.title}, משחקים לילדים, חינוכי, גיל 2-5, פעוטות, למידה, ${actualGameType}`,
    openGraph: {
      title: config.title,
      description: config.subTitle,
      type: 'article',
      url: `https://gamesformykids.vercel.app/games/${gameType}`,
      images: [
        {
          url: `/images/games/${actualGameType}-og.png`,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.subTitle,
      images: [`/images/games/${actualGameType}-twitter.png`],
    },
    alternates: {
      canonical: `/games/${gameType}`,
    },
  };
}

export default async function UniversalGamePage({ params }: GamePageProps) {
  const { gameType } = await params;
  
  // המרת URL לGameType במקרה של חוסר התאמה
  const actualGameType = URL_TO_GAME_TYPE_MAP[gameType] || (gameType as GameType);
  
  // בדיקה שזה משחק תקף שתומך ב-AutoGamePage
  if (!SUPPORTED_GAMES.includes(actualGameType as SupportedGameType)) {
    notFound();
  }

  return (
    <EnhancedGameWrapper gameType={actualGameType as SupportedGameType}>
      <SimpleEnhancedGamePage gameType={actualGameType as SupportedGameType} />
    </EnhancedGameWrapper>
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
