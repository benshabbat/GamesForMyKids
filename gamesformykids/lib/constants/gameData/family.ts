/**
 * נתוני המשחקים - בני משפחה ויחסי משפחה
 */

import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

/**
 * ===============================================
 * נתוני בני משפחה
 * ===============================================
 */
export const FAMILY_CONSTANTS: Record<string, BaseGameItem> = {
  FATHER: { name: "father", hebrew: "אבא", hebrewNikud: "אַבָּא", english: "Father", emoji: "👨", color: "bg-blue-500", sound: [440, 550, 660] },
  MOTHER: { name: "mother", hebrew: "אמא", hebrewNikud: "אִמָּא", english: "Mother", emoji: "👩", color: "bg-pink-500", sound: [392, 494, 587] },
  SON: { name: "son", hebrew: "בן", hebrewNikud: "בֵּן", english: "Son", emoji: "👦", color: "bg-blue-400", sound: [349, 440, 523] },
  DAUGHTER: { name: "daughter", hebrew: "בת", hebrewNikud: "בַּת", english: "Daughter", emoji: "👧", color: "bg-pink-400", sound: [523, 659, 784] },
  BROTHER: { name: "brother", hebrew: "אח", hebrewNikud: "אָח", english: "Brother", emoji: "👦", color: "bg-green-500", sound: [294, 370, 440] },
  SISTER: { name: "sister", hebrew: "אחות", hebrewNikud: "אָחוֹת", english: "Sister", emoji: "👧", color: "bg-purple-500", sound: [330, 415, 494] },
  GRANDFATHER: { name: "grandfather", hebrew: "סבא", hebrewNikud: "סַבָּא", english: "Grandfather", emoji: "👴", color: "bg-gray-500", sound: [587, 698, 784] },
  GRANDMOTHER: { name: "grandmother", hebrew: "סבתא", hebrewNikud: "סָבְתָא", english: "Grandmother", emoji: "👵", color: "bg-gray-400", sound: [196, 247, 294] },
  UNCLE: { name: "uncle", hebrew: "דוד", hebrewNikud: "דּוֹד", english: "Uncle", emoji: "👨", color: "bg-orange-500", sound: [659, 831, 988] },
  AUNT: { name: "aunt", hebrew: "דודה", hebrewNikud: "דּוֹדָה", english: "Aunt", emoji: "👩", color: "bg-orange-400", sound: [277, 349, 415] },
  COUSIN_MALE: { name: "cousin_male", hebrew: "בן דוד", hebrewNikud: "בֶּן דּוֹד", english: "Male Cousin", emoji: "👦", color: "bg-yellow-500", sound: [415, 523, 622] },
  COUSIN_FEMALE: { name: "cousin_female", hebrew: "בת דודה", hebrewNikud: "בַּת דּוֹדָה", english: "Female Cousin", emoji: "👧", color: "bg-yellow-400", sound: [220, 277, 330] },
  BABY: { name: "baby", hebrew: "תינוק", hebrewNikud: "תִּינוֹק", english: "Baby", emoji: "👶", color: "bg-pink-300", sound: [311, 392, 466] },
  FAMILY: { name: "family", hebrew: "משפחה", hebrewNikud: "מִשְׁפָּחָה", english: "Family", emoji: "👨‍👩‍👧‍👦", color: "bg-red-400", sound: [247, 311, 370] },
};

/**
 * ===============================================
 * נתוני יחסי משפחה מורחבים
 * ===============================================
 */
export const EXTENDED_FAMILY_CONSTANTS: Record<string, BaseGameItem> = {
  GREAT_GRANDFATHER: { name: "great_grandfather", hebrew: "סבא רבא", hebrewNikud: "סַבָּא רַבָּא", english: "Great Grandfather", emoji: "👴", color: "bg-gray-600", sound: [466, 587, 698] },
  GREAT_GRANDMOTHER: { name: "great_grandmother", hebrew: "סבתא רבתא", hebrewNikud: "סָבְתָא רַבְּתָא", english: "Great Grandmother", emoji: "👵", color: "bg-gray-500", sound: [185, 233, 277] },
  NEPHEW: { name: "nephew", hebrew: "אחיין", hebrewNikud: "אַחְיָין", english: "Nephew", emoji: "👦", color: "bg-blue-300", sound: [698, 831, 932] },
  NIECE: { name: "niece", hebrew: "אחיינית", hebrewNikud: "אַחְיָינִית", english: "Niece", emoji: "👧", color: "bg-pink-200", sound: [156, 196, 233] },
  STEPFATHER: { name: "stepfather", hebrew: "אבא חורג", hebrewNikud: "אַבָּא חוֹרֵג", english: "Stepfather", emoji: "👨", color: "bg-blue-600", sound: [831, 988, 1175] },
  STEPMOTHER: { name: "stepmother", hebrew: "אמא חורגת", hebrewNikud: "אִמָּא חוֹרֶגֶת", english: "Stepmother", emoji: "👩", color: "bg-pink-600", sound: [139, 175, 208] },
  STEPBROTHER: { name: "stepbrother", hebrew: "אח חורג", hebrewNikud: "אָח חוֹרֵג", english: "Stepbrother", emoji: "👦", color: "bg-green-400", sound: [988, 1175, 1397] },
  STEPSISTER: { name: "stepsister", hebrew: "אחות חורגת", hebrewNikud: "אָחוֹת חוֹרֶגֶת", english: "Stepsister", emoji: "👧", color: "bg-purple-400", sound: [117, 147, 175] },
  FATHER_IN_LAW: { name: "father_in_law", hebrew: "חותן", hebrewNikud: "חוֹתֵן", english: "Father-in-law", emoji: "👨", color: "bg-indigo-500", sound: [1175, 1397, 1661] },
  MOTHER_IN_LAW: { name: "mother_in_law", hebrew: "חותנת", hebrewNikud: "חוֹתֶנֶת", english: "Mother-in-law", emoji: "👩", color: "bg-indigo-400", sound: [98, 123, 147] },
};

/**
 * ===============================================
 * נתוני תפקידים במשפחה
 * ===============================================
 */
export const FAMILY_ROLES_CONSTANTS: Record<string, BaseGameItem> = {
  PARENT: { name: "parent", hebrew: "הורה", hebrewNikud: "הוֹרֶה", english: "Parent", emoji: "👨‍👩‍👧‍👦", color: "bg-red-500", sound: [440, 550, 660] },
  CHILD: { name: "child", hebrew: "ילד", hebrewNikud: "יֶלֶד", english: "Child", emoji: "🧒", color: "bg-yellow-400", sound: [392, 494, 587] },
  SIBLING: { name: "sibling", hebrew: "אח/אחות", hebrewNikud: "אָח/אָחוֹת", english: "Sibling", emoji: "👫", color: "bg-green-400", sound: [349, 440, 523] },
  GRANDPARENT: { name: "grandparent", hebrew: "סב/סבתא", hebrewNikud: "סָב/סָבְתָא", english: "Grandparent", emoji: "👴👵", color: "bg-gray-400", sound: [523, 659, 784] },
  TWIN: { name: "twin", hebrew: "תאום", hebrewNikud: "תְּאוֹם", english: "Twin", emoji: "👭", color: "bg-purple-400", sound: [294, 370, 440] },
  ELDEST: { name: "eldest", hebrew: "בכור", hebrewNikud: "בְּכוֹר", english: "Eldest", emoji: "👑", color: "bg-yellow-500", sound: [330, 415, 494] },
  YOUNGEST: { name: "youngest", hebrew: "צעיר", hebrewNikud: "צָעִיר", english: "Youngest", emoji: "👶", color: "bg-pink-300", sound: [587, 698, 784] },
  ONLY_CHILD: { name: "only_child", hebrew: "ילד יחיד", hebrewNikud: "יֶלֶד יָחִיד", english: "Only Child", emoji: "🧒", color: "bg-blue-300", sound: [196, 247, 294] },
};

// ייצוא רשימות והגדרות
export const FAMILY_ITEMS = createItemsList(FAMILY_CONSTANTS);
export const FAMILY_PRONUNCIATIONS = createPronunciationDictionary(FAMILY_CONSTANTS);
export const FAMILY_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "בני משפחה",
  description: "למד על בני המשפחה השונים!"
};

export const EXTENDED_FAMILY_ITEMS = createItemsList(EXTENDED_FAMILY_CONSTANTS);
export const EXTENDED_FAMILY_PRONUNCIATIONS = createPronunciationDictionary(EXTENDED_FAMILY_CONSTANTS);
export const EXTENDED_FAMILY_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משפחה מורחבת",
  description: "למד על יחסי משפחה מורחבים!"
};

export const FAMILY_ROLES_ITEMS = createItemsList(FAMILY_ROLES_CONSTANTS);
export const FAMILY_ROLES_PRONUNCIATIONS = createPronunciationDictionary(FAMILY_ROLES_CONSTANTS);
export const FAMILY_ROLES_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "תפקידים במשפחה",
  description: "למד על תפקידים שונים במשפחה!"
};