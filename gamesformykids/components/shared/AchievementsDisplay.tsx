/**
 * Achievements Display Component
 * קומפוננט להצגת הישגים במשחק
 */

'use client';

import React, { useState } from 'react';
import { useAchievements } from '@/hooks/shared/useGameEvents';

interface AchievementsDisplayProps {
  showModal?: boolean;
  onClose?: () => void;
}

export function AchievementsDisplay({ showModal = false, onClose }: AchievementsDisplayProps) {
  const { 
    unlockedAchievements, 
    unlockedCount,
    totalAchievements 
  } = useAchievements();

  if (showModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">הישגים 🏆</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <AchievementsList />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold mb-3">הישגים</h3>
      <div className="text-sm text-gray-600 mb-3">
        {unlockedCount} מתוך {totalAchievements} הושגו
      </div>
      
      {/* פס התקדמות */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(unlockedCount / totalAchievements) * 100}%` }}
        />
      </div>

      {/* הישגים אחרונים */}
      <div className="space-y-2">
        {unlockedAchievements.slice(-3).map((achievement) => (
          <div 
            key={achievement.id}
            className="flex items-center gap-3 bg-green-50 p-2 rounded"
          >
            <span className="text-2xl">{achievement.icon}</span>
            <div>
              <div className="font-semibold text-green-800">{achievement.title}</div>
              <div className="text-xs text-green-600">{achievement.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Achievements List Component
 * רשימת כל הההישגים
 */
export function AchievementsList() {
  const { achievements } = useAchievements();

  return (
    <div className="space-y-3">
      {achievements.map((achievement) => (
        <div 
          key={achievement.id}
          className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
            achievement.unlocked
              ? 'border-green-200 bg-green-50'
              : 'border-gray-200 bg-gray-50'
          }`}
        >
          <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
            {achievement.icon}
          </div>
          
          <div className="flex-1">
            <h4 className={`font-bold ${
              achievement.unlocked ? 'text-green-800' : 'text-gray-600'
            }`}>
              {achievement.title}
            </h4>
            <p className={`text-sm ${
              achievement.unlocked ? 'text-green-600' : 'text-gray-500'
            }`}>
              {achievement.description}
            </p>
          </div>
          
          {achievement.unlocked && (
            <div className="text-green-600 font-bold text-sm">
              ✓ הושג
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Achievement Notification Component
 * התראה על הישג חדש
 */
interface AchievementNotificationProps {
  achievement: {
    title: string;
    description: string;
    icon: string;
  };
  onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{achievement.icon}</span>
          <div>
            <div className="font-bold">הישג חדש! 🎉</div>
            <div className="font-semibold">{achievement.title}</div>
            <div className="text-sm opacity-90">{achievement.description}</div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white ml-2"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Quick Achievement Badge
 * תג מהיר להישגים
 */
export function AchievementsBadge() {
  const { unlockedCount, totalAchievements } = useAchievements();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-2 rounded-lg hover:shadow-lg transition-all"
      >
        <span className="text-lg">🏆</span>
        <span className="font-bold text-sm">
          {unlockedCount}/{totalAchievements}
        </span>
      </button>

      {showModal && (
        <AchievementsDisplay 
          showModal={true} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}
