/**
 * ===============================================
 * Player Profile Hook - Hook לניהול פרופיל שחקן
 * ===============================================
 * 
 * מנהל פרטי שחקן, הישגים וסטטיסטיקות
 */

import { useState, useCallback, useEffect } from 'react';

export interface PlayerProfile {
  id: string;
  name: string;
  avatar: string;
  age?: number;
  preferredLanguage: 'he' | 'en' | 'ar';
  createdAt: Date;
  lastActiveAt: Date;
}

export interface PlayerStats {
  totalGamesPlayed: number;
  totalTimePlayed: number; // במילישניות
  gamesCompleted: number;
  highestScore: number;
  longestStreak: number;
  currentStreak: number;
  favoriteGame: string;
  averageSessionTime: number;
  lastWeekActivity: number[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface PlayerProfileData {
  profile: PlayerProfile;
  stats: PlayerStats;
  achievements: Achievement[];
  preferences: {
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
    soundEnabled: boolean;
    parentalControls: boolean;
  };
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_game',
    name: 'התחלה טובה!',
    description: 'שיחקת במשחק הראשון שלך',
    icon: '🎮'
  },
  {
    id: 'five_games',
    name: 'שחקן נלהב',
    description: 'השלמת 5 משחקים',
    icon: '🏆',
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'daily_player',
    name: 'שחקן יומי',
    description: 'שיחקת 7 ימים ברצף',
    icon: '📅',
    progress: 0,
    maxProgress: 7
  },
  {
    id: 'math_wizard',
    name: 'קוסם המתמטיקה',
    description: 'פתרת 50 תרגילי מתמטיקה',
    icon: '🔢',
    progress: 0,
    maxProgress: 50
  },
  {
    id: 'hebrew_master',
    name: 'מאסטר עברית',
    description: 'למדת 100 אותיות עבריות',
    icon: '🔤',
    progress: 0,
    maxProgress: 100
  },
  {
    id: 'puzzle_expert',
    name: 'מומחה פאזלים',
    description: 'השלמת 25 פאזלים',
    icon: '🧩',
    progress: 0,
    maxProgress: 25
  },
  {
    id: 'memory_champion',
    name: 'אלוף הזיכרון',
    description: 'השלמת 20 משחקי זיכרון',
    icon: '🧠',
    progress: 0,
    maxProgress: 20
  },
  {
    id: 'artist',
    name: 'אמן צעיר',
    description: 'יצרת 10 ציורים',
    icon: '🎨',
    progress: 0,
    maxProgress: 10
  }
];

export const usePlayerProfile = (playerId?: string) => {
  const [playerData, setPlayerData] = useState<PlayerProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // טעינת נתוני שחקן
  const createNewPlayer = useCallback((name: string = 'שחקן חדש') => {
    const newPlayerData: PlayerProfileData = {
      profile: {
        id: playerId || `player_${Date.now()}`,
        name,
        avatar: '😊',
        preferredLanguage: 'he',
        createdAt: new Date(),
        lastActiveAt: new Date()
      },
      stats: {
        totalGamesPlayed: 0,
        totalTimePlayed: 0,
        gamesCompleted: 0,
        highestScore: 0,
        longestStreak: 0,
        currentStreak: 0,
        favoriteGame: '',
        averageSessionTime: 0,
        lastWeekActivity: new Array(7).fill(0)
      },
      achievements: DEFAULT_ACHIEVEMENTS.map(achievement => ({ ...achievement })),
      preferences: {
        difficulty: 'easy',
        soundEnabled: true,
        parentalControls: false
      }
    };

    setPlayerData(newPlayerData);
    return newPlayerData;
  }, [playerId]);

  useEffect(() => {
    const loadPlayerData = () => {
      setIsLoading(true);
      
      if (typeof window !== 'undefined') {
        const savedData = localStorage.getItem(`player_profile_${playerId || 'default'}`);
        
        if (savedData) {
          try {
            const parsed = JSON.parse(savedData);
            // המרת תאריכים מחזרה לאובייקטי Date
            parsed.profile.createdAt = new Date(parsed.profile.createdAt);
            parsed.profile.lastActiveAt = new Date(parsed.profile.lastActiveAt);
            parsed.achievements = parsed.achievements.map((achievement: Achievement & { unlockedAt?: string }) => ({
              ...achievement,
              unlockedAt: achievement.unlockedAt ? new Date(achievement.unlockedAt) : undefined
            }));
            setPlayerData(parsed);
          } catch (error) {
            console.warn('Failed to parse player data:', error);
            createNewPlayer();
          }
        } else {
          createNewPlayer();
        }
      }
      
      setIsLoading(false);
    };

    loadPlayerData();
  }, [playerId, createNewPlayer]);

  // שמירת נתוני שחקן
  const savePlayerData = useCallback((data: PlayerProfileData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`player_profile_${data.profile.id}`, JSON.stringify(data));
    }
    setPlayerData(data);
  }, []);

  // עדכון פרופיל
  const updateProfile = useCallback((updates: Partial<PlayerProfile>) => {
    if (!playerData) return;

    const updatedData = {
      ...playerData,
      profile: {
        ...playerData.profile,
        ...updates,
        lastActiveAt: new Date()
      }
    };

    savePlayerData(updatedData);
  }, [playerData, savePlayerData]);

  // בדיקת הישגים
  const checkAndUnlockAchievements = useCallback((data: PlayerProfileData, gameData: {
    gameType: string;
    score: number;
    timePlayed: number;
    completed: boolean;
  }) => {
    const updatedAchievements = data.achievements.map(achievement => {
      if (achievement.unlockedAt) return achievement; // כבר נפתח

      switch (achievement.id) {
        case 'first_game':
          if (data.stats.totalGamesPlayed >= 1) {
            return { ...achievement, unlockedAt: new Date() };
          }
          break;
        
        case 'five_games':
          const fiveGamesProgress = Math.min(data.stats.gamesCompleted, 5);
          if (fiveGamesProgress >= 5) {
            return { ...achievement, unlockedAt: new Date(), progress: 5 };
          }
          return { ...achievement, progress: fiveGamesProgress };
        
        case 'daily_player':
          const consecutiveDays = data.stats.currentStreak;
          if (consecutiveDays >= 7) {
            return { ...achievement, unlockedAt: new Date(), progress: 7 };
          }
          return { ...achievement, progress: consecutiveDays };
        
        case 'math_wizard':
          if (gameData.gameType === 'math' && gameData.completed) {
            const mathProgress = (achievement.progress || 0) + 1;
            if (mathProgress >= 50) {
              return { ...achievement, unlockedAt: new Date(), progress: 50 };
            }
            return { ...achievement, progress: mathProgress };
          }
          break;
        
        case 'hebrew_master':
          if (gameData.gameType === 'hebrew-letters' && gameData.completed) {
            const hebrewProgress = (achievement.progress || 0) + 1;
            if (hebrewProgress >= 100) {
              return { ...achievement, unlockedAt: new Date(), progress: 100 };
            }
            return { ...achievement, progress: hebrewProgress };
          }
          break;
        
        case 'puzzle_expert':
          if (gameData.gameType === 'puzzles' && gameData.completed) {
            const puzzleProgress = (achievement.progress || 0) + 1;
            if (puzzleProgress >= 25) {
              return { ...achievement, unlockedAt: new Date(), progress: 25 };
            }
            return { ...achievement, progress: puzzleProgress };
          }
          break;

        case 'memory_champion':
          if (gameData.gameType === 'memory' && gameData.completed) {
            const memoryProgress = (achievement.progress || 0) + 1;
            if (memoryProgress >= 20) {
              return { ...achievement, unlockedAt: new Date(), progress: 20 };
            }
            return { ...achievement, progress: memoryProgress };
          }
          break;

        case 'artist':
          if (gameData.gameType === 'drawing' && gameData.completed) {
            const artistProgress = (achievement.progress || 0) + 1;
            if (artistProgress >= 10) {
              return { ...achievement, unlockedAt: new Date(), progress: 10 };
            }
            return { ...achievement, progress: artistProgress };
          }
          break;
      }
      
      return achievement;
    });

    const updatedData = { ...data, achievements: updatedAchievements };
    savePlayerData(updatedData);
  }, [savePlayerData]);

  // עדכון סטטיסטיקות לאחר משחק
  const updateStatsAfterGame = useCallback((gameData: {
    gameType: string;
    score: number;
    timePlayed: number;
    completed: boolean;
  }) => {
    if (!playerData) return;

    const today = new Date().getDay();
    const newLastWeekActivity = [...playerData.stats.lastWeekActivity];
    newLastWeekActivity[today] = (newLastWeekActivity[today] || 0) + 1;

    const updatedStats: PlayerStats = {
      ...playerData.stats,
      totalGamesPlayed: playerData.stats.totalGamesPlayed + 1,
      totalTimePlayed: playerData.stats.totalTimePlayed + gameData.timePlayed,
      gamesCompleted: gameData.completed ? playerData.stats.gamesCompleted + 1 : playerData.stats.gamesCompleted,
      highestScore: Math.max(playerData.stats.highestScore, gameData.score),
      currentStreak: gameData.completed ? playerData.stats.currentStreak + 1 : 0,
      longestStreak: gameData.completed ? 
        Math.max(playerData.stats.longestStreak, playerData.stats.currentStreak + 1) : 
        playerData.stats.longestStreak,
      favoriteGame: gameData.gameType, // פשטות - המשחק האחרון
      averageSessionTime: (playerData.stats.totalTimePlayed + gameData.timePlayed) / (playerData.stats.totalGamesPlayed + 1),
      lastWeekActivity: newLastWeekActivity
    };

    const updatedData = {
      ...playerData,
      stats: updatedStats,
      profile: {
        ...playerData.profile,
        lastActiveAt: new Date()
      }
    };

    // בדיקת השגת הישגים
    checkAndUnlockAchievements(updatedData, gameData);
  }, [playerData, checkAndUnlockAchievements]);

  // קבלת הישגים פתוחים
  const getUnlockedAchievements = useCallback(() => {
    if (!playerData) return [];
    return playerData.achievements.filter(achievement => achievement.unlockedAt);
  }, [playerData]);

  // קבלת הישגים בתהליך
  const getProgressAchievements = useCallback(() => {
    if (!playerData) return [];
    return playerData.achievements.filter(achievement => 
      !achievement.unlockedAt && 
      achievement.progress !== undefined && 
      achievement.maxProgress !== undefined
    );
  }, [playerData]);

  // מחיקת נתוני שחקן
  const deletePlayerData = useCallback(() => {
    if (typeof window !== 'undefined' && playerData) {
      localStorage.removeItem(`player_profile_${playerData.profile.id}`);
    }
    setPlayerData(null);
  }, [playerData]);

  return {
    // נתונים
    playerData,
    isLoading,
    
    // פעולות
    createNewPlayer,
    updateProfile,
    updateStatsAfterGame,
    deletePlayerData,
    
    // הישגים
    getUnlockedAchievements,
    getProgressAchievements,
    
    // בוליאנים
    hasPlayer: !!playerData,
    isNewPlayer: playerData?.stats.totalGamesPlayed === 0
  };
};
