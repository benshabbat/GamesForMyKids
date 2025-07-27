# החלפת כל הקבצים _new.tsx ← .tsx
$gamesPath = "c:\Users\bensh\OneDrive\שולחן העבודה\GamesForMyKids\gamesformykids\app\games"

$games = @("counting", "emotions", "house", "math", "memory", "professions", "smelltaste", "tools", "vehicles")

foreach ($game in $games) {
    $oldFile = Join-Path $gamesPath "$game\StartScreen.tsx"
    $newFile = Join-Path $gamesPath "$game\StartScreen_new.tsx"
    $backupFile = Join-Path $gamesPath "$game\StartScreen_old.tsx"
    
    if ((Test-Path $oldFile) -and (Test-Path $newFile)) {
        Write-Host "מעדכן: $game" -ForegroundColor Green
        Move-Item $oldFile $backupFile -Force
        Move-Item $newFile $oldFile -Force
        Write-Host "✅ הושלם: $game" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️  בעיה ב-$game" -ForegroundColor Yellow
    }
}

Write-Host "`n🎉 כל הקבצים הוחלפו!" -ForegroundColor Magenta
