import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Activity } from "@/types";
import { Button } from "./Button";

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl bg-white border border-purple-50 shadow-[var(--shadow-softer)] p-5 flex flex-col gap-3"
    >
      <h4 className="font-display font-semibold text-lg text-ink-900">{activity.title}</h4>
      <p className="text-sm text-ink-500">{activity.description}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-sun-700 font-semibold">{"⭐".repeat(activity.difficulty)}</span>
        <span className="text-ink-500">⏱ {activity.estimatedMinutes} min</span>
      </div>
      <Link to={`/activity/${activity.id}`}>
        <Button size="md" className="w-full mt-1">
          Start Adventure
        </Button>
      </Link>
    </motion.div>
  );
}
