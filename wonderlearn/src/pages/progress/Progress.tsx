import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useProgress } from "@/services/queries";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const skillMeta = [
  { key: "memory", label: "Memory", emoji: "🧠", color: "mint" as const },
  { key: "mathematics", label: "Mathematics", emoji: "🔢", color: "sun" as const },
  { key: "reading", label: "Reading", emoji: "📚", color: "coral" as const },
  { key: "focus", label: "Focus", emoji: "🎯", color: "purple" as const },
];

export default function ProgressPage() {
  const { data, isLoading } = useProgress();

  return (
    <AppShell>
      <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink-900 mb-1">
        My Learning Journey 🌟
      </h1>
      <p className="text-ink-500 mb-6">Every adventure helps you grow a little more.</p>

      {isLoading || !data ? (
        <p className="text-ink-500">Loading your journey…</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card>
              <ProgressBar value={data.overall} color="purple" label="Overall Growth" />
              <div className="grid grid-cols-3 gap-3 mt-5 text-center">
                <div>
                  <p className="font-display font-semibold text-xl text-ink-900">
                    {data.activitiesCompleted}
                  </p>
                  <p className="text-xs text-ink-500">Adventures completed</p>
                </div>
                <div>
                  <p className="font-display font-semibold text-xl text-ink-900">
                    {data.streakDays} 🔥
                  </p>
                  <p className="text-xs text-ink-500">Day streak</p>
                </div>
                <div>
                  <p className="font-display font-semibold text-xl text-ink-900">
                    {data.totalStars} ⭐
                  </p>
                  <p className="text-xs text-ink-500">Total stars</p>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="font-display font-semibold text-lg text-ink-900 mb-4">
                This Week's Adventures
              </h2>
              <div className="h-56 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.weekly}>
                    <defs>
                      <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B7BDB" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#8B7BDB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0ECFB" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#746C8C" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#746C8C" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 16, border: "1px solid #E4DCF8" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="minutes"
                      stroke="#8B7BDB"
                      strokeWidth={3}
                      fill="url(#colorMinutes)"
                      name="Minutes learning"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card className="flex flex-col gap-5">
            <h2 className="font-display font-semibold text-lg text-ink-900">Skills Growing</h2>
            {skillMeta.map((s) => (
              <ProgressBar
                key={s.key}
                value={(data.bySkill as any)[s.key]}
                color={s.color}
                label={`${s.emoji} ${s.label}`}
              />
            ))}
          </Card>
        </div>
      )}
    </AppShell>
  );
}
