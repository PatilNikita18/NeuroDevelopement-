import { create } from "zustand";
import type { AccessibilitySettings } from "@/types";

interface AccessibilityState extends AccessibilitySettings {
  setTextSize: (size: AccessibilitySettings["textSize"]) => void;
  toggle: (key: keyof Omit<AccessibilitySettings, "textSize">) => void;
}

export const useAccessibilityStore = create<AccessibilityState>((set) => ({
  readAloud: false,
  textSize: "md",
  highContrast: false,
  animationsEnabled: true,
  soundEnabled: true,
  reduceDistractions: false,
  setTextSize: (size) => set({ textSize: size }),
  toggle: (key) => set((s) => ({ [key]: !s[key] } as any)),
}));
