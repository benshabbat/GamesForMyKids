import { Color } from "@/types/game";

type CelebrationBoxProps = {
  challenge: Color;
};

export default function CelebrationBox({ challenge }: CelebrationBoxProps) {
  return (
    <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-3xl p-8 mb-8 shadow-xl animate-bounce-gentle">
      <h2 className="text-4xl font-bold text-orange-800 mb-2">
        🎉 מעולה! 🎉
      </h2>
      <p className="text-2xl text-orange-700">
        מצאת את הצבע {challenge.hebrew}!
      </p>
      <div className="text-3xl mt-4">+10 נקודות! ⭐</div>
    </div>
  );
}