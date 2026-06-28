import { Metadata } from 'next';
import { GAME_UI_CONFIGS } from "@/lib/constants/ui/gameConfigs";
import { FALLBACK_METADATA } from "@/lib/constants/ui/fallbackMetadata";

const DEFAULT_OG_IMAGE = '/icons/icon-512x512.png';

export function generateGameMetadata(
  gameType: string,
  gameUrlType?: string,
): Metadata {
  const config = GAME_UI_CONFIGS[gameType as keyof typeof GAME_UI_CONFIGS];
  const urlGameType = gameUrlType || gameType;

  // #708: Arcade/board/quiz games have no GAME_UI_CONFIGS entry — use the
  // per-game Hebrew fallback map, or a generic Hebrew fallback as last resort.
  if (!config) {
    const fallback = FALLBACK_METADATA[gameType];
    const title = fallback?.title ?? 'משחק חינוכי לילדים';
    const description = fallback?.description ?? 'משחק חינוכי ומהנה לילדים בגיל 2-10 — GamesForMyKids';
    const keywords = fallback?.keywords ?? 'משחקים לילדים, חינוכי, גיל 2-10, מהנה';

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `/games/${urlGameType}`,
        images: [{ url: DEFAULT_OG_IMAGE, width: 512, height: 512, alt: title }],
      },
      twitter: {
        card: 'summary',
        title,
        description,
        images: [DEFAULT_OG_IMAGE],
      },
      alternates: { canonical: `/games/${urlGameType}` },
      robots: { index: true, follow: true },
    };
  }

  // Remove the raw gameType slug — it's an English slug with no Hebrew SEO value.
  const defaultKeywords = `${config.title}, משחקים לילדים, חינוכי, גיל 2-10, למידה`;
  const keywords = config.metadata?.keywords || defaultKeywords;
  const description = config.metadata?.description || config.subTitle;

  const ogImagePath = config.metadata?.ogImagePath ?? DEFAULT_OG_IMAGE;
  const twitterImagePath = config.metadata?.twitterImagePath ?? DEFAULT_OG_IMAGE;

  return {
    title: config.title,
    description,
    keywords,
    openGraph: {
      title: config.title,
      description,
      type: 'article',
      url: `/games/${urlGameType}`,
      images: [{ url: ogImagePath, width: 512, height: 512, alt: config.title }],
    },
    twitter: {
      card: 'summary',
      title: config.title,
      description,
      images: [twitterImagePath],
    },
    alternates: {
      canonical: `/games/${urlGameType}`,
    },
  };
}

export function buildGameJsonLd(
  gameType: string,
  title: string,
  description: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    description,
    educationalLevel: 'preschool to elementary',
    inLanguage: 'he',
    url: `https://games-for-my-kids.vercel.app/games/${gameType}`,
    provider: {
      '@type': 'Organization',
      name: 'GamesForMyKids',
      url: 'https://games-for-my-kids.vercel.app',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'children',
      suggestedMinAge: 2,
      suggestedMaxAge: 10,
    },
  };
}
