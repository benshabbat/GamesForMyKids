"use client";

import GenericStartScreen from "@/components/shared/GenericStartScreen";
import { BaseGameItem } from "@/lib/types";

interface StartScreenProps {
  items: BaseGameItem[];
  customOnStart?: () => void;
  onSpeak?: (name: string) => void;
}

export default function StartScreen({ customOnStart }: StartScreenProps) {
  // דוגמאות מתמטיקה להצגה במסך התחלה
  const mathExamples = [
    { operation: "2 + 3", answer: "5", description: "חיבור פשוט" },
    { operation: "8 - 4", answer: "4", description: "חיסור קל" },
    { operation: "3 × 2", answer: "6", description: "כפל בסיסי" },
    { operation: "10 ÷ 2", answer: "5", description: "חילוק פשוט" },
  ];

  const customItemsRenderer = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {mathExamples.map((example, index) => (
        <div 
          key={index} 
          className="bg-white bg-opacity-90 rounded-xl p-4 border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {example.operation}
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">
              = {example.answer}
            </div>
            <div className="text-sm text-gray-600">
              {example.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <GenericStartScreen
      title="משחק המתמטיקה! 🧮"
      subTitle="פתרו תרגילים והתחרו במהירות!"
      textColorHeader="text-blue-800"
      textColorSubHeader="text-blue-600"
      gameSteps={[
        {
          stepNumber: 1,
          stepText: "קראו את התרגיל על המסך",
          title: "שלב 1",
          description: "קראו את התרגיל על המסך",
          icon: "👀"
        },
        {
          stepNumber: 2,
          stepText: "חשבו מהי התשובה הנכונה",
          title: "שלב 2",
          description: "חשבו מהי התשובה הנכונה",
          icon: "🤔"
        },
        {
          stepNumber: 3,
          stepText: "לחצו על המספר הנכון!",
          title: "שלב 3",
          description: "לחצו על המספר הנכון!",
          icon: "👆"
        }
      ]}
      gameStepsBgClass="bg-blue-100/50"
      items={[]}
      customOnStart={customOnStart}
      buttonFromColor="from-blue-500"
      buttonToColor="to-green-500"
      backgroundStyle="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      itemsTitle="דוגמאות תרגילים"
      itemsDescription="במשחק תפתרו תרגילי חיבור, חיסור, כפל וחילוק"
      itemsDescriptionColor="text-white"
      itemsGridClass="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
      customItemsRenderer={customItemsRenderer}
      showAudioCheck={true}
    />
  );
}
