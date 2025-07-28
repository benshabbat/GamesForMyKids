import { AutoGamePage } from "@/components/shared/AutoGamePage";

export default function VehiclesGamePage() {
  return <AutoGamePage gameType="vehicles" />;
}
import { VehicleCard } from "@/components/shared/CardPresets";
import { ALL_VEHICLES } from "@/lib/constants";

export default function VehicleGame() {
  const vehicles: BaseGameItem[] = ALL_VEHICLES;

  const {
    gameState,
    speakItemName: speakVehicleName, // שינוי שם בלבד
    startGame,
    handleItemClick: handleVehicleClick, // שינוי שם בלבד
    resetGame,
  } = useVehicleGameDry(); // ⭐ לא צריך לשלוח vehicles!

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={vehicles}
        onStart={startGame}
        onSpeak={speakVehicleName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-sky-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-blue-800"
            levelColor="text-blue-600"
          />

          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה כלי רכב שמעת?"
              icon="🚗✈️🚲🚌"
              iconColor="text-blue-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakVehicleName(gameState.currentChallenge!.name)}
              description="בחר את כלי הרכב הנכון!"
            />
          )}

          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="vehicle" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        <GameCardGrid
          items={gameState.options}
          onItemClick={handleVehicleClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(vehicle) => (
            <VehicleCard
              vehicle={vehicle}
              onClick={handleVehicleClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: הקשב לשם כלי הרכב שאני אומר!"
          description="לחץ על האייקון למעלה כדי לשמוע שוב, או לחץ על כלי הרכב למטה כדי לשמוע את השמות שלהם"
        />
      </div>
    </div>
  );
}
