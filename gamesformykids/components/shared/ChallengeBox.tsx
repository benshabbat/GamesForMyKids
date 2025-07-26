type ChallengeBoxProps = {
  title: string;
  icon: string;
  iconColor: string;
  challengeText?: string;
  onSpeak: () => void;
  description: string;
};

export default function ChallengeBox({
  title,
  icon,
  iconColor,
  challengeText,
  onSpeak,
  description,
}: ChallengeBoxProps) {
  return (
    <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        {title}
      </h2>
      <div
        className={`font-bold mb-4 cursor-pointer hover:scale-110 transition-transform ${iconColor}`}
        style={{ fontSize: "4rem" }}
        onClick={onSpeak}
      >
        {icon}
        {challengeText && (
          <div className="mt-2 text-2xl text-gray-800">{challengeText}</div>
        )}
        <div className="text-2xl mt-2 text-gray-500">
          🔊 (לחץ לשמיעה חוזרת)
        </div>
      </div>
      <p className="text-xl text-gray-600">{description}</p>
    </div>
  );
}
