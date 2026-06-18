import {
  Book,
  Palette,
  Calculator,
  Car,
  Home,
  Gamepad2,
  Apple,
  Heart,
  Microscope,
  Calendar,
  Sparkles,
  Joystick,
} from "lucide-react";
import { ComponentType } from "react";

export interface GameCategory {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  gameIds: string[];
}

export const GAME_CATEGORIES: Record<string, GameCategory> = {
  basic: {
    title: "למידה בסיסית",
    description: "אותיות, מספרים, צבעים וצורות",
    icon: Book,
    color: "bg-blue-500",
    gradient: "from-blue-400 to-blue-600",
    gameIds: ["letters","hebrew-letters","numbers","shapes","colored-shapes","colors","advanced-colors","shapes-3d","phonics","rhyming","nikud","gender","final-letters","alphabet-order","letter-race"],
  },
  creative: {
    title: "יצירתיות ואומנות",
    description: "מוזיקה, כלי נגינה, פאזלים וציור",
    icon: Palette,
    color: "bg-purple-500",
    gradient: "from-purple-400 to-purple-600",
    gameIds: ["instruments","puzzles","drawing","building","tetris","magic-fairy-tales","circus-show","logic-games","art-craft","superheroes","fairy-tale-chars","famous-paintings","tech-logos","color-mix","puppet-story","melody-maker","craft-guide","avatar-maker"],
  },
  nature: {
    title: "טבע ואוכל",
    description: "חיות, פירות, ירקות וטבע",
    icon: Apple,
    color: "bg-green-500",
    gradient: "from-green-400 to-green-600",
    gameIds: ["animals","fruits","vegetables","ocean-life","garden-plants","smells-tastes","nature-sounds","dinosaurs","birds","bugs-insects","dog-breeds","cat-breeds","exotic-birds","butterflies","nature","healthy-food"],
  },
  world: {
    title: "עולם ותחבורה",
    description: "כלי תחבורה, מזג אוויר וחלל",
    icon: Car,
    color: "bg-orange-500",
    gradient: "from-orange-400 to-orange-600",
    gameIds: ["transport","vehicles","weather","space","world-food","advanced-weather","road-safety","camping","flags","car-brands","world-landmarks","solar-system","capitals","continents","israel","geography-flags","geography-capitals","geography-continents","israel-map"],
  },
  home: {
    title: "בית וחיים",
    description: "חפצי בית, בגדים, מקצועות ומטבח",
    icon: Home,
    color: "bg-pink-500",
    gradient: "from-pink-400 to-pink-600",
    gameIds: ["house","clothing","professions","tools","tzedakah","kitchen","family","body-parts","new-professions","morning-routine"],
  },
  math: {
    title: "מתמטיקה וחשיבה",
    description: "ספירה וחשבון מתמטי",
    icon: Calculator,
    color: "bg-indigo-500",
    gradient: "from-indigo-400 to-indigo-600",
    gameIds: ["counting","math","shopping-money","coins-match","multiplication","fractions","sequences","arithmetic","ordinals","number-words","spatial-concepts","sorting","patterns","skip-counting","division","visual-addition","gematria","number-slide","math-stories"],
  },
  games: {
    title: "משחקים מיוחדים",
    description: "זיכרון, בועות ורגשות",
    icon: Gamepad2,
    color: "bg-teal-500",
    gradient: "from-teal-400 to-teal-600",
    gameIds: ["memory","bubbles","emotions","sports","circus-show","soccer-logos","nba-teams","sports-quiz","soccer"],
  },
  health: {
    title: "בריאות ובטיחות",
    description: "תרופות, בטיחות בדרכים ובריאות",
    icon: Heart,
    color: "bg-red-500",
    gradient: "from-red-400 to-red-600",
    gameIds: ["medicine","road-safety","body-parts","body-movements","touch-senses","human-body","personal-safety"],
  },
  science: {
    title: "מדע וטכנולוגיה",
    description: "מחזור, דינוזאורים ומדע",
    icon: Microscope,
    color: "bg-cyan-500",
    gradient: "from-cyan-400 to-cyan-600",
    gameIds: ["recycling","dinosaurs","space-adventure","virtual-reality","new-professions","climate-planet","science","life-cycles"],
  },
  holidays: {
    title: "חגים ועונות",
    description: "חגים, עונות השנה ומסורות",
    icon: Calendar,
    color: "bg-yellow-500",
    gradient: "from-yellow-400 to-yellow-600",
    gameIds: ["seasons-holidays","jewish-holidays","time-clock","tzadikim","holidays","days-of-week","months-of-year","blessings"],
  },
  innovative: {
    title: "משחקים חדשניים",
    description: "משחקים אינטראקטיביים ויוצאי דופן",
    icon: Sparkles,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    gradient: "from-purple-400 to-pink-600",
    gameIds: ["sound-imitation","emotional-social","advanced-weather","advanced-colors","logic-games","visual-logic","sound-quiz","spinner","team-picker","dice","timer"],
  },
  arcade: {
    title: "🕹️ ארקייד",
    description: "משחקי פעולה וארקייד כיפיים",
    icon: Joystick,
    color: "bg-rose-500",
    gradient: "from-rose-400 to-red-600",
    gameIds: [
      "flappy-bird","snake","dino-runner","catch-fruit","space-defender",
      "whack-a-mole","brick-breaker","balloon-pop","pong","meteor-dodge",
      "frogger","stack","color-tap","jumper","simon",
      "reflex","taki","checkers","chess","shesh-besh","maze","letter-defender","snakes-ladders","escape-room","find-in-scene",
    ],
  },
  educational: {
    title: "📚 משחקים חינוכיים",
    description: "מתמטיקה, שפה וידע כללי לילדים",
    icon: Book,
    color: "bg-teal-500",
    gradient: "from-teal-400 to-cyan-600",

    gameIds: ["true-false","emoji-math","math-race","number-bubbles","word-scramble","word-builder","word-chain","trivia","trivia-categories","clock","spelling","opposites","world-languages","riddles","riddles-pro","english-words","singular-plural","adjectives","verbs","visual-opposites","english-cards","proverbs","story-builder","robot-coder","hangman","choose-adventure","picture-dictionary","word-search","kids-songs","kids-encyclopedia","age-calculator","jokes-browser","word-maze"],
  },
};
