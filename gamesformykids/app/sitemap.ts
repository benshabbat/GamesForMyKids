import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Game categories
  const gameCategories = [
    'memory',
    'drawing', 
    'math',
    'hebrew-letters',
    'puzzles',
    'counting',
    'shape-tracing',
    'bubbles',
    'cartoon-generator',
    'tzedakah',
  ];

  const gameCategoryPages = gameCategories.map((category) => ({
    url: `${baseUrl}/games/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Educational vs Entertainment categories
  const mainCategories = [
    {
      url: `${baseUrl}/games/educational`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/games/entertainment`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // Advanced games
  const advancedPages = [
    {
      url: `${baseUrl}/games/advanced`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  return [
    ...staticPages,
    ...mainCategories,
    ...gameCategoryPages,
    ...advancedPages,
  ];
}
