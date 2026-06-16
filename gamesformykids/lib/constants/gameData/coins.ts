import type { BaseGameItem } from '@/lib/types/core/base';

export const ISRAELI_COINS: BaseGameItem[] = [
  {
    name: 'coin-10ag',
    hebrew: 'עשרה אגורות',
    english: '10 Agorot',
    emoji: '🪙',
    color: 'bg-gradient-to-br from-gray-300 to-gray-500',
    funFact: 'המטבע הקטן ביותר בישראל',
  },
  {
    name: 'coin-50ag',
    hebrew: 'חמישים אגורות',
    english: '50 Agorot',
    emoji: '🪙',
    color: 'bg-gradient-to-br from-gray-400 to-gray-600',
    funFact: 'חצי שקל — בדיוק',
  },
  {
    name: 'coin-1nis',
    hebrew: 'שקל אחד',
    english: '1 Shekel',
    emoji: '💰',
    color: 'bg-gradient-to-br from-yellow-300 to-yellow-500',
    funFact: 'המטבע הבסיסי של ישראל',
  },
  {
    name: 'coin-2nis',
    hebrew: 'שני שקלים',
    english: '2 Shekels',
    emoji: '💰',
    color: 'bg-gradient-to-br from-yellow-400 to-amber-500',
    funFact: 'מטבע כספי עם לב זהב במרכז',
  },
  {
    name: 'coin-5nis',
    hebrew: 'חמישה שקלים',
    english: '5 Shekels',
    emoji: '💰',
    color: 'bg-gradient-to-br from-amber-400 to-orange-500',
    funFact: 'מטבע גדול עם ציון לרבית',
  },
  {
    name: 'coin-10nis',
    hebrew: 'עשרה שקלים',
    english: '10 Shekels',
    emoji: '💎',
    color: 'bg-gradient-to-br from-amber-500 to-yellow-700',
    funFact: 'המטבע הגדול ביותר בישראל',
  },
];

export const COINS_PRONUNCIATIONS: Record<string, string> = {
  'coin-10ag': 'עֲשָׂרָה אֲגוֹרוֹת',
  'coin-50ag': 'חֲמִישִׁים אֲגוֹרוֹת',
  'coin-1nis': 'שֶׁקֶל אֶחָד',
  'coin-2nis': 'שְׁנֵי שְׁקָלִים',
  'coin-5nis': 'חֲמִישָׁה שְׁקָלִים',
  'coin-10nis': 'עֲשָׂרָה שְׁקָלִים',
};
