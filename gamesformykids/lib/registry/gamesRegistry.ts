import {
  Heart,
  Circle,
  Square,
  Music,
  Hash,
  Apple,
  Dog,
  Cloud,
  Calculator,
  User,
  Salad,
  Sparkles,
  Shirt,
  Coffee,
  Home,
  Wrench,
  Smile,
  Puzzle,
  Paintbrush,
  Building,
  // משחקים חדשים
  Zap,
  ChefHat,
  Hand,
  Bone,
  // משחקים נוספים חדשים
  Recycle,
  Pill,
  Volume2,
  Calendar,
  ShoppingCart,
  Shield,
  // משחקים חדשים נוספים
  Waves,
  Flower,
  Rocket,
  PartyPopper,
  // משחקים חדשים נוספים 2
  Briefcase,
  CloudRain,
  Rainbow,
  Star,
  BookOpen,
  // משחקים חדשניים
  Mic,
  Activity,
  TouchpadIcon as Touch,
  Brain,
  Clock,
  Earth,
  // משחקים כיפיים חדשים
  Bird,
  Bug,
  Mountain,
  Crown,
  // משחקים חדשים נוספים - אצווה 3
  PenLine,
  ArrowLeftRight,
  // משחקים חדשים נוספים - אצווה 4
  Lightbulb,
  Trophy,
  Flag,
  Languages,
  // משחקים חדשים נוספים - אצווה 5
  Divide,
  MapPin,
  SmilePlus,
  Leaf,
  Box,
  // משחקים חדשים נוספים - אצווה 6
  Utensils,
  Map,
  Baby,
  // אצווה 7 — כדורגל
  CircleDot,
  // אצווה 8 — משחקי ארקייד
  Hammer,
  Layers,
  Gamepad2,
  Flame,
  // אצווה 9 — אייקוני קונטקסט ספציפי
  Car,
  Landmark,
  Palette,
  Cpu,
  Cat,
} from "lucide-react";
import { HebrewLettersIcon } from "@/public/icons/HebrewIcons";
import { Game } from "@/lib/types";
import { createElement } from "react";

export interface GameRegistration {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  emoji: string; // אמוג'י לתצוגה בכרטיס
  color: string;
  href: string;
  available: boolean;
  order: number; // לקביעת סדר התצוגה
}

// רישום כל המשחקים במקום אחד
const GAMES_REGISTRY: GameRegistration[] = [
  { id: "memory",          title: "משחק זיכרון",                    description: "מצא את הזוגות!",                                          icon: Heart,          emoji: "🧠", color: "bg-pink-400 hover:bg-pink-500",                                                                              href: "/games/memory",          available: true, order: 1 },
  { id: "colors",          title: "משחק צבעים",                     description: "למד צבעים!",                                               icon: Circle,         emoji: "🌈", color: "bg-blue-400 hover:bg-blue-500",                                                                              href: "/games/colors",          available: true, order: 2 },
  { id: "letters",         title: "משחק אותיות",                    description: "למד אותיות!",                                              icon: HebrewLettersIcon, emoji: "א", color: "bg-orange-400 hover:bg-orange-500",                                                                       href: "/games/letters",         available: true, order: 3 },
  { id: "hebrew-letters",  title: "תרגול כתיבה בעברית",             description: "תרגל כתיבת כל האותיות!",                                  icon: HebrewLettersIcon, emoji: "✍️", color: "bg-green-400 hover:bg-green-500",                                                                        href: "/games/hebrew-letters",  available: true, order: 3.5 },
  { id: "shapes",          title: "משחק צורות",                     description: "למד צורות!",                                               icon: Square,         emoji: "🔷", color: "bg-green-400 hover:bg-green-500",                                                                            href: "/games/shapes",          available: true, order: 4 },
  { id: "colored-shapes",  title: "משחק צורות צבעוניות",            description: "בחר צורה בצבע הנכון!",                                    icon: Circle,         emoji: "🟡", color: "bg-gradient-to-r from-orange-400 to-green-400 hover:from-orange-500 hover:to-green-500",                href: "/games/colored-shapes",  available: true, order: 4.5 },
  { id: "numbers",         title: "משחק מספרים",                    description: "למד מספרים!",                                              icon: Hash,           emoji: "🔢", color: "bg-indigo-400 hover:bg-indigo-500",                                                                          href: "/games/numbers",         available: true, order: 5 },
  { id: "fruits",          title: "משחק פירות",                     description: "למד פירות!",                                               icon: Apple,          emoji: "🍎", color: "bg-red-400 hover:bg-red-500",                                                                               href: "/games/fruits",          available: true, order: 6 },
  { id: "bubbles",         title: "בועות מוזיקליות",                 description: "פוצץ בועות ושמע צלילים!",                                 icon: Music,          emoji: "🎵", color: "bg-blue-400 hover:bg-blue-500",                                                                             href: "/games/bubbles",         available: true, order: 8 },
  { id: "counting",        title: "משחק ספירה",                     description: "ספור אימוג'ים!",                                           icon: Hash,           emoji: "🔟", color: "bg-cyan-400 hover:bg-cyan-500",                                                                             href: "/games/counting",        available: true, order: 9 },
  { id: "weather",         title: "משחק מזג אוויר",                 description: "למד על מזג האוויר!",                                      icon: Cloud,          emoji: "⛅", color: "bg-sky-400 hover:bg-sky-500",                                                                               href: "/games/weather",         available: true, order: 10 },
  { id: "math",            title: "משחק חשבון",                     description: "למד חיבור וחיסור!",                                       icon: Calculator,     emoji: "➕", color: "bg-yellow-400 hover:bg-yellow-500",                                                                         href: "/games/math",            available: true, order: 12 },
  { id: "professions",     title: "משחק מקצועות",                   description: "למד על מקצועות שונים!",                                   icon: User,           emoji: "👩‍⚕️", color: "bg-purple-400 hover:bg-purple-500",                                                                     href: "/games/professions",     available: true, order: 13 },
  { id: "vegetables",      title: "משחק ירקות",                     description: "למד ירקות בריאים!",                                       icon: Salad,          emoji: "🥦", color: "bg-green-400 hover:bg-green-500",                                                                           href: "/games/vegetables",      available: true, order: 14 },
  { id: "space",           title: "משחק גופי השמים",                description: "חקור את החלל והכוכבים!",                                  icon: Sparkles,       emoji: "🌟", color: "bg-indigo-400 hover:bg-indigo-500",                                                                         href: "/games/space",           available: true, order: 16 },
  { id: "clothing",        title: "משחק בגדים ואביזרים",            description: "למד על פריטי לבוש שונים!",                                icon: Shirt,          emoji: "👗", color: "bg-pink-400 hover:bg-pink-500",                                                                             href: "/games/clothing",        available: true, order: 17 },
  { id: "smells-tastes",   title: "משחק ריחות וטעמים",              description: "זהה ריחות וטעמים שונים!",                                 icon: Coffee,         emoji: "👃", color: "bg-amber-400 hover:bg-amber-500",                                                                           href: "/games/smells-tastes",   available: true, order: 18 },
  { id: "house",           title: "משחק חפצי הבית",                 description: "למד חפצים בבית!",                                         icon: Home,           emoji: "🏠", color: "bg-sky-400 hover:bg-sky-500",                                                                               href: "/games/house",           available: true, order: 19 },
  { id: "tools",           title: "משחק כלי עבודה",                 description: "למד כלי עבודה שונים!",                                    icon: Wrench,         emoji: "🔧", color: "bg-orange-400 hover:bg-orange-500",                                                                         href: "/games/tools",           available: true, order: 20 },
  { id: "tzedakah",        title: "משחק קופת הצדקה",                description: "תפוס מטבעות לצדקה!",                                     icon: Heart,          emoji: "🪙", color: "bg-pink-400 hover:bg-pink-500",                                                                             href: "/games/tzedakah",        available: true, order: 22 },
  { id: "puzzles",         title: "משחק פאזלים",                    description: "הרכב תמונות יפות!",                                       icon: Puzzle,         emoji: "🧩", color: "bg-purple-400 hover:bg-purple-500",                                                                         href: "/games/puzzles",         available: true, order: 23 },
  { id: "drawing",         title: "משחק ציורים",                    description: "צייר יצירות אמנות!",                                      icon: Paintbrush,     emoji: "✏️", color: "bg-orange-400 hover:bg-orange-500",                                                                         href: "/games/drawing",         available: true, order: 24 },
  { id: "coloring",        title: "צביעת תמונות",                   description: "בחר צבע וצבע ציורים מהנים!",                              icon: Palette,        emoji: "🎨", color: "bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500",               href: "/games/coloring",        available: true, order: 24.5 },
  { id: "building",        title: "סטודיו הבנייה הקסום",            description: "בנה יצירות עם צורות צבעוניות!",                          icon: Building,       emoji: "🏗️", color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",              href: "/games/building",        available: true, order: 25 },
  { id: "tetris",          title: "טטריס לילדים",                   description: "המשחק הכי כיפי בעולם!",                                   icon: Layers,         emoji: "🟦", color: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",         href: "/games/tetris",          available: true, order: 26 },
  { id: "sports",          title: "משחק ספורט",                     description: "למד על ספורט ופעילות גופנית!",                            icon: Trophy,         emoji: "⚽", color: "bg-green-500 hover:bg-green-600",                                                                          href: "/games/sports",          available: true, order: 27 },
  { id: "kitchen",         title: "משחק כלי מטבח",                  description: "למד על כלי מטבח ובישול!",                                 icon: ChefHat,        emoji: "🍳", color: "bg-orange-500 hover:bg-orange-600",                                                                        href: "/games/kitchen",         available: true, order: 28 },
  { id: "body-parts",      title: "משחק חלקי הגוף",                 description: "למד על חלקי הגוף השונים!",                                icon: Hand,           emoji: "🖐️", color: "bg-pink-500 hover:bg-pink-600",                                                                          href: "/games/body-parts",      available: true, order: 29 },
  { id: "dinosaurs",       title: "משחק דינוזאורים",                description: "למד על דינוזאורים מדהימים מהעבר!",                       icon: Bone,           emoji: "🦖", color: "bg-green-600 hover:bg-green-700",                                                                          href: "/games/dinosaurs",       available: true, order: 31 },
  { id: "world-food",      title: "משחק מזון מסביב לעולם",          description: "הכר מאכלים מתרבויות שונות!",                             icon: Utensils,       emoji: "🍜", color: "bg-purple-500 hover:bg-purple-600",                                                                       href: "/games/world-food",      available: true, order: 32 },
  { id: "recycling",       title: "משחק מחזור וקיימות",             description: "למד על מחזור וחשיבות שמירה על הסביבה!",                  icon: Recycle,        emoji: "♻️", color: "bg-green-500 hover:bg-green-600",                                                                          href: "/games/recycling",       available: true, order: 33 },
  { id: "medicine",        title: "משחק מרקחת ותרופות",             description: "הכר כלי רפואה ומתן עזרה ראשונה!",                       icon: Pill,           emoji: "💊", color: "bg-red-500 hover:bg-red-600",                                                                             href: "/games/medicine",        available: true, order: 34 },
  { id: "nature-sounds",   title: "משחק צלילי הטבע",                description: "הקשב לקולות הטבע ובעלי החיים!",                          icon: Volume2,        emoji: "🌿", color: "bg-teal-500 hover:bg-teal-600",                                                                           href: "/games/nature-sounds",   available: true, order: 35 },
  { id: "seasons-holidays",title: "משחק עונות השנה ומועדים",        description: "למד על עונות השנה והחגים היהודיים!",                     icon: Calendar,       emoji: "🍂", color: "bg-amber-500 hover:bg-amber-600",                                                                         href: "/games/seasons-holidays",available: true, order: 36 },
  { id: "feelings",        title: "משחק רגשות ותחושות",             description: "זהה ולמד על רגשות ותחושות שונות!",                       icon: Smile,          emoji: "😄", color: "bg-yellow-500 hover:bg-yellow-600",                                                                       href: "/games/feelings",        available: true, order: 37 },
  { id: "shopping-money",  title: "משחק קניות וכסף",                description: "למד על כסף, מחירים וקניות!",                             icon: ShoppingCart,   emoji: "🛒", color: "bg-indigo-500 hover:bg-indigo-600",                                                                       href: "/games/shopping-money",  available: true, order: 38 },
  { id: "road-safety",     title: "משחק בטיחות בדרכים",             description: "למד כללי בטיחות חשובים בדרכים!",                        icon: Shield,         emoji: "🚦", color: "bg-orange-500 hover:bg-orange-600",                                                                       href: "/games/road-safety",     available: true, order: 39 },
  { id: "ocean-life",      title: "משחק חיי הים",                   description: "גלה את עולם הים הקסום וחיותיו המרהיבות!",               icon: Waves,          emoji: "🐠", color: "bg-blue-600 hover:bg-blue-700",                                                                           href: "/games/ocean-life",      available: true, order: 40 },
  { id: "garden-plants",   title: "משחק הגינה והצמחים",             description: "למד על צמחים, פרחים וגידול בגינה!",                     icon: Flower,         emoji: "🌸", color: "bg-green-500 hover:bg-green-600",                                                                         href: "/games/garden-plants",   available: true, order: 41 },
  { id: "magic-fairy-tales",title: "משחק אגדות וקסמים",             description: "היכנס לעולם הקסמים והאגדות הקלאסיות!",                  icon: Sparkles,       emoji: "🧚", color: "bg-purple-500 hover:bg-purple-600",                                                                       href: "/games/magic-fairy-tales",available: true, order: 42 },
  { id: "space-adventure",  title: "משחק הרפתקת החלל",              description: "טוס לחלל וגלה כוכבי לכת וחללים רחוקים!",               icon: Rocket,         emoji: "🚀", color: "bg-indigo-600 hover:bg-indigo-700",                                                                       href: "/games/space-adventure", available: true, order: 43 },
  { id: "cooking-kitchen",  title: "משחק בישול ומטבח",              description: "למד לבשל ולהכין מאכלים טעימים!",                        icon: ChefHat,        emoji: "👨‍🍳", color: "bg-red-500 hover:bg-red-600",                                                                           href: "/games/cooking-kitchen", available: true, order: 44 },
  { id: "circus-show",      title: "משחק הקרקס והמופע",             description: "הצטרף למופע הקרקס המרהיב ולמשחקי כושר!",               icon: PartyPopper,    emoji: "🎪", color: "bg-pink-500 hover:bg-pink-600",                                                                          href: "/games/circus-show",     available: true, order: 45 },
  { id: "virtual-reality",  title: "משחק מציאות מדומה",             description: "גלה עולמות חדשים במציאות מדומה!",                       icon: Cpu,            emoji: "🥽", color: "bg-purple-600 hover:bg-purple-700",                                                                      href: "/games/virtual-reality", available: true, order: 46 },
  { id: "new-professions",  title: "מקצועות מודרניים",              description: "למד על מקצועות חדשים וטכנולוגיים!",                     icon: Briefcase,      emoji: "💼", color: "bg-gray-600 hover:bg-gray-700",                                                                          href: "/games/new-professions", available: true, order: 47 },
  { id: "advanced-weather", title: "מזג אוויר מתקדם",               description: "למד על תופעות מזג אוויר מיוחדות!",                      icon: CloudRain,      emoji: "⛈️", color: "bg-blue-700 hover:bg-blue-800",                                                                          href: "/games/advanced-weather",available: true, order: 48 },
  { id: "advanced-colors",  title: "צבעים מתקדמים",                 description: "גלה צבעים מיוחדים וערבובי צבעים!",                     icon: Rainbow,        emoji: "🌈", color: "bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400",                                          href: "/games/advanced-colors", available: true, order: 49 },
  { id: "jewish-holidays",  title: "חגים יהודיים",                  description: "למד על חגי ישראל ומסורותיהם!",                          icon: Star,           emoji: "🕎", color: "bg-yellow-600 hover:bg-yellow-700",                                                                      href: "/games/jewish-holidays", available: true, order: 50 },
  { id: "logic-games",      title: "משחקי חשיבה ולוגיקה",           description: "פתח את יכולות החשיבה והלוגיקה!",                        icon: Brain,          emoji: "🧩", color: "bg-indigo-700 hover:bg-indigo-800",                                                                      href: "/games/logic-games",     available: true, order: 51 },
  { id: "sound-imitation",  title: "חיקוי קולות ורעשים",            description: "חקה קולות של חיות, מכונות וטבע!",                      icon: Mic,            emoji: "🎤", color: "bg-green-600 hover:bg-green-700",                                                                        href: "/games/sound-imitation", available: true, order: 52 },
  { id: "body-movements",   title: "תנועות גוף וריקוד",             description: "תרגל תנועות, יוגה וריקוד אינטראקטיבי!",                icon: Activity,       emoji: "🤸", color: "bg-pink-600 hover:bg-pink-700",                                                                         href: "/games/body-movements",  available: true, order: 53 },
  { id: "touch-senses",     title: "מגע וחושים",                    description: "חקור מרקמים, טמפרטורות וחושי גוף!",                    icon: Touch,          emoji: "🤚", color: "bg-orange-600 hover:bg-orange-700",                                                                      href: "/games/touch-senses",    available: true, order: 54 },
  { id: "emotional-social", title: "מציאות רגשית וחברתית",          description: "פתח אינטליגנציה רגשית וחברתית!",                        icon: Brain,          emoji: "💖", color: "bg-purple-700 hover:bg-purple-800",                                                                     href: "/games/emotional-social",available: true, order: 55 },
  { id: "time-clock",       title: "זמן ושעות היום",                 description: "למד על זמן, שעות, ימים ועונות!",                       icon: Clock,          emoji: "⏰", color: "bg-blue-800 hover:bg-blue-900",                                                                         href: "/games/time-clock",      available: true, order: 56 },
  { id: "climate-planet",   title: "אקלים וכדור הארץ",              description: "גלה יבשות, אוקיינוסים ואזורי אקלים!",                  icon: Earth,          emoji: "🌍", color: "bg-teal-700 hover:bg-teal-800",                                                                         href: "/games/climate-planet",  available: true, order: 57 },
  { id: "birds",            title: "משחק ציפורים",                   description: "הכר ציפורים מדהימות מרחבי העולם!",                     icon: Bird,           emoji: "🦅", color: "bg-sky-500 hover:bg-sky-600",                                                                           href: "/games/birds",           available: true, order: 58 },
  { id: "bugs-insects",     title: "חרקים ופרפרים",                  description: "עולם זעיר ומרתק של חרקים!",                             icon: Bug,            emoji: "🦋", color: "bg-lime-600 hover:bg-lime-700",                                                                         href: "/games/bugs-insects",    available: true, order: 59 },
  { id: "superheroes",      title: "גיבורי על",                     description: "למד על כוחות סופר וגיבורים מדהימים!",                  icon: Zap,            emoji: "🦸", color: "bg-yellow-500 hover:bg-yellow-600",                                                                     href: "/games/superheroes",     available: true, order: 60 },
  { id: "art-craft",        title: "אמנות ויצירה",                   description: "הכר כלי אמנות וצור יצירות מדהימות!",                   icon: Paintbrush,     emoji: "🖌️", color: "bg-rose-500 hover:bg-rose-600",                                                                         href: "/games/art-craft",       available: true, order: 61 },
  { id: "camping",          title: "טיול ושטח",                     description: "הכן את הציוד להרפתקאה בטבע!",                          icon: Mountain,       emoji: "⛺", color: "bg-green-700 hover:bg-green-800",                                                                       href: "/games/camping",         available: true, order: 62 },
  { id: "fairy-tale-chars", title: "דמויות מאגדות",                  description: "גלה דמויות קסומות מאגדות מרתקות!",                    icon: Crown,          emoji: "🧚", color: "bg-violet-600 hover:bg-violet-700",                                                                     href: "/games/fairy-tale-chars",available: true, order: 63 },
  { id: "tzadikim",         title: "סיפורי צדיקים",                  description: "למד על גדולי ישראל ומה שלמדנו מהם!",                   icon: BookOpen,       emoji: "📜", color: "bg-amber-600 hover:bg-amber-700",                                                                       href: "/games/tzadikim",        available: true, order: 64 },
  { id: "holidays",         title: "חגי ישראל",                     description: "למד על חגי ישראל ומשמעותם!",                           icon: Calendar,       emoji: "🕍", color: "bg-yellow-500 hover:bg-yellow-600",                                                                     href: "/games/holidays",        available: true, order: 65 },
  { id: "multiplication",   title: "לוח הכפל",                      description: "תרגל כפל במהירות עם טיימר!",                           icon: Calculator,     emoji: "✖️", color: "bg-blue-600 hover:bg-blue-700",                                                                         href: "/games/multiplication",  available: true, order: 66 },
  { id: "animals",          title: "בעלי חיים",                     description: "זהה בעלי חיים ולמד עליהם!",                            icon: Dog,            emoji: "🐘", color: "bg-green-600 hover:bg-green-700",                                                                       href: "/games/animals",         available: true, order: 67 },
  { id: "word-builder",     title: "בניית מילים",                    description: "הרכב מילים בעברית מאותיות מפוזרות!",                   icon: BookOpen,       emoji: "🔤", color: "bg-purple-600 hover:bg-purple-700",                                                                     href: "/games/word-builder",    available: true, order: 68 },
  { id: "reflex",           title: "מהירות תגובה",                   description: "לחץ על הסמלים לפני שהם נעלמים!",                      icon: Zap,            emoji: "⚡", color: "bg-red-500 hover:bg-red-600",                                                                           href: "/games/reflex",          available: true, order: 69 },
  { id: "arithmetic",       title: "חשבון מהיר",                    description: "חבר, חסר וכפל במהירות!",                               icon: Calculator,     emoji: "➕", color: "bg-blue-500 hover:bg-blue-600",                                                                         href: "/games/arithmetic",      available: true, order: 70 },
  { id: "geography",        title: "גאוגרפיה",                      description: "בירות, דגלים ויבשות של העולם!",                        icon: Earth,          emoji: "🗺️", color: "bg-teal-600 hover:bg-teal-700",                                                                         href: "/games/geography",       available: true, order: 71 },
  { id: "trivia",           title: "ידע כללי",                      description: "שאלות על טבע, מדע, חלל ועוד!",                        icon: Brain,          emoji: "🎯", color: "bg-amber-500 hover:bg-amber-600",                                                                       href: "/games/trivia",          available: true, order: 72 },
  { id: "color-mix",        title: "ערבוב צבעים",                   description: "מה מקבלים כשמערבבים צבעים?",                          icon: Paintbrush,     emoji: "🎨", color: "bg-pink-500 hover:bg-pink-600",                                                                         href: "/games/color-mix",       available: true, order: 73 },
  { id: "science",          title: "מדע לילדים",                    description: "גוף, חלל, טבע ופיזיקה לילדים!",                       icon: Brain,          emoji: "🔬", color: "bg-emerald-600 hover:bg-emerald-700",                                                                   href: "/games/science",         available: true, order: 74 },
  { id: "clock",            title: "הכרת השעון",                    description: "למד לקרוא שעון עם שעון אנלוגי!",                      icon: Clock,          emoji: "🕐", color: "bg-violet-600 hover:bg-violet-700",                                                                     href: "/games/clock",           available: true, order: 75 },
  { id: "spelling",         title: "כתיב עברי",                     description: "בחר את האיות הנכון בעברית!",                          icon: PenLine,        emoji: "📝", color: "bg-rose-500 hover:bg-rose-600",                                                                         href: "/games/spelling",        available: true, order: 76 },
  { id: "sequences",        title: "סדרות מספרים",                  description: "מה המספר הבא בסדרה?",                                 icon: Hash,           emoji: "🔢", color: "bg-cyan-600 hover:bg-cyan-700",                                                                         href: "/games/sequences",       available: true, order: 77 },
  { id: "opposites",        title: "ניגודים",                       description: "גדול-קטן, חם-קר ועוד הפכים!",                         icon: ArrowLeftRight, emoji: "↔️", color: "bg-orange-500 hover:bg-orange-600",                                                                     href: "/games/opposites",       available: true, order: 78 },
  { id: "world-languages",  title: "שפות העולם",                    description: "באיזו שפה מדברים בכל מדינה?",                         icon: Earth,          emoji: "🌐", color: "bg-emerald-500 hover:bg-emerald-600",                                                                   href: "/games/world-languages", available: true, order: 79 },
  { id: "riddles",          title: "חידות לילדים",                  description: "פתור חידות מסקרנות ומהנות!",                          icon: Lightbulb,      emoji: "💡", color: "bg-purple-600 hover:bg-purple-700",                                                                     href: "/games/riddles",         available: true, order: 80 },
  { id: "sports-quiz",      title: "חידון ספורט",                   description: "שאלות על עולם הספורט!",                               icon: Trophy,         emoji: "🏆", color: "bg-green-600 hover:bg-green-700",                                                                       href: "/games/sports-quiz",     available: true, order: 81 },
  { id: "instruments",      title: "כלי נגינה",                     description: "זהה כלי נגינה לפי תיאורם!",                          icon: Music,          emoji: "🎸", color: "bg-amber-500 hover:bg-amber-600",                                                                       href: "/games/instruments",     available: true, order: 82 },
  { id: "israel",           title: "ישראל שלי",                     description: "ידע על מדינת ישראל!",                                 icon: Flag,           emoji: "🇮🇱", color: "bg-blue-600 hover:bg-blue-700",                                                                        href: "/games/israel",          available: true, order: 83 },
  { id: "english-words",    title: "אנגלית לילדים",                 description: "למד מילים בסיסיות באנגלית!",                         icon: Languages,      emoji: "🔤", color: "bg-indigo-600 hover:bg-indigo-700",                                                                     href: "/games/english-words",   available: true, order: 84 },
  { id: "fractions",        title: "שברים פשוטים",                  description: "זהה שברים לפי ייצוג ויזואלי!",                       icon: Divide,         emoji: "½", color: "bg-purple-600 hover:bg-purple-700",                                                                      href: "/games/fractions",       available: true, order: 85 },
  { id: "capitals",         title: "בירות העולם",                   description: "מה הבירה של כל מדינה?",                              icon: MapPin,         emoji: "🏛️", color: "bg-red-600 hover:bg-red-700",                                                                           href: "/games/capitals",        available: true, order: 86 },
  { id: "emotions",         title: "עולם הרגשות",                   description: "זהה רגשות לפי תיאור!",                               icon: SmilePlus,      emoji: "😊", color: "bg-orange-500 hover:bg-orange-600",                                                                     href: "/games/emotions",        available: true, order: 87 },
  { id: "nature",           title: "עולם הטבע",                     description: "למד על הטבע סביבנו!",                                 icon: Leaf,           emoji: "🌿", color: "bg-green-600 hover:bg-green-700",                                                                       href: "/games/nature",          available: true, order: 88 },
  { id: "shapes-3d",        title: "גופים גיאומטריים",              description: "למד גופים תלת-ממדיים!",                               icon: Box,            emoji: "📐", color: "bg-indigo-500 hover:bg-indigo-600",                                                                     href: "/games/shapes-3d",       available: true, order: 89 },
  { id: "human-body",       title: "גוף האדם",                      description: "גלה את פלאות גוף האדם!",                             icon: Bone,           emoji: "🫀", color: "bg-red-500 hover:bg-red-600",                                                                           href: "/games/human-body",      available: true, order: 90 },
  { id: "transport",        title: "כלי תחבורה",                    description: "גלה כלי רכב מהיבשה, הים והאוויר!",                  icon: Car,            emoji: "🚗", color: "bg-sky-500 hover:bg-sky-600",                                                                           href: "/games/transport",       available: true, order: 91 },
  { id: "healthy-food",     title: "אוכל בריא",                     description: "למד על תזונה נכונה ומזינה!",                         icon: Utensils,       emoji: "🥗", color: "bg-lime-500 hover:bg-lime-600",                                                                         href: "/games/healthy-food",    available: true, order: 92 },
  { id: "continents",       title: "יבשות העולם",                   description: "גלה את 7 יבשות כדור הארץ!",                          icon: Map,            emoji: "🌍", color: "bg-teal-500 hover:bg-teal-600",                                                                         href: "/games/continents",      available: true, order: 93 },
  { id: "family",           title: "המשפחה",                        description: "למד על קשרים משפחתיים!",                             icon: Baby,           emoji: "👨‍👩‍👧‍👦", color: "bg-rose-500 hover:bg-rose-600",                                                                  href: "/games/family",          available: true, order: 94 },
  { id: "soccer",           title: "כדורגל",                        description: "שאלות על ספורט המלכים!",                             icon: CircleDot,      emoji: "⚽", color: "bg-green-600 hover:bg-green-700",                                                                       href: "/games/soccer",          available: true, order: 95 },
  // משחקי ארקייד
  { id: "flappy-bird",      title: "ציפור מעופפת",                  description: "עזור לציפור לעבור בין הצינורות!",                    icon: Bird,           emoji: "🐦", color: "bg-sky-400 hover:bg-sky-500",                                                                           href: "/games/flappy-bird",     available: true, order: 96 },
  { id: "snake",            title: "נחש",                           description: "אסוף פירות וגדל — אל תפגע בקירות!",                 icon: Waves,          emoji: "🐍", color: "bg-emerald-500 hover:bg-emerald-600",                                                                   href: "/games/snake",           available: true, order: 97 },
  { id: "dino-runner",      title: "דינוזאור קופץ",                 description: "קפוץ מעל המכשולים והגע רחוק!",                      icon: Bone,           emoji: "🦖", color: "bg-amber-500 hover:bg-amber-600",                                                                       href: "/games/dino-runner",     available: true, order: 98 },
  { id: "catch-fruit",      title: "תפוס פירות",                    description: "הזז את הסל ותפוס פירות — הימנע מהפצצות!",           icon: Apple,          emoji: "🧺", color: "bg-purple-500 hover:bg-purple-600",                                                                     href: "/games/catch-fruit",     available: true, order: 99 },
  { id: "space-defender",   title: "מגן החלל",                      description: "ירה באסטרואידים והגן על כדור הארץ!",                icon: Shield,         emoji: "🚀", color: "bg-indigo-600 hover:bg-indigo-700",                                                                     href: "/games/space-defender",  available: true, order: 100 },
  { id: "whack-a-mole",     title: "חבט על החפרפרת",                description: "חבט על החפרפרות לפני שהן נעלמות — אל תחבוט על הפצצות!", icon: Hammer,    emoji: "🔨", color: "bg-amber-500 hover:bg-amber-600",                                                                       href: "/games/whack-a-mole",    available: true, order: 101 },
  { id: "brick-breaker",    title: "שובר לבנים",                    description: "שבר את כל הלבנים עם הכדור לפני שאוזל החיים!",      icon: Box,            emoji: "🧱", color: "bg-purple-600 hover:bg-purple-700",                                                                     href: "/games/brick-breaker",   available: true, order: 102 },
  { id: "balloon-pop",      title: "פוצץ בלונים",                   description: "פוצץ בלונים לפני שהם בורחים — הישמר מהפצצות!",     icon: Sparkles,       emoji: "🎈", color: "bg-pink-500 hover:bg-pink-600",                                                                         href: "/games/balloon-pop",     available: true, order: 103 },
  { id: "pong",             title: "פונג",                          description: "שחק פונג קלאסי מול המחשב — ראשון ל-7 נקודות מנצח!", icon: Gamepad2,      emoji: "🏓", color: "bg-slate-600 hover:bg-slate-700",                                                                       href: "/games/pong",            available: true, order: 104 },
  { id: "meteor-dodge",     title: "התחמק ממטאורים",                description: "הזז את הספינה והתחמק ממטאורים נופלים — אסוף כוכבים!", icon: Flame,       emoji: "☄️", color: "bg-orange-600 hover:bg-orange-700",                                                                     href: "/games/meteor-dodge",    available: true, order: 105 },
  { id: "frogger",          title: "צפרדע חוצה",                    description: "עזור לצפרדע לחצות את הכביש — הימנע מהרכבים!",      icon: Car,            emoji: "🐸", color: "bg-green-600 hover:bg-green-700",                                                                       href: "/games/frogger",         available: true, order: 106 },
  { id: "stack",            title: "ערם לבנים",                     description: "הפל לבנים בזמן הנכון ובנה מגדל גבוה!",             icon: Box,            emoji: "🏗️", color: "bg-blue-600 hover:bg-blue-700",                                                                         href: "/games/stack",           available: true, order: 107 },
  { id: "color-tap",        title: "צבע נכון",                      description: "לחץ על הצבע הנכון לפני שהזמן יגמר!",               icon: Paintbrush,     emoji: "🎨", color: "bg-pink-500 hover:bg-pink-600",                                                                         href: "/games/color-tap",       available: true, order: 108 },
  { id: "jumper",           title: "קפצן",                          description: "קפץ על הפלטפורמות וטפס גבוה ככל האפשר!",           icon: Zap,            emoji: "🦘", color: "bg-indigo-500 hover:bg-indigo-600",                                                                     href: "/games/jumper",          available: true, order: 109 },
  { id: "simon",            title: "שיימון אומר",                   description: "זכור את סדר הצבעים וחזור עליהם!",                  icon: Music,          emoji: "🔴", color: "bg-gray-700 hover:bg-gray-800",                                                                         href: "/games/simon",           available: true, order: 110 },
  // משחקים חינוכיים חדשים
  { id: "true-false",       title: "נכון או לא נכון",               description: "ענה נכון/לא נכון על עובדות מעניינות!",             icon: Lightbulb,      emoji: "✅", color: "bg-teal-500 hover:bg-teal-600",                                                                         href: "/games/true-false",      available: true, order: 111 },
  { id: "emoji-math",       title: "מתמטיקה עם אמוג׳י",             description: "ספור אמוג׳י ופתור תרגילי חיבור וחיסור!",           icon: Calculator,     emoji: "🧮", color: "bg-yellow-500 hover:bg-yellow-600",                                                                     href: "/games/emoji-math",      available: true, order: 112 },
  { id: "math-race",        title: "מרוץ מתמטיקה",                  description: "פתור כמה שיותר תרגילים ב-30 שניות!",               icon: Zap,            emoji: "🏎️", color: "bg-blue-500 hover:bg-blue-600",                                                                         href: "/games/math-race",       available: true, order: 113 },
  { id: "number-bubbles",   title: "בועות מספרים",                  description: "פוצץ את הבועות לפי הסדר: 1, 2, 3!",               icon: Hash,           emoji: "🫧", color: "bg-purple-500 hover:bg-purple-600",                                                                     href: "/games/number-bubbles",  available: true, order: 114 },
  { id: "word-scramble",    title: "מילים מבולבלות",                 description: "סדר את האותיות ליצירת המילה הנכונה!",              icon: BookOpen,       emoji: "🔡", color: "bg-green-500 hover:bg-green-600",                                                                       href: "/games/word-scramble",   available: true, order: 115 },
  // משחקי גיאוגרפיה
  { id: "flags",            title: "דגלי מדינות",                   description: "זהה דגלים של מדינות מסביב לעולם!",                 icon: Flag,           emoji: "🚩", color: "bg-blue-600 hover:bg-blue-700",                                                                         href: "/games/flags",           available: true, order: 116 },
  // משחקי ספורט
  { id: "soccer-logos",     title: "סמלי כדורגל",                   description: "זהה סמלים של קבוצות כדורגל מסביב לעולם!",         icon: CircleDot,      emoji: "⚽", color: "bg-green-600 hover:bg-green-700",                                                                       href: "/games/soccer-logos",    available: true, order: 117 },
  // משחקי תחבורה וסמלים
  { id: "car-brands",       title: "לוגואים של מכוניות",            description: "זהה לוגואים של מותגי מכוניות מפורסמים!",         icon: Car,            emoji: "🚗", color: "bg-blue-700 hover:bg-blue-800",                                                                         href: "/games/car-brands",      available: true, order: 118 },
  { id: "world-landmarks",  title: "אתרים מפורסמים",                description: "זהה אתרים מפורסמים מסביב לעולם!",                 icon: Landmark,       emoji: "🗼", color: "bg-teal-600 hover:bg-teal-700",                                                                         href: "/games/world-landmarks", available: true, order: 119 },
  { id: "solar-system",     title: "מערכת השמש",                    description: "זהה כוכבי לכת וגרמי שמים!",                       icon: Star,           emoji: "🪐", color: "bg-indigo-900 hover:bg-indigo-950",                                                                     href: "/games/solar-system",    available: true, order: 120 },
  { id: "famous-paintings", title: "ציורים מפורסמים",               description: "זהה ציורים מפורסמים מהיסטוריית האמנות!",          icon: Palette,        emoji: "🖼️", color: "bg-amber-800 hover:bg-amber-900",                                                                       href: "/games/famous-paintings",available: true, order: 121 },
  { id: "tech-logos",       title: "לוגואים טכנולוגיה",             description: "זהה לוגואים של חברות הטכנולוגיה הגדולות!",        icon: Cpu,            emoji: "📱", color: "bg-sky-700 hover:bg-sky-800",                                                                           href: "/games/tech-logos",      available: true, order: 122 },
  { id: "dog-breeds",       title: "גזעי כלבים",                    description: "זהה גזעי כלבים מסביב העולם!",                     icon: Dog,            emoji: "🐕", color: "bg-amber-600 hover:bg-amber-700",                                                                       href: "/games/dog-breeds",      available: true, order: 123 },
  { id: "cat-breeds",       title: "גזעי חתולים",                   description: "זהה גזעי חתולים מסביב העולם!",                    icon: Cat,            emoji: "🐱", color: "bg-purple-600 hover:bg-purple-700",                                                                     href: "/games/cat-breeds",      available: true, order: 124 },
  { id: "nba-teams",        title: "קבוצות NBA",                    description: "זהה לוגואים של קבוצות הבסקטבול הגדולות!",        icon: Trophy,         emoji: "🏀", color: "bg-orange-600 hover:bg-orange-700",                                                                     href: "/games/nba-teams",       available: true, order: 125 },
  { id: "exotic-birds",     title: "ציפורים אקזוטיות",              description: "זהה ציפורים מסביב העולם!",                        icon: Bird,           emoji: "🦩", color: "bg-sky-600 hover:bg-sky-700",                                                                           href: "/games/exotic-birds",    available: true, order: 126 },
  { id: "butterflies",      title: "פרפרים",                        description: "זהה פרפרים ועשים מסביב העולם!",                   icon: Bug,            emoji: "🦋", color: "bg-pink-500 hover:bg-pink-600",                                                                         href: "/games/butterflies",     available: true, order: 127 },
  { id: "taki",             title: "טאקי",                          description: "משחק הקלפים הישראלי הקלאסי — שחק נגד המחשב!",    icon: Gamepad2,       emoji: "🃏", color: "bg-emerald-600 hover:bg-emerald-700",                                                                   href: "/games/taki",            available: true, order: 128 },
  { id: "checkers",         title: "דמקה",                          description: "משחק הדמקה הקלאסי — קפוץ מעל האסימונים ונצח!",   icon: Gamepad2,       emoji: "♟️", color: "bg-amber-700 hover:bg-amber-800",                                                                       href: "/games/checkers",        available: true, order: 129 },
  { id: "chess",            title: "שחמט",                          description: "שחמט קלאסי נגד המחשב — הביס את המלך!",           icon: Crown,          emoji: "♚",  color: "bg-slate-700 hover:bg-slate-800",                                                                       href: "/games/chess",           available: true, order: 130 },
  { id: "shesh-besh",       title: "שש-בש",                         description: "משחק השש-בש הקלאסי — הטל קוביות ורוקן את הלוח!", icon: Gamepad2,       emoji: "🎲", color: "bg-stone-600 hover:bg-stone-700",                                                                       href: "/games/shesh-besh",      available: true, order: 131 },
];

// פונקציות עזר לעבודה עם המשחקים
export class GamesRegistry {
  // קבלת כל הרישומים המקוריים
  static getAllGameRegistrations(): GameRegistration[] {
    return GAMES_REGISTRY.sort((a, b) => a.order - b.order);
  }

  // קבלת כל המשחקים ממוינים לפי סדר
  static getAllGames(): Game[] {
    return GAMES_REGISTRY.sort((a, b) => a.order - b.order).map((game) => ({
      id: game.id,
      title: game.title,
      hebrew: game.title, // Same as title for now
      english: game.id, // Use id as English name
      description: game.description,
      icon: createElement(game.icon, { className: "w-8 h-8" }),
      color: game.color,
      href: game.href,
      available: game.available,
    }));
  }

  // קבלת רק המשחקים הזמינים
  static getAvailableGames(): Game[] {
    return this.getAllGames().filter((game) => game.available);
  }

  // קבלת מספר המשחקים הזמינים
  static getAvailableGamesCount(): number {
    return GAMES_REGISTRY.filter((game) => game.available).length;
  }

  // קבלת מספר כל המשחקים
  static getTotalGamesCount(): number {
    return GAMES_REGISTRY.length;
  }

  // הוספת משחק חדש
  static registerGame(game: GameRegistration): void {
    // בדיקה שהמשחק לא קיים כבר
    const existingGame = GAMES_REGISTRY.find((g) => g.id === game.id);
    if (existingGame) {
      console.warn(`משחק עם ID ${game.id} כבר קיים`);
      return;
    }

    GAMES_REGISTRY.push(game);
  }

  // עדכון סטטוס זמינות משחק
  static updateGameAvailability(gameId: string, available: boolean): void {
    const game = GAMES_REGISTRY.find((g) => g.id === gameId);
    if (game) {
      game.available = available;
    }
  }

  // קבלת משחק לפי ID
  static getGameById(gameId: string): GameRegistration | undefined {
    return GAMES_REGISTRY.find((g) => g.id === gameId);
  }
}
