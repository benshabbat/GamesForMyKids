import { Shape } from "@/lib/types/game";
import {
  CircleIcon,
  SquareIcon,
  TriangleIcon,
  RectangleIcon,
  StarIcon,
  HeartIcon,
  DiamondIcon,
  OvalIcon,
} from "./ShapeIcons";
import GameInstructions from "@/components/shared/GameInstructions";
import StartScreenHeader from "@/components/shared/StartScreenHeader";
import GameStartButton from "@/components/shared/GameStartButton";
import ButtonCheckAudio from "@/components/shared/ButtonCheckAudio";
import GameItem from "@/components/shared/GameItem";

type StartScreenProps = {
  shapes: Shape[];
  onStart: () => void;
  onSpeak: (shapeName: string) => void;
};

const ShapeIconMap = {
  circle: CircleIcon,
  square: SquareIcon,
  triangle: TriangleIcon,
  rectangle: RectangleIcon,
  star: StarIcon,
  heart: HeartIcon,
  diamond: DiamondIcon,
  oval: OvalIcon,
};

export default function StartScreen({ shapes, onStart }: StartScreenProps) {
  const shapeSteps = [
    { icon: "👂", title: "1. תשמע", description: "איזו צורה אני אומר" },
    { icon: "🤔", title: "2. תחשוב", description: "איך נראית הצורה" },
    { icon: "👆", title: "3. תלחץ", description: "על הצורה הנכונה" },
  ];

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background:
          "linear-gradient(135deg, #d4f1d4 0%, #a8e6a8 25%, #7dd87d 50%, #52c952 75%, #26b926 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <StartScreenHeader
          title="🔷 משחק צורות 🔷"
          subTitle="למד צורות דרך שמיעה!"
          textColorHeader="text-white"
          textColorSubHeader="text-green-100"
        />
        {/* הסבר המשחק */}
        <GameInstructions steps={shapeSteps} />

        {/* כפתור התחלה */}
        <GameStartButton onStart={onStart} fromColor="blue" toColor="green" />

        {/* כפתור הפעלת שמע פשוט */}
        <ButtonCheckAudio />

        {/* דוגמת צורות */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            כל הצורות שנלמד:
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {shapes.map((shape) => {
              const IconComponent =
                ShapeIconMap[shape.name as keyof typeof ShapeIconMap] ||
                CircleIcon;

              return (
                <GameItem
                  key={shape.name}
                  name={shape.name}
                  hebrewText={shape.hebrew}
                  color={shape.color}
                  icon={<IconComponent size={40} />}
                  shape="rounded"
                  size="large"
                />
              );
            })}
          </div>
          <p className="text-green-100 mt-4">
            לחץ על צורה כדי לשמוע את השם שלה! (8 צורות שונות)
          </p>
        </div>
      </div>
    </div>
  );
}
