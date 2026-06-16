'use client';
import { create } from 'zustand';
import { GAME_ITEMS_MAP } from '@/lib/constants/gameItemsMap';
import type { BaseGameItem } from '@/lib/types/core/base';

export interface DictionaryItem extends BaseGameItem {
  category: string;
  categoryLabel: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  animals: 'חיות', fruits: 'פירות', vegetables: 'ירקות', clothing: 'בגדים',
  weather: 'מזג אוויר', house: 'בית', instruments: 'כלי נגינה', professions: 'מקצועות',
  emotions: 'רגשות', sports: 'ספורט', kitchen: 'מטבח', 'body-parts': 'חלקי גוף',
  family: 'משפחה', dinosaurs: 'דינוזאורים', 'world-food': 'מזון עולמי',
  recycling: 'מחזור', medicine: 'תרופות', 'nature-sounds': 'קולות טבע',
  'seasons-holidays': 'עונות וחגים', 'shopping-money': 'קניות', 'road-safety': 'בטיחות',
  'ocean-life': 'חיי ים', 'garden-plants': 'צמחי גן', 'magic-fairy-tales': 'אגדות',
  'circus-show': 'קרקס', birds: 'ציפורים', 'bugs-insects': 'חרקים',
  superheroes: 'גיבורי על', 'art-craft': 'אמנות', camping: 'טיול',
  'fairy-tale-chars': 'דמויות אגדה', 'days-of-week': 'ימות השבוע',
  'months-of-year': 'חודשי השנה', 'jewish-holidays': 'חגים יהודיים',
  'new-professions': 'מקצועות חדשים', 'advanced-weather': 'מזג אוויר מתקדם',
  'sound-imitation': 'קולות', 'body-movements': 'תנועות גוף',
  'touch-senses': 'מגע וחושים', 'emotional-social': 'רגשות חברתיים',
  'time-clock': 'זמן ושעות', 'climate-planet': 'אקלים', space: 'חלל',
  'solar-system': 'מערכת השמש', vehicles: 'כלי רכב', tools: 'כלים',
  transport: 'תחבורה', 'personal-safety': 'בטיחות אישית',
};

const SKIP_TYPES = new Set([
  'letters', 'numbers', 'shapes', 'colored-shapes', 'math', 'counting',
  'flags', 'car-brands', 'world-landmarks', 'famous-paintings', 'tech-logos',
  'dog-breeds', 'cat-breeds', 'nba-teams', 'exotic-birds', 'butterflies',
  'soccer-logos', 'geography-flags', 'geography-capitals', 'geography-continents',
  'visual-opposites', 'english-cards', 'coins-match', 'ordinals',
  'spatial-concepts', 'number-words', 'advanced-colors', 'logic-games',
  'virtual-reality',
]);

const FINAL_TO_REGULAR: Record<string, string> = {
  'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ',
};

export function getFirstHebrewLetter(hebrew: string): string {
  const first = hebrew[0] ?? '';
  return FINAL_TO_REGULAR[first] ?? first;
}

export const HEBREW_ALPHABET = [
  'א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'
];

let _cachedDictionary: DictionaryItem[] | null = null;

export function buildDictionary(): DictionaryItem[] {
  if (_cachedDictionary) return _cachedDictionary;
  const items: DictionaryItem[] = [];
  const seen = new Set<string>();

  for (const [gameType, gameItems] of Object.entries(GAME_ITEMS_MAP)) {
    if (!gameItems || SKIP_TYPES.has(gameType)) continue;
    for (const item of gameItems) {
      if (!item.hebrew || !item.emoji) continue;
      const key = item.hebrew;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({
        ...item,
        category: gameType,
        categoryLabel: CATEGORY_LABELS[gameType] ?? gameType,
      });
    }
  }

  items.sort((a, b) => a.hebrew.localeCompare(b.hebrew, 'he'));
  _cachedDictionary = items;
  return items;
}

const COLLECTION_KEY = 'picture-dictionary-collection';

function loadCollection(): DictionaryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COLLECTION_KEY);
    return raw ? (JSON.parse(raw) as DictionaryItem[]) : [];
  } catch {
    return [];
  }
}

function saveCollection(items: DictionaryItem[]): void {
  try {
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(items));
  } catch {
    // ignore storage errors
  }
}

export type BrowseMode = 'letter' | 'category' | 'search' | 'collection';

interface State {
  browseMode: BrowseMode;
  selectedLetter: string | null;
  selectedCategory: string | null;
  searchQuery: string;
  expandedItem: DictionaryItem | null;
  collection: DictionaryItem[];
}

interface Actions {
  setBrowseMode: (mode: BrowseMode) => void;
  selectLetter: (letter: string | null) => void;
  selectCategory: (category: string | null) => void;
  setSearchQuery: (q: string) => void;
  expandItem: (item: DictionaryItem) => void;
  closeExpanded: () => void;
  toggleCollection: (item: DictionaryItem) => void;
  initCollection: () => void;
}

export const usePictureDictionaryStore = create<State & Actions>((set, get) => ({
  browseMode: 'letter',
  selectedLetter: 'א',
  selectedCategory: null,
  searchQuery: '',
  expandedItem: null,
  collection: [],

  setBrowseMode: (mode) => set({ browseMode: mode, expandedItem: null }),
  selectLetter: (letter) => set({ selectedLetter: letter }),
  selectCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  expandItem: (item) => set({ expandedItem: item }),
  closeExpanded: () => set({ expandedItem: null }),

  toggleCollection: (item) => {
    const { collection } = get();
    const exists = collection.some((c) => c.hebrew === item.hebrew);
    const next = exists
      ? collection.filter((c) => c.hebrew !== item.hebrew)
      : collection.length < 50 ? [...collection, item] : collection;
    saveCollection(next);
    set({ collection: next });
  },

  initCollection: () => {
    set({ collection: loadCollection() });
  },
}));
