import { create } from "zustand";
import type { Activity } from "@/types";

interface LearningSessionState {
  activeActivity: Activity | null;
  currentStep: number;
  hintsUsed: number;
  mistakes: number;
  startActivity: (activity: Activity) => void;
  useHint: () => void;
  recordMistake: () => void;
  nextStep: () => void;
  endActivity: () => void;
}

export const useLearningSessionStore = create<LearningSessionState>((set) => ({
  activeActivity: null,
  currentStep: 0,
  hintsUsed: 0,
  mistakes: 0,
  startActivity: (activity) =>
    set({ activeActivity: activity, currentStep: 0, hintsUsed: 0, mistakes: 0 }),
  useHint: () => set((s) => ({ hintsUsed: s.hintsUsed + 1 })),
  recordMistake: () => set((s) => ({ mistakes: s.mistakes + 1 })),
  nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),
  endActivity: () => set({ activeActivity: null, currentStep: 0, hintsUsed: 0, mistakes: 0 }),
}));
