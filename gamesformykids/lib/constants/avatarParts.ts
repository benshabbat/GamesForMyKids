export type AvatarArea = 'face' | 'hair' | 'clothing' | 'accessories';

export interface AvatarPart {
  id: string;
  emoji: string;
  label: string;
  color?: string;
}

export const AVATAR_PARTS: Record<AvatarArea, AvatarPart[]> = {
  face: [
    { id: 'f1', emoji: '😊', label: 'פָּנִים שְׂמֵחוֹת' },
    { id: 'f2', emoji: '😄', label: 'פָּנִים מְאֻשָּׁרוֹת' },
    { id: 'f3', emoji: '😎', label: 'פָּנִים קְרִירוֹת' },
    { id: 'f4', emoji: '🥳', label: 'פָּנִים חֲגִיגִיּוֹת' },
    { id: 'f5', emoji: '🤩', label: 'פָּנִים נִרְגָּשׁוֹת' },
    { id: 'f6', emoji: '😇', label: 'פָּנִים תְּמִימוֹת' },
    { id: 'f7', emoji: '😜', label: 'פָּנִים שׁוֹבָבוֹת' },
    { id: 'f8', emoji: '🤗', label: 'פָּנִים חַמּוֹת' },
  ],
  hair: [
    { id: 'hr1', emoji: '🟤', label: 'שֵׂעָר חוּם',     color: '#8B4513' },
    { id: 'hr2', emoji: '🟡', label: 'שֵׂעָר בְּלוֹנְד',   color: '#F0E68C' },
    { id: 'hr3', emoji: '⬛', label: 'שֵׂעָר שָׁחֹר',    color: '#1C1C1C' },
    { id: 'hr4', emoji: '🔴', label: 'שֵׂעָר אָדֹם',    color: '#CC2200' },
    { id: 'hr5', emoji: '⬜', label: 'שֵׂעָר לָבָן',     color: '#E8E8E8' },
    { id: 'hr6', emoji: '🟣', label: 'שֵׂעָר סָגֹל',   color: '#7B2FBE' },
    { id: 'hr7', emoji: '🌈', label: 'שֵׂעָר קֶשֶׁת',    color: '#FF6B9D' },
    { id: 'hr8', emoji: '🩶', label: 'שֵׂעָר אָפֹר',   color: '#888888' },
  ],
  clothing: [
    { id: 'c1', emoji: '👕', label: 'חֻלְצָה כְּחֻלָּה' },
    { id: 'c2', emoji: '👗', label: 'שִׂמְלָה יָפָה' },
    { id: 'c3', emoji: '🧥', label: 'מְעִיל חַם' },
    { id: 'c4', emoji: '👚', label: 'חֻלְצַת סְפּוֹרְט' },
    { id: 'c5', emoji: '🎽', label: 'גּוּפִיַּת סְפּוֹרְט' },
    { id: 'c6', emoji: '👔', label: 'חֻלְצָה מְכֻפְתֶּרֶת' },
    { id: 'c7', emoji: '🧣', label: 'צָעִיף צִבְעוֹנִי' },
    { id: 'c8', emoji: '🩱', label: 'בֶּגֶד יָם' },
  ],
  accessories: [
    { id: 'a0', emoji: '❌', label: 'לְלֹא אֲבִיזָר' },
    { id: 'a1', emoji: '🎀', label: 'סֶרֶט שֵׂעָר' },
    { id: 'a2', emoji: '🕶️', label: 'מִשְׁקְפֵי שֶׁמֶשׁ' },
    { id: 'a3', emoji: '🧢', label: 'כּוֹבַע שֶׁטַח' },
    { id: 'a4', emoji: '👑', label: 'כֶּתֶר' },
    { id: 'a5', emoji: '🌟', label: 'כּוֹכָב מַזְהִיר' },
    { id: 'a6', emoji: '🎸', label: 'גִּיטָרָה' },
    { id: 'a7', emoji: '🌈', label: 'קֶשֶׁת קֶסֶם' },
  ],
};

export const AREA_LABELS: Record<AvatarArea, string> = {
  face:        '😊 הבעה',
  hair:        '💇 שיער',
  clothing:    '👕 ביגוד',
  accessories: '🌟 אביזרים',
};

export const AVATAR_AREAS: AvatarArea[] = ['face', 'hair', 'clothing', 'accessories'];

export const DEFAULT_SELECTIONS: Record<AvatarArea, string> = {
  face:        'f1',
  hair:        'hr1',
  clothing:    'c1',
  accessories: 'a0',
};
