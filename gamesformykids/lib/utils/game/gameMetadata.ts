import { Metadata } from 'next';
import { GAME_UI_CONFIGS } from "@/lib/constants/ui/gameConfigs";

/**
 * פונקציה לייצור metadata עבור משחקים - גרסת שרת
 * זוהי עותק server-side של הפונקציה מ-GameConfigContext
 */
export function generateGameMetadata(
  gameType: string,
  gameUrlType?: string,
): Metadata {
  const config = GAME_UI_CONFIGS[gameType as keyof typeof GAME_UI_CONFIGS];
  const urlGameType = gameUrlType || gameType;

  // #708: Arcade/board/quiz games have no GAME_UI_CONFIGS entry — return a
  // readable fallback instead of "משחק לא נמצא" which Google would index.
  if (!config) {
    const readableTitle = gameType
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${readableTitle} | GamesForMyKids`,
      description: `Play ${readableTitle} — a free educational game for kids on GamesForMyKids`,
      alternates: { canonical: `/games/${urlGameType}` },
      robots: { index: true, follow: true },
    };
  }

  const defaultKeywords = `${config.title}, משחקים לילדים, חינוכי, גיל 2-10, למידה, ${gameType}`;
  const keywords = config.metadata?.keywords || defaultKeywords;
  const description = config.metadata?.description || config.subTitle;

  // #710: Only include og:image / twitter:image when an actual path is configured.
  // The old fallback /images/games/${gameType}-og.png pointed to a directory that
  // does not exist, causing broken preview images on social shares.
  const ogImagePath = config.metadata?.ogImagePath;
  const twitterImagePath = config.metadata?.twitterImagePath;

  return {
    title: config.title,
    description,
    keywords,
    openGraph: {
      title: config.title,
      description,
      type: 'article',
      url: `/games/${urlGameType}`,
      ...(ogImagePath
        ? { images: [{ url: ogImagePath, width: 1200, height: 630, alt: config.title }] }
        : {}),
    },
    twitter: {
      card: 'summary',
      title: config.title,
      description,
      ...(twitterImagePath ? { images: [twitterImagePath] } : {}),
    },
    alternates: {
      canonical: `/games/${urlGameType}`,
    },
  };
}
