// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// // =========================================================
// // TYPES
// // =========================================================

// export interface GamificationState {
//   // Core stats
//   stars: number;
//   coins: number;
//   streakDays: number;
//   badgesUnlocked: number;
//   challengesCompleted: number;
//   totalChallenges: number;

//   // Phonics specific
//   completedPhonicsLevels: number[];
//   phonicsStarsByLevel: Record<number, number>;

//   // Streak tracking
//   lastActivityDate: string | null; // "YYYY-MM-DD"
//   streakUpdatedAt: number | null;   // timestamp

//   // Actions
//   addStars: (amount: number) => void;
//   addCoins: (amount: number) => void;
//   markPhonicsLevelComplete: (levelId: number, starsEarned: number) => void;
//   recordActivity: () => void;       // 🔥 NEW — call this whenever any activity happens
//   resetStreakIfBroken: () => void;
//   resetProgress: () => void;
// }

// // =========================================================
// // HELPERS
// // =========================================================

// /** Get today's date as "YYYY-MM-DD" (local time, not UTC) */
// function getTodayString(): string {
//   const d = new Date();
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// }

// /** Get yesterday's date as "YYYY-MM-DD" */
// function getYesterdayString(): string {
//   const d = new Date();
//   d.setDate(d.getDate() - 1);
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// }

// /** How many days ago was a "YYYY-MM-DD" string? */
// function daysBetween(dateStr: string): number {
//   const [y, m, d] = dateStr.split("-").map(Number);
//   const past = new Date(y, m - 1, d);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   past.setHours(0, 0, 0, 0);
//   const diffMs = today.getTime() - past.getTime();
//   return Math.round(diffMs / (1000 * 60 * 60 * 24));
// }

// // =========================================================
// // DEFAULTS
// // =========================================================

// const DEFAULT_STATE = {
//   stars: 0,
//   coins: 0,
//   streakDays: 0,
//   badgesUnlocked: 0,
//   challengesCompleted: 0,
//   totalChallenges: 18,
//   completedPhonicsLevels: [] as number[],
//   phonicsStarsByLevel: {} as Record<number, number>,
//   lastActivityDate: null as string | null,
//   streakUpdatedAt: null as number | null,
// };

// // =========================================================
// // STORE
// // =========================================================

// export const useGamificationStore = create<GamificationState>()(
//   persist(
//     (set, get) => ({
//       ...DEFAULT_STATE,

//       // ------------------------------
//       // Simple counters
//       // ------------------------------
//       addStars: (amount) =>
//         set((state) => ({ stars: (state.stars ?? 0) + amount })),

//       addCoins: (amount) =>
//         set((state) => ({ coins: (state.coins ?? 0) + amount })),

//       // ------------------------------
//       // 🎯 Record activity — updates streak
//       // ------------------------------
//       // Call this whenever the child completes a level, quiz,
//       // game, or any learning activity.
//       //
//       // Logic:
//       //   - No previous activity → streak = 1
//       //   - Already played today → no change (avoids double count)
//       //   - Played yesterday   → streak + 1
//       //   - Played 2+ days ago → streak resets to 1
//       // ------------------------------
//       recordActivity: () => {
//         const state = get();
//         const today = getTodayString();
//         const yesterday = getYesterdayString();

//         // Already recorded today → do nothing
//         if (state.lastActivityDate === today) return;

//         let newStreak = 1;

//         if (state.lastActivityDate === yesterday) {
//           // Continued streak
//           newStreak = (state.streakDays ?? 0) + 1;
//         } else {
//           // First time OR streak broken → start fresh at 1
//           newStreak = 1;
//         }

//         set({
//           streakDays: newStreak,
//           lastActivityDate: today,
//           streakUpdatedAt: Date.now(),
//         });
//       },

//       // ------------------------------
//       // Phonics level complete
//       // ------------------------------
//       markPhonicsLevelComplete: (levelId, starsEarned) => {
//         const state = get();
//         const completed = Array.isArray(state.completedPhonicsLevels)
//           ? state.completedPhonicsLevels
//           : [];

//         if (completed.includes(levelId)) return;

//         // Update stars/progress
//         set({
//           completedPhonicsLevels: [...completed, levelId],
//           phonicsStarsByLevel: {
//             ...(state.phonicsStarsByLevel ?? {}),
//             [levelId]: starsEarned,
//           },
//           stars: (state.stars ?? 0) + starsEarned,
//           challengesCompleted: (state.challengesCompleted ?? 0) + 1,
//         });

//         // 🔥 Also record activity → updates streak
//         get().recordActivity();
//       },

//       // ------------------------------
//       // Reset streak if broken
//       // ------------------------------
//       // Called on app mount / dashboard load.
//       // If the last activity was more than 1 day ago,
//       // the streak becomes 0 (broken).
//       // ------------------------------
//       resetStreakIfBroken: () => {
//         const state = get();
//         if (!state.lastActivityDate) return;

//         const daysAgo = daysBetween(state.lastActivityDate);

//         // If played today or yesterday → keep the streak alive
//         if (daysAgo <= 1) return;

//         // Otherwise, streak is broken
//         set({ streakDays: 0 });
//       },

//       // ------------------------------
//       // Reset everything
//       // ------------------------------
//       resetProgress: () => set({ ...DEFAULT_STATE }),
//     }),
//     {
//       name: "gamification-storage",
//       storage: createJSONStorage(() => localStorage),

//       // Merge persisted state with defaults so old data
//       // never causes undefined crashes.
//       merge: (persistedState, currentState) => {
//         const safe = (persistedState ?? {}) as Partial<GamificationState>;

//         return {
//           ...currentState,
//           ...safe,
//           stars: typeof safe.stars === "number" ? safe.stars : 0,
//           coins: typeof safe.coins === "number" ? safe.coins : 0,
//           streakDays:
//             typeof safe.streakDays === "number" ? safe.streakDays : 0,
//           badgesUnlocked:
//             typeof safe.badgesUnlocked === "number"
//               ? safe.badgesUnlocked
//               : 0,
//           challengesCompleted:
//             typeof safe.challengesCompleted === "number"
//               ? safe.challengesCompleted
//               : 0,
//           totalChallenges:
//             typeof safe.totalChallenges === "number"
//               ? safe.totalChallenges
//               : 18,
//           completedPhonicsLevels: Array.isArray(safe.completedPhonicsLevels)
//             ? safe.completedPhonicsLevels
//             : [],
//           phonicsStarsByLevel:
//             safe.phonicsStarsByLevel &&
//             typeof safe.phonicsStarsByLevel === "object"
//               ? safe.phonicsStarsByLevel
//               : {},
//           lastActivityDate:
//             typeof safe.lastActivityDate === "string"
//               ? safe.lastActivityDate
//               : null,
//           streakUpdatedAt:
//             typeof safe.streakUpdatedAt === "number"
//               ? safe.streakUpdatedAt
//               : null,
//         };
//       },
//     }
//   )
// );



// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// // =========================================================
// // TYPES
// // =========================================================

// export interface ActivityHistoryEntry {
//   id: string;
//   activityId?: string;
//   title: string;
//   emoji?: string;
//   type?: string;
//   stars: number;
//   coins?: number;
//   timestamp: number;
// }

// export interface GamificationState {
//   // Core stats
//   stars: number;
//   coins: number;
//   streakDays: number;
//   badgesUnlocked: number;
//   challengesCompleted: number;
//   totalChallenges: number;

//   // Phonics specific
//   completedPhonicsLevels: number[];
//   phonicsStarsByLevel: Record<number, number>;

//   // Streak tracking
//   lastActivityDate: string | null; // "YYYY-MM-DD"
//   streakUpdatedAt: number | null;   // timestamp

//   // 🔥 NEW — full activity history
//   activityHistory: ActivityHistoryEntry[];

//   // Actions
//   addStars: (amount: number) => void;
//   addCoins: (amount: number) => void;
//   markPhonicsLevelComplete: (levelId: number, starsEarned: number) => void;

//   /**
//    * 🔥 Record an activity — this is the ONE you call whenever
//    * a child completes ANY activity (game, quiz, story, etc.).
//    * It:
//    *   1. Adds stars + coins to the totals
//    *   2. Increments challengesCompleted
//    *   3. Updates the daily streak
//    *   4. Pushes an entry into activityHistory (so the dashboard can show it)
//    */
//   recordActivity: (entry: {
//     activityId?: string;
//     title: string;
//     emoji?: string;
//     type?: string;
//     stars?: number;
//     coins?: number;
//   }) => void;

//   resetStreakIfBroken: () => void;
//   resetProgress: () => void;
// }

// // =========================================================
// // HELPERS
// // =========================================================

// /** Get today's date as "YYYY-MM-DD" (local time, not UTC) */
// function getTodayString(): string {
//   const d = new Date();
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// }

// /** Get yesterday's date as "YYYY-MM-DD" */
// function getYesterdayString(): string {
//   const d = new Date();
//   d.setDate(d.getDate() - 1);
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// }

// /** How many days ago was a "YYYY-MM-DD" string? */
// function daysBetween(dateStr: string): number {
//   const [y, m, d] = dateStr.split("-").map(Number);
//   const past = new Date(y, m - 1, d);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   past.setHours(0, 0, 0, 0);
//   const diffMs = today.getTime() - past.getTime();
//   return Math.round(diffMs / (1000 * 60 * 60 * 24));
// }

// /** Unique id generator for history entries */
// function makeHistoryId(): string {
//   return `hist_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
// }

// // =========================================================
// // DEFAULTS
// // =========================================================

// const DEFAULT_STATE = {
//   stars: 0,
//   coins: 0,
//   streakDays: 0,
//   badgesUnlocked: 0,
//   challengesCompleted: 0,
//   totalChallenges: 18,
//   completedPhonicsLevels: [] as number[],
//   phonicsStarsByLevel: {} as Record<number, number>,
//   lastActivityDate: null as string | null,
//   streakUpdatedAt: null as number | null,
//   activityHistory: [] as ActivityHistoryEntry[],
// };

// // =========================================================
// // STORE
// // =========================================================

// export const useGamificationStore = create<GamificationState>()(
//   persist(
//     (set, get) => ({
//       ...DEFAULT_STATE,

//       // ------------------------------
//       // Simple counters
//       // ------------------------------
//       addStars: (amount) =>
//         set((state) => ({ stars: (state.stars ?? 0) + amount })),

//       addCoins: (amount) =>
//         set((state) => ({ coins: (state.coins ?? 0) + amount })),

//       // ------------------------------
//       // 🔥 Record activity
//       // ------------------------------
//       // This is the ONE function to call whenever a child
//       // completes any activity. It updates:
//       //   - totals (stars, coins, challengesCompleted)
//       //   - daily streak
//       //   - activityHistory (used by the dashboard)
//       // ------------------------------
//       recordActivity: (entry) => {
//         const state = get();
//         const today = getTodayString();
//         const yesterday = getYesterdayString();

//         // --- 1. Streak logic ---
//         let newStreak = state.streakDays ?? 0;
//         if (state.lastActivityDate !== today) {
//           if (state.lastActivityDate === yesterday) {
//             newStreak = (state.streakDays ?? 0) + 1;
//           } else {
//             newStreak = 1;
//           }
//         }

//         // --- 2. Stars / coins / challenges ---
//         const earnedStars =
//           typeof entry.stars === "number" ? entry.stars : 0;
//         const earnedCoins =
//           typeof entry.coins === "number" ? entry.coins : 0;

//         // --- 3. Build history entry ---
//         const historyEntry: ActivityHistoryEntry = {
//           id: makeHistoryId(),
//           activityId: entry.activityId,
//           title: entry.title,
//           emoji: entry.emoji,
//           type: entry.type,
//           stars: earnedStars,
//           coins: earnedCoins,
//           timestamp: Date.now(),
//         };

//         const history = Array.isArray(state.activityHistory)
//           ? state.activityHistory
//           : [];

//         // Keep most recent first, cap at 50 to avoid bloat
//         const newHistory = [historyEntry, ...history].slice(0, 50);

//         set({
//           stars: (state.stars ?? 0) + earnedStars,
//           coins: (state.coins ?? 0) + earnedCoins,
//           challengesCompleted: (state.challengesCompleted ?? 0) + 1,
//           streakDays: newStreak,
//           lastActivityDate: today,
//           streakUpdatedAt: Date.now(),
//           activityHistory: newHistory,
//         });
//       },

//       // ------------------------------
//       // Phonics level complete
//       // ------------------------------
//       markPhonicsLevelComplete: (levelId, starsEarned) => {
//         const state = get();
//         const completed = Array.isArray(state.completedPhonicsLevels)
//           ? state.completedPhonicsLevels
//           : [];

//         if (completed.includes(levelId)) return;

//         set({
//           completedPhonicsLevels: [...completed, levelId],
//           phonicsStarsByLevel: {
//             ...(state.phonicsStarsByLevel ?? {}),
//             [levelId]: starsEarned,
//           },
//         });

//         // 🔥 Route through recordActivity so it shows in history
//         get().recordActivity({
//           activityId: `phonics-level-${levelId}`,
//           title: `Phonics Level ${levelId}`,
//           emoji: "🔤",
//           type: "phonics",
//           stars: starsEarned,
//         });
//       },

//       // ------------------------------
//       // Reset streak if broken
//       // ------------------------------
//       resetStreakIfBroken: () => {
//         const state = get();
//         if (!state.lastActivityDate) return;

//         const daysAgo = daysBetween(state.lastActivityDate);
//         if (daysAgo <= 1) return;

//         set({ streakDays: 0 });
//       },

//       // ------------------------------
//       // Reset everything
//       // ------------------------------
//       resetProgress: () => set({ ...DEFAULT_STATE }),
//     }),
//     {
//       name: "gamification-storage",
//       storage: createJSONStorage(() => localStorage),

//       merge: (persistedState, currentState) => {
//         const safe = (persistedState ?? {}) as Partial<GamificationState>;

//         return {
//           ...currentState,
//           ...safe,
//           stars: typeof safe.stars === "number" ? safe.stars : 0,
//           coins: typeof safe.coins === "number" ? safe.coins : 0,
//           streakDays:
//             typeof safe.streakDays === "number" ? safe.streakDays : 0,
//           badgesUnlocked:
//             typeof safe.badgesUnlocked === "number"
//               ? safe.badgesUnlocked
//               : 0,
//           challengesCompleted:
//             typeof safe.challengesCompleted === "number"
//               ? safe.challengesCompleted
//               : 0,
//           totalChallenges:
//             typeof safe.totalChallenges === "number"
//               ? safe.totalChallenges
//               : 18,
//           completedPhonicsLevels: Array.isArray(safe.completedPhonicsLevels)
//             ? safe.completedPhonicsLevels
//             : [],
//           phonicsStarsByLevel:
//             safe.phonicsStarsByLevel &&
//             typeof safe.phonicsStarsByLevel === "object"
//               ? safe.phonicsStarsByLevel
//               : {},
//           lastActivityDate:
//             typeof safe.lastActivityDate === "string"
//               ? safe.lastActivityDate
//               : null,
//           streakUpdatedAt:
//             typeof safe.streakUpdatedAt === "number"
//               ? safe.streakUpdatedAt
//               : null,
//           activityHistory: Array.isArray(safe.activityHistory)
//             ? safe.activityHistory
//             : [],
//         };
//       },
//     }
//   )
// );



// src/stores/gamificationStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

// =========================================================
// HELPERS
// =========================================================

function dayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function dayDiff(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = new Date(ay, am - 1, ad).getTime();
  const db = new Date(by, bm - 1, bd).getTime();
  return Math.round((db - da) / (24 * 60 * 60 * 1000));
}

// =========================================================
// TYPES
// =========================================================

export interface ActivityHistoryEntry {
  id: string;
  activityId?: string;
  title?: string;
  emoji?: string;
  stars?: number;
  timestamp?: number;
}

interface GamificationState {
  stars: number;
  coins: number;
  streakDays: number;
  lastActivityDate: string | null;
  badgesUnlocked: number;
  challengesCompleted: number;
  totalChallenges: number;
  completedPhonicsLevels: number[];
  activityHistory: ActivityHistoryEntry[];

  addStars: (amount: number) => void;
  addCoins: (amount: number) => void;
  markPhonicsLevelComplete: (levelId: number, starsEarned?: number) => void;
  recordActivity: (entry?: Partial<ActivityHistoryEntry>) => void;
  bumpStreakIfNewDay: () => void;
  resetStreakIfBroken: () => void;
}

// =========================================================
// STORE
// =========================================================

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      stars: 0,
      coins: 0,
      streakDays: 0,
      lastActivityDate: null,
      badgesUnlocked: 0,
      challengesCompleted: 0,
      totalChallenges: 18,
      completedPhonicsLevels: [],
      activityHistory: [],

      addStars: (amount) => {
        const prev = typeof get().stars === "number" ? get().stars : 0;
        set({ stars: prev + amount });
      },

      addCoins: (amount) => {
        const prev = typeof get().coins === "number" ? get().coins : 0;
        set({ coins: prev + amount });
      },

      bumpStreakIfNewDay: () => {
        const today = dayKey();
        const last = get().lastActivityDate;

        if (!last) {
          set({ streakDays: 1, lastActivityDate: today });
          return;
        }

        if (last === today) return;

        const diff = dayDiff(last, today);

        if (diff === 1) {
          set({
            streakDays: (get().streakDays || 0) + 1,
            lastActivityDate: today,
          });
        } else if (diff > 1) {
          set({ streakDays: 1, lastActivityDate: today });
        }
      },

      markPhonicsLevelComplete: (levelId, starsEarned = 0) => {
        const completed = get().completedPhonicsLevels || [];
        const already = completed.includes(levelId);
        const nextCompleted = already ? completed : [...completed, levelId];

        const prevStars = get().stars || 0;

        get().bumpStreakIfNewDay();

        const currentHistory = get().activityHistory || [];
        const newEntry: ActivityHistoryEntry = {
          id: `phonics-${levelId}-${Date.now()}`,
          activityId: `phonics-level-${levelId}`,
          title: `Phonics Level ${levelId}`,
          emoji: "🎯",
          stars: starsEarned,
          timestamp: Date.now(),
        };

        set({
          completedPhonicsLevels: nextCompleted,
          stars: prevStars + (starsEarned || 0),
          challengesCompleted: (get().challengesCompleted || 0) + 1,
          activityHistory: [newEntry, ...currentHistory].slice(0, 50),
        });
      },

      recordActivity: (entry = {}) => {
        get().bumpStreakIfNewDay();

        const currentHistory = get().activityHistory || [];
        const newEntry: ActivityHistoryEntry = {
          id: entry.id ?? `activity-${Date.now()}`,
          activityId: entry.activityId,
          title: entry.title ?? "Activity",
          emoji: entry.emoji ?? "⭐",
          stars: entry.stars ?? 0,
          timestamp: entry.timestamp ?? Date.now(),
        };

        set({
          challengesCompleted: (get().challengesCompleted || 0) + 1,
          activityHistory: [newEntry, ...currentHistory].slice(0, 50),
        });
      },

      resetStreakIfBroken: () => {
        const today = dayKey();
        const last = get().lastActivityDate;
        if (!last) return;

        const diff = dayDiff(last, today);
        if (diff > 1) {
          set({ streakDays: 0 });
        }
      },
    }),
    {
      name: "wonderlearn-gamification",
      version: 1,
    }
  )
);