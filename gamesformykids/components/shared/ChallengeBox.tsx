import GenericBox from "./GenericBox";
import { useGameInfo } from "@/hooks/shared/useGameContext";

type ChallengeBoxProps = {
  title?: string; // אופציונלי - יכול לבוא מהקונטקסט
  icon?: string; // אופציונלי - יכול לבוא מהקונפיגורציה
  iconColor?: string; // אופציונלי - יכול לבוא מהקונפיגורציה
  challengeText?: string;
  onSpeak?: () => void; // אופציונלי
  description?: string; // אופציונלי - יכול לבוא מהקונפיגורציה
  useContext?: boolean; // 🆕 דגל לשימוש בקונטקסט
};

export default function ChallengeBox({
  title: propTitle,
  icon: propIcon,
  iconColor: propIconColor,
  challengeText,
  onSpeak,
  description: propDescription,
  useContext = false,
}: ChallengeBoxProps) {
  
  // 🎮 שימוש בקונטקסט אם מבוקש
  const gameInfo = useGameInfo();
  
  // החלטה על הערכים הסופיים
  const finalTitle = useContext ? 
    (gameInfo?.title ? `${gameInfo.title} - איזה פריט שמעת?` : propTitle) : 
    propTitle;
  const finalIcon = useContext ? (propIcon || "🎯") : propIcon;
  const finalIconColor = useContext ? (propIconColor || "text-purple-600") : propIconColor;
  const finalDescription = useContext ? 
    (propDescription || "בחר את הפריט הנכון!") : 
    propDescription;
  
  // אם אין title ואין קונטקסט, השתמש בברירת מחדל
  const displayTitle = finalTitle || "איזה פריט שמעת?";
  const displayIcon = finalIcon || "🎯";
  const displayIconColor = finalIconColor || "text-purple-600";
  const displayDescription = finalDescription || "בחר את הפריט הנכון!";
  return (
    <GenericBox
      title={displayTitle}
      variant="challenge"
      size="large"
    >
      <div
        className={`font-bold mb-4 cursor-pointer hover:scale-110 transition-transform ${displayIconColor}`}
        style={{ fontSize: "4rem" }}
        onClick={onSpeak}
      >
        {displayIcon}
      </div>
      {challengeText && (
        <p className="text-3xl font-bold text-blue-800 mb-6">
          &ldquo;{challengeText}&rdquo;
        </p>
      )}
      <p className="text-xl text-gray-600">{displayDescription}</p>
    </GenericBox>
  );
}
