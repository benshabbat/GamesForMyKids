"use client";

import GenericStartScreen from "@/components/shared/GenericStartScreen";
import { BaseGameItem } from "@/lib/types";

interface StartScreenProps {
  items: BaseGameItem[];
  onStart: () => void;
  onSpeak?: (name: string) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  // דוגמאות בנייה להצגה במסך התחלה
  const buildingExamples = [
    { emoji: "🏠", name: "בית", hebrew: "בנה בית", description: "בנה בית יפה עם קירות וגג" },
    { emoji: "🏰", name: "טירה", hebrew: "בנה טירה", description: "בנה טירה עם מגדלים גבוהים" },
    { emoji: "🌳", name: "עץ", hebrew: "בנה עץ", description: "בנה עץ ירוק עם עלים" },
    { emoji: "🚗", name: "מכונית", hebrew: "בנה מכונית", description: "בנה מכונית מהירה וצבעונית" },
  ];

  const customItemsRenderer = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {buildingExamples.map((example, index) => (
        <div 
          key={index} 
          className="bg-white bg-opacity-90 rounded-xl p-4 border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="text-center">
            <div className="text-6xl mb-3">
              {example.emoji}
            </div>
            <div className="text-gray-800 font-bold text-xl mb-2">
              {example.hebrew}
            </div>
            <div className="text-gray-600 text-sm">
              {example.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <GenericStartScreen
      title="🏗️ משחק הבנייה"
      subTitle="בואו נבנה יצירות מדהימות!"
      textColorHeader="text-purple-800"
      textColorSubHeader="text-purple-600"
      gameSteps={[
        {
          stepNumber: 1,
          stepText: "בחרו צבע ואלמנט לבנייה",
          icon: "🎨"
        },
        {
          stepNumber: 2,
          stepText: "לחצו על המסך כדי להוסיף אלמנט",
          icon: "👆"
        },
        {
          stepNumber: 3,
          stepText: "בנו יצירות מדהימות!",
          icon: "🏗️"
        }
      ]}
      gameStepsBgClass="bg-purple-100/50"
      items={[]}
      onStart={onStart}
      buttonFromColor="from-purple-500"
      buttonToColor="to-pink-500"
      backgroundStyle="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      itemsTitle="דוגמאות בנייה"
      itemsDescription="במשחק תוכלו לבנות כל מה שתרצו עם אלמנטים וצבעים שונים"
      itemsDescriptionColor="text-white"
      itemsGridClass="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
      customItemsRenderer={customItemsRenderer}
      showAudioCheck={true}
    />
  );
}
