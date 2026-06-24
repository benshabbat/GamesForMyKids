import type { BaseGameItem } from "@/lib/types/core/base";

/**
 * Hebrew script (ktav) recognition game data.
 * 27 items: 22 base letters + 5 final (sofit) forms.
 * `hebrew` holds the full letter name so TTS reads the name.
 * `emoji` holds the block-form character for visual display.
 * Future enhancement: replace emoji with cursive SVG assets.
 */
export const HEBREW_SCRIPT_ITEMS: BaseGameItem[] = [
  { name: "alef",       hebrew: "אָלֶף",   english: "Alef",    emoji: "א", color: "bg-gradient-to-br from-indigo-400 to-indigo-600" },
  { name: "bet",        hebrew: "בֵּית",   english: "Bet",     emoji: "ב", color: "bg-gradient-to-br from-violet-400 to-violet-600" },
  { name: "gimel",      hebrew: "גִּימֶל", english: "Gimel",   emoji: "ג", color: "bg-gradient-to-br from-purple-400 to-purple-600" },
  { name: "dalet",      hebrew: "דָּלֶת",  english: "Dalet",   emoji: "ד", color: "bg-gradient-to-br from-fuchsia-400 to-fuchsia-600" },
  { name: "hey",        hebrew: "הֵא",     english: "Hey",     emoji: "ה", color: "bg-gradient-to-br from-pink-400 to-pink-600" },
  { name: "vav",        hebrew: "וָו",     english: "Vav",     emoji: "ו", color: "bg-gradient-to-br from-rose-400 to-rose-600" },
  { name: "zayin",      hebrew: "זַיִן",   english: "Zayin",   emoji: "ז", color: "bg-gradient-to-br from-orange-400 to-orange-600" },
  { name: "het",        hebrew: "חֵית",    english: "Het",     emoji: "ח", color: "bg-gradient-to-br from-amber-400 to-amber-600" },
  { name: "tet",        hebrew: "טֵית",    english: "Tet",     emoji: "ט", color: "bg-gradient-to-br from-yellow-400 to-yellow-600" },
  { name: "yud",        hebrew: "יוֹד",    english: "Yud",     emoji: "י", color: "bg-gradient-to-br from-lime-400 to-lime-600" },
  { name: "kaf",        hebrew: "כַּף",    english: "Kaf",     emoji: "כ", color: "bg-gradient-to-br from-green-400 to-green-600" },
  { name: "lamed",      hebrew: "לָמֶד",   english: "Lamed",   emoji: "ל", color: "bg-gradient-to-br from-teal-400 to-teal-600" },
  { name: "mem",        hebrew: "מֵם",     english: "Mem",     emoji: "מ", color: "bg-gradient-to-br from-cyan-400 to-cyan-600" },
  { name: "nun",        hebrew: "נוּן",    english: "Nun",     emoji: "נ", color: "bg-gradient-to-br from-sky-400 to-sky-600" },
  { name: "samech",     hebrew: "סָמֶך",   english: "Samech",  emoji: "ס", color: "bg-gradient-to-br from-blue-400 to-blue-600" },
  { name: "ayin",       hebrew: "עַיִן",   english: "Ayin",    emoji: "ע", color: "bg-gradient-to-br from-indigo-500 to-indigo-700" },
  { name: "pey",        hebrew: "פֵּא",    english: "Pey",     emoji: "פ", color: "bg-gradient-to-br from-violet-500 to-violet-700" },
  { name: "tzadi",      hebrew: "צָדִי",   english: "Tzadi",   emoji: "צ", color: "bg-gradient-to-br from-purple-500 to-purple-700" },
  { name: "kuf",        hebrew: "קוּף",    english: "Kuf",     emoji: "ק", color: "bg-gradient-to-br from-fuchsia-500 to-fuchsia-700" },
  { name: "resh",       hebrew: "רֵישׁ",   english: "Resh",    emoji: "ר", color: "bg-gradient-to-br from-pink-500 to-pink-700" },
  { name: "shin",       hebrew: "שִׁין",   english: "Shin",    emoji: "ש", color: "bg-gradient-to-br from-rose-500 to-rose-700" },
  { name: "tav",        hebrew: "תָּו",    english: "Tav",     emoji: "ת", color: "bg-gradient-to-br from-orange-500 to-orange-700" },
  // Final (sofit) forms
  { name: "kaf-sofit",   hebrew: "כַּף סוֹפִית",  english: "Final Kaf",   emoji: "ך", color: "bg-gradient-to-br from-green-500 to-green-700" },
  { name: "mem-sofit",   hebrew: "מֵם סוֹפִית",   english: "Final Mem",   emoji: "ם", color: "bg-gradient-to-br from-teal-500 to-teal-700" },
  { name: "nun-sofit",   hebrew: "נוּן סוֹפִית",  english: "Final Nun",   emoji: "ן", color: "bg-gradient-to-br from-cyan-500 to-cyan-700" },
  { name: "pey-sofit",   hebrew: "פֵּא סוֹפִית",  english: "Final Pey",   emoji: "ף", color: "bg-gradient-to-br from-sky-500 to-sky-700" },
  { name: "tzadi-sofit", hebrew: "צָדִי סוֹפִית", english: "Final Tzadi", emoji: "ץ", color: "bg-gradient-to-br from-blue-500 to-blue-700" },
];

export const HEBREW_SCRIPT_PRONUNCIATIONS: Record<string, string> = {
  "alef":        "אָלֶף",
  "bet":         "בֵּית",
  "gimel":       "גִּימֶל",
  "dalet":       "דָּלֶת",
  "hey":         "הֵא",
  "vav":         "וָו",
  "zayin":       "זַיִן",
  "het":         "חֵית",
  "tet":         "טֵית",
  "yud":         "יוֹד",
  "kaf":         "כַּף",
  "lamed":       "לָמֶד",
  "mem":         "מֵם",
  "nun":         "נוּן",
  "samech":      "סָמֶך",
  "ayin":        "עַיִן",
  "pey":         "פֵּא",
  "tzadi":       "צָדִי",
  "kuf":         "קוּף",
  "resh":        "רֵישׁ",
  "shin":        "שִׁין",
  "tav":         "תָּו",
  "kaf-sofit":   "כַּף סוֹפִית",
  "mem-sofit":   "מֵם סוֹפִית",
  "nun-sofit":   "נוּן סוֹפִית",
  "pey-sofit":   "פֵּא סוֹפִית",
  "tzadi-sofit": "צָדִי סוֹפִית",
};
