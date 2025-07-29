import BaseGameCard from "./BaseGameCard";
import { BaseGameItem } from "@/lib/types/base";
import * as ShapeIcons from "../../public/icons/ShapeIcons";

/**
 * ===============================================
 * קארדים מוכנים לכל סוגי המשחקים
 * ===============================================
 */

// קארד חיות
export const AnimalCard = ({ animal, onClick }: { animal: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={animal}
    onClick={onClick}
    gradientFrom="emerald-400"
    gradientTo="green-600"
    hoverFrom="emerald-500"
    hoverTo="green-700"
  />
);

// קארד פירות
export const FruitCard = ({ fruit, onClick }: { fruit: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={fruit}
    onClick={onClick}
    gradientFrom="orange-400"
    gradientTo="red-500"
    hoverFrom="orange-500"
    hoverTo="red-600"
  />
);

// קארד ירקות
export const VegetableCard = ({ vegetable, onClick }: { vegetable: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={vegetable}
    onClick={onClick}
    gradientFrom="green-400"
    gradientTo="emerald-500"
    hoverFrom="green-500"
    hoverTo="emerald-600"
  />
);

// קארד צבעים
export const ColorCard = ({ color, onClick }: { color: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={color}
    onClick={onClick}
    showEmoji={false}
    gradientFrom={color.color}
    gradientTo={color.color}
    hoverFrom={color.color}
    hoverTo={color.color}
    className={`${color.color} hover:opacity-80`} // משתמש בצבע הפריט עצמו עם hover opacity
    customContent={
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="text-2xl font-bold drop-shadow-lg">
          {color.hebrew}
        </div>
      </div>
    }
  />
);

// קארד צורות
export const ShapeCard = ({ shape, onClick }: { shape: BaseGameItem; onClick: (item: BaseGameItem) => void }) => {
  // Helper function to render the appropriate icon based on shape name
  const renderShapeIcon = (shapeName: string, size: number = 80) => {
    switch (shapeName) {
      case "circle":
        return <ShapeIcons.CircleIcon size={size} />;
      case "square":
        return <ShapeIcons.SquareIcon size={size} />;
      case "triangle":
        return <ShapeIcons.TriangleIcon size={size} />;
      case "rectangle":
        return <ShapeIcons.RectangleIcon size={size} />;
      case "star":
        return <ShapeIcons.StarIcon size={size} />;
      case "heart":
        return <ShapeIcons.HeartIcon size={size} />;
      case "diamond":
        return <ShapeIcons.DiamondIcon size={size} />;
      case "oval":
        return <ShapeIcons.OvalIcon size={size} />;
      default:
        return <span className="text-6xl">{shape.emoji}</span>;
    }
  };

  return (
    <BaseGameCard
      item={shape}
      onClick={onClick}
      gradientFrom="green-400"
      gradientTo="teal-500"
      hoverFrom="green-500"
      hoverTo="teal-600"
      showEmoji={false}
      customContent={
        <div className="w-full h-full flex flex-col items-center justify-center text-white">
          <div className="mb-2">
            {renderShapeIcon(shape.name)}
          </div>
          <div className="text-xl md:text-2xl font-bold">
            {shape.hebrew}
          </div>
        </div>
      }
    />
  );
};

// קארד מספרים
export const NumberCard = ({ number, onClick }: { number: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={number}
    onClick={onClick}
    gradientFrom="indigo-400"
    gradientTo="purple-500"
    hoverFrom="indigo-500"
    hoverTo="purple-600"
    showEmoji={true}
    showEnglish={false}
  />
);

// קארד אותיות
export const LetterCard = ({ letter, onClick }: { letter: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={letter}
    onClick={onClick}
    gradientFrom="amber-400"
    gradientTo="orange-500"
    hoverFrom="amber-500"
    hoverTo="orange-600"
    showEmoji={false}
    showEnglish={true}
    customContent={
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-5xl md:text-7xl font-bold mb-2">
          {letter.hebrew}
        </div>
        <div className="text-lg md:text-xl font-semibold">
          {letter.english}
        </div>
      </div>
    }
  />
);

// קארד כלי תחבורה
export const TransportCard = ({ transport, onClick }: { transport: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={transport}
    onClick={onClick}
    gradientFrom="blue-400"
    gradientTo="indigo-500"
    hoverFrom="blue-500"
    hoverTo="indigo-600"
  />
);

// קארד כלי רכב
export const VehicleCard = ({ vehicle, onClick }: { vehicle: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={vehicle}
    onClick={onClick}
    gradientFrom="blue-400"
    gradientTo="cyan-500"
    hoverFrom="blue-500"
    hoverTo="cyan-600"
  />
);

// קארד מזג אוויר
export const WeatherCard = ({ weather, onClick }: { weather: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={weather}
    onClick={onClick}
    gradientFrom="sky-400"
    gradientTo="blue-500"
    hoverFrom="sky-500"
    hoverTo="blue-600"
  />
);

// קארד כלי עבודה
export const ToolCard = ({ tool, onClick }: { tool: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={tool}
    onClick={onClick}
    gradientFrom="yellow-400"
    gradientTo="orange-500"
    hoverFrom="yellow-500"
    hoverTo="orange-600"
  />
);

// קארד חפצי בית
export const HouseCard = ({ houseItem, onClick }: { houseItem: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={houseItem}
    onClick={onClick}
    gradientFrom="blue-400"
    gradientTo="sky-500"
    hoverFrom="blue-500"
    hoverTo="sky-600"
  />
);

// קארד כלי נגינה
export const InstrumentCard = ({ instrument, onClick }: { instrument: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={instrument}
    onClick={onClick}
    gradientFrom="yellow-400"
    gradientTo="amber-500"
    hoverFrom="yellow-500"
    hoverTo="amber-600"
  />
);

// קארד בגדים
export const ClothingCard = ({ clothingItem, onClick }: { clothingItem: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={clothingItem}
    onClick={onClick}
    gradientFrom="pink-400"
    gradientTo="rose-500"
    hoverFrom="pink-500"
    hoverTo="rose-600"
    backgroundPattern="dots"
  />
);

// קארד ריחות וטעמים
export const SmellTasteCard = ({ smellTasteItem, onClick }: { smellTasteItem: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={smellTasteItem}
    onClick={onClick}
    gradientFrom="amber-400"
    gradientTo="orange-600"
    hoverFrom="amber-500"
    hoverTo="orange-700"
  />
);

// קארד חלל
export const SpaceCard = ({ spaceObject, onClick }: { spaceObject: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={spaceObject}
    onClick={onClick}
    gradientFrom="indigo-500"
    gradientTo="purple-600"
    hoverFrom="indigo-600"
    hoverTo="purple-700"
    backgroundPattern="stars"
  />
);

// קארד מקצועות
export const ProfessionCard = ({ profession, onClick }: { profession: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={profession}
    onClick={onClick}
    gradientFrom="purple-400"
    gradientTo="indigo-500"
    hoverFrom="purple-500"
    hoverTo="indigo-600"
  />
);

// קארד רגשות
export const EmotionCard = ({ emotion, onClick }: { emotion: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <BaseGameCard
    item={emotion}
    onClick={onClick}
    animation="pulse"
    className={emotion.color}
  />
);

import { GameType } from "@/lib/types/base";

/**
 * ===============================================
 * Wrapper components לממשק אחיד
 * ===============================================
 * מתאימים את הקארדים הקיימים לממשק הנדרש של AutoGamePage
 */
const AnimalCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <AnimalCard animal={item} onClick={onClick} />
);

const FruitCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <FruitCard fruit={item} onClick={onClick} />
);

const VegetableCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <VegetableCard vegetable={item} onClick={onClick} />
);

const ColorCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <ColorCard color={item} onClick={onClick} />
);

const ShapeCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <ShapeCard shape={item} onClick={onClick} />
);

const NumberCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <NumberCard number={item} onClick={onClick} />
);

const LetterCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <LetterCard letter={item} onClick={onClick} />
);

const TransportCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <TransportCard transport={item} onClick={onClick} />
);

const VehicleCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <VehicleCard vehicle={item} onClick={onClick} />
);

const WeatherCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <WeatherCard weather={item} onClick={onClick} />
);

const ToolCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <ToolCard tool={item} onClick={onClick} />
);

const HouseCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <HouseCard houseItem={item} onClick={onClick} />
);

const InstrumentCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <InstrumentCard instrument={item} onClick={onClick} />
);

const ClothingCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <ClothingCard clothingItem={item} onClick={onClick} />
);

const SmellTasteCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <SmellTasteCard smellTasteItem={item} onClick={onClick} />
);

const SpaceCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <SpaceCard spaceObject={item} onClick={onClick} />
);

const ProfessionCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <ProfessionCard profession={item} onClick={onClick} />
);

const EmotionCardWrapper = ({ item, onClick }: { item: BaseGameItem; onClick: (item: BaseGameItem) => void }) => (
  <EmotionCard emotion={item} onClick={onClick} />
);

/**
 * ===============================================
 * מיפוי מהיר לפי סוג משחק
 * ===============================================
 */
export const GameCardMap: Record<GameType, React.ComponentType<{item: BaseGameItem; onClick: (item: BaseGameItem) => void}>> = {
  animals: AnimalCardWrapper,
  fruits: FruitCardWrapper,
  vegetables: VegetableCardWrapper,
  colors: ColorCardWrapper,
  shapes: ShapeCardWrapper,
  numbers: NumberCardWrapper,
  letters: LetterCardWrapper,
  transport: TransportCardWrapper,
  vehicles: VehicleCardWrapper,
  weather: WeatherCardWrapper,
  tools: ToolCardWrapper,
  house: HouseCardWrapper,
  instruments: InstrumentCardWrapper,
  clothing: ClothingCardWrapper,
  "smells-tastes": SmellTasteCardWrapper,
  space: SpaceCardWrapper,
  professions: ProfessionCardWrapper,
  emotions: EmotionCardWrapper,
  bubbles: ColorCardWrapper, // בועות צבעוניות
  counting: NumberCardWrapper, // ספירה עם מספרים
  math: NumberCardWrapper, // מתמטיקה עם מספרים
  memory: AnimalCardWrapper, // זיכרון עם חיות
} as const;
