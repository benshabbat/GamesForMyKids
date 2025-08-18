import GenericBox from "./GenericBox";
import { useUniversalGame } from '@/contexts/UniversalGameContext';

/**
 * 🎯 ChallengeBox עם קונטקסט - ללא props!
 */
export default function ChallengeBox() {
  const { 
    config, 
    currentChallenge, 
    speakItemName,
    showCelebration 
  } = useUniversalGame();
  
  // אם אין אתגר נוכחי או שיש חגיגה, לא להציג
  if (!currentChallenge || showCelebration) {
    return null;
  }
  
  const title = config.challengeTitle || "איזה פריט שמעת?";
  const icon = config.challengeIcon || "🎯";
  const iconColor = config.colors?.header || "text-purple-600";
  const description = config.challengeDescription || "בחר את הפריט הנכון!";
  
  const handleSpeak = () => {
    if (currentChallenge) {
      speakItemName(currentChallenge.name);
    }
  };

  return (
    <GenericBox
      title={title}
      variant="challenge"
      size="large"
    >
      <div
        className={`font-bold mb-4 cursor-pointer hover:scale-110 transition-transform ${iconColor}`}
        style={{ fontSize: "4rem" }}
        onClick={handleSpeak}
      >
        {icon}
      </div>
      <p className="text-3xl font-bold text-blue-800 mb-6">
        &ldquo;{currentChallenge.hebrew}&rdquo;
      </p>
      <p className="text-xl text-gray-600">{description}</p>
    </GenericBox>
  );
}
