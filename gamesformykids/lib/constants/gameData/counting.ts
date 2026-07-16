import type { BaseGameItem } from '@/lib/types/core/base';

/**
 * Items used in the counting game — things to count on screen.
 * Previously defined inline in app/games/counting/useCountingGame.ts;
 * moved here so they can be loaded server-side via gameItemsLoader
 * and consumed from the store, consistent with all other card games.
 */
export const COUNTING_ITEMS: BaseGameItem[] = [
  { name: 'dog',        hebrew: 'כלב',     hebrewNikud: 'כֶּלֶב',     english: 'Dog',        emoji: '🐶', plural: 'כְּלָבִים',      color: 'bg-amber-400' },
  { name: 'cat',        hebrew: 'חתול',    hebrewNikud: 'חָתוּל',    english: 'Cat',        emoji: '🐱', plural: 'חֲתוּלִים',     color: 'bg-orange-400' },
  { name: 'apple',      hebrew: 'תפוח',    hebrewNikud: 'תַּפּוּחַ',   english: 'Apple',      emoji: '🍎', plural: 'תַּפּוּחִים',     color: 'bg-red-400' },
  { name: 'star',       hebrew: 'כוכב',    hebrewNikud: 'כּוֹכָב',    english: 'Star',       emoji: '🌟', plural: 'כּוֹכָבִים',     color: 'bg-yellow-400' },
  { name: 'ball',       hebrew: 'כדור',    hebrewNikud: 'כַּדּוּר',    english: 'Ball',       emoji: '⚽', plural: 'כַּדּוּרִים',     color: 'bg-green-400' },
  { name: 'flower',     hebrew: 'פרח',     hebrewNikud: 'פֶּרַח',     english: 'Flower',     emoji: '🌸', plural: 'פְּרָחִים',      color: 'bg-pink-400' },
  { name: 'balloon',    hebrew: 'בלון',    hebrewNikud: 'בָּלוֹן',    english: 'Balloon',    emoji: '🎈', plural: 'בָּלוֹנִים',     color: 'bg-blue-400' },
  { name: 'butterfly',  hebrew: 'פרפר',    hebrewNikud: 'פַּרְפַּר',   english: 'Butterfly',  emoji: '🦋', plural: 'פַּרְפָּרִים',    color: 'bg-purple-400' },
  { name: 'orange',     hebrew: 'תפוז',    hebrewNikud: 'תַּפּוּז',    english: 'Orange',     emoji: '🍊', plural: 'תַּפּוּזִים',     color: 'bg-orange-500' },
  { name: 'teddy-bear', hebrew: 'דובי',    hebrewNikud: 'דֻּבִּי',    english: 'Teddy Bear', emoji: '🧸', plural: 'דֻּבִּים',      color: 'bg-amber-600' },
  { name: 'basketball', hebrew: 'כדורסל', hebrewNikud: 'כַּדּוּרְסַל', english: 'Basketball', emoji: '🏀', plural: 'כַּדּוּרֵי סַל',  color: 'bg-orange-600' },
  { name: 'ribbon',     hebrew: 'סרט',     hebrewNikud: 'סֶרֶט',     english: 'Ribbon',     emoji: '🎀', plural: 'סְרָטִים',      color: 'bg-pink-600' },
];
