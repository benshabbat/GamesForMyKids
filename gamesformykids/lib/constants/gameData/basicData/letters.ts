import { BaseGameItem } from "@/lib/types/core/base";
import { createGameConfig, createItemsList } from "@/lib/constants/core";

export const LETTER_CONSTANTS: Record<string, BaseGameItem> = {
  ALEF: { name: "alef", hebrew: "א", english: "A", emoji: "א", color: "", sound: [440, 550, 660] },
  BET: { name: "bet", hebrew: "ב", english: "B", emoji: "ב", color: "", sound: [494, 588, 740] },
  GIMEL: { name: "gimel", hebrew: "ג", english: "G", emoji: "ג", color: "", sound: [523, 659, 784] },
  DALET: { name: "dalet", hebrew: "ד", english: "D", emoji: "ד", color: "", sound: [587, 740, 880] },
  HEY: { name: "hey", hebrew: "ה", english: "H", emoji: "ה", color: "", sound: [659, 831, 988] },
  VAV: { name: "vav", hebrew: "ו", english: "V", emoji: "ו", color: "", sound: [392, 494, 622] },
  ZAYIN: { name: "zayin", hebrew: "ז", english: "Z", emoji: "ז", color: "", sound: [349, 440, 523] },
  HET: { name: "het", hebrew: "ח", english: "CH", emoji: "ח", color: "", sound: [330, 415, 494] },
  TET: { name: "tet", hebrew: "ט", english: "T", emoji: "ט", color: "", sound: [294, 370, 440] },
  YUD: { name: "yud", hebrew: "י", english: "Y", emoji: "י", color: "", sound: [277, 349, 415] },
  KAF: { name: "kaf", hebrew: "כ", english: "K", emoji: "כ", color: "", sound: [262, 330, 392] },
  LAMED: { name: "lamed", hebrew: "ל", english: "L", emoji: "ל", color: "", sound: [247, 311, 370] },
  MEM: { name: "mem", hebrew: "מ", english: "M", emoji: "מ", color: "", sound: [233, 294, 349] },
  NUN: { name: "nun", hebrew: "נ", english: "N", emoji: "נ", color: "", sound: [220, 277, 330] },
  SAMECH: { name: "samech", hebrew: "ס", english: "S", emoji: "ס", color: "", sound: [208, 262, 311] },
  AYIN: { name: "ayin", hebrew: "ע", english: "A", emoji: "ע", color: "", sound: [196, 247, 294] },
  PEY: { name: "pey", hebrew: "פ", english: "P", emoji: "פ", color: "", sound: [185, 233, 277] },
  TZADI: { name: "tzadi", hebrew: "צ", english: "TZ", emoji: "צ", color: "", sound: [175, 220, 262] },
  KUF: { name: "kuf", hebrew: "ק", english: "K", emoji: "ק", color: "", sound: [165, 208, 247] },
  RESH: { name: "resh", hebrew: "ר", english: "R", emoji: "ר", color: "", sound: [156, 196, 233] },
  SHIN: { name: "shin", hebrew: "ש", english: "SH", emoji: "ש", color: "", sound: [147, 185, 220] },
  TAV: { name: "tav", hebrew: "ת", english: "T", emoji: "ת", color: "", sound: [139, 175, 208] },
  // Final (sofit) forms — used at the end of a word
  KAF_SOFIT: { name: "kaf-sofit", hebrew: "ך", english: "K", emoji: "ך", color: "", sound: [262, 330, 392] },
  MEM_SOFIT: { name: "mem-sofit", hebrew: "ם", english: "M", emoji: "ם", color: "", sound: [233, 294, 349] },
  NUN_SOFIT: { name: "nun-sofit", hebrew: "ן", english: "N", emoji: "ן", color: "", sound: [220, 277, 330] },
  PEY_SOFIT: { name: "pey-sofit", hebrew: "ף", english: "P", emoji: "ף", color: "", sound: [185, 233, 277] },
  TZADI_SOFIT: { name: "tzadi-sofit", hebrew: "ץ", english: "TZ", emoji: "ץ", color: "", sound: [175, 220, 262] },
};

export const ALL_LETTERS = createItemsList(LETTER_CONSTANTS);

// Reading out the bare glyph (e.g. "ב") often comes out unclear or silent in Hebrew TTS,
// since several letters are also one-letter words/prefixes. Speak the full letter name instead.
export const LETTER_HEBREW_PRONUNCIATIONS: Record<string, string> = {
  alef: "אָלֶף",
  bet: "בֵּית",
  gimel: "גִּימֶל",
  dalet: "דָּלֶת",
  hey: "הֵא",
  vav: "וָאו",
  zayin: "זַיִן",
  het: "חֵת",
  tet: "טֵת",
  yud: "יוֹד",
  kaf: "כַּף",
  lamed: "לָמֶד",
  mem: "מֵם",
  nun: "נוּן",
  samech: "סָמֶך",
  ayin: "עַיִן",
  pey: "פֵּא",
  tzadi: "צַדִּי",
  kuf: "קוֹף",
  resh: "רֵישׁ",
  shin: "שִׁין",
  tav: "תָּו",
  "kaf-sofit": "כַּף סוֹפִית",
  "mem-sofit": "מֵם סוֹפִית",
  "nun-sofit": "נוּן סוֹפִית",
  "pey-sofit": "פֵּא סוֹפִית",
  "tzadi-sofit": "צָדִי סוֹפִית",
};

export const LETTER_GAME_CONSTANTS = createGameConfig(6, 2, 3);
