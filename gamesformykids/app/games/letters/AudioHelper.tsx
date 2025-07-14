import { useState, useEffect } from "react";

export default function AudioHelper() {
  const [showAudioHelp, setShowAudioHelp] = useState(false);
  const [browserInfo, setBrowserInfo] = useState("");

  useEffect(() => {
    // בדיקה אם אנחנו במחשב
    const isDesktop = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isChrome = /Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !isChrome;
    
    if (isDesktop) {
      setShowAudioHelp(true);
      if (isChrome) setBrowserInfo("Chrome - עובד הכי טוב");
      else if (isFirefox) setBrowserInfo("Firefox - יעבוד אחרי הפעלה");
      else if (isSafari) setBrowserInfo("Safari - יצטרך אישור");
      else setBrowserInfo("דפדפן לא מזוהה");
    }
  }, []);

  if (!showAudioHelp) return null;

  return (
    <div className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300 rounded-xl p-6 mb-6 text-center shadow-lg">
      <h4 className="text-xl font-bold text-red-800 mb-2">
        💻 שמע במחשב - {browserInfo}
      </h4>
      
              <div className="bg-white bg-opacity-70 rounded-lg p-4 mb-4">
        <p className="text-red-700 font-semibold mb-2">
          🚨 דפדפנים חוסמים שמע אוטומטי!
        </p>
        <div className="text-sm text-red-600 space-y-1">
          <p>✅ <strong>שלב 1:</strong> לחץ על הכפתור האדום &quot;הפעל שמע במחשב&quot;</p>
          <p>✅ <strong>שלב 2:</strong> חכה להודעה על קולות זמינים</p>
          <p>✅ <strong>שלב 3:</strong> לחץ על הכפתור הכחול &quot;בדיקת קול&quot;</p>
          <p>✅ <strong>שלב 4:</strong> אם שמעת &quot;Alef&quot; או צליל - תתחיל לשחק!</p>
          <p>🔹 <strong>בונוס:</strong> לחץ &quot;בדוק קולות&quot; לראות מה זמין</p>
        </div>
      </div>
      
      <div className="text-xs text-red-500 mb-3">
        <p>💬 אם שמע עובד - תשמע שמות אותיות!</p>
        <p>📱 בפלאפון הכל עובד אוטומטית!</p>
      </div>
      
      <button 
        onClick={() => setShowAudioHelp(false)}
        className="text-sm bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
      >
        ❌ הבנתי, סגור הודעה
      </button>
    </div>
  );
}