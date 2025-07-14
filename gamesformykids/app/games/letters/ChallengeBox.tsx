import { Letter } from "@/types/game";

type ChallengeBoxProps = {
  challenge: Letter;
  onSpeak: () => void;
};

export default function ChallengeBox({ onSpeak }: ChallengeBoxProps) {
  return (
    <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        איזו אות שמעת?
      </h2>
      <div
        className="text-6xl md:text-8xl font-bold mb-4 text-orange-800 cursor-pointer hover:scale-110 transition-transform"
        onClick={onSpeak}
      >
        🔤
        <div className="text-2xl mt-2 text-gray-500">
          🔊 (לחץ לשמיעה חוזרת)
        </div>
      </div>
      <p className="text-xl text-gray-600">בחר את האות הנכונה!</p>
    </div>
  );
}