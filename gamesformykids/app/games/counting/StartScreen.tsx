"use client";

import GenericStartScreen from "@/components/shared/GenericStartScreen";
import { BaseGameItem } from "@/lib/types";

interface StartScreenProps {
  items: BaseGameItem[];
  customOnStart?: () => void;
  onSpeak?: (name: string) => void;
}

export default function StartScreen({ customOnStart }: StartScreenProps) {
  // דוגמאות ספירה להצגה במסך התחלה
  const countingExamples = [
    { count: 3, emoji: "🍎", name: "תפוחים", hebrew: "3 תפוחים" },
    { count: 5, emoji: "⭐", name: "כוכבים", hebrew: "5 כוכבים" },
    { count: 2, emoji: "🐶", name: "כלבים", hebrew: "2 כלבים" },
    { count: 4, emoji: "🎈", name: "בלונים", hebrew: "4 בלונים" },
  ];

  const customItemsRenderer = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {countingExamples.map((example, index) => (
        <div 
          key={index} 
          className="bg-white bg-opacity-90 rounded-xl p-4 border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="text-center">
            <div className="text-4xl mb-3">
              {example.emoji.repeat(example.count)}
            </div>
            <div className="text-gray-800 font-bold text-xl mb-2">
              {example.hebrew}
            </div>
            <div className="text-gray-600 text-sm">
              ספור {example.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <GenericStartScreen
      title="🔢 משחק הספירה"
      subTitle="בואו נתרגל ספירה מהנה!"
      textColorHeader="text-purple-800"
      textColorSubHeader="text-purple-600"
      gameSteps={[
        {
          stepNumber: 1,
          stepText: "בחרו את המספר הנכון",
          icon: "👆"
        },
        {
          stepNumber: 2,
          stepText: "ספרו את הפריטים במסך",
          icon: "🔢"
        },
        {
          stepNumber: 3,
          stepText: "לחצו על המספר הנכון",
          icon: "✅"
        }
      ]}
      gameStepsBgClass="bg-purple-100/50"
      items={[]}
      customOnStart={customOnStart}
      buttonFromColor="from-purple-500"
      buttonToColor="to-pink-500"
      backgroundStyle="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      itemsTitle="דוגמאות ספירה"
      itemsDescription="במשחק תתרגלו לספור פריטים שונים ולבחור את המספר הנכון"
      itemsDescriptionColor="text-white"
      itemsGridClass="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
      customItemsRenderer={customItemsRenderer}
      showAudioCheck={true}
    />
  );
}
