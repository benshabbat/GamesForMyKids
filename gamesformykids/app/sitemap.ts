import { MetadataRoute } from 'next'
import { GAME_UI_CONFIGS } from '@/lib/constants/ui/gameConfigs'
import { hebrewLetters } from '@/lib/constants/gameData/hebrewLetters'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://games-for-my-kids.vercel.app'
  
  // דף הבית
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // דפי משחקים כלליים
  Object.keys(GAME_UI_CONFIGS).forEach((gameType) => {
    routes.push({
      url: `${baseUrl}/games/${gameType}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // משחקים מתקדמים
  const advancedGames = ['memory', 'puzzles', 'math', 'drawing', 'builder']
  advancedGames.forEach((game) => {
    routes.push({
      url: `${baseUrl}/games/advanced/${game}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // דפי אותיות עבריות
  hebrewLetters.forEach((letter) => {
    routes.push({
      url: `${baseUrl}/games/hebrew-letters/${letter.name}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  // דף אותיות עבריות כללי
  routes.push({
    url: `${baseUrl}/games/hebrew-letters`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  })

  // דף משחקים מתקדמים כללי  
  routes.push({
    url: `${baseUrl}/games/advanced`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  })

  return routes
}
