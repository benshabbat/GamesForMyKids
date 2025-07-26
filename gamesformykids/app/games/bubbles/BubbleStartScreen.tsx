import GenericStartScreen from "@/components/shared/GenericStartScreen";
interface BubbleStartScreenProps {
  onStart: () => void;
}

const BUBBLE_GAME_STEPS = [
  { icon: "👆", title: "1. תלחץ", description: "על הבועות הצבעוניות" },
  { icon: "🎵", title: "2. תשמע", description: "צלילים מוזיקליים יפים" },
  { icon: "⭐", title: "3. תקבל", description: "נקודות על כל בועה!" },
];

// בועות דוגמה לתצוגה
const DEMO_BUBBLES = [
  { id: 1, color: '#FF6B6B', note: 'דו' },
  { id: 2, color: '#4ECDC4', note: 'רה' },
  { id: 3, color: '#45B7D1', note: 'מי' },
  { id: 4, color: '#96CEB4', note: 'פה' },
  { id: 5, color: '#FECA57', note: 'סול' },
  { id: 6, color: '#FF9FF3', note: 'לה' },
  { id: 7, color: '#54A0FF', note: 'סי' },
  { id: 8, color: '#5F27CD', note: 'דו' },
];

export default function BubbleStartScreen({ onStart }: BubbleStartScreenProps) {

  return (
    <GenericStartScreen
      title="🫧 בועות מוזיקליות 🎵"
      subTitle="פוצץ בועות ושמע צלילים!"
      textColorHeader="text-white"
      textColorSubHeader="text-blue-100"
      gameSteps={BUBBLE_GAME_STEPS}
      gameStepsBgClass="bg-blue-100 bg-opacity-90"
      items={DEMO_BUBBLES}
      onStart={onStart}
      buttonFromColor="blue"
      buttonToColor="purple"
      backgroundStyle="linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)"
      itemsTitle="הבועות המוזיקליות:"
      itemsDescription="כל בועה מנגנת צליל שונה! לחץ עליהן כדי לשמוע"
      itemsDescriptionColor="text-blue-100"
      itemsGridClass="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
      renderItem={(bubble) => (
        <div
          key={bubble.id}
          className="relative transform hover:scale-110 transition-transform duration-300 cursor-pointer"
          style={{ width: '80px', height: '80px' }}
        >
          <div
            className="w-full h-full rounded-full shadow-lg animate-pulse flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${bubble.color})`,
              border: `3px solid rgba(255,255,255,0.5)`,
            }}
          >
            {/* אפקט ברק על הבועה */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60" />
            <span className="text-white font-bold text-lg">{bubble.note}</span>
          </div>
        </div>
      )}
    />
  );
}
