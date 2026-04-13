'use client';

const PIECES = [
  { sym: '♙', name: 'רגלי', rule: 'קדימה, תוקף באלכסון' },
  { sym: '♞', name: 'פרש',  rule: 'קפיצת L' },
  { sym: '♝', name: 'רץ',   rule: 'אלכסונים' },
  { sym: '♜', name: 'צריח', rule: 'קוים ישרים' },
  { sym: '♛', name: 'מלכה', rule: 'כל כיוון' },
  { sym: '♚', name: 'מלך',  rule: 'צעד אחד' },
];

export default function ChessPieceLegend() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full">
      <p className="font-bold text-white mb-2 text-sm text-right">כללי הכלים:</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400 text-right">
        {PIECES.map(({ sym, name, rule }) => (
          <p key={name}>{sym} {name} — {rule}</p>
        ))}
      </div>
      <p className="mt-2 text-slate-500 text-xs text-right">🏰 רוקד: מלך זז 2 שלבים כשניתן</p>
    </div>
  );
}
