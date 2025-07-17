import { GamesRegistry } from "@/lib/registry/gamesRegistry";

function Footer() {
  // קבלת מספר המשחקים הזמינים אוטומטית
  const availableGamesCount = GamesRegistry.getAvailableGamesCount();
  const totalGamesCount = GamesRegistry.getTotalGamesCount();
  const gamesInDevelopment = totalGamesCount - availableGamesCount;
  
  return (
    <footer className="text-center py-8 text-purple-600">
      <p className="text-lg">נוצר במיוחד לילדים בגיל 2-5 💜</p>
      <p className="text-sm mt-2">
        {availableGamesCount} משחקים זמינים
        {gamesInDevelopment > 0 && `, עוד ${gamesInDevelopment} בדרך!`}
      </p>
    </footer>
  );
}

export default Footer;