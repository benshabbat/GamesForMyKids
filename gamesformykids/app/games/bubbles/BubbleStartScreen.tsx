import AutoStartScreen from "@/components/shared/AutoStartScreen";

interface BubbleStartScreenProps {
  onStart: () => void;
}

export default function BubbleStartScreen({ onStart }: BubbleStartScreenProps) {
  return <AutoStartScreen gameType="bubbles" items={[]} onStart={onStart} onSpeak={() => {}} />;
}
