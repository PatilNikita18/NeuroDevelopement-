import { useParams, Link } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ActivityCard } from "@/components/ui/ActivityCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useActivities, useLearningWorlds } from "@/services/queries";

export default function WorldDetail() {
  const { worldKey } = useParams();
  const { data: worlds } = useLearningWorlds();
  const { data: worldActivities, isLoading } = useActivities(worldKey);
  const world = worlds?.find((w) => w.key === worldKey);

  return (
    <AppShell>
      <Link to="/subjects" className="text-purple-600 text-sm font-semibold hover:underline">
        ← All worlds
      </Link>

      <div className="flex items-center gap-4 mt-3 mb-6">
        <span className="text-5xl">{world?.emoji ?? "🗺"}</span>
        <div className="flex-1">
          <h1 className="font-display font-semibold text-2xl text-ink-900">
            {world?.name ?? "Learning World"}
          </h1>
          <p className="text-ink-500">{world?.description}</p>
        </div>
      </div>

      {world && (
        <div className="max-w-sm mb-8">
          <ProgressBar value={world.progress} color={world.color} label="World progress" />
        </div>
      )}

      <h2 className="font-display font-semibold text-lg text-ink-900 mb-3">Adventures</h2>
      {isLoading ? (
        <p className="text-ink-500">Loading adventures…</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {worldActivities?.map((a) => (
            <ActivityCard key={a.id} activity={a} />
          ))}
          {worldActivities?.length === 0 && (
            <p className="text-ink-500">More adventures are coming soon to this world!</p>
          )}
        </div>
      )}
    </AppShell>
  );
}
