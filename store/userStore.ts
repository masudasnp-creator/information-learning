import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CompletedLesson = {
  topicId: string;
  questionIds: string[];
  completedAt: string;
  score: number;
};

export type UserState = {
  name: string;
  xp: number;
  level: number;
  streak: number;
  lastActive: string | null;
  completedLessons: CompletedLesson[];
  topicProgress: Record<string, number>;
};

export type UserActions = {
  setName: (name: string) => void;
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  completeLesson: (lesson: CompletedLesson) => void;
  updateTopicProgress: (topicId: string, progress: number) => void;
};

const calculateLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      name: '',
      xp: 0,
      level: 1,
      streak: 0,
      lastActive: null,
      completedLessons: [],
      topicProgress: {},

      setName: (name) => set({ name }),

      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        return {
          xp: newXp,
          level: calculateLevel(newXp),
        };
      }),

      incrementStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        
        // If already updated today, don't change anything
        if (state.lastActive === today) {
          return {};
        }
        
        // If last active was yesterday, increment streak
        if (state.lastActive) {
          const lastActive = new Date(state.lastActive);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (lastActive.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
            return { streak: state.streak + 1, lastActive: today };
          }
        }
        
        // Otherwise reset streak to 1 (today)
        return { streak: 1, lastActive: today };
      }),

      resetStreak: () => set({ streak: 0 }),

      completeLesson: (lesson) => set((state) => ({
        completedLessons: [...state.completedLessons, lesson],
      })),

      updateTopicProgress: (topicId, progress) => set((state) => ({
        topicProgress: {
          ...state.topicProgress,
          [topicId]: progress,
        },
      })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;