export const GAME_LABELS: Record<string, { name: string; emoji: string }> = {
  arithmetic: { name: 'חשבון', emoji: '➕' },
  multiplication: { name: 'כפל', emoji: '✖️' },
  'math-race': { name: 'מרוץ מתמטיקה', emoji: '🏎️' },
  'true-false': { name: 'נכון / לא נכון', emoji: '✅' },
  simon: { name: 'סיימון', emoji: '🎮' },
  'color-tap': { name: 'הקש צבע', emoji: '🎨' },
  'emoji-math': { name: 'מתמטיקה אימוג׳י', emoji: '😀' },
  'whack-a-mole': { name: 'הכה חפרפרת', emoji: '🦔' },
  'word-scramble': { name: 'מילים מעורבות', emoji: '🔤' },
  'catch-fruit': { name: 'תפוס פירות', emoji: '🍎' },
  'space-defender': { name: 'מגן החלל', emoji: '🚀' },
  frogger: { name: 'צפרדע', emoji: '🐸' },
  building: { name: 'בנייה', emoji: '🏗️' },
  counting: { name: 'ספירה', emoji: '🔢' },
  'hebrew-letters': { name: 'אותיות עברית', emoji: 'א' },
  bubbles: { name: 'בועות', emoji: '🫧' },
  memory: { name: 'זיכרון', emoji: '🧠' },
  tetris: { name: 'טטריס', emoji: '🟦' },
};

export function getGameLabel(gameType: string) {
  return GAME_LABELS[gameType] ?? { name: gameType, emoji: '🎮' };
}
