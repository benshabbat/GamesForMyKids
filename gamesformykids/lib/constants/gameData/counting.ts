import type { BaseGameItem } from '@/lib/types/core/base';

/**
 * Items used in the counting game — things to count on screen.
 * Previously defined inline in app/games/counting/useCountingGame.ts;
 * moved here so they can be loaded server-side via gameItemsLoader
 * and consumed from the store, consistent with all other card games.
 */
export const COUNTING_ITEMS: BaseGameItem[] = [
  { name: 'dog',        hebrew: 'כלב',     english: 'Dog',        emoji: '🐶', plural: 'כלבים',    color: 'bg-amber-400' },
  { name: 'cat',        hebrew: 'חתול',    english: 'Cat',        emoji: '🐱', plural: 'חתולים',   color: 'bg-orange-400' },
  { name: 'apple',      hebrew: 'תפוח',    english: 'Apple',      emoji: '🍎', plural: 'תפוחים',   color: 'bg-red-400' },
  { name: 'star',       hebrew: 'כוכב',    english: 'Star',       emoji: '🌟', plural: 'כוכבים',   color: 'bg-yellow-400' },
  { name: 'ball',       hebrew: 'כדור',    english: 'Ball',       emoji: '⚽', plural: 'כדורים',   color: 'bg-green-400' },
  { name: 'flower',     hebrew: 'פרח',     english: 'Flower',     emoji: '🌸', plural: 'פרחים',    color: 'bg-pink-400' },
  { name: 'balloon',    hebrew: 'בלון',    english: 'Balloon',    emoji: '🎈', plural: 'בלונים',   color: 'bg-blue-400' },
  { name: 'butterfly',  hebrew: 'פרפר',    english: 'Butterfly',  emoji: '🦋', plural: 'פרפרים',   color: 'bg-purple-400' },
  { name: 'orange',     hebrew: 'תפוז',    english: 'Orange',     emoji: '🍊', plural: 'תפוזים',   color: 'bg-orange-500' },
  { name: 'teddy-bear', hebrew: 'דובי',    english: 'Teddy Bear', emoji: '🧸', plural: 'דובים',    color: 'bg-amber-600' },
  { name: 'basketball', hebrew: 'כדורסל', english: 'Basketball', emoji: '🏀', plural: 'כדורי סל', color: 'bg-orange-600' },
  { name: 'ribbon',     hebrew: 'סרט',     english: 'Ribbon',     emoji: '🎀', plural: 'סרטים',    color: 'bg-pink-600' },
];
