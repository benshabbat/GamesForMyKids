import { Color } from "@/types/game";

type ChallengeBoxProps = {
  challenge: Color;
  onSpeak: () => void;
};

export default function ChallengeBox({ challenge, onSpeak }: ChallengeBoxProps) {
  return (
    <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        מצא את הצבע:
      </h2>
      <div
        className="text-4xl md:text-6xl font-bold mb-4 text-purple-800 cursor-pointer hover:scale-110 transition-transform"
        onClick={onSpeak}
      >
        {challenge.hebrew}
        <div className="text-2xl mt-2 text-gray-500">
          🔊 (לחץ לשמיעה חוזרת)
        </div>
      </div>
      <p className="text-xl text-gray-600">לחץ על הצבע הנכון!</p>
    </div>
  );
}