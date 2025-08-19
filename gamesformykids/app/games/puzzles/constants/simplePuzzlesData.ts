export interface SimplePuzzle {
  id: number;
  name: string;
  emoji: string;
  color: string;
  imageUrl: string;
  gridSize: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

// פאזלים פשוטים עם תמונות שמחולקות לחלקים
export const SIMPLE_PUZZLES: SimplePuzzle[] = [
  {
    id: 1,
    name: "שועל חמוד עם יו-יו",
    emoji: "🦊",
    color: "#FF8C00",
    imageUrl: "/images/Fox with Yo-Yo.png",
    gridSize: 4, // 2x2
    difficulty: "easy"
  },
  {
    id: 2,
    name: "שועל מגניב",
    emoji: "🦊",
    color: "#FF6347",
    imageUrl: "/images/Cool Fox Character.png",
    gridSize: 4, // 2x2
    difficulty: "easy"
  },
  {
    id: 3,
    name: "חיות חמודות עם קשת בענן",
    emoji: "🌈",
    color: "#FF69B4",
    imageUrl: "/images/Cute Animals with Rainbow.png",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 4,
    name: "חברים יפים ביער",
    emoji: "🌲",
    color: "#32CD32",
    imageUrl: "/images/Happy Forest Friends.png",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 5,
    name: "משחקים בחוץ",
    emoji: "🎈",
    color: "#87CEEB",
    imageUrl: "/images/Playing Outdoors.png",
    gridSize: 16, // 4x4
    difficulty: "hard"
  },
  {
    id: 6,
    name: "נסיכה עם צבי ביער",
    emoji: "👸",
    color: "#DDA0DD",
    imageUrl: "/images/Princess with Deer.png",
    gridSize: 16, // 4x4
    difficulty: "hard"
  },
  {
    id: 7,
    name: "מסיבה ביער",
    emoji: "🎉",
    color: "#FFD700",
    imageUrl: "/images/Forest Party.png",
    gridSize: 9, // 3x3
    difficulty: "medium"
  },
  {
    id: 8,
    name: "ארץ הפטריות הקסומה",
    emoji: "🍄",
    color: "#FF1493",
    imageUrl: "/images/Magical Mushroom Land.png",
    gridSize: 16, // 4x4
    difficulty: "hard"
  },
  {
    id: 9,
    name: "נסיכה ביער הקסום",
    emoji: "🏰",
    color: "#9370DB",
    imageUrl: "/images/Princess in Magical Forest.png",
    gridSize: 9, // 3x3
    difficulty: "medium"
  }
];
