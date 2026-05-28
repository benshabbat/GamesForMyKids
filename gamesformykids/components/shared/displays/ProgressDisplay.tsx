"use client";

import type { ComponentTypes } from "@/lib/types";

/**
 * קומפוננט להצגת סטטיסטיקות ביצועים
 */
export default function ProgressDisplay({
  stats,
  variant = 'compact'
}: ComponentTypes.ProgressDisplayProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-blue-800 mb-2">📊 סטטיסטיקות</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-600">הושלמו:</span>
            <span className="font-bold ms-1">{stats.completedItems}/{stats.totalItems}</span>
          </div>
          <div>
            <span className="text-blue-600">דיוק:</span>
            <span className="font-bold ms-1">{stats.accuracy}%</span>
          </div>
          <div>
            <span className="text-blue-600">זמן ממוצע:</span>
            <span className="font-bold ms-1">{stats.averageTime}s</span>
          </div>
          <div>
            <span className="text-blue-600">רצף:</span>
            <span className="font-bold ms-1">{stats.streak}</span>
          </div>
        </div>
      </div>
    );
  }

  // Detailed view
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
      <h3 className="font-bold text-gray-800 mb-4 text-xl">📊 סטטיסטיקות מפורטות</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">{stats.completedItems}</div>
            <div className="text-sm text-blue-500">הושלמו</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded">
            <div className="text-2xl font-bold text-green-600">{stats.accuracy}%</div>
            <div className="text-sm text-green-500">דיוק</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded">
            <div className="text-2xl font-bold text-purple-600">{stats.streak}</div>
            <div className="text-sm text-purple-500">רצף</div>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <div className="text-sm text-gray-600">
            זמן ממוצע: <span className="font-bold">{stats.averageTime} שניות</span>
          </div>
        </div>
      </div>
    </div>
  );
}
