/**
 * ===============================================
 * BubbleStartScreen - גרסה חדשה ומשופרת!
 * ===============================================
 * 
 * 🚀 3 שורות במקום 150!
 * משתמש ב-AutoStartScreen החדש
 */

import AutoStartScreen from "@/components/shared/AutoStartScreen";

interface BubbleStartScreenProps {
  onStart: () => void;
}

export default function BubbleStartScreen({ onStart }: BubbleStartScreenProps) {
  return <AutoStartScreen gameType="bubbles" items={[]} onStart={onStart} onSpeak={() => {}} />;
}
