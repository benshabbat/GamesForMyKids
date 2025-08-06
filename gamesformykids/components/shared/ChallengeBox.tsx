import GenericBox from "./GenericBox";

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
    <GenericBox
      title={title}
      variant="challenge"
      size="large"
    >
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
    </GenericBox>
  );
}
