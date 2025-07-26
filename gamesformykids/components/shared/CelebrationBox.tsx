type CelebrationBoxProps = {
  label: string; // לדוג' "צבע", "צורה", "אות"
  value: string; // הערך בעברית
};

export default function CelebrationBox({ label, value }: CelebrationBoxProps) {
  return (
    <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-3xl p-8 mb-8 shadow-xl animate-bounce-gentle">
      <h2 className="text-4xl font-bold text-orange-800 mb-2">
        🎉 מעולה! 🎉
      </h2>
      <p className="text-2xl text-orange-700">
        מצאת את ה{label} {value}!
      </p>
      <div className="text-3xl mt-4">+10 נקודות! ⭐</div>
    </div>
  );
}
