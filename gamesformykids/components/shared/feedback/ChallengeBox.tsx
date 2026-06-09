import { useRef, useState } from 'react';
import GenericBox from "../displays/GenericBox";
import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';
import type { ComponentTypes } from "@/lib/types";

export default function ChallengeBox({
  className = ""
}: ComponentTypes.ContextBasedComponentProps) {
  const {
    config,
    currentChallenge,
    speakItemName,
    showCelebration
  } = useUniversalGame();

  const cooldownRef = useRef(false);
  const [speaking, setSpeaking] = useState(false);

  if (!currentChallenge || showCelebration) {
    return null;
  }

  const title = config.challengeTitle || "איזה פריט שמעת?";
  const icon = config.challengeIcon || "🎯";
  const iconColor = config.colors?.header || "text-purple-600";
  const description = config.challengeDescription || "בחר את הפריט הנכון!";

  const handleSpeak = () => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    setSpeaking(true);
    speakItemName(currentChallenge.name);
    setTimeout(() => {
      cooldownRef.current = false;
      setSpeaking(false);
    }, 300);
  };

  return (
    <GenericBox
      title={title}
      variant="challenge"
      size="large"
      className={className}
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
      <p className="text-xl text-gray-600 mb-4">{description}</p>
      <button
        onClick={handleSpeak}
        aria-label="שמע שוב"
        className={`inline-flex items-center gap-2 px-4 py-3 min-h-11 rounded-xl font-bold text-base transition-[transform,background-color] duration-150 select-none
          bg-blue-100 hover:bg-blue-200 text-blue-700 border-2 border-blue-300
          ${speaking ? 'scale-90 bg-blue-300' : 'active:scale-90'}`}
      >
        🔊 שמע שוב
      </button>
    </GenericBox>
  );
}
