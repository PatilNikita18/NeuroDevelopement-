import { AppShell } from "@/components/layout/AppShell";
import { AchievementCard } from "@/components/ui/AchievementCard";
import { useAchievements } from "@/services/queries";

export default function Achievements() {
  const { data, isLoading } = useAchievements();

  return (
    <AppShell>
      <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink-900 mb-1">
        My Adventure Badges 🏆
      </h1>
      <p className="text-ink-500 mb-6">Collect badges as you explore every world.</p>

      {isLoading ? (
        <p className="text-ink-500">Loading your badges…</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {data?.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
