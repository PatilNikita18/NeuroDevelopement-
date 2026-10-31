import type { ReactNode } from "react";
import { GardenBackground } from "@/components/backgrounds/GardenBackground";
import { Navigation } from "./Navigation";
import { AccessibilityBar } from "./AccessibilityBar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <GardenBackground>
      <Navigation />
      <main className="sm:ml-24 lg:ml-28 pb-24 sm:pb-10 px-4 sm:px-8 pt-6 sm:pt-8 max-w-6xl">
        {children}
      </main>
      <AccessibilityBar />
    </GardenBackground>
  );
}
