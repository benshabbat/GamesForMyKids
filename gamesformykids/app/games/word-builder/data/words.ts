export interface WordPuzzle {
  id: string;
  word: string;       // Hebrew word
  hint: string;       // emoji or description
  emoji: string;
  category: string;
}

export const WORD_PUZZLES: WordPuzzle[] = [
  // פירות
  { id: 'apple',      word: 'תפוח',        hint: 'פרי אדום וטעים',    emoji: '🍎', category: 'פירות' },
  { id: 'banana',     word: 'בננה',        hint: 'פרי צהוב וארוך',   emoji: '🍌', category: 'פירות' },
  { id: 'orange',     word: 'תפוז',        hint: 'פרי כתום ומיצי',   emoji: '🍊', category: 'פירות' },
  { id: 'grape',      word: 'ענבים',       hint: 'אשכול פירות קטנים', emoji: '🍇', category: 'פירות' },
  { id: 'watermelon', word: 'אבטיח',       hint: 'פרי גדול וירוק',   emoji: '🍉', category: 'פירות' },
  { id: 'strawberry', word: 'תות',         hint: 'פרי אדום בגינה',   emoji: '🍓', category: 'פירות' },
  // בעלי חיים
  { id: 'cat',        word: 'חתול',        hint: 'חיית מחמד שמיאו',  emoji: '🐱', category: 'בעלי חיים' },
  { id: 'dog',        word: 'כלב',         hint: 'חיית מחמד שנובח',  emoji: '🐶', category: 'בעלי חיים' },
  { id: 'fish',       word: 'דג',          hint: 'שוחה בים',         emoji: '🐟', category: 'בעלי חיים' },
  { id: 'bird',       word: 'ציפור',       hint: 'עפה בשמיים',       emoji: '🐦', category: 'בעלי חיים' },
  { id: 'rabbit',     word: 'ארנב',        hint: 'קופץ ואוכל גזר',   emoji: '🐰', category: 'בעלי חיים' },
  // אוכל
  { id: 'bread',      word: 'לחם',         hint: 'אופים בתנור',      emoji: '🍞', category: 'אוכל' },
  { id: 'cake',       word: 'עוגה',        hint: 'אוכלים ביום הולדת',emoji: '🎂', category: 'אוכל' },
  { id: 'pizza',      word: 'פיצה',        hint: 'אוכל איטלקי עגול', emoji: '🍕', category: 'אוכל' },
  { id: 'ice-cream',  word: 'גלידה',       hint: 'קרה ומתוקה',       emoji: '🍦', category: 'אוכל' },
  // צבעים
  { id: 'red',        word: 'אדום',        hint: 'צבע גזר',          emoji: '🔴', category: 'צבעים' },
  { id: 'blue',       word: 'כחול',        hint: 'צבע השמיים',       emoji: '🔵', category: 'צבעים' },
  { id: 'green',      word: 'ירוק',        hint: 'צבע עשב',          emoji: '🟢', category: 'צבעים' },
  { id: 'yellow',     word: 'צהוב',        hint: 'צבע בננה',         emoji: '🟡', category: 'צבעים' },
  // ספרות
  { id: 'one',        word: 'אחד',         hint: '1',                emoji: '1️⃣', category: 'מספרים' },
  { id: 'two',        word: 'שניים',       hint: '2',                emoji: '2️⃣', category: 'מספרים' },
  { id: 'three',      word: 'שלושה',       hint: '3',                emoji: '3️⃣', category: 'מספרים' },
];

export function shuffleLetters(word: string): string[] {
  const letters = word.split('');
  // ensure shuffled order differs from original
  let shuffled = [...letters];
  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  } while (shuffled.join('') === word && word.length > 1);
  return shuffled;
}
