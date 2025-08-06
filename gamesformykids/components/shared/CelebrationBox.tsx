import GenericBox from "./GenericBox";

type CelebrationBoxProps = {
  label: string; // לדוג' "צבע", "צורה", "אות"
  value: string; // הערך בעברית
  points?: number; // ניקוד (ברירת מחדל: 10)
};

export default function CelebrationBox({ label, value, points = 10 }: CelebrationBoxProps) {
  return (
    <GenericBox
      title="מעולה!"
      icon="🎉"
      variant="celebration"
      animation="bounce"
      size="large"
    >
      <p className="text-2xl text-orange-700">
        מצאת את ה{label} {value}!
      </p>
      <div className="text-3xl mt-4">+{points} נקודות! ⭐</div>
    </GenericBox>
  );
}
