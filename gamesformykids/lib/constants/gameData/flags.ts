import { BaseGameItem } from "@/lib/types/core/base";

/**
 * ===============================================
 * נתוני דגלי מדינות - משחק דגלים
 * ===============================================
 */
export const FLAGS_ITEMS: BaseGameItem[] = [
  // אירופה
  { name: "france",       hebrew: "צרפת",       hebrewNikud: "צָרְפַת",             english: "France",       emoji: "🇫🇷", color: "bg-blue-600" },
  { name: "germany",      hebrew: "גרמניה",     hebrewNikud: "גֶּרְמַנְיָה",         english: "Germany",      emoji: "🇩🇪", color: "bg-yellow-500" },
  { name: "spain",        hebrew: "ספרד",       hebrewNikud: "סְפָרַד",             english: "Spain",        emoji: "🇪🇸", color: "bg-red-600" },
  { name: "italy",        hebrew: "איטליה",     hebrewNikud: "אִיטַלְיָה",          english: "Italy",        emoji: "🇮🇹", color: "bg-green-600" },
  { name: "uk",           hebrew: "בריטניה",    hebrewNikud: "בְּרִיטַנְיָה",        english: "United Kingdom", emoji: "🇬🇧", color: "bg-blue-700" },
  { name: "netherlands",  hebrew: "הולנד",      hebrewNikud: "הוֹלַנְד",            english: "Netherlands",  emoji: "🇳🇱", color: "bg-orange-500" },
  { name: "portugal",     hebrew: "פורטוגל",    hebrewNikud: "פּוֹרְטוּגָל",        english: "Portugal",     emoji: "🇵🇹", color: "bg-red-700" },
  { name: "sweden",       hebrew: "שוודיה",     hebrewNikud: "שְׁוֶדְיָה",          english: "Sweden",       emoji: "🇸🇪", color: "bg-blue-500" },
  { name: "greece",       hebrew: "יוון",       hebrewNikud: "יָוָן",               english: "Greece",       emoji: "🇬🇷", color: "bg-sky-600" },
  { name: "switzerland",  hebrew: "שווייץ",     hebrewNikud: "שְׁוַויְץ",           english: "Switzerland",  emoji: "🇨🇭", color: "bg-red-500" },
  { name: "poland",       hebrew: "פולין",      hebrewNikud: "פּוֹלִין",            english: "Poland",       emoji: "🇵🇱", color: "bg-rose-500" },
  { name: "austria",      hebrew: "אוסטריה",    hebrewNikud: "אוֹסְטְרִיָּה",       english: "Austria",      emoji: "🇦🇹", color: "bg-red-600" },
  // אמריקות
  { name: "usa",          hebrew: "ארצות הברית", hebrewNikud: "אַרְצוֹת הַבְּרִית",  english: "United States", emoji: "🇺🇸", color: "bg-blue-600" },
  { name: "brazil",       hebrew: "ברזיל",      hebrewNikud: "בְּרָזִיל",           english: "Brazil",       emoji: "🇧🇷", color: "bg-green-600" },
  { name: "canada",       hebrew: "קנדה",       hebrewNikud: "קָנָדָה",             english: "Canada",       emoji: "🇨🇦", color: "bg-red-500" },
  { name: "mexico",       hebrew: "מקסיקו",     hebrewNikud: "מֶקְסִיקוֹ",          english: "Mexico",       emoji: "🇲🇽", color: "bg-green-700" },
  { name: "argentina",    hebrew: "ארגנטינה",   hebrewNikud: "אַרְגֶּנְטִינָה",     english: "Argentina",    emoji: "🇦🇷", color: "bg-sky-400" },
  // אסיה
  { name: "japan",        hebrew: "יפן",        hebrewNikud: "יָפָן",               english: "Japan",        emoji: "🇯🇵", color: "bg-red-500" },
  { name: "china",        hebrew: "סין",        hebrewNikud: "סִין",                english: "China",        emoji: "🇨🇳", color: "bg-red-600" },
  { name: "india",        hebrew: "הודו",       hebrewNikud: "הוֹדּוּ",             english: "India",        emoji: "🇮🇳", color: "bg-orange-500" },
  { name: "israel",       hebrew: "ישראל",      hebrewNikud: "יִשְׂרָאֵל",          english: "Israel",       emoji: "🇮🇱", color: "bg-blue-500" },
  { name: "turkey",       hebrew: "טורקיה",     hebrewNikud: "טוּרְקִיָּה",         english: "Turkey",       emoji: "🇹🇷", color: "bg-red-600" },
  { name: "south-korea",  hebrew: "קוריאה הדרומית", hebrewNikud: "קוֹרֵאָה הַדְּרוֹמִית", english: "South Korea", emoji: "🇰🇷", color: "bg-blue-600" },
  { name: "thailand",     hebrew: "תאילנד",     hebrewNikud: "תַּאִילַנְד",         english: "Thailand",     emoji: "🇹🇭", color: "bg-blue-700" },
  // מזרח תיכון ואפריקה
  { name: "egypt",        hebrew: "מצרים",      hebrewNikud: "מִצְרַיִם",           english: "Egypt",        emoji: "🇪🇬", color: "bg-yellow-600" },
  { name: "morocco",      hebrew: "מרוקו",      hebrewNikud: "מָרוֹקוֹ",            english: "Morocco",      emoji: "🇲🇦", color: "bg-red-700" },
  { name: "south-africa", hebrew: "דרום אפריקה", hebrewNikud: "דְּרוֹם אַפְרִיקָה",  english: "South Africa", emoji: "🇿🇦", color: "bg-green-600" },
  // אוקיאניה ורוסיה
  { name: "australia",    hebrew: "אוסטרליה",   hebrewNikud: "אוֹסְטְרַלְיָה",      english: "Australia",    emoji: "🇦🇺", color: "bg-blue-700" },
  { name: "russia",       hebrew: "רוסיה",      hebrewNikud: "רוּסְיָה",            english: "Russia",       emoji: "🇷🇺", color: "bg-red-600" },
  { name: "ukraine",      hebrew: "אוקראינה",   hebrewNikud: "אוּקְרָאִינָה",       english: "Ukraine",      emoji: "🇺🇦", color: "bg-yellow-400" },
];
