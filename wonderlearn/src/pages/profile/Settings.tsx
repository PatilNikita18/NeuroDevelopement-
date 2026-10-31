import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { useChildProfileStore } from "@/stores/childProfileStore";
import { cn } from "@/lib/cn";
import type { LearningPreference, SessionLength } from "@/types";
import { mockChild } from "@/lib/mockData";

const PREFERENCES: { key: LearningPreference; emoji: string; label: string }[] = [
  { key: "pictures", emoji: "🎨", label: "Pictures" },
  { key: "listening", emoji: "🔊", label: "Listening" },
  { key: "games", emoji: "🎮", label: "Games" },
  { key: "reading", emoji: "📖", label: "Reading" },
  { key: "puzzles", emoji: "🧩", label: "Puzzles" },
  { key: "animations", emoji: "🎬", label: "Animations" },
];

const SESSIONS: SessionLength[] = [5, 10, 15];

export default function Settings() {
  const a11y = useAccessibilityStore();
  const profileState = useChildProfileStore();
  const profile = profileState.profile ?? mockChild;

  return (
    <AppShell>
      <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink-900 mb-6">
        Settings ⚙️
      </h1>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <h2 className="font-display font-semibold text-lg text-ink-900 mb-3">
            What makes learning fun?
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {PREFERENCES.map((p) => {
              const active = profile.preferences.includes(p.key);
              return (
                <button
                  key={p.key}
                  onClick={() => profileState.togglePreference(p.key)}
                  className={cn(
                    "rounded-2xl p-3 flex flex-col items-center gap-1 border-2 transition-all",
                    active ? "border-purple-500 bg-purple-50" : "border-purple-100 bg-white"
                  )}
                >
                  <span className="text-xl">{p.emoji}</span>
                  <span className="text-xs font-semibold text-ink-900">{p.label}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="font-display font-semibold text-lg text-ink-900 mb-3">
            Session Length
          </h2>
          <div className="flex gap-3">
            {SESSIONS.map((s) => (
              <button
                key={s}
                onClick={() => profileState.updateDraft({ sessionDuration: s })}
                className={cn(
                  "flex-1 py-3 rounded-2xl border-2 font-semibold",
                  profile.sessionDuration === s
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-purple-100 bg-white text-ink-700"
                )}
              >
                {s} min
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-display font-semibold text-lg text-ink-900 mb-3">
            Accessibility
          </h2>
          <div className="grid gap-2">
            {(
              [
                ["readAloud", "🔊 Read Aloud"],
                ["highContrast", "🎨 Contrast"],
                ["animationsEnabled", "✨ Animation"],
                ["soundEnabled", "🔇 Sound"],
                ["reduceDistractions", "🧘 Reduce Distractions"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => a11y.toggle(key)}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-2xl font-medium",
                  (a11y as any)[key] ? "bg-purple-100 text-purple-700" : "bg-purple-50/60 text-ink-500"
                )}
              >
                <span>{label}</span>
                <span>{(a11y as any)[key] ? "On" : "Off"}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
