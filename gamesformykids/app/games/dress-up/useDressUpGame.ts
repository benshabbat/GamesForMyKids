'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import { shuffle } from '@/lib/utils';

export type Zone = 'head' | 'neck' | 'torso' | 'hands' | 'legs' | 'feet';
export type Category = 'daily' | 'seasonal' | 'professions';

export interface ClothingItem {
  name: string;
  hebrew: string;
  prompt: string;
  emoji: string;
  zone: Zone;
  category: Category;
}

export const CLOTHING: ClothingItem[] = [
  { name: 'hat',        hebrew: 'כּוֹבַע',          prompt: 'שים כובע!',          emoji: '🧢', zone: 'head',   category: 'daily' },
  { name: 'shirt',      hebrew: 'חוּלְצָה',          prompt: 'שים חולצה!',         emoji: '👕', zone: 'torso',  category: 'daily' },
  { name: 'dress',      hebrew: 'שִׂמְלָה',          prompt: 'שים שמלה!',          emoji: '👗', zone: 'torso',  category: 'daily' },
  { name: 'pants',      hebrew: 'מִכְנָסַיִם',        prompt: 'שים מכנסיים!',       emoji: '👖', zone: 'legs',   category: 'daily' },
  { name: 'shoes',      hebrew: 'נַעֲלַיִם',          prompt: 'שים נעליים!',        emoji: '👟', zone: 'feet',   category: 'daily' },
  { name: 'socks',      hebrew: 'גַּרְבַּיִם',        prompt: 'שים גרביים!',        emoji: '🧦', zone: 'feet',   category: 'daily' },
  { name: 'coat',       hebrew: 'מְעִיל',            prompt: 'שים מעיל!',          emoji: '🧥', zone: 'torso',  category: 'seasonal' },
  { name: 'scarf',      hebrew: 'צָעִיף',            prompt: 'שים צעיף!',          emoji: '🧣', zone: 'neck',   category: 'seasonal' },
  { name: 'gloves',     hebrew: 'כְּפָפוֹת',          prompt: 'שים כפפות!',         emoji: '🧤', zone: 'hands',  category: 'seasonal' },
  { name: 'boots',      hebrew: 'מַגָּפַיִם',          prompt: 'שים מגפיים!',        emoji: '👢', zone: 'feet',   category: 'seasonal' },
  { name: 'sunglasses', hebrew: 'מִשְׁקְפֵי שֶׁמֶשׁ', prompt: 'שים משקפי שמש!',    emoji: '🕶️', zone: 'head',   category: 'seasonal' },
  { name: 'umbrella',   hebrew: 'מִטְרִיָּה',          prompt: 'שים מטרייה!',        emoji: '☂️', zone: 'hands',  category: 'seasonal' },
  { name: 'hard-hat',   hebrew: 'קַסְדָּה',           prompt: 'שים קסדה!',          emoji: '⛑️', zone: 'head',   category: 'professions' },
  { name: 'graduation', hebrew: 'כּוֹבַע סִיּוּם',    prompt: 'שים כובע סיום!',     emoji: '🎓', zone: 'head',   category: 'professions' },
  { name: 'lab-coat',   hebrew: 'חֲלוּק לָבָן',       prompt: 'שים חלוק לבן!',      emoji: '🥼', zone: 'torso',  category: 'professions' },
  { name: 'backpack',   hebrew: 'תִּיק גַּב',          prompt: 'שים תיק גב!',        emoji: '🎒', zone: 'hands',  category: 'professions' },
  { name: 'stethoscope',hebrew: 'סְטֶתוֹסְקוֹפ',      prompt: 'שים סטטוסקופ!',      emoji: '🩺', zone: 'neck',   category: 'professions' },
];

export const ZONE_ORDER: Zone[] = ['head', 'neck', 'torso', 'hands', 'legs', 'feet'];
export const ZONE_PLACEHOLDER: Record<Zone, string> = {
  head: '❓', neck: '❓', torso: '❓', hands: '❓', legs: '❓', feet: '❓',
};
export const ZONE_LABEL: Record<Zone, string> = {
  head: 'ראש', neck: 'צוואר', torso: 'גוף', hands: 'ידיים', legs: 'רגליים', feet: 'נעליים',
};
export const CATEGORY_LABELS: Record<Category, string> = {
  daily: '👕 לבוש יומיומי',
  seasonal: '🌦️ לבוש עונתי',
  professions: '🎓 לבוש מקצועי',
};

export const QUESTIONS_PER_GAME = 8;

const ADVANCE_DELAY_MS = 1300;
const RETRY_DELAY_MS = 900;

export function buildChoices(correct: ClothingItem, pool: ClothingItem[]): ClothingItem[] {
  const others = shuffle(pool.filter(c => c.name !== correct.name)).slice(0, 3);
  return shuffle([correct, ...others]);
}

export function useDressUpGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<ClothingItem>('dress-up');
  const [dressed, setDressed] = useState<Partial<Record<Zone, ClothingItem>>>({});
  const [wrongFlash, setWrongFlash] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const choices = useMemo(() => current ? buildChoices(current, CLOTHING) : [], [current]);

  // Speak the prompt whenever a new question loads
  useEffect(() => {
    if (!current) return;
    const id = setTimeout(() => speakHebrew(current.prompt), 300);
    return () => clearTimeout(id);
  }, [current]);

  const startGame = useCallback(() => {
    setDressed({});
    setWrongFlash(false);
    begin(shuffle(CLOTHING).slice(0, QUESTIONS_PER_GAME));
  }, [begin]);

  const selectAnswer = useCallback((item: ClothingItem) => {
    if (!current || wrongFlash) return;
    if (item.name === current.name) {
      setDressed(d => ({ ...d, [current.zone]: current }));
      answer(item.name, true);
      speakHebrew(`כן! ${current.hebrew}!`);
      timerRef.current = setTimeout(() => useQuizGameStore.getState().nextQuestion(), ADVANCE_DELAY_MS);
    } else {
      setWrongFlash(true);
      speakHebrew('לא נכון, נסה שוב!');
      timerRef.current = setTimeout(() => setWrongFlash(false), RETRY_DELAY_MS);
    }
  }, [current, wrongFlash, answer]);

  const restart = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDressed({});
    setWrongFlash(false);
    reset(shuffle(CLOTHING).slice(0, QUESTIONS_PER_GAME));
  }, [reset]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return { phase, current, choices, dressed, wrongFlash, startGame, selectAnswer, restart };
}
