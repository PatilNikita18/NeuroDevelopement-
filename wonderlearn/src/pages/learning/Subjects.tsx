import { AppShell } from "@/components/layout/AppShell";
import { LearningWorldCard } from "@/components/ui/LearningWorldCard";
import { useLearningWorlds } from "@/services/queries";

export default function Subjects() {
  const { data: worlds, isLoading } = useLearningWorlds();

  return (
    <AppShell>
      <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink-900 mb-1">
        Learning Worlds 🗺
      </h1>
      <p className="text-ink-500 mb-6">Pick a world and start your next adventure.</p>

      {isLoading ? (
        <p className="text-ink-500">Loading your worlds…</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {worlds?.map((w) => (
            <LearningWorldCard key={w.id} world={w} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
