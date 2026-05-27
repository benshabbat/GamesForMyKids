import { MetadataRoute } from 'next'
import { SUPPORTED_GAMES } from '@/app/games/[gameType]/gamePageConstants'
import { hebrewLetters } from '@/app/games/hebrew-letters/constants/hebrewLetters'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://games-for-my-kids.vercel.app'

  // דף הבית
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      // #711: No lastModified — avoid stamping every URL with the deploy timestamp.
      // Google's crawler determines freshness more accurately than a static date.
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // #709: Use SUPPORTED_GAMES (the authoritative list of all ~127 game routes)
  // instead of Object.keys(GAME_UI_CONFIGS) which only covered ~65 card games.
  // This adds the missing arcade, board, quiz, and custom game URLs to sitemap.xml.
  SUPPORTED_GAMES.forEach((gameType) => {
    routes.push({
      url: `${baseUrl}/games/${gameType}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // דפי אותיות עבריות
  hebrewLetters.forEach((letter) => {
    routes.push({
      url: `${baseUrl}/games/hebrew-letters/${letter.name}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  // דף אותיות עבריות כללי
  routes.push({
    url: `${baseUrl}/games/hebrew-letters`,
    changeFrequency: 'monthly',
    priority: 0.7,
  })

  // דפי קטגוריות סטטיות
  routes.push({
    url: `${baseUrl}/games/educational`,
    changeFrequency: 'monthly',
    priority: 0.7,
  })

  return routes
}
