import { Metadata } from 'next';
import { GameType } from "@/lib/types/core/base";
import { GAME_UI_CONFIGS } from "@/lib/constants/ui/gameConfigs";

/**
 * פונקציה לייצור metadata עבור משחקים - גרסת שרת
 * זוהי עותק server-side של הפונקציה מ-GameConfigContext
 */
export function generateGameMetadata(
  gameType: GameType, 
  gameUrlType?: string,
  baseUrl: string = 'https://gamesformykids.vercel.app'
): Metadata {
  const config = GAME_UI_CONFIGS[gameType];
  const urlGameType = gameUrlType || gameType;
  
  if (!config) {
    return {
      title: 'משחק לא נמצא',
      description: 'המשחק שחיפשת לא נמצא',
    };
  }

  const defaultKeywords = `${config.title}, משחקים לילדים, חינוכי, גיל 2-5, פעוטות, למידה, ${gameType}`;
  const keywords = config.metadata?.keywords || defaultKeywords;
  const description = config.metadata?.description || config.subTitle;
  const ogImagePath = config.metadata?.ogImagePath || `/images/games/${gameType}-og.png`;
  const twitterImagePath = config.metadata?.twitterImagePath || `/images/games/${gameType}-twitter.png`;

  return {
    title: config.title,
    description,
    keywords,
    openGraph: {
      title: config.title,
      description,
      type: 'article',
      url: `${baseUrl}/games/${urlGameType}`,
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description,
      images: [twitterImagePath],
    },
    alternates: {
      canonical: `/games/${urlGameType}`,
    },
  };
}
