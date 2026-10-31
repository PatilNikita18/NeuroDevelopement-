import { create } from "zustand";
import type {
  AgeRange,
  ChildProfile,
  LearningPreference,
  SessionLength,
  SupportCondition,
} from "@/types";

interface RegistrationDraft {
  name: string;
  nickname: string;
  avatar: string;
  ageRange: AgeRange | null;
  condition: SupportCondition | null;
  preferences: LearningPreference[];
  sessionDuration: SessionLength;
}

interface ChildProfileState {
  profile: ChildProfile | null;
  draft: RegistrationDraft;
  setProfile: (profile: ChildProfile) => void;
  updateDraft: (patch: Partial<RegistrationDraft>) => void;
  togglePreference: (pref: LearningPreference) => void;
  resetDraft: () => void;
  completeRegistration: () => ChildProfile;
}

const emptyDraft: RegistrationDraft = {
  name: "",
  nickname: "",
  avatar: "😊",
  ageRange: null,
  condition: null,
  preferences: [],
  sessionDuration: 10,
};

export const useChildProfileStore = create<ChildProfileState>((set, get) => ({
  profile: null,
  draft: emptyDraft,
  setProfile: (profile) => set({ profile }),
  updateDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
  togglePreference: (pref) =>
    set((s) => {
      const has = s.draft.preferences.includes(pref);
      return {
        draft: {
          ...s.draft,
          preferences: has
            ? s.draft.preferences.filter((p) => p !== pref)
            : [...s.draft.preferences, pref],
        },
      };
    }),
  resetDraft: () => set({ draft: emptyDraft }),
  completeRegistration: () => {
    const d = get().draft;
    const profile: ChildProfile = {
      id: "child_" + Math.random().toString(36).slice(2, 8),
      name: d.name || "Explorer",
      nickname: d.nickname || undefined,
      avatar: d.avatar,
      ageRange: d.ageRange ?? "9-12",
      condition: d.condition ?? "ADHD",
      preferences: d.preferences,
      sessionDuration: d.sessionDuration,
      createdAt: new Date().toISOString(),
    };
    set({ profile });
    return profile;
  },
}));


// import { create } from "zustand";

// export type AgeRange =
//   | "5-8"
//   | "9-12"
//   | "13-18";

// export type Condition =
//   | "adhd"
//   | "intellectual-disability"
//   | "down-syndrome";

// export interface ChildProfile {
//   name: string;
//   nickname: string;
//   avatar: string;

//   ageRange: AgeRange | "";

//   condition: Condition | "";

//   preferences: string[];

//   sessionDuration: number;
// }

// interface ChildProfileStore {
//   draft: ChildProfile;

//   updateDraft: (
//     updates: Partial<ChildProfile>
//   ) => void;

//   togglePreference: (
//     preference: string
//   ) => void;

//   completeRegistration: () => void;

//   resetProfile: () => void;
// }

// const initialProfile: ChildProfile = {
//   name: "",
//   nickname: "",
//   avatar: "😊",

//   ageRange: "",

//   condition: "",

//   preferences: [],

//   sessionDuration: 10,
// };

// export const useChildProfileStore =
//   create<ChildProfileStore>((set) => ({
//     draft: initialProfile,

//     updateDraft: (updates) => {
//       set((state) => ({
//         draft: {
//           ...state.draft,
//           ...updates,
//         },
//       }));
//     },

//     togglePreference: (preference) => {
//       set((state) => {

//         const exists =
//           state.draft.preferences.includes(
//             preference
//           );

//         return {
//           draft: {
//             ...state.draft,

//             preferences: exists
//               ? state.draft.preferences.filter(
//                   (item) =>
//                     item !== preference
//                 )
//               : [
//                   ...state.draft.preferences,
//                   preference,
//                 ],
//           },
//         };
//       });
//     },

//     completeRegistration: () => {
//       // Registration completion is handled
//       // after Clerk authentication.
//       //
//       // Keep this function available so
//       // dashboard/onboarding can use it later.
//     },

//     resetProfile: () => {
//       set({
//         draft: {
//           ...initialProfile,
//           preferences: [],
//         },
//       });
//     },
//   }));