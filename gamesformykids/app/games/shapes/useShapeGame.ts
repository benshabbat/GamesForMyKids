import { useState, useEffect, useRef } from "react";
import { Shape, ShapeGameState } from "@/lib/types/game";
import { initSpeechAndAudio } from "@/lib/utils/enhancedSpeechUtils";
import { 
  delay, 
  playSuccessSound as playSound, 
  generateOptions as generateGameOptions,
  getRandomItem,
  speakItemName,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage
} from "@/lib/utils/gameUtils";
import { GAME_CONSTANTS } from "@/lib/constants/gameConstants";

export function useShapeGame(shapes: Shape[]) {
  const [gameState, setGameState] = useState<ShapeGameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isSpeeching, setIsSpeeching] = useState(false);
  const repeatTimerRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

  // --- Utility Functions ---

  const clearRepeatTimer = () => {
    if (repeatTimerRef.current) {
      clearInterval(repeatTimerRef.current);
      repeatTimerRef.current = null;
    }
  };

  const getAvailableShapes = (): Shape[] => {
    const baseShapes = GAME_CONSTANTS.SHAPE_GAME.BASE_SHAPES_COUNT;
    const additionalShapes = Math.floor((gameState.level - 1) / GAME_CONSTANTS.SHAPE_GAME.LEVEL_THRESHOLD) 
      * GAME_CONSTANTS.SHAPE_GAME.SHAPES_INCREMENT;
    const totalShapes = Math.min(baseShapes + additionalShapes, shapes.length);
    return shapes.slice(0, totalShapes);
  };

  const generateOptions = (correctShape: Shape): Shape[] => {
    const availableShapes = getAvailableShapes();
    
    // משתמש בפונקציה הגנרית מ-gameUtils עם מספר האפשרויות מהקבועים
    return generateGameOptions(correctShape, availableShapes, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---

  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakShapeName = async (shapeName: string): Promise<void> => {
    if (!speechEnabled || isSpeeching) return;
    try {
      setIsSpeeching(true);
      await speakItemName(shapeName, (name) => {
        const shape = shapes.find((s) => s.name === name);
        return shape ? shape.hebrew : name;
      });
      setIsSpeeching(false);
    } catch (error) {
      console.error("שגיאה בהשמעת שם הצורה:", error);
      setIsSpeeching(false);
    }
  };

  const startGame = async () => {
    clearRepeatTimer();
    
    // השתמש במצב התחלתי גנרי עם המאפיינים הדרושים למשחק הצורות
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false,
      options: [],
    });

    // השהייה לפני התחלת המשחק
    await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
    
    // השמעת הודעת התחלה
    await speakStartMessage();
    
    // בחירת צורה אקראית וקביעת האפשרויות
    const availableShapes = getAvailableShapes();
    const randomShape = getRandomItem(availableShapes);
    const options = generateOptions(randomShape);

    // עדכון מצב המשחק עם האתגר והאפשרויות החדשות
    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomShape,
      options,
    }));

    // השמעת שם הצורה הראשונה
    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakShapeName(randomShape.name);
  };

  const handleShapeClick = (selectedShape: Shape) => {
    if (!gameState.currentChallenge) return;
    clearRepeatTimer();

    if (selectedShape.name === gameState.currentChallenge.name) {
      // בחירת צורה חדשה אקראית מהצורות הזמינות
      const availableShapes = getAvailableShapes();
      const randomShape = getRandomItem(availableShapes);
      const options = generateOptions(randomShape);

      // הפעלת הלוגיקה הגנרית לטיפול בתשובה נכונה
      handleCorrectGameAnswer(
        gameState, 
        setGameState, 
        async () => {
          // עדכון האתגר החדש והאפשרויות
          setGameState((prev) => ({
            ...prev,
            currentChallenge: randomShape,
            options,
          }));
          
          // השמעת שם הצורה החדשה
          await speakShapeName(randomShape.name);
        }
      );
      
      // השמעת הצליל
      playSuccessSound();
    } else {
      // טיפול בתשובה שגויה
      handleWrongGameAnswer(async () => {
        await speakShapeName(gameState.currentChallenge!.name);
      });
    }
  };

  const resetGame = () => {
    clearRepeatTimer();
    // אתחול מצב המשחק למצב התחלתי - ניתן להשתמש במצב התחלתי גנרי עם התאמה
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
      options: [],
    });
  };

  useEffect(() => {
    return () => clearRepeatTimer();
  }, []);

  return {
    gameState,
    speakShapeName,
    startGame,
    handleShapeClick,
    resetGame,
    getAvailableShapes,
  };
}
