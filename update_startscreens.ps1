# ===============================================
# Script לעדכון כל ה-StartScreen קבצים ל-AutoStartScreen
# ===============================================

$gamesPath = "c:\Users\bensh\OneDrive\שולחן העבודה\GamesForMyKids\gamesformykids\app\games"

# רשימת המשחקים שצריכים עדכון
$gamesToUpdate = @(
    @{name="instruments"; type="instruments"; title="כלי נגינה"},
    @{name="space"; type="space"; title="חלל"},
    @{name="clothing"; type="clothing"; title="בגדים"},
    @{name="house"; type="house"; title="הבית"},
    @{name="tools"; type="tools"; title="כלי עבודה"},
    @{name="counting"; type="counting"; title="ספירה"},
    @{name="math"; type="math"; title="מתמטיקה"},
    @{name="memory"; type="memory"; title="זיכרון"},
    @{name="professions"; type="professions"; title="מקצועות"},
    @{name="vehicles"; type="vehicles"; title="כלי רכב"},
    @{name="smelltaste"; type="smells-tastes"; title="ריחות וטעמים"}
)

foreach ($game in $gamesToUpdate) {
    $gamePath = Join-Path $gamesPath $game.name
    $startScreenPath = Join-Path $gamePath "StartScreen.tsx"
    $backupPath = Join-Path $gamePath "StartScreen_old.tsx"
    
    if (Test-Path $startScreenPath) {
        Write-Host "מעדכן משחק: $($game.title) ($($game.name))" -ForegroundColor Green
        
        # גיבוי הקובץ הישן
        Move-Item $startScreenPath $backupPath -Force
        
        # יצירת הקובץ החדש
        $newContent = @"
/**
 * ===============================================
 * StartScreen ל$($game.title) - גרסה חדשה ומשופרת!
 * ===============================================
 * 
 * 🚀 3 שורות במקום 150!
 * משתמש ב-AutoStartScreen החדש
 */

import AutoStartScreen from "@/components/shared/AutoStartScreen";
import { AutoStartScreenProps } from "@/lib/types/startScreen";

export default function StartScreen(props: Omit<AutoStartScreenProps, 'gameType'>) {
  return <AutoStartScreen gameType="$($game.type)" {...props} />;
}
"@
        
        Set-Content -Path $startScreenPath -Value $newContent -Encoding UTF8
        Write-Host "✅ הושלם: $($game.name)" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️  לא נמצא קובץ: $startScreenPath" -ForegroundColor Yellow
    }
}

Write-Host "`n🎉 סיום! כל המשחקים עודכנו בהצלחה!" -ForegroundColor Magenta
Write-Host "💡 כל הקבצים הישנים נשמרו כ-*_old.tsx" -ForegroundColor Blue
